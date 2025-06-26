const { reserveSlot } = require('../models/availabilityModel');


exports.reserveSlot = async (req, res) => {
  const { eventId } = req.params;
  const { quantity } = req.body;

  try {
    const result = await reserveSlot(eventId, quantity);
    res.json({ message: `Reserved ${quantity} slots`, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
