"use strict";

var _require = require('express'),
    query = _require.query,
    response = _require.response;

var express = require('express');

var router = express.Router();

var db = require("../database");

var forge = require('node-forge');

var base64ImageToFile = require('base64image-to-file');

var fs = require('fs');

router.post('/getPicture', function _callee(req, res) {
  var imageAsBase64, re, ext, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          imageAsBase64 = fs.readFileSync(req.body.path, 'base64');
          re = /(?:\.([^.]+))?$/;
          ext = re.exec(req.body.path)[1];
          console.log(ext);
          response = {
            image: "data:image/".concat(ext, ";base64,").concat(imageAsBase64)
          };
          res.send(JSON.stringify(response));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/updateInfo', function _callee2(req, res) {
  var info, sql, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          info = req.body;
          sql = "UPDATE usuario SET nombre='".concat(info.name, "',apellido='").concat(info.lastname, "',pais_idPais=").concat(info.country, ",nacimiento=TO_DATE('").concat(info.date, "', 'DD/MM/YYYY') WHERE idUsuario=").concat(info.uid);
          _context2.next = 4;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 4:
          result = _context2.sent;
          console.log(result);
          res.send(true);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/changeUserPass', function _callee3(req, res) {
  var md, pass, email, sql, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.body);
          md = forge.md.sha256.create();
          md.update(req.body.password);
          pass = md.digest().toHex();
          email = req.body.username;
          console.log(email, pass); //buscar usuario con correo
          //modificarlo con nueva contraseña

          sql = "UPDATE usuario SET contrasena = '".concat(pass, "' WHERE correo = '").concat(email, "'");
          _context3.next = 9;
          return regeneratorRuntime.awrap(db.Open(sql, [], true));

        case 9:
          result = _context3.sent;
          console.log(result);
          res.send(true);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/changeUserPicture', function _callee4(req, res) {
  var response, uid, email, picture, picPath;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          response = {
            "mensaje": "OK"
          };
          uid = req.body.uid;
          email = req.body.email;
          picture = req.body.image;
          picPath = "uploads/".concat(email);
          base64ImageToFile(picture, picPath, 'profilePic', function (err, imgPath) {
            if (err) {
              console.log(err);
              response.mensaje = "ERROR, AL SUBIR FOTO";
              res.send(JSON.stringify(response));
              return;
            }

            sql = "UPDATE usuario SET foto = '".concat(imgPath, "' WHERE idUsuario = ").concat(uid);
            var result = db.Open(sql, [], true);
            console.log(result);
            response.mensaje = imgPath;
            res.send(JSON.stringify(response));
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;