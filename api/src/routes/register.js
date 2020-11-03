const { query, response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../database");
const forge = require('node-forge');

router.get('/getPaises', async(req,res) => {
  sql = "SELECT*FROM pais";

  let result = await db.Open(sql, [], false);
  Paises = [];

  result.rows.map(user => {
    let paisSchema = {
      "id": user[0],
      "nombre": user[1],
    }

    Paises.push(paisSchema);
  })

  res.json(Paises);
});

module.exports = router;