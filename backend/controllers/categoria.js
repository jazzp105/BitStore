// Importamos el modelo categoria
let Categoria = require("../models/categoria");
// Importamos libreria mongoose para validar objetID validos
let mongoose = require("mongoose");

// Registramos categoria
const registrarCategoria = async (req, res) => {
  // Obtenemos los parametros enviados y los guardamos en params
  let params = req.body;
  // Validamos que se esten los parametros obligatorios
  if (!params.nombre || !params.descripcion) {
    // si falta un dato escapado del front enviamos mensaje
    res.status(400).send("Falto un dato");
  } else {
    // Asignamos los parametros a una nueva isntancia de categoria
    let categoria = new Categoria({
      nombre: params.nombre,
      descripcion: params.descripcion,
    });
    // Guardamos la categoria con un Await
    const result = await categoria.save();
    // Operador ternario para el response
    result
      ? res.status(200).send({ categoria: result })
      : res.status(400).send("Error al registrar categoria");
  }
};

// Buscar categorias
const buscarCategoria = async (req, res) => {
  // Validamos si el tipo de ID es valido por mongo
  let idValido = mongoose.Types.ObjectId.isValid(req.params["id"]);
  if (!idValido) {
    res.status(400).send("el ID de la categoria no es valido");
  } else {
    // buscamos la categoria por el ID
    let categoria = await Categoria.findById(req.params["id"]);
    // Validamos si se encontro o no la categoria
    categoria
      ? res.status(200).send({ categoria: categoria })
      : res.status(400).send("La categoria no existe");
  }
};

// Listar categorias con o sin filtro (Se usa una sola funcion para el POST y GET)
const listaCategoria = async (req, res) => {
  // Busqueda de las categorias con o sin filtro con una exprecion regular
  let categoria = await Categoria.find({
    nombre: new RegExp(req.params["nombre"], "i"),
  });
  // Validamos si se encuentra una categoria
  if (!categoria || categoria.length === 0) {
    return res.status(400).send("No se encontro la categoria");
  } else {
    return res.status(200).send({ categoria: categoria });
  }
};

// Editar categoria
const editarCategoria = async (req, res) => {
  // Obtenemos los datos que llegan de la API
  let params = req.body;
  // Validamos si el tipo de ID es valido por mongo
  let idValido = mongoose.Types.ObjectId.isValid(req.params["id"]);
  if (!idValido) {
    res.status(400).send("el ID de la categoria no es valido");
  } else {
    // buscamos la categoria por el ID y actualizamos los parametros
    let categoria = await Categoria.findByIdAndUpdate(
      req.params["id"],
      { nombre: params.nombre, descripcion: params.descripcion },
      { new: true }
    );
    // Validamos si se edito o no la categoria
    categoria
      ? res.status(200).send({ categoria: categoria })
      : res.status(400).send("La categoria no existe");
  }
};

// Eliminamos una categoria
const eliminarCategoria = async (req, res) => {
  // Validamos si el tipo de ID es valido por mongo
  let idValido = mongoose.Types.ObjectId.isValid(req.params["id"]);
  if (!idValido) {
    res.status(400).send("el ID de la categoria no es valido");
  } else {
    // buscamos la categoria por el ID y actualizamos los parametros
    let categoria = await Categoria.findByIdAndDelete(req.params["id"]);
    // Validamos si se edito o no la categoria
    categoria
      ? res.status(200).send({ categoriaEliminada: categoria })
      : res.status(400).send("La categoria no existe");
  }
};

// Creamos constante con las funciones
const CategoriaController = {
  registrarCategoria,
  buscarCategoria,
  listaCategoria,
  editarCategoria,
  eliminarCategoria,
};
// Exportamos el modulo
module.exports = CategoriaController;
