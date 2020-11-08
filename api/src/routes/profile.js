const { query, response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../database");
const forge = require('node-forge');
var base64ImageToFile = require('base64image-to-file');
var fs = require('fs');

router.post('/getPicture', async(req,res) => {
  var imageAsBase64 = fs.readFileSync(req.body.path, 'base64');
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(req.body.path)[1];  
  console.log(ext);
  var response = {
    image: `data:image/${ext};base64,${imageAsBase64}`
  }
  res.send(JSON.stringify(response));
});

router.post('/updateInfo', async(req,res)=>{
  let info = req.body;
  let sql = `UPDATE usuario SET nombre='${info.name}',apellido='${info.lastname}',pais_idPais=${info.country},nacimiento=TO_DATE('${info.date}', 'DD/MM/YYYY') WHERE idUsuario=${info.uid}`
  let result = await db.Open(sql,[],true);
  console.log(result);
  res.send(true);
})

router.post('/changeUserPass',async(req,res) =>{
  console.log(req.body);
  var md = forge.md.sha256.create();
  md.update(req.body.password);
  let pass = md.digest().toHex();
  let email = req.body.username;
  console.log(email,pass);
  //buscar usuario con correo
  //modificarlo con nueva contraseña
  let sql = `UPDATE usuario SET contrasena = '${pass}' WHERE correo = '${email}'`;
  let result = await db.Open(sql,[],true);
  console.log(result);

  res.send(true);
});

router.post('/changeUserPicture',async(req,res) =>{
  let response = {"mensaje":"OK"};
  let uid = req.body.uid;
  let email = req.body.email;
  let picture = req.body.image;
  let picPath = `uploads/${email}`;
  base64ImageToFile(picture, picPath, 'profilePic', function(err, imgPath) {
    if(err) {
      console.log(err);
      response.mensaje = "ERROR, AL SUBIR FOTO";
      res.send(JSON.stringify(response));
      return;
    }
    sql = `UPDATE usuario SET foto = '${imgPath}' WHERE idUsuario = ${uid}`;
    let result = db.Open(sql,[],true);
    console.log(result);
    response.mensaje = imgPath;
    res.send(JSON.stringify(response));
  });
  
})

module.exports = router;