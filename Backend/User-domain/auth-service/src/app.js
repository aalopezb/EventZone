require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Auth service running on port ${PORT}`);
});
