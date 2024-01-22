var express = require("express")//recupération
var router = express.Router()
const twig = require("twig")//recupération


router.get("/",  (requete, reponse)=> {
    reponse.render("accueil.html.twig")
})

router.use((requete, reponse, suite) =>{//sur toutes les adresses => perte erreur 404
    const error = new Error("Page non trouvée")//création objet Error
   
    error.status = 404//status
    suite(error)
    // reponse.end("err")
})


router.use((error, requete, reponse)=>{//génération de l'erreur 404
    reponse.status(error.status || 500) //500 error server
    reponse.end(error.message)
})

module.exports = router