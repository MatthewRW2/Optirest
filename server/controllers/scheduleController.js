const db = require('../config/db');

// Controlador para obtener el cronograma
exports.cronograma = (req, res) => {
  const query = "SELECT * FROM cronograma"; // Ajusta esta query según los campos de la vista cronograma
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener el cronograma:", err);
      return res.status(500).json({ error: "Error al obtener el cronograma" });
    }
    res.json(results);
  });
};
