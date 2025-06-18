const locationModel = require('../models/locationModel');

const createLocation = async (req, res) => {
  try {
    const location = req.body;
    const newLocation = await locationModel.createLocation(location);
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating location', error: error.message });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await locationModel.getAllLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error: error.message });
  }
};

const getLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await locationModel.getLocationById(id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location', error: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = req.body;
    const updatedLocation = await locationModel.updateLocation(id, location);
    if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });
    res.json(updatedLocation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating location', error: error.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLocation = await locationModel.deleteLocation(id);
    if (!deletedLocation) return res.status(404).json({ message: 'Location not found' });
    res.json(deletedLocation);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting location', error: error.message });
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
