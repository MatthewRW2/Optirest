// Importar las dependencias
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Asegúrate de que tienes configurada la conexión a la base de datos

// Endpoint para insertar alimentos
router.post('/insertar_alimento', async (req, res) => {
  const { nombreAlimento, cantidadDisponible, IdCategoria, fechaEntrada } = req.body;

  // Crear una transacción para asegurar que ambas inserciones se completen correctamente
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Inserción en la tabla alimento
    const insertAlimentoQuery = `
      INSERT INTO alimento (nombreAlimento, cantidadDisponible, IdCategoria)
      VALUES (?, ?, ?)
    `;
    const [alimentoResult] = await connection.execute(insertAlimentoQuery, [
      nombreAlimento, cantidadDisponible, IdCategoria,
    ]);

    const IdAlimento = alimentoResult.insertId;

    // Inserción en la tabla entrada_alimentos
    const insertEntradaQuery = `
      INSERT INTO entrada_alimentos (IdAlimento, fechaEntrada, observacion, IdUsuario)
      VALUES (?, ?, ?, ?)
    `;
    await connection.execute(insertEntradaQuery, [IdAlimento, fechaEntrada, 'Observación de ejemplo', 1]);

    // Confirmar la transacción
    await connection.commit();

    res.status(200).json({ message: 'Alimento insertado correctamente' });
  } catch (error) {
    // En caso de error, revertir la transacción
    await connection.rollback();
    console.error('Error al insertar alimento:', error);
    res.status(500).json({ message: 'Error al insertar alimento' });
  } finally {
    // Liberar la conexión
    connection.release();
  }
});

module.exports = router;
