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

var fs = require('fs'); //obtener todos los productos


router.get('/obtenerProductos', function _callee(req, res) {
  var result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, imageAsBase64, re, ext;

  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sql = 'SELECT * FROM producto';
          _context2.next = 3;
          return regeneratorRuntime.awrap(db.Open(sql, [], false));

        case 3:
          result = _context2.sent;
          Producto = [];
          result.rows.map(function (product) {
            var schema = {
              "id": product[0],
              "nombre": product[1],
              "descripcion": product[2],
              "precio": product[3],
              "categoria": product[8],
              "foto": product[9]
            };
            Producto.push(schema);
          });
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 9;

          _loop = function _loop() {
            var p, ncat;
            return regeneratorRuntime.async(function _loop$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    p = _step.value;
                    sql = "SELECT nombre FROM categoria WHERE idCategoria = ".concat(p.categoria);
                    _context.next = 4;
                    return regeneratorRuntime.awrap(db.Open(sql, [], false));

                  case 4:
                    ncat = _context.sent;
                    ncat.rows.map(function (c) {
                      console.log(c[0]);
                      console.log(p.categoria = c[0]);
                    });
                    imageAsBase64 = fs.readFileSync(p.foto, 'base64');
                    re = /(?:\.([^.]+))?$/;
                    ext = re.exec(p.foto)[1];
                    p.foto = "data:image/".concat(ext, ";base64,").concat(imageAsBase64);

                  case 10:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          _iterator = Producto[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 18;
            break;
          }

          _context2.next = 15;
          return regeneratorRuntime.awrap(_loop());

        case 15:
          _iteratorNormalCompletion = true;
          _context2.next = 12;
          break;

        case 18:
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](9);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 24:
          _context2.prev = 24;
          _context2.prev = 25;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 27:
          _context2.prev = 27;

          if (!_didIteratorError) {
            _context2.next = 30;
            break;
          }

          throw _iteratorError;

        case 30:
          return _context2.finish(27);

        case 31:
          return _context2.finish(24);

        case 32:
          res.json(Producto);

        case 33:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[9, 20, 24, 32], [25,, 27, 31]]);
}); //productos filtrados

router.post('/obtenerProductos', function _callee2(req, res) {
  var idCategoria, pclave, orden, result, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop2, _iterator2, _step2, imageAsBase64, re, ext;

  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log(req.body);
          idCategoria = req.body.categoria != "" ? +req.body.categoria : 0;
          pclave = req.body.clave != "" ? req.body.clave : null;
          orden = req.body.precio != "" ? +req.body.precio : 0;
          console.log(idCategoria, pclave, orden);

          if (idCategoria == 0 && pclave) {
            console.log("sql 1");
            sql = "SELECT * FROM producto WHERE idProducto IN (\n      SELECT producto_idProducto FROM palabra_clave_de_producto WHERE palabra_clave_idPalabraClave IN (\n          SELECT idPalabraClave FROM palabra_clave WHERE palabra LIKE '%".concat(pclave, "%'\n      )\n  )\n  ORDER BY precio ").concat(orden == 0 ? "ASC" : "DESC");
          } else if (idCategoria > 0 && pclave) {
            console.log("sql 2");
            sql = "SELECT * FROM producto WHERE idProducto IN (\n      SELECT producto_idProducto FROM palabra_clave_de_producto WHERE palabra_clave_idPalabraClave IN (\n          SELECT idPalabraClave FROM palabra_clave WHERE palabra LIKE '%".concat(pclave, "%'\n      )\n  )\n  AND categoria_idCategoria = ").concat(idCategoria, "\n  ORDER BY precio ").concat(orden == 0 ? "ASC" : "DESC");
          } else if (idCategoria > 0) {
            console.log("sql 3");
            sql = "SELECT * FROM producto WHERE categoria_idCategoria = ".concat(idCategoria, "\n    ORDER BY precio ").concat(orden == 0 ? "ASC" : "DESC");
          } else {
            console.log("sql 4");
            sql = "SELECT * FROM producto ORDER BY precio ".concat(orden == 0 ? "ASC" : "DESC");
          }

          _context4.next = 8;
          return regeneratorRuntime.awrap(db.Open(sql, [], false));

        case 8:
          result = _context4.sent;
          Producto = [];
          result.rows.map(function (product) {
            var schema = {
              "id": product[0],
              "nombre": product[1],
              "descripcion": product[2],
              "precio": product[3],
              "categoria": product[8],
              "foto": product[9]
            };
            Producto.push(schema);
          });
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context4.prev = 14;

          _loop2 = function _loop2() {
            var p, ncat;
            return regeneratorRuntime.async(function _loop2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    p = _step2.value;
                    sql = "SELECT nombre FROM categoria WHERE idCategoria = ".concat(p.categoria);
                    _context3.next = 4;
                    return regeneratorRuntime.awrap(db.Open(sql, [], false));

                  case 4:
                    ncat = _context3.sent;
                    ncat.rows.map(function (c) {
                      console.log(c[0]);
                      console.log(p.categoria = c[0]);
                    });
                    imageAsBase64 = fs.readFileSync(p.foto, 'base64');
                    re = /(?:\.([^.]+))?$/;
                    ext = re.exec(p.foto)[1];
                    p.foto = "data:image/".concat(ext, ";base64,").concat(imageAsBase64);

                  case 10:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          };

          _iterator2 = Producto[Symbol.iterator]();

        case 17:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context4.next = 23;
            break;
          }

          _context4.next = 20;
          return regeneratorRuntime.awrap(_loop2());

        case 20:
          _iteratorNormalCompletion2 = true;
          _context4.next = 17;
          break;

        case 23:
          _context4.next = 29;
          break;

        case 25:
          _context4.prev = 25;
          _context4.t0 = _context4["catch"](14);
          _didIteratorError2 = true;
          _iteratorError2 = _context4.t0;

        case 29:
          _context4.prev = 29;
          _context4.prev = 30;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 32:
          _context4.prev = 32;

          if (!_didIteratorError2) {
            _context4.next = 35;
            break;
          }

          throw _iteratorError2;

        case 35:
          return _context4.finish(32);

        case 36:
          return _context4.finish(29);

        case 37:
          res.json(Producto);

        case 38:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[14, 25, 29, 37], [30,, 32, 36]]);
}); //obtener palabras clave

router.get('/obtenerPalabrasClave', function _callee3(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          sql = 'SELECT * FROM palabra_clave';
          _context5.next = 3;
          return regeneratorRuntime.awrap(db.Open(sql, [], false));

        case 3:
          result = _context5.sent;
          PClave = [];
          result.rows.map(function (product) {
            var schema = {
              "id": product[0],
              "palabra": product[1]
            };
            PClave.push(schema);
          });
          res.json(PClave);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = router;