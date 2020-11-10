const { query, response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../database");
const forge = require('node-forge');
const e = require('express');
var base64ImageToFile = require('base64image-to-file');

router.get('/getCategorias', async(req, res) => {
  sql = "SELECT * FROM categoria";

  let result = await db.Open(sql,[],false);
  console.log(result);
  Categorias = [];

  result.rows.map(categoria => {
    let schema = {
      "id": categoria[0],
      "nombre": categoria[1]
    }

    Categorias.push(schema)
  })

  res.json(Categorias);
})

router.post('/admin/addCategoria', async(req, res) => {
  console.log(req.body);
  //obtener datos
  var nombre = req.body.nombre.toLowerCase();
  //verificar si ya existe la categoria
  var sqlVerification = `SELECT * FROM categoria WHERE nombre = '${nombre}'`;
  let verification = await db.Open(sqlVerification,[],false);
  if(verification.rows.length > 0){
    res.send(false);
  } else {
    //insertar categoria
    var sqlInsertar = `INSERT INTO categoria(nombre) VALUES ('${nombre}')`;
    let result = await db.Open(sqlInsertar,[],true);
    console.log(result);
  }
  res.send(true);
})

module.exports = router;