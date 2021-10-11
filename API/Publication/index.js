// Prefix :/publication

// Initializing Express Router

const Router = require("express").Router();

// Database Models
const PublicationModel = require("../../database/publication");

/*
Route           /publication/allpublications
Description     to get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/

Router.get("/allpublications", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json({ publications: getAllPublications });
});

/*
Route           /publication/pubid/
Description     to get a specific publication
Access          PUBLIC
Parameters      id
Method          GET
*/

Router.get("/pubid/:id", async (req, res) => {
    const getPublicationById = await PublicationModel.findOne({
        id: req.params.id
    });
    if (!getPublicationById) {
        return res.json({ error: `NO PUBLICATION FOUND BY ID ${req.params.id}` });
    }

    return res.json({ publication: getPublicationById });
});

/*
Route           /publication/is/
Description     to get a specific publication
Access          PUBLIC
Parameters      isbn
Method          GET
*/

Router.get("/is/:isbn", async (req, res) => {
    const getPublicationByIsbn = await PublicationModel.findOne({
        books: req.params.isbn
    });

    if (!getPublicationByIsbn) {
        return res.json({ error: `NO PUBLICATION FOUND FOR BOOKS WITH ISBN ${req.params.isbn}` });

    }

    return res.json({ publications: getPublicationByIsbn });
});

/*
Route           /publication/new
Description     to add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/

Router.post("/new", (req, res) => {
    const { newPublication } = req.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json(
        { publications: addNewPublication, message: "Publication was Added" }
    );

});

/*
Route           /publication/name/update/
Description     update publication name by id
Access          PUBLIC
Parameters      id
Method          PUT
*/

Router.put("/name/update/:id", (req, res) => {
    database.publications.forEach((publication) => {
        if (publication.id === parseInt(req.params.id)) {
            publication.name = req.body.publicationName;
            return;
        }
    });

    return res.json({ publications: database.publications });
});

/*
Route           /publication/update/book
Description     update/add new book to publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/

Router.put("/update/book/:isbn", (req, res) => {

    // update publication database
    database.publications.forEach((publication) => {
        if (publication.id === req.body.pubId) {
            return publication.books.push(req.params.isbn);
        }
    });

    // update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json({
        book: database.books,
        publications: database.publications,
        message: "successfully updated publication"
    })
});

/*
Route           /publication/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/

Router.delete("/delete/book/:isbn/:pubId", (req, res) => {
    // update publication database
    database.publications.forEach(
        (publication) => {
            if (publication.id === parseInt(req.params.pubId)) {
                const newBooksList = publication.books.filter(
                    (book) => book !== req.params.isbn);
                publication.books = newBooksList;
                return;
            }
        });

    // update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = 0; //no publication available
            return;
        }
    });

    return res.json({ books: database.books, publication: database.publications });
});

/*
Route           /publication/delete
Description     delete a publication
Access          PUBLIC
Parameters      id
Method          DELETE
*/

Router.delete("/delete/:id", (req, res) => {
    const updatedPublicationDatabase = database.publications.filter(
        (publication) => publication.id !== parseInt(req.params.id)
    );

    database.publications = updatedPublicationDatabase;
    return res.json({ publications: database.publications });
});

module.exports = Router;
