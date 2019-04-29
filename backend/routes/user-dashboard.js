//Will handle all user related stuff
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

//Profile for each individual user, we query the database then pull information regarding the user's id
router.get('/profile/:login_name', function(req, res) {
    console.log("Fetching user with id: " + req.params.user_id)
    getConnection().query('SELECT * FROM user_details WHERE login_name = ?', [req.params.login_name], function(err, results, fields) {
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

//Saved recipes of each user
router.get('/saved_recipes/:user_id', function(req, res) {
    console.log('Fetching saved recipes of the currently logged in user')
    getConnection.query('SELECT * FROM saved_recipes WHERE user_id = ?', [req.params.users_id], function(err, results, fields) {
        if (err) {
            console.log('Failed to find saved recipes for the user')
            res.end()
        }
        else {
            res.json(results)
        }
    })
})