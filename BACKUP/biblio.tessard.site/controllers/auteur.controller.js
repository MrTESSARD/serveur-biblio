const { fsync } = require("fs");
const { default: mongoose } = require("mongoose");
const auteurSchema = require("../models/auteurs.modele");
const livreSchema = require("../models/livres.modele");


exports.auteur_affichage = (requete, reponse) => {
    auteurSchema.findById(requete.params.id)
        .populate("livres")//virtuale &avec un tableau des livres en plus des auteurs
        .exec()
        .then(auteur => {
            // console.log(auteur)
            reponse.render("auteurs/auteur.html.twig", { auteur, isModification:false })
        })
        .catch(error => {
            console.log(error);
            requete.session.message = {
                type: 'danger',
                contenu: error.message
            }
        })
}


exports.auteurs_affichage = (requete, reponse) => {
    auteurSchema.find()
        .populate("livres")//virtuale avec un tableau des livres en plus des auteurs
        .exec()
        .then(auteurs => {
            // console.log(auteur)
            reponse.render("auteurs/liste.html.twig", { auteurs })//envoie de données dans liste.html.twig
        })
        .catch(error => {
            console.log(error);
            requete.session.message = {
                type: 'danger',
                contenu: error.message
            }
        })
}

//ajout auteur
exports.auteurs_ajout = (requete, reponse) => {
    const auteur = new auteurSchema({
        _id: new mongoose.Types.ObjectId(),
        nom: requete.body.nom,
        prenom: requete.body.prenom,
        age: requete.body.age,
        sexe: (requete.body.sexe) ? true : false,
    })
    auteur.save()
        .then(resultat => {
            reponse.redirect("/auteurs");
        })
        .catch(error => {
            console.log(error);
        })
}
//suppression auteur
exports.auteur_suppression = (requete, reponse) => {
    auteurSchema.find()
        .where("nom").equals("anonyme")
        .exec()
        .then(auteur => {

            livreSchema.updateMany({//modiffier toutes les livres ayant auteur à supprimer 
                "auteur": requete.params.id
            }, {
                "$set": {
                    "auteur": auteur[0]._id//quelle est la nouvelle valeur à ajouter
                }
            }, { "multi": true })
            .exec()
            .then(
                auteurSchema.remove({_id:requete.params.id})
                .where("nom").ne("anonyme")
                .exec()
                .then(
                    reponse.redirect("/auteurs")
                )
                .catch(error => {
                    console.log(error);
                })
            )

        })
}
//modificateur auteur
exports.auteur_modification = (requete, reponse) => {
    auteurSchema.findById(requete.params.id)
        .populate("livres")//virtuale &avec un tableau des livres en plus des auteurs
        .exec()
        .then(auteur => {
            // console.log(auteur)
            reponse.render("auteurs/auteur.html.twig", { auteur, isModification:true })
        })
        .catch(error => {
            console.log(error);
            requete.session.message = {
                type: 'danger',
                contenu: error.message
            }
        })
}
//modificateur validation auteur
exports.auteur_modification_validation = (requete, reponse) => {
    const auteurUpdate = new auteurSchema({
        nom: requete.body.nom,
        prenom: requete.body.prenom,
        age: requete.body.age,
        sexe: (requete.body.sexe) ? true : false,
    })
    
    auteurSchema.updateOne({ _id: requete.body.identifiant }, auteurUpdate)
        .exec()
        .then(resultat => {
            
            reponse.redirect("/auteurs");
        })
        .catch(error => {
            console.log(error);
            requete.session.message = {
                type: 'danger',
                contenu: error.message
            }
            reponse.redirect("/livres");
        })
}


