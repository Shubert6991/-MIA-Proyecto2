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

router.get('/getCategorias', function _callee(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sql = "SELECT * FROM categoria";
          _context.next = 3;
          return regeneratorRuntime.awrap(db.Open(sql, [], false));

        case 3:
          result = _context.sent;
          console.log(result);
          Categorias = [];
          result.rows.map(function (categoria) {
            var schema = {
              "id": categoria[0],
              "nombre": categoria[1]
            };
            Categorias.push(schema);
          });
          res.json(Categorias);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/admin/addCategoria', function _callee2(req, res) {
  var nombre, sqlVerification, verification, sqlInsertar, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.body); //obtener datos

          nombre = req.body.nombre.toLowerCase(); //verificar si ya existe la categoria

          sqlVerification = "SELECT * FROM categoria WHERE nombre = '".concat(nombre, "'");
          _context2.next = 5;
          return regeneratorRuntime.awrap(db.Open(sqlVerification, [], false));

        case 5:
          verification = _context2.sent;

          if (!(verification.rows.length > 0)) {
            _context2.next = 10;
            break;
          }

          res.send(false);
          _context2.next = 15;
          break;

        case 10:
          //insertar categoria
          sqlInsertar = "INSERT INTO categoria(nombre) VALUES ('".concat(nombre, "')");
          _context2.next = 13;
          return regeneratorRuntime.awrap(db.Open(sqlInsertar, [], true));

        case 13:
          result = _context2.sent;
          console.log(result);

        case 15:
          res.send(true);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;