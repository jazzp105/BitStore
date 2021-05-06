// Importamos modelo de curso
let Curso = require("../models/curso");
// Importamos modulo file System
let fs = require("fs");
// Importamos modulo path para manejar las rutas de los ficheros en el proyecto
let path = require("path");
// Importamos libreria para fechas
let moment = require("moment");

// Registrar curso
const registrarCurso = (req, res) => {
  console.log("0", req);
  // Obtenemos datos del JSON
  let params = req.body;
  // Instanciamos el curso Modelo
  let curso = new Curso();
  //Validamos los campos
  if (
    params.nombre &&
    params.descripcion &&
    params.precioTotal &&
    params.precioCompra &&
    params.cupos &&
    params.idCategoria &&
    params.puntos
  ) {
    // Ruta donde quedara la imagen en el proyecto
    let imagenPath = req.files.imagen.path;
    // Generamos un codigo para las imagenes
    let nameImg = moment().unix();
    // creamos variable de la nueva ruta
    var rutaServer =
      "./uploads/imgcurso/" + nameImg + path.extname(imagenPath).toLowerCase();
    // copiamos la imagen a la nueva ruta
    fs.createReadStream(imagenPath).pipe(fs.createWriteStream(rutaServer));
    // Nombre del archivo que quedara en BD
    let bdImg = nameImg + path.extname(imagenPath).toLowerCase();
    // llenamos el modelo con los datos del req
    curso.nombre = params.nombre;
    curso.descripcion = params.descripcion;
    curso.imagen = bdImg;
    curso.precioTotal = params.precioTotal;
    curso.precioCompra = params.precioCompra;
    curso.cupos = params.cupos;
    curso.idCategoria = params.idCategoria;
    curso.puntos = params.puntos;
    // Registramos el curso
    curso.save((err, datosCurso) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosCurso) {
          res.status(200).send({ curso: datosCurso });
        } else {
          res.status(401).send({ mensaje: "No se pudo registrar el curso" });
        }
      }
    });
  } else {
    res.status(401).send({ mensaje: "Falto alguno de los campos" });
  }
};

// Consultamos todas las categorias
const listaCursos = (req, res) => {
  // si tenemos filtro nombre lo guardamos
  let nombre = req.params["nombre"];
  // Busqueda de las categorias
  Curso.find({ nombre: new RegExp(nombre, "i") })
    .populate("idCategoria")
    .exec((err, datosCurso) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (datosCurso) {
          res.status(200).send({ productos: datosCurso });
        } else {
          res
            .status(403)
            .send({ message: "No hay ningun curso con ese nombre" });
        }
      }
    });
};

// Obtener Curso

const obtenerCurso = (req, res) => {
  console.log(req);
  let id = req.params["id"];

  Curso.findOne({ _id: id }, (err, datosCurso) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (datosCurso) {
        res.status(200).send({ curso: datosCurso });
      } else {
        res.status(403).send({ message: "No existe el curso" });
      }
    }
  });
};

// Editar curso

const editarCurso = (req, res) => {
  let params = req.body;
  let id = req.params["id"];
  let img = req.params["img"];

  if (
    params.nombre &&
    params.descripcion &&
    params.precioTotal &&
    params.precioCompra &&
    params.cupos &&
    params.idCategoria &&
    params.puntos
  ) {
    if (img || img != null || img != undefined) {
      fs.unlink("./uploads/imgcurso/" + img, (err) => {
        if (err) throw err;
      });
    }

    // Ruta donde quedara la imagen en el proyecto
    let imagenPath = req.files.imagen.path;
    // Generamos un codigo para las imagenes
    let nameImg = moment().unix();
    // creamos variable de la nueva ruta
    var rutaServer =
      "./uploads/imgcurso/" + nameImg + path.extname(imagenPath);
    // copiamos la imagen a la nueva ruta
    fs.createReadStream(imagenPath).pipe(fs.createWriteStream(rutaServer));
    // Nombre del archivo que quedara en BD
    let bdImg = nameImg + path.extname(imagenPath);
    console.log(params);
    console.log(id);
    console.log(img);
    console.log(bdImg);
    Curso.findByIdAndUpdate(
      { _id: id },
      {
        nombre: params.nombre,
        descripcion: params.descripcion,
        imagen: bdImg,
        precioTotal: params.precioTotal,
        precioCompra: params.precioCompra,
        cupos: params.cupos,
        idCategoria: params.idCategoria,
        puntos: params.puntos,
      },
      (err, datosCurso) => {
        console.log(datosCurso)
        if (err) {
          res.status(500).send({ message: "Error en el servidor" });
        } else {
          if (datosCurso) {
            res.status(200).send({ curso: datosCurso });
          } else {
            res.status(403).send({ message: "No se edito el curso" });
          }
        }
      }
    );
  } else {
    res.status(401).send({ mensaje: "Falto alguno de los campos" });
  }
};

// Eliminamos curso
const eliminarCurso = (req, res) => {
  let id = req.params["id"];

  Curso.findOneAndRemove({ _id: id }, (err, datosCurso) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (datosCurso) {
        fs.unlink("./uploads/imgcurso/" + datosCurso.imagen, (err) => {
          if (err) throw err;
        });
        res.status(200).send({ produto: datosCurso });
      } else {
        res.status(403).send({ message: "No se elimino ningun registro" });
      }
    }
  });
};

// Exportamos el modulo con sus funciones
module.exports = {
  registrarCurso,
  listaCursos,
  obtenerCurso,
  editarCurso,
  eliminarCurso,
};
