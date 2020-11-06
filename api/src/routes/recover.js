const { query, response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../database");
const forge = require('node-forge');
const e = require('express');
const nodemailer = require("nodemailer");

router.post('/recoverPass',async(req,res) =>{
  let buff = Buffer.from(req.body.email, 'base64');  
  let email = buff.toString('utf-8');
  let route = `http://localhost:4200/recoverpass/${req.body.email}`;

  let message = `Link para reestablecer la contraseña: ${route}`;

  let transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '3010190100101@ingenieria.usac.edu.gt',
      pass: 'E95FD18791CCA71D47FEA38404BA20769730',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Admin <3010190100101@ingenieria.usac.edu.gt>', // sender address
    to: `Usuario <${email}>`, // list of receivers
    subject: "Pasword Recovery", // Subject line
    text: message, // plain text body
    html: "", // html body
  });

  console.log("Message sent: %s", info.messageId);
  res.send(true);
});

router.post('/changePass',async(req,res) =>{
  var md = forge.md.sha256.create();
  md.update(req.body.pass1);
  let pass = md.digest().toHex();
  let email = req.body.email;
  console.log(email,pass);
  //buscar usuario con correo
  //modificarlo con nueva contraseña
  let sql = `UPDATE usuario SET contrasena = '${pass}' WHERE correo = '${email}'`;
  let result = await db.Open(sql,[],true);
  console.log(result);

  res.send(true);
});

module.exports = router;