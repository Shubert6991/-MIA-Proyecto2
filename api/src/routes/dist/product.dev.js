"use strict";

var _require = require('express'),
    query = _require.query,
    response = _require.response;

var express = require('express');

var router = express.Router();

var db = require("../database");

var forge = require('node-forge');

var e = require('express');

var base64ImageToFile = require('base64image-to-file');

router.post('/nuevoProducto', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body); //obtener datos
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

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;