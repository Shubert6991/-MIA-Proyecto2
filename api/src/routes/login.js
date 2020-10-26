const { query } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../database");

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

});

module.exports = router;