const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./contact_database');
var PUERTO = 5000;

app.use(cors());
app.use(express.json())
/**
 * configuracion para analizar las solicitudes HTTPentrantes con cargas utiles codificadas medinate URL
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contancto_db";
    db.query(sqlGet, (err, result) => {
        res.send(result)
    })
})
app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert = "INSERT INTO contancto_db (name,email,contact) VALUES (?,?,?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            console.log(error)
        }
    })
})
app.delete("/api/remove/:id", (req, res) => {
    const id = req.params.id;
    console.log(`Esto es el id ${id}`);
    const sqlRemove = "DELETE FROM contancto_db WHERE id=?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error)
        }
    })
})
app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM contancto_db WHERE id=?";
    db.query(sqlGet, id, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    const sqlUpdate = "UPDATE contancto_db SET name = ?,email = ?,contact = ? WHERE id=?";
    db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
    //   const sqlInsert = "INSERT INTO contancto_db (name,email,contact) VALUES ('john', 'john@gmail.com',1557815)";
    //  db.query(sqlInsert, (err, result) => {
    //       console.log("error", err);
    //        console.log("resultado", result);
    //        res.send("Hola express");
    //    })

})
app.listen(PUERTO, () => {
    console.log(`Aplicacion escuchando en el Puerto ${PUERTO}`);
})