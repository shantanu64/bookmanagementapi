const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10
    }, //Required
    title: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10
    },
    authors: {
        type: [Number],
        required: true,
    },
    
    language: String,

    pubDate: {
        type: String,
        required: true,
    },

    numOfPage: Number,

    category: [String],

    publication: {
        type: Number,
        required: true
    }
});

//  Create a Book Model

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;