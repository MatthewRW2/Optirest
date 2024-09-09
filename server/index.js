const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"optirest"
});

db.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("conexion exitosa")
    }
});

const nuevoregistro = "INSERT INTO usuario (IdUsuario, Nombres, Apellidos, Rol, tipoDocumento, numeroDocumento, Contraseña) VALUES ('3', 'Juan David', 'Longa', 'Profesor', 'CC', '45127836', 'rikiti');"
db.query(nuevoregistro, function(error,rows){
    if(error){
        throw error;
    }else{
        console.log("datos insertados correctamente")
    }
})



const modificar = "UPDATE usuario SET Nombres = 'Ozuna' WHERE IdUsuario = 2"
db.query(modificar, function(error,lista){
    if(error){
        throw error;
    }else{
        console.log("dato modificado correctamente")
    }
});


const usuarios = "SELECT * FROM usuario";
db.query(usuarios,function(error,lista){
    if(error){
        throw error;
    }else{
        console.log(lista);
    }
});


const borrar = "DELETE FROM usuario WHERE IdUsuario = 2";
db.query(borrar,function(error,lista){
    if(error){
        throw error;
    }else{
        console.log("Datos eliminados correctamente")
    }
})
 
db.end();