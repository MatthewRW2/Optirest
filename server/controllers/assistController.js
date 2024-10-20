const db = require('../config/db');

// Registrar asistencia
exports.registerAttendance = (req, res) => {
    const { cantidadAsistencia, curso, fecha } = req.body;

    const query = `
        INSERT INTO asistencia (cantidadAsistencia, IdGrupo, fechaAsistencia)
        VALUES (?, ?, ?)
    `;

    const values = [cantidadAsistencia, curso, fecha]; // El curso representa el IdGrupo
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al registrar la asistencia:', err);
            return res.status(500).json({ error: 'Error al registrar la asistencia' });
        }
        res.status(201).json({ message: 'Asistencia registrada exitosamente' });
    });
};

// Obtener cursos
exports.getCursos = (req, res) => {
    const query = `
        SELECT IdGrupo 
        FROM Grupo
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los grupos:', err);
            return res.status(500).json({ error: 'Error al obtener los grupos' });
        }
        res.status(200).json(results);
    });
};
