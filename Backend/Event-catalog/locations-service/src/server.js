const app = require('./app');

const PORT = process.env.PORT || 3024;

app.listen(PORT, () => {
  console.log(`Ubicaciones service listening on port ${PORT}`);
});
