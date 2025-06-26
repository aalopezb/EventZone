const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');


router.post('/:eventId/reserve', availabilityController.reserveSlot);

module.exports = router;