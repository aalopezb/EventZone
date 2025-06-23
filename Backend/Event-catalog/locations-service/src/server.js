const app = require('./app');

const PORT = process.env.PORT || 3024;

app.use((err, req, res, next) => {
  console.error('Error capturado:', err); 
  res.status(500).json({ 
    message: 'Error interno en el servidor', 
    error: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Ubicaciones service listening on port ${PORT}`);
});

