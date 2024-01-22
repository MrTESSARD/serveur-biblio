const mongoose = require("mongoose") //mongoose


const livreShema = mongoose.Schema(//structurer les informations dans le BDD
        {
        _id: mongoose.Schema.Types.ObjectId,
        nom: String,
        auteur: {
          type: mongoose.Schema.Types.ObjectId,
          ref : "Auteur",//reference au model Auteur
          required: true
        },
        pages: Number,
        description: String,
        image: String
        },
        // { timestamps: true }//createdAt and updatedAt fields are automatically added to the schema.
      );

module.exports = mongoose.model("Livre", livreShema)