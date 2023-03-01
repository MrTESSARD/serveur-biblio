const express = require("express")//recupération
const server = express() //lancement
const morgan = require("morgan") //morgan HTTP request logger middleware for node.js
const routerLivres = require("./routeurs/livres.routeur") 
const routerGlobal = require("./routeurs/global.routeur") 
const routerAuteur = require("./routeurs/auteurs.routeur") 
const mongoose = require("mongoose") //mongoose
const bodyParser = require("body-parser") //mongoose
const session = require("express-session") //mongoose




// var app = express()
// app.set('trust proxy', 1) // trust first proxy
server.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge:60000}
}))

mongoose.connect("mongodb://localhost/biblio",{
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


