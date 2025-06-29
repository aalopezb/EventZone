const express = require('express');
const cors = require('cors');
const recommendationsRoutes = require('./routes/recommendationsRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

app.use('/recommendations', recommendationsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Recommendations service running on port ${PORT}`);
});
