const { eventCatalogPool, availabilityPool } = require('../config/db');


async function reserveSlot(eventId, quantity) {

  const eventResult = await eventCatalogPool.query(
    'SELECT id, capacity FROM events WHERE id = $1',
    [eventId]
  );

  if (eventResult.rows.length === 0) {
    throw new Error('Event not found');
  }

  const event = eventResult.rows[0];

  
  const availabilityResult = await availabilityPool.query(
    'SELECT reserved FROM availability WHERE event_id = $1',
    [eventId]
  );

  let reserved = 0;
  if (availabilityResult.rows.length > 0) {
    reserved = availabilityResult.rows[0].reserved;
  } else {
 
    await availabilityPool.query(
      'INSERT INTO availability(event_id, reserved) VALUES ($1, $2)',
      [eventId, 0]
    );
  }


  if (reserved + quantity > event.capacity) {
    throw new Error('Not enough capacity available');
  }


  if (reserved === 0) {
    await availabilityPool.query(
      'INSERT INTO availability(event_id, reserved) VALUES ($1, $2)',
      [eventId, quantity]
    );
  } else {
    await availabilityPool.query(
      'UPDATE availability SET reserved = reserved + $1 WHERE event_id = $2',
      [quantity, eventId]
    );
  }

  return { eventId, reserved: reserved + quantity, capacity: event.capacity };
}

module.exports = { reserveSlot };
