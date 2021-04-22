//variable express
let express=require("express");

//importamos el controlador

let Usuario=require("../controllers/usuario");

//creamos la api

let api=express.Router();

//servicio POST (REGISTRAR)

api.post("/registrarUsuario", Usuario.registrarUsuario);
// Servicio para el login
api.post("/login",Usuario.login);
module.exports=api;