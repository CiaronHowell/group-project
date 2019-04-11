//Load our app server using express
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended :false}))

const loginRouter = require('./routes/login.js')
const dashboardRouter = require('./routes/user-dashboard.js')
const recipeRouter = require('./routes/recipes.js')

//Uses the different routers to each of the .js files
app.use(loginRouter)
app.use(dashboardRouter)
app.use(recipeRouter)

// localhost:3001
app.listen(3001, () => {
    console.log("Server is running and listening on 3001")
})