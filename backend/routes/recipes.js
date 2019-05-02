//Will handle all recipe related stuff
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

module.exports = router

const pool = mysql.createPool ({
    connectionLimit: 10,
    host: 'ciaronhowell.co.uk',
    user: 'groupproject',
    password: 'group45',
    database: 'yum'
})

function getConnection() {
    return pool   
}

router.post('/recipe/:idRecipe', function(req, res) {
    var idRecipe = req.body.idRecipe
    getConnection().query('SELECT * FROM recipe WHERE idRecipe = ?', [idRecipe], function(err, results, fields) {
        if (err) {
            console.log('Error when fetching the recipe with chosen ID' + err)
            res.end()
        }
        else {
            console.log('Fetching Recipe with ID' + idRecipe)
            res.json(results)
        }
    })
})

router.post('/recipesearch', function(req,res) {
    var searchText = ('%' + req.body.searchText + '%')
    getConnection().query('SELECT * FROM recipe WHERE Recipe_Name LIKE ?', [searchText], function(err, results, fields) {
        if (err) {
            console.log('Returning search for recipes' + err)
            res.end()
        }
        else {
            console.log('Fetching Recipes' + searchText)
            res.json(results)
        }
    })
})