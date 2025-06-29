const express = require('express');
const router = express.Router();
const recommendationsController = require('../controllers/recommendationsController');

router.get('/user/:userId', recommendationsController.getUserRecommendations);
router.get('/event/:eventId/similar', recommendationsController.getSimilarEvents);
router.get('/popular', recommendationsController.getPopularEvents);

module.exports = router;
