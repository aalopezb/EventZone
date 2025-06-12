import { Activity } from '../models/activity.js';

export const createActivity = async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const saved = await newActivity.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
};

export const getActivitiesByUser = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};
