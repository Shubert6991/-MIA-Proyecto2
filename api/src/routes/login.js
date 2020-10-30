const { query, response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../database");
const forge = require('node-forge');

router.get('/getUsuarios', async(req,res) => {
  sql = "SELECT*FROM usuario";

  let result = await db.Open(sql, [], false);
  Users = [];

  result.rows.map(user => {
    let userSchema = {
      "id": user[0],
      "correo": user[1],
      "nombre": user[2],
      "apellido": user[3],
      "pass": user[4],
      "nacimiento": user[5],
      "foto": user[6],
      "creditos": user[7],
      "tipo": user[8],
      "pais": user[9],
    }

    Users.push(userSchema);
  })

  res.json(Users);
});

router.post('/login', async(req,res) => {
    //obtener datos de usuario
    let correo = req.body.username;
    var md = forge.md.sha256.create();
    md.update(req.body.password);
    let pass = md.digest().toHex();

    //obtener usuario
    sql = `SELECT*FROM usuario WHERE correo = '${correo}'`;

    let result = await db.Open(sql, [], false);
    Users = [];
    //verificar contraseña
    let userSchema = {};
    result.rows.map(user => {
      userSchema = {
        "id": user[0],
        "correo": user[1],
        "nombre": user[2],
        "apellido": user[3],
        "pass": user[4],
        "nacimiento": user[5],
        "foto": user[6],
        "creditos": user[7],
        "tipo": user[8],
        "pais": user[9],
      }
    })
    let usuario = {}
    if(pass === userSchema.pass){
      console.log("si se puede loguear");
      //crear token
      var header = {
        "alg": "HS256",
        "typ": "JWT"
      };
      
      var stringifiedHeader = forge.util.encodeUtf8(JSON.stringify(header));
      var encodedHeader = forge.util.encode64(stringifiedHeader);
      
      var data = {
        "id": 1337,
        "username": "john.doe"
      };
      
      var stringifiedData = forge.util.encodeUtf8(JSON.stringify(data));
      var encodedData = forge.util.encode64(stringifiedData);
      
      var token = encodedHeader + "." + encodedData;

      var secret = "Clave para el token";

      var signature = forge.md.sha256.create();
      signature.update(token);
      signature.update(secret);
      signature = forge.util.encode64(signature.digest().toHex());

      var signedToken = token + "." + signature;

      
      usuario = {
        "mensaje": "Exito",
        "token": signedToken,
        "userId": userSchema.id,
        "correo": userSchema.correo,
        "nombre": userSchema.nombre,
        "apellido": userSchema.apellido,
        "nacimiento": userSchema.nacimiento,
        "pathProfilePic": userSchema.foto,
        "credits": userSchema.creditos,
        "tipo": userSchema.tipo,
        "idPais": userSchema.pais
      }
    } else {
      console.log("no se puede loguear");
      usuario = {
        "mensaje": "Error",
        "token": "",
        "userId": 0,
        "correo": "",
        "nombre": "",
        "apellido": "",
        "nacimiento": "",
        "pathProfilePic": "",
        "credits": 0,
        "tipo": 0,
        "idPais":0
      }
    }    

    res.send(JSON.stringify(usuario));
});

module.exports = router;