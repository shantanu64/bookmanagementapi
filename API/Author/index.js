// Prefix :/author

// Initializing Express Router
const Router = require("express").Router();

// Database models

const AuthorModel = require("../../database/author");

/*
Route           /authors/allauthors
Description     to get all authors
Access          PUBLIC
Parameters      none
Method          GET
*/

Router.get("/allauthors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors });
});

/*
Route           /author/au/auname
Description     to get specific author
Access          PUBLIC
Parameters      name
Method          GET
*/

Router.get("/au/:auname", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({
        name: req.params.auname
    });

    if (!getSpecificAuthor) {
        return res.json({
            error: `NO BOOK FOUND BY AUTHOR ${req.params.auname}`
        });
    }

    return res.json({ authors: getSpecificAuthor });
});

/*
Route           /author/is/
Description     to get author by specific book isbn
Access          PUBLIC
Parameters      isbn
Method          GET
*/

Router.get("/is/:isbn", async (req, res) => {
    const getAuthorByISBN = await AuthorModel.findOne({
        books: req.params.isbn
    });
    if (!getAuthorByISBN) {
        return res.json(
            { error: `NO AUTHOR FOUND FOR BOOK'S ISBN ${req.params.isbn}` });
    }
    return res.json({ authors: getAuthorByISBN });
});

/*
Route           /author/new
Description     to add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/

Router.post("/new", (req, res) => {
    const { newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json(
        { authors: addNewAuthor, message: "Author was Added" }
    );

});

/*
Route           /author/updatename/
Description     update author name by id
Access          PUBLIC
Parameters      id
Method          PUT
*/

Router.put("/updatename/:id", (req, res) => {
    database.authors.forEach((author) => {
        if (author.id === parseInt(req.params.id)) {
            author.name = req.body.authorName;
            return;
        }
    });

    return res.json({ authors: database.authors });
});

/*
Route           /author/delete
Description     delete a author from book
Access          PUBLIC
Parameters      id
Method          DELETE
*/

Router.delete("/delete/:id", (req, res) => {
    const updatedAuthorDatabase = database.authors.filter(
        (author) => author.id !== parseInt(req.params.id)
    );

    database.authors = updatedAuthorDatabase;
    return res.json({ authors: database.authors });
});

module.exports = Router;
