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
    console.log('Fetching user info')
    var username =  ('%' + req.params.Username + '%')
    getConnection().query('SELECT * FROM user WHERE Username LIKE ?', [username], function(err, results, fields) {
        if (err) {
            console.log('Failed to find user profile' + err)
            res.end()
        }
        //Returns the results from the query in a JSON format
        res.json(results)
    })
})

//Inventory of each user
router.post('/inventory/:idUser', function(req, res) {
    console.log('Fetching inventory of the currently logged in user')
    getConnection().query('SELECT inventory.idUse, ingredients.* FROM inventory,ingredients WHERE inventory.idUse = ? AND ingredients.idIngredients = inventory.idIngredient', [req.params.idUser], function(err, results, fields) {
        if (err) {
            console.log('Failed to find user inventory')
            res.end()
        }
        else {
            console.log('Retrieved inventory')
            res.json(results)
        }
    })
})

router.post('/add_ingredient', function(req, res) {
    console.log('Saving Ingredient')
    getConnection().query('INSERT INTO inventory (idUse, inventory.idIngredient) VALUES (?, ?)', [req.body.idUser, req.body.idIngredient], function(err, results, fields) {
        if (err) {
            console.log('Failed to save ingredient' + err)
            res.send({'success': false})
            res.end()
        }
        else {
            console.log('Saved Successfully')
            res.send({'success': true})
        }
    })
})

router.post('/delete_ingredient', function(req, res) {
    console.log('Delete Ingredient')
    getConnection().query('DELETE FROM inventory WHERE idUse = ? AND idIngredient = ?', [req.body.idUser, req.body.idIngredient], function(err, results, fields) {
        if (err) {
            console.log('Failed to delete ingredient' + err)
            res.send({'success': false})
            res.end()
        }
        else {
            console.log('Deleted successfully')
            res.send({'success': true})
        }
    })
})

router.post('/save_recipe', function(req, res) {
    console.log('Saving Recipe')
    getConnection().query('INSERT INTO saved_recipes (idUser, saved_recipes.idRecipe) VALUES (?, ?)', [req.body.idUser, req.body.idRecipe], function(err, results, fields) {
        if (err) {
            console.log('Failed to save recipe' + err)
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
    console.log(idUser)
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

router.post('/alter_details', (req, res ) => {
    //Sends message to the console
    console.log("Editing details")
    //Creates constants of the different parameters taken from the register frontend
    var userID = req.body.userID
    var email_address = req.body.emailAddress
    var first_name = req.body.firstName
    var last_name = req.body.lastName
    var login_name = req.body.username
    var login_password = req.body.password
    var login_password2 = req.body.password2
    if (login_password == login_password2) {
        //This gets the connection and does an INSERT sql query to the selected database 
        getConnection().query("UPDATE user SET First_Name = ?, Surname = ?, Username = ?, User_Password = ?, Email_Address = ? WHERE idUser = ?", 
        [first_name, last_name, login_name, login_password, email_address, userID], (err, results, fields) => {
            //If we get an error we return this to the server 
            if (err) {
                console.log("Failed to change details" + err)
                return
            }
            //Otherwise we have added a user to the database
            console.log("User details changed")
            res.send({'success': true})
        })
    }
    else {
        console.log('Passwords dont match')
        res.send({'success': false})
    }
})

router.post('/delete_user', function(req, res) {
    console.log('Delete User')
    console.log(req.body.idUser)
    getConnection().query('DELETE FROM user, saved_recipes, inventory WHERE user.idUser = ?', [req.body.idUser], function(err, results, fields) {
        if (err) {
            console.log('Failed to delete user' + err)
            res.send({'success': false})
            res.end()
        }
        else {
            console.log('Deleted successfully')
            res.send({'success': true})
        }
    })
})