const express = require('express');
const cors = require('cors');
const locationsRoutes = require('./routes/locationsRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/locations', locationsRoutes);

app.get('/', (req, res) => {
  res.send('Ubicaciones service API running');
});

module.exports = app;
