-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateTable
CREATE TABLE "parcels" (
    "gis_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "st_num" TEXT,
    "st_name" TEXT,
    "proposed_district" TEXT,
    "current_district" TEXT,
    "lot_size_sf" DOUBLE PRECISION,
    "lot_tier" TEXT,
    "applicable_table" TEXT,
    "is_non_residential" BOOLEAN NOT NULL DEFAULT false,
    "is_condo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "parcels_pkey" PRIMARY KEY ("gis_id")
);

-- CreateTable
CREATE TABLE "parcel_results" (
    "gis_id" TEXT NOT NULL,
    "summary" JSONB,
    "comparison" JSONB,
    "outcomes" JSONB,
    "nonconformity" JSONB,
    "confidence" JSONB,
    "qa_answers" JSONB,
    "easement_bonus" JSONB,
    "stories" JSONB,
    "block_id" TEXT,
    "pipeline_version" TEXT,
    "computed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parcel_results_pkey" PRIMARY KEY ("gis_id")
);

-- CreateTable
CREATE TABLE "block_stats" (
    "block_id" TEXT NOT NULL,
    "street" TEXT,
    "bounds_label" TEXT,
    "parcel_count" INTEGER,
    "districts" JSONB,
    "stats" JSONB,
    "character_dist" JSONB,
    "roof_dist" JSONB,
    "lot_variation" JSONB,
    "property_list" JSONB,

    CONSTRAINT "block_stats_pkey" PRIMARY KEY ("block_id")
);

-- CreateTable
CREATE TABLE "street_stats" (
    "slug" TEXT NOT NULL,
    "street_name" TEXT NOT NULL,
    "parcel_count" INTEGER,
    "districts" JSONB,
    "stats" JSONB,
    "block_ids" JSONB,

    CONSTRAINT "street_stats_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "area_stats" (
    "slug" TEXT NOT NULL,
    "area_name" TEXT NOT NULL,
    "parcel_count" INTEGER,
    "districts" JSONB,
    "stats" JSONB,

    CONSTRAINT "area_stats_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "corrections" (
    "id" SERIAL NOT NULL,
    "gis_id" TEXT,
    "description" TEXT NOT NULL,
    "contact_email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "corrections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "gis_id" TEXT,
    "reactions" JSONB,
    "free_text" TEXT,
    "session_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meetings" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "title" TEXT NOT NULL,
    "time" TEXT,
    "location" TEXT,
    "city_url" TEXT,
    "recording_url" TEXT,
    "materials_url" TEXT,
    "is_past" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_parcels_address" ON "parcels"("address");

-- CreateIndex
CREATE INDEX "idx_parcels_st_name" ON "parcels"("st_name");

-- CreateIndex
CREATE INDEX "idx_parcel_results_block" ON "parcel_results"("block_id");

-- CreateIndex
CREATE INDEX "idx_corrections_status" ON "corrections"("status");

-- CreateIndex
CREATE INDEX "idx_meetings_date" ON "meetings"("date");

-- AddForeignKey
ALTER TABLE "parcel_results" ADD CONSTRAINT "parcel_results_gis_id_fkey" FOREIGN KEY ("gis_id") REFERENCES "parcels"("gis_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcel_results" ADD CONSTRAINT "parcel_results_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "block_stats"("block_id") ON DELETE SET NULL ON UPDATE CASCADE;
