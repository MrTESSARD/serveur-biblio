const { default: mongoose } = require("mongoose")
const livreSchema = require("../models/livres.modele");
const auteurSchema = require("../models/auteurs.modele");
const fs = require("fs") //file system

//recuperation des livres
exports.livres_affichage = (requete, reponse) => {

    auteurSchema.find()
        .exec()
        .then(auteurs => {
            livreSchema.find()
                .populate("auteur")
                .exec()
                .then(livres => {
                    reponse.render("livres/liste.html.twig", {
                        livres,
                        auteurs,
                        message: reponse.locals.message
                    })//rendrer le fichier

                })
                .catch(error => {
                    console.log(error);
                    requete.session.message = {
                        type: 'danger',
                        contenu: error.message
                    }
                    reponse.redirect("/livres");
                })
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

exports.livres_ajout = (requete, reponse) => {
    const livre = new livreSchema({
        _id: new mongoose.Types.ObjectId(),
        nom: requete.body.titre,
        auteur: requete.body.auteur,
        pages: requete.body.pages,
        description: requete.body.description,
        image: requete.file.path.substring(14)

    })
    livre.save()
        .then(resultat => {
            console.log(resultat)
            reponse.redirect("/livres")
        })
        .catch(error => {
            console.log(error)
        })
}

exports.livre_affichage = (requete, reponse) => {
    livreSchema.findById(requete.params.id)
        .populate("auteur")//foreign key
        // console.log(requete.params.id)
        .exec()
        .then(livre => {
            reponse.render("livres/livre.html.twig", { livre, isModification: false })//rendrer le fichier
        })
        .catch(error => {
            console.log(error)
        })
}

exports.livre_modification = (requete, reponse) => {
    auteurSchema.find()
        .exec()//recuperation liste des auteurs
        .then(auteurs => {
            livreSchema.findById(requete.params.id)
            .populate("auteur")

                .exec()//recuperation liste des livres
                .then(livre => {
                    reponse.render("livres/livre.html.twig", {//on envoi la reponse
                        livre,
                        auteurs,
                        isModification: true
                    })//rendrer le fichier
                })
                .catch(error => {
                    console.log(error);
                    requete.session.message = {
                        type: 'danger',
                        contenu: error.message
                    }
                    reponse.redirect("/livres");
                })
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

exports.livre_modification_validation = (requete, reponse) => {
    // console.log("toto")
    const livreUpdate = {
        nom: requete.body.titre,
        auteur: requete.body.auteur,
        pages: requete.body.pages,
        description: requete.body.description
    }
    livreSchema.updateOne({ _id: requete.body.identifiant }, livreUpdate)
        .exec()
        .then(resultat => {
            if (resultat.modifiedCount < 1) { throw new Error('Requete de modification échouée') }
            requete.session.message = {
                type: 'success',
                contenu: 'Modification effectuée'
            }
            reponse.redirect("/livres");
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

exports.livre_modification_image = (requete, reponse) => {
    var livre = livreSchema.findById(requete.body.identifiant)
        .select("image")
        .exec()
        .then(livre => {
            fs.unlink("./public/images/" + livre.image, error => {
                console.log(error);
            })
            const livreUpdate = {
                image: requete.file.path.substring(14)
            }
            livreSchema.updateOne({ _id: requete.body.identifiant }, livreUpdate)
                .exec()
                .then(resultat => {
                    reponse.redirect("/livres/modification/" + requete.body.identifiant)
                })
                .catch(error => {
                    console.log(error);
                })
        });

}
exports.livre_suppression = (requete, reponse) => {
    var livre = livreSchema.findById(requete.params.id)
        .select("image")
        .exec()
        .then(livre => {
            fs.unlink("./public/images/" + livre.image, error => {//supprimer le fichier sur le serveur 
                console.log(error)
            })
            livreSchema.remove({ _id: requete.params.id })
                .exec()
                .then(resultat => {
                    requete.session.message = {
                        type: "success",
                        contenu: "Suppression effectué"
                    }
                    reponse.redirect("/livres")
                })
                .catch(error => {
                    console.log(error)
                })

        })
        .catch(error => {
            console.log(error)
        })
    console.log()

}