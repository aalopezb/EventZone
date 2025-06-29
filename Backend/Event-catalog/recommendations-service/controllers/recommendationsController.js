const pool = require('../models/db');

exports.getUserRecommendations = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { rows } = await pool.query(
      `SELECT * FROM events WHERE date::timestamp >= NOW() ORDER BY date::timestamp ASC LIMIT 5`
    );
    res.json({ userId, recommendations: rows });
  } catch (error) {
    next(error);
  }
};

// 2. getPopularEvents
exports.getPopularEvents = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM events WHERE date::timestamp >= NOW() ORDER BY date::timestamp ASC LIMIT 5`
    );
    res.json({ popularEvents: rows });
  } catch (error) {
    next(error);
  }
};

// 3. getSimilarEvents
exports.getSimilarEvents = async (req, res, next) => {
  try {
    const { eventId } = req.params;


    const { rows: [event] } = await pool.query(
      `SELECT * FROM events WHERE id = $1`,
      [eventId]
    );

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

  
    const { rows: similarEvents } = await pool.query(
      `SELECT * FROM events
       WHERE id != $1
         AND (
           location = $2
           OR date::timestamp BETWEEN $3::timestamp AND $4::timestamp
         )
       ORDER BY date::timestamp ASC LIMIT 5`,
      [
        eventId,
        event.location,
        new Date(new Date(event.date).getTime() - 7 * 24 * 60 * 60 * 1000), // -7 días
        new Date(new Date(event.date).getTime() + 7 * 24 * 60 * 60 * 1000)  // +7 días
      ]
    );

    res.json({ eventId, similarEvents });
  } catch (error) {
    next(error);
  }
};
