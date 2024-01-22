const PORT = 3012
const express = require("express")//recupération
const { readFileSync } = require('fs');
const router = express()
const cors = require('cors')

const { createServer } = require('https');
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

router.use(cors())
// var app = express()
// app.set('trust proxy', 1) // trust first proxy
router.use(session({
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




router.use(express.static("public")) //indiquer le dossier public , libre d'accès
router.use(morgan("dev"))
router.use(bodyParser.urlencoded({extended:false}))

router.use((requete, reponse, suite)=>{
        reponse.locals.message = requete.session.message
        delete requete.session.message
        suite()

})

router.set('trust proxy', 1) // trust first proxy

router.use("/livres/", routerLivres)
router.use("/auteurs/", routerAuteur)
router.use("/", routerGlobal)


// Configuration des options HTTPS
const options = {
        key: readFileSync("certLetVPS/VPS_LC2/privkey.pem"),
        cert: readFileSync("certLetVPS/VPS_LC2/fullchain.pem"),
      };
      
      // Création du serveur HTTPS
      const server = createServer(options, router);
         
// Écoute sur le port 3012 en mode HTTPS
server.listen(PORT, () => {
        console.log(`Le serveur est en écoute sur le port ${PORT} en mode HTTPS.`);
        // mongoDBClient.initialize();
      });
