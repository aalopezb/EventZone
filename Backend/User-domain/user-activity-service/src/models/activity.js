import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: Object }
});

export const Activity = mongoose.model('Activity', activitySchema);
