const mongoose = require("mongoose") //mongoose


const auteurShema = mongoose.Schema(//structurer les informations dans le BDd
        {
        _id: mongoose.Schema.Types.ObjectId,
        nom: String,
        prenom: String,
        age: Number,
        sexe: Boolean,
       
        },
        // { timestamps: true }//createdAt and updatedAt fields are automatically added to the schema.
      );
 auteurShema.virtual("livres",{
   ref:"Livre",//refference au model Livre
   localField:"_id",
   foreignField:"auteur"

 })

module.exports = mongoose.model("Auteur", auteurShema)