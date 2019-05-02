//Will handle all user related stuff
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

//Profile for each individual user, we query the database then pull information regarding the user's id
router.get('/profile/:Username', function(req, res) {
    console.log("Fetching user with id: " + req.params.Username)
    getConnection().query('SELECT * FROM user WHERE Username = ?', [req.params.Username], function(err, results, fields) {
        if (err) {
            console.log('Failed to find user profile' + err)
            res.end()
        }
        //Returns the results from the query in a JSON format
        res.json(results)
    })
})

//Inventory of each user
router.get('/inventory/:user_id', function(req, res) {
    console.log('Fetching inventory of the currently logged in user')
    getConneciton.query('SELECT * FROM inventory WHERE user_id = ?', [req.params.users_id], function(err, results, fields) {
        if (err) {
            console.log('Failed to find user inventory')
            res.end()
        }
        else {
            res.json(results)
        }
    })
})

router.post('/save_recipe', function(req, res) {
    console.log('Saving Recipe')
    getConnection.query('INSERT INTO user (idUser, idRecipe) VALUES (?, ?)', [req.body.idUser, req.body.idRecipe], function(err, results, fields) {
        if (err) {
            console.log('Failed to insert save recipe')
            res.send({'success': false})
            res.end()
        }
        else {
            res.send({'success': true})
        }
    })
})

//Saved recipes of each user
router.post('/saved_recipes/:idUser', function(req, res) {
    var idUser = req.body.idUser
    console.log('Fetching saved recipes of the currently logged in user')
    getConnection().query('SELECT DISTINCT recipe.Recipe_Name, recipe.idRecipe FROM recipe JOIN saved_recipes ON recipe.idRecipe = saved_recipes.idRecipe JOIN user ON saved_recipes.idUser = user.idUser WHERE user.idUser = ?', [idUser], function(err, results, fields) {
        if (err) {
            console.log('Failed to pull save recipe'+ err)
            res.end()
        }
        else {
            console.log('Pulled recipes')
            res.json(results)
        }
    })
})