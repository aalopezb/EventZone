require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3028;

app.listen(PORT, () => {
  console.log(`Disponibilidad Service running on port ${PORT}`);
});
