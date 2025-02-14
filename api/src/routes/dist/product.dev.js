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
  var pclaves, nombre, descripcion, precio, cantidad, idUsuario, correo, idPais, idCategoria, foto, verification, _insert, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, palabra, _verification, _insert2, insert, consulta, lid, result, idpc, rel, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _palabra, _result, _idpc, _rel, picture, picPath;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body); //obtener datos

          pclaves = req.body.claves.split(',');
          nombre = req.body.nombre;
          descripcion = req.body.description;
          precio = req.body.precio;
          cantidad = req.body.cantidad;
          idUsuario = req.body.idUsuario;
          correo = req.body.correo;
          idPais = req.body.pais;
          idCategoria = req.body.categoria;
          foto = req.body.picture; // console.log(pclaves);
          // console.log(nombre);
          // console.log(descripcion);
          // console.log(precio);
          // console.log(cantidad);
          // console.log(idUsuario);
          // console.log(correo);
          // console.log(idPais);
          // console.log(idCategoria);
          // console.log(foto);
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
          // var sql;
          //insertar palabras clave
          // nombre tambien es palabra clave

          sql = "SELECT * FROM palabra_clave WHERE palabra = '".concat(nombre.toLowerCase(), "'");
          _context.next = 14;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 14:
          verification = _context.sent;

          if (!(verification.rows.length <= 0)) {
            _context.next = 21;
            break;
          }

          sql = "INSERT INTO palabra_clave(palabra) VALUES ('".concat(nombre.toLowerCase(), "')");
          _context.next = 19;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 19:
          _insert = _context.sent;
          console.log("insertando palablas clave", _insert);

        case 21:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 24;
          _iterator = pclaves[Symbol.iterator]();

        case 26:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 41;
            break;
          }

          palabra = _step.value;
          sql = "SELECT * FROM palabra_clave WHERE palabra = '".concat(palabra.toLowerCase(), "'");
          _context.next = 31;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 31:
          _verification = _context.sent;

          if (!(_verification.rows.length <= 0)) {
            _context.next = 38;
            break;
          }

          sql = "INSERT INTO palabra_clave(palabra) VALUES ('".concat(palabra.toLowerCase(), "')");
          _context.next = 36;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 36:
          _insert2 = _context.sent;
          console.log("insertando palabras clave", _insert2);

        case 38:
          _iteratorNormalCompletion = true;
          _context.next = 26;
          break;

        case 41:
          _context.next = 47;
          break;

        case 43:
          _context.prev = 43;
          _context.t0 = _context["catch"](24);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 47:
          _context.prev = 47;
          _context.prev = 48;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 50:
          _context.prev = 50;

          if (!_didIteratorError) {
            _context.next = 53;
            break;
          }

          throw _iteratorError;

        case 53:
          return _context.finish(50);

        case 54:
          return _context.finish(47);

        case 55:
          //insertar producto
          sql = "INSERT INTO producto(nombre,descripcion,precio,cantidad,usuario_idUsuario,usuario_correo,usuario_pais_idPais,categoria_idCategoria,foto) VALUES ('".concat(nombre, "','").concat(descripcion, "',").concat(precio, ",").concat(cantidad, ",").concat(idUsuario, ",'").concat(correo, "',").concat(idPais, ",").concat(idCategoria, ",'uploads/common/np.png')");
          _context.next = 58;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 58:
          insert = _context.sent;
          console.log("insertando producto", insert); //obtener id de ultimo producto

          sql = "SELECT idProducto FROM producto ORDER BY idProducto DESC FETCH FIRST 1 ROWS ONLY";
          _context.next = 63;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 63:
          consulta = _context.sent;
          lid = consulta.rows.map(function (campo) {
            return campo[0];
          }); //relacionar productos y palabras clave

          sql = "SELECT idPalabraClave FROM palabra_clave WHERE palabra = '".concat(nombre.toLowerCase(), "'");
          _context.next = 68;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 68:
          result = _context.sent;
          idpc = result.rows.map(function (campo) {
            return campo[0];
          });
          sql = "INSERT INTO palabra_clave_de_producto(producto_idProducto,producto_usuario_idUsuario,producto_usuario_correo,producto_usuario_pais_idPais,producto_categoria_idCategoria,palabra_clave_idPalabraClave) VALUES(".concat(lid, ",").concat(idUsuario, ",'").concat(correo, "',").concat(idPais, ",").concat(idCategoria, ",").concat(idpc, ")");
          _context.next = 73;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 73:
          rel = _context.sent;
          console.log("relacionando productos pclave nombre", rel);
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 78;
          _iterator2 = pclaves[Symbol.iterator]();

        case 80:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context.next = 95;
            break;
          }

          _palabra = _step2.value;
          sql = "SELECT idPalabraClave FROM palabra_clave WHERE palabra = '".concat(_palabra.toLowerCase(), "'");
          _context.next = 85;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 85:
          _result = _context.sent;
          _idpc = _result.rows.map(function (campo) {
            return campo[0];
          });
          sql = "INSERT INTO palabra_clave_de_producto(producto_idProducto,producto_usuario_idUsuario,producto_usuario_correo,producto_usuario_pais_idPais,producto_categoria_idCategoria,palabra_clave_idPalabraClave) VALUES(".concat(lid, ",").concat(idUsuario, ",'").concat(correo, "',").concat(idPais, ",").concat(idCategoria, ",").concat(_idpc, ")");
          _context.next = 90;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 90:
          _rel = _context.sent;
          console.log("relacionando productos con pclaves", _rel);

        case 92:
          _iteratorNormalCompletion2 = true;
          _context.next = 80;
          break;

        case 95:
          _context.next = 101;
          break;

        case 97:
          _context.prev = 97;
          _context.t1 = _context["catch"](78);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t1;

        case 101:
          _context.prev = 101;
          _context.prev = 102;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 104:
          _context.prev = 104;

          if (!_didIteratorError2) {
            _context.next = 107;
            break;
          }

          throw _iteratorError2;

        case 107:
          return _context.finish(104);

        case 108:
          return _context.finish(101);

        case 109:
          //subir foto
          picture = foto ? foto : "data:image/png;base64,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";
          console.log(picture);
          picPath = "uploads/".concat(correo, "/product_").concat(lid);
          base64ImageToFile(picture, picPath, 'ProductoPic', function (err, imgPath) {
            if (err) {
              console.log(err);
              res.send(false);
              return;
            } //alterar producto para insertar imagen


            console.log("subiendo la imagen");
            sql = "UPDATE producto SET foto = '".concat(imgPath, "' WHERE idProducto = ").concat(lid);
            var result = db.Open(sql, [], true);
            console.log(result);
          });
          res.send(true);

        case 114:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[24, 43, 47, 55], [48,, 50, 54], [78, 97, 101, 109], [102,, 104, 108]]);
});
module.exports = router;