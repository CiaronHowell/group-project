// Will contain all login functionality
const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const session = require('express-session')

module.exports = router

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

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

//Register function used to take details and store them in the DB
router.post('/register', (req, res ) => {
    console.log("Creating a new user")
    const firstName = req.body.f_name
    const lastName = req.body.l_name
    const loginName = req.body.username
    const loginPassword = req.body.password
    const emailAddress = req.body.email

    getConnection().query("INSERT INTO user_details (f_name, l_name) VALUES (?, ?, ?, ?, ?)", [firstName, lastName, loginName, loginPassword, emailAddress], (err, results, fields) => {
        if (err) {
            console.log("Failed to add new user")
            res.sendStatus(500)
            return
        }
        console.log("User added successfully")
        res.end()
    })
})

//Login function used to check username and password
router.post('/login', function(req, res) {
    const login_name = req.body.username
    const login_password = req.body.password
    if (login_name && login_password) {
        getConnection().query('SELECT * FROM user_details WHERE login_name = ? AND login_password = ?', [login_name, login_password], function(err, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true
                res.redirect('/home')
            }
            else {
                res.send('Incorrect username or password')
            }
            res.end()
        })
    }
    else {
        res.send('Enter username or password')
        res.end()
    }
});

//Home page which only displays if user is logged in
router.get('/home', function(req, res) {
    req.session.loggedin = false
    if (req.session.loggedin) {
        res.send('Welcome to the Yum! app')
    }
    else {
        res.send('Login to view this page')
    }
    res.end()
})