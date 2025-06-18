const db = require('../db');

const createLocation = async (location) => {
  const {
    name,
    address,
    city,
    state,
    country,
    postal_code,
    latitude,
    longitude,
    capacity,
    description,
  } = location;

  const result = await db.query(
    `INSERT INTO locations
      (name, address, city, state, country, postal_code, latitude, longitude, capacity, description)
     VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [name, address, city, state, country, postal_code, latitude, longitude, capacity, description]
  );

  return result.rows[0];
};

const getAllLocations = async () => {
  const result = await db.query(
    `SELECT id, name, address, city, state, country, postal_code, latitude, longitude, capacity, description
     FROM locations`
  );
  return result.rows;
};

const getLocationById = async (id) => {
  const result = await db.query(
    `SELECT id, name, address, city, state, country, postal_code, latitude, longitude, capacity, description
     FROM locations WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

const updateLocation = async (id, location) => {
  const {
    name,
    address,
    city,
    state,
    country,
    postal_code,
    latitude,
    longitude,
    capacity,
    description,
  } = location;

  const result = await db.query(
    `UPDATE locations
     SET name = $1,
         address = $2,
         city = $3,
         state = $4,
         country = $5,
         postal_code = $6,
         latitude = $7,
         longitude = $8,
         capacity = $9,
         description = $10,
         updated_at = NOW()
     WHERE id = $11
     RETURNING *`,
    [name, address, city, state, country, postal_code, latitude, longitude, capacity, description, id]
  );

  return result.rows[0];
};

const deleteLocation = async (id) => {
  const result = await db.query(
    `DELETE FROM locations WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
