//Will handle all recipe related stuff
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

module.exports = router

const pool = mysql.createPool ({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'OhHelloThere',
    database: 'yum-users'
})

function getConnection() {
    return pool   
}

router.get('/recipe/:idRecipe', function(req, res) {
    console.log('Fetching chosen recipe')
    getConnection().query('SELECT * FROM Recipe WHERE idRecipe = ?', [req.params.idrecipe], function(err, results, fields) {
        if (err) {
            console.log('Error when fetching the recipe with chosen ID')
            res.end()
        }
        else {
            res.json(rows)
        }
    })
})