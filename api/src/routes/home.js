const { query, response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../database");
const forge = require('node-forge');
const e = require('express');
var base64ImageToFile = require('base64image-to-file');
var fs = require('fs');

//obtener todos los productos
router.get('/obtenerProductos', async (req,res) => {
  sql = 'SELECT * FROM producto';

  let result = await db.Open(sql,[],false);
  Producto = [];

  result.rows.map(product => {
    let schema = {
      "id": product[0],
      "nombre": product[1],
      "descripcion": product[2],
      "precio": product[3],
      "categoria": product[8],
      "foto": product[9]
    }
    Producto.push(schema)
  })

  for (const p of Producto) {
    sql = `SELECT nombre FROM categoria WHERE idCategoria = ${p.categoria}`;
    let ncat = await db.Open(sql,[],false);
    ncat.rows.map(c =>{
      console.log(c[0])
      console.log(p.categoria = c[0])
    });

    var imageAsBase64 = fs.readFileSync(p.foto, 'base64');
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(p.foto)[1];  
    p.foto = `data:image/${ext};base64,${imageAsBase64}`
  }

  res.json(Producto)
})

//productos filtrados
router.post('/obtenerProductos', async (req,res) => {
  console.log(req.body);
  var idCategoria = req.body.categoria != "" ? +req.body.categoria:0;
  var pclave = req.body.clave != "" ? req.body.clave:null;
  var orden = req.body.precio != "" ? +req.body.precio:0;

  console.log(idCategoria,pclave,orden);

  if(idCategoria == 0 && pclave){
    console.log("sql 1");
    sql = `SELECT * FROM producto WHERE idProducto IN (
      SELECT producto_idProducto FROM palabra_clave_de_producto WHERE palabra_clave_idPalabraClave IN (
          SELECT idPalabraClave FROM palabra_clave WHERE palabra LIKE '%${pclave}%'
      )
  )
  ORDER BY precio ${orden == 0 ? "ASC":"DESC"}`;
  } else if(idCategoria > 0 && pclave){
    console.log("sql 2");
    sql = `SELECT * FROM producto WHERE idProducto IN (
      SELECT producto_idProducto FROM palabra_clave_de_producto WHERE palabra_clave_idPalabraClave IN (
          SELECT idPalabraClave FROM palabra_clave WHERE palabra LIKE '%${pclave}%'
      )
  )
  AND categoria_idCategoria = ${idCategoria}
  ORDER BY precio ${orden == 0? "ASC":"DESC"}`;
  } else if(idCategoria > 0){
    console.log("sql 3");
    sql = `SELECT * FROM producto WHERE categoria_idCategoria = ${idCategoria}
    ORDER BY precio ${orden == 0? "ASC":"DESC"}`;
  } else {
    console.log("sql 4");
    sql = `SELECT * FROM producto ORDER BY precio ${orden == 0? "ASC":"DESC"}`;
  }
  let result = await db.Open(sql,[],false);
  Producto = [];

  result.rows.map(product => {
    let schema = {
      "id": product[0],
      "nombre": product[1],
      "descripcion": product[2],
      "precio": product[3],
      "categoria": product[8],
      "foto": product[9]
    }
    Producto.push(schema)
  })

  for (const p of Producto) {
    sql = `SELECT nombre FROM categoria WHERE idCategoria = ${p.categoria}`;
    let ncat = await db.Open(sql,[],false);
    ncat.rows.map(c =>{
      console.log(c[0])
      console.log(p.categoria = c[0])
    });

    var imageAsBase64 = fs.readFileSync(p.foto, 'base64');
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(p.foto)[1];  
    p.foto = `data:image/${ext};base64,${imageAsBase64}`
  }

  res.json(Producto)
})

//obtener palabras clave
router.get('/obtenerPalabrasClave', async (req,res) => {
  sql = 'SELECT * FROM palabra_clave';

  let result = await db.Open(sql,[],false);
  PClave = [];

  result.rows.map(product => {
    let schema = {
      "id":product[0],
      "palabra": product[1]
    }
    PClave.push(schema)
  })

  res.json(PClave)
})

module.exports = router;