// Will contain all login functionality
const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const session = require('express-session')

//Allows the router connection to this file
module.exports = router

//Using session module for loggedin and admin attributes
router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//Creates a pool connection to mySQL database
const pool = mysql.createPool ({
    connectionLimit: 10,
    host: 'ciaronhowell.co.uk',
    user: 'groupproject',
    password: 'group45',
    database: 'yum'
})

//Function to access the connection to the database
function getConnection() {
    return pool   
}

//Register function used to take details and store them in the DB, uses a post request to take data from the page 
router.post('/register', (req, res ) => {
    //Sends message to the console
    console.log("Creating a new user")
    //Creates constants of the different parameters taken from the register frontend
    var email_address = req.body.emailAddress
    var first_name = req.body.firstName
    var last_name = req.body.lastName
    var login_name = req.body.username
    var login_password = req.body.password
    var login_password2 = req.body.password2
    const is_admin = 0
    if (login_password == login_password2) {
        //This gets the connection and does an INSERT sql query to the selected database 
        getConnection().query("INSERT INTO user (Username, User_password, First_Name, Surname, isAdmin, Email_Address) VALUES (?, ?, ?, ?, ?, ?)", 
        [login_name, login_password, first_name, last_name, isAdmin, email_address], (err, results, fields) => {
            //If we get an error we return this to the server 
            if (err) {
                console.log("Failed to add new user" + err)
                return
            }
            //Otherwise we have added a user to the database
            console.log("User added successfully")
            res.send({'success': true})
        })
    }
    else {
        res.send({'success': false})
    }
})

//Login function used to check username and password
router.post('/login', function(req, res) {
    console.log("Attempting to log user in")
    var login_name = req.body.username
    var login_password = req.body.password
    //Checks login and password are stored within the user details database
    if (login_name && login_password) {
        getConnection().query('SELECT * FROM user WHERE Username = ? AND User_password = ?', [login_name, login_password], function(err, rows, fields) {
            //If it finds one then we set the session of the user to logged in
            if (rows.length > 0) {
                req.session.loggedin = true
                req.session.user = login_name
                if (rows[0].Is_Admin == 1) {
                    req.session.admin = true
                    res.send({'success': true, 'admin': true})
                }
                else {
                res.send({'success': true, 'admin': false})
                }
            }
            else {
                res.send({'success': false, 'admin': false})
            }
        })
    }
    else {
        //Waits for the user to enter their username and password
        res.send('Enter username or password')
        res.end()
    }
});

//Home page which only displays if user is logged in
router.get('/home', function(req, res) {
    //Allows them to view the home page if they are logged in
    if (req.session.loggedin) {
        res.send('Welcome to the Yum! app')
    }
    else {
        res.send('Login to view this page')
    }
    res.end()
})
