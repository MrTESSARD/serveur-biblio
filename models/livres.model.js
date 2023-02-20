const mongoose = require("mongoose") //mongoose


const livreShema = mongoose.Schema(//structurer les informations dans le BDd
        {
        _id: mongoose.Schema.Types.ObjectId,
        nom: String,
        auteur: String,
        pages: Number,
        description: String,
        image: String
        },
        // { timestamps: true }//createdAt and updatedAt fields are automatically added to the schema.
      );

module.exports = mongoose.model("Livre", livreShema)