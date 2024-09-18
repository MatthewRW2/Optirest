const db = require('../config/db');

exports.registerAttendance = (req, res) => {
    const { cantidadEstudiantes, curso, fecha } = req.body;
    const { nDocumento, IdGrupo } = req.params; // Suponiendo que nDocumento y IdGrupo se pasan en los parámetros de la URL

    const query = `
        INSERT INTO asistencia (cantidadEstudiantes, IdDetalleCronograma, nDocumento, IdGrupo, fechaAsistencia)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [cantidadEstudiantes, curso, nDocumento, IdGrupo, fecha];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al registrar la asistencia:', err);
            return res.status(500).json({ error: 'Error al registrar la asistencia' });
        }
        res.status(201).json({ message: 'Asistencia registrada exitosamente' });
    });
};
