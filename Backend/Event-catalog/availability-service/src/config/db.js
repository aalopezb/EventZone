const { Pool } = require('pg');

const eventCatalogPool = new Pool({
  connectionString: process.env.EVENT_CATALOG_DB_URL,
});

const availabilityPool = new Pool({
  connectionString: process.env.AVAILABILITY_DB_URL,
});

module.exports = { eventCatalogPool, availabilityPool };
