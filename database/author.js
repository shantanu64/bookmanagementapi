const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 16
    },
    books: {
        type: [String],
        required: true
    }
});

const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;