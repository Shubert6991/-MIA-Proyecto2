const { query, response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../database");
const forge = require('node-forge');
const e = require('express');
var base64ImageToFile = require('base64image-to-file');


router.post('/nuevoProducto',async (req,res) =>{
  console.log(req.body);
  //obtener datos
  //palabras clave
    //palabra
  //producto
    //nombre
    //descripcion
    //precio
    //cantidad
    //usuario_idUsuario
    //usuario_correo
    //usuario_pais_idPais
    //categoria_idCategoria
    //foto
  //palabas_clave_producto
    //producto_idProducto
    //producto_usuario_idUsuario
    //producto_usuario_correo
    //producto_usuario_pais_idPais
    //producto_categoria_idCategoria
    //palabra_clave_idPalabraClave
  res.send(true);
})


module.exports = router;