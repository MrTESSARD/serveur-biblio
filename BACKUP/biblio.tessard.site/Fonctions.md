npm init -y  // création du package
npm i express  // express "--save" -> fonctionnalité inutile à partir de la version npm 5.0.0

node server.js // lancer server.js

# nodemon
npm install --save-dev nodemon // modif prise en charge sans relancer le server
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"

## si il y a un problème de restriction de lancemen du script au niveau du Windows il faut 
Démarrer Windows Powershell, en tant qu’Administrateur
Taper la commande :
# set-executionpolicy unrestricted
Valider par « O »

nodemon start //lancer serveur nodemon
npm start / lancer server node sans relancement automatique

# morgan HTTP request logger middleware for node.js
permet d'idéntifier les différentes problèmatiques sur le serveur

npm i morgan 

# npm i twig

# mongoose
npm i mongoose

# parser
npm i body-parser

# express-session
npm i express-session

# multer
npm i multer

Multer est un middleware node.js pour la gestion multipart/form-data, qui est principalement utilisé pour télécharger des fichiers. Il est écrit au-dessus du busboy pour une efficacité maximale.

REMARQUE : Multer ne traitera aucun formulaire qui n'est pas en plusieurs parties ( multipart/form-data).

## mongoose
# .populate()
Appeler simplement la méthode populate sur la requête et un tableau de documents sera renvoyé à la place des s d'origine _id.

# .virtual()
Dans Mongoose, un virtuel est une propriété qui n'est pas stockée dans MongoDB. Les virtuels sont généralement utilisés pour les propriétés calculées sur les documents.

# enctype="multipart/form-data"
ne pas utiliser si pas de fichiers

# "$set"
pour la modification

# updateMany()
//modiffier toutes les livres ayant auteur à supprimer 
