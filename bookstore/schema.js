const mongoose = require("mongoose")
let bookschema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    publicationYear: Number,
    price: Number,
    quantity: Number,
    description: String,
    imageUrl: String,
}, { timestamps: true })
let booksdata = mongoose.model("books", bookschema)
module.exports = booksdata