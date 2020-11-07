const { query, response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../database");
const forge = require('node-forge');
const e = require('express');
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

module.exports = router;