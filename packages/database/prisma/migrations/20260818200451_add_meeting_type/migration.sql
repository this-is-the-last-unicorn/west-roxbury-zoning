-- DropIndex
DROP INDEX "idx_parcels_address_trgm";

-- AlterTable
ALTER TABLE "meetings" ADD COLUMN     "type" TEXT DEFAULT 'public_meeting';
