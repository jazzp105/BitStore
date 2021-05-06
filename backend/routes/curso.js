// importamos express
let express = require("express");
// importamos controlador
let Curso = require("../controllers/curso");
// importamos la libreria multiparty para el manejo de ficheros por medio de rutas
let multipart = require("connect-multiparty");
// creamos la ruta donde quedaran guardados los ficheros
let path = multipart({ cargas: "./uploads/imgcurso" });
// generamos la api con Routes
let api = express.Router();

// generamos las rutas de las API
api.post("/curso/registrarCurso", path, Curso.registrarCurso);
api.get("/curso/:nombre?", Curso.listaCursos);
api.get("/curso/obtenerCurso/:id", Curso.obtenerCurso);
api.put("/curso/editarCurso/:id", path, Curso.editarCurso);
api.delete("/curso/:id", Curso.eliminarCurso);

// Exportamos el modulo
module.exports = api;
