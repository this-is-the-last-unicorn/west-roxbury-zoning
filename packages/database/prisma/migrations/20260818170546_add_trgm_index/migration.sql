-- GIN trigram index for fuzzy address search
CREATE INDEX IF NOT EXISTS idx_parcels_address_trgm ON parcels USING gin (address gin_trgm_ops);
