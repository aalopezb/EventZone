const app = require('./app');

const PORT = process.env.PORT || 3024;

app.use((err, req, res, next) => {
  console.error('Error capturado:', err); // Log completo del error en consola
  res.status(500).json({ 
    message: 'Error interno en el servidor', 
    error: err.message // envia el mensaje de error al frontend
  });
});

app.listen(PORT, () => {
  console.log(`Ubicaciones service listening on port ${PORT}`);
});

