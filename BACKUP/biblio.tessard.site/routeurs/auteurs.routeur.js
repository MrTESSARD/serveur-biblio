var express = require("express")//recupération
var router = express.Router()
const twig = require("twig")//recupération

const auteurController = require("../controllers/auteur.controller")
router.get("/:id", auteurController.auteur_affichage)
router.get("/", auteurController.auteurs_affichage)
router.post("/", auteurController.auteurs_ajout)
router.post("/delete/:id", auteurController.auteur_suppression)
router.get("/modification/:id", auteurController.auteur_modification)
router.post("/modificationServer/", auteurController.auteur_modification_validation)


module.exports = router
