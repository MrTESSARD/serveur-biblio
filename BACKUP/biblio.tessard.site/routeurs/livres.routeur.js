var express = require("express")//recupération
var router = express.Router()
const twig = require("twig")//recupération




const livreController=require("../controllers/livre.controller");

//upload
const multer = require("multer")



      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/images/')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
        }
      })


const   fileFilter  =( req ,  file ,  cb )  =>{
if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        // Pour accepter le fichier, passez `true`, comme ceci : 
        cb ( null ,  true )}
        else{
                cb ( new  Error ( "Image ne pas acceptée !" ) )
        }
                // La fonction doit appeler `cb` avec un booléen 
                // pour indiquer si le fichier doit être accepté
              
                // Pour rejeter ce fichier, passez `false`, comme ceci : 
                cb ( null ,  false )
              
                
              
                // Vous pouvez toujours passer une erreur si quelque chose ne va pas : 
                
              
}
      
const  upload  =  multer ( {
        storage: storage,
        limits:{
                fieldSize:1024*1024*5
        },
        fileFilter: fileFilter
 } )



//affichezr toutes les livres trouvé dans BDD
router.get("/",livreController.livres_affichage)

//upload image
router.post("", upload.single("image"), livreController.livres_ajout)

//afficher le livre demandé par url
router.get("/:id",  livreController.livre_affichage)

//modification (formulaire)
router.get("/modification/:id",  livreController.livre_modification)

// modification livre
router.post("/modificationServer", livreController.livre_modification_validation)

// modification image
router.post("/updateImage", upload.single("image"), livreController.livre_modification_image)

//supprimer
router.post("/delete/:id",  livreController.livre_suppression)



module.exports = router