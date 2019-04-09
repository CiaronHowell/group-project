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
    host: 'localhost',
    user: 'root',
    password: 'OhHelloThere',
    database: 'yum-users'
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
    const firstName = req.body.f_name
    const lastName = req.body.l_name
    const loginName = req.body.username
    const loginPassword = req.body.password
    const emailAddress = req.body.email
    //This gets the connection and does an INSERT sql query to the selected database 
    getConnection().query("INSERT INTO user_details (f_name, l_name) VALUES (?, ?, ?, ?, ?)", [firstName, lastName, loginName, loginPassword, emailAddress], (err, results, fields) => {
        //If we get an error we return this to the server 
        if (err) {
            console.log("Failed to add new user")
            return
        }
        //Otherwise we have added a user to the database
        console.log("User added successfully")
        //Redirects the user to the login page
        res.redirect('/login') 
    })
})

//Login function used to check username and password
router.post('/login', function(req, res) {
    const login_name = req.body.username
    const login_password = req.body.password
    //Checks login and password are stored within the user details database
    if (login_name && login_password) {
        getConnection().query('SELECT * FROM user_details WHERE login_name = ? AND login_password = ?', [login_name, login_password], function(err, results, fields) {
            //If it finds one then we set the session of the user to logged in
            if (results.length > 0) {
                req.session.loggedin = true
                //Redirects them to the home page
                res.redirect('/home')
            }
            else {
                //Otherwise we query the admin table to see if an admin is logging in
                getConnection().query('SELECT * FROM admin_details WHERE login_name ? AND login_password = ?', [login_name, login_password], function(err, results, fields) {
                    //If it is found in the admin table we set them to logged in and also the admin attribute is set to true
                    if (results.length > 0) {
                        req.session.loggedin = true
                        req.session.admin = true
                        res.redirect('/home')
                    }
                    else {
                        //Otherwise we have an incorrect username or password
                        res.send('Incorrect username or password')
                        res.end()
                    }
                })
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
    req.session.loggedin = false
    //Allows them to view the home page if they are logged in
    if (req.session.loggedin) {
        res.send('Welcome to the Yum! app')
    }
    else {
        res.send('Login to view this page')
    }
    res.end()
})