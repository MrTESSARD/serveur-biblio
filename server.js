const express = require("express")//recupération
const server = express() //lancement
const morgan = require("morgan") //morgan HTTP request logger middleware for node.js
const routerLivres = require("./routeurs/livres.routeur") 
const routerGlobal = require("./routeurs/global.routeur") 
const routerAuteur = require("./routeurs/auteurs.routeur") 
const mongoose = require("mongoose") //mongoose
const bodyParser = require("body-parser") //mongoose
const session = require("express-session") //mongoose

require('dotenv').config()
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;


// var app = express()
// app.set('trust proxy', 1) // trust first proxy
server.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge:60000}
}))

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@biblio.88h4ztk.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

// mongoose.connect("mongodb://localhost/biblio",{//en local
mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
})




server.use(express.static("public")) //indiquer le dossier public , libre d'accès
server.use(morgan("dev"))
server.use(bodyParser.urlencoded({extended:false}))

server.use((requete, reponse, suite)=>{
        reponse.locals.message = requete.session.message
        delete requete.session.message
        suite()

})

server.set('trust proxy', 1) // trust first proxy

server.use("/livres/", routerLivres)
server.use("/auteurs/", routerAuteur)
server.use("/", routerGlobal)

server.listen(3000) //écoute sur port 


