const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"optirest"
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

app.post("/registro", (req, res) => {
    const Nombres = req.body.nombres; 
    const Apellidos = req.body.apellidos; 
    const TipoDocumento = req.body.tipoDocumento; 
    const NumeroDocumento = req.body.numeroDocumento; 
    const Contrasena = req.body.contrasena;

    db.query('INSERT INTO usuario (N_Documento,Nombres, Apellidos, tipoDocumento,Contraseña) VALUES (?,?,?,?,?)', [NumeroDocumento, Nombres, Apellidos,TipoDocumento, Contrasena], 
    (err, result) => {
        if(err){
            console.log(err);
            console.log(Nombres);
            console.log(Apellidos);
            console.log(TipoDocumento);
            console.log(NumeroDocumento);
            console.log(Contrasena);
        }else{
            res.send("registro exitoso");
        }
    });
});

db.end();