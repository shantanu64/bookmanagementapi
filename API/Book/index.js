// PREFIX :/book

// INITIALIZING EXPRESS ROUTER

const Router = require("express").Router();

// Database Models
const BookModel = require("../../database/book");

/*
Route           /books
Description     to get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/

Router.get("/allbooks", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});


/*
Route           /is
Description     to get specific book by ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/

Router.get("/is/:isbn", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

    if (!getSpecificBook) {
        return res.json({
            error: `NO BOOK FOUND FOR ISBN ${req.params.isbn}`
        });
    }
    return res.json({ book: getSpecificBook });
});


/*
Route           /c/:category
Description     to get specific book by category
Access          PUBLIC
Parameters      category
Method          GET
*/

Router.get("/c/:category", async (req, res) => {
    const getSpecificBooks = await BookModel.findOne({
        category: req.params.category
    });
    if (!getSpecificBooks) {
        return res.json({
            error: `NO BOOK FOUND FOR THE CATEGORY ${req.params.category}`
        });
    }

    return res.json({ books: getSpecificBooks });
});

/*
Route           /a/:authorId
Description     to get all books by author id
Access          PUBLIC
Parameters      authorid
Method          GET
*/

Router.get("/a/:authorid", async (req, res) => {
    const getBooksByAuthorId = await BookModel.findOne({
        authors: req.params.authorid
    });

    if (!getBooksByAuthorId) {
        return res.json({ error: `NO BOOKS FOUND FOR THE AUTHOR ${req.params.authorid}` });
    }

    return res.json({ books: getBooksByAuthorId });

});

/*
Route           /book/new
Description     to add new book
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post("/new", async (req, res) => {
    try {
        const { newBook } = req.body;

        const addNewBook = await BookModel.create(newBook);

        return res.json({ books: addNewBook, message: "Book was Added!" });
    }
    catch (error) {
        return res.json({ error: error.message });
    }
});

/*
Route           /book/update/
Description     to update book details (title)
Access          PUBLIC
Parameters      isbn
Method          PUT
*/

Router.put("/update/:isbn", async (req, res) => {

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle
        },
        {
            new: true
        }
    );

    res.json({ books: updatedBook });
});

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/

Router.delete("/delete/:isbn", async (req, res) => {

    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn,
        }
    );

    return res.json({ books: updatedBookDatabase });
});

/*
Route           /book/author/update/
Description     update/add author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/

Router.put("/author/update/:isbn", async (req, res) => {
    // update the book database

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                authors: req.body.newAuthor
            }
        },
        {
            new: true
        }
    );

    // update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );

    return res.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: "New Author was added"
    });

});

/*
Route           /book/delete/author
Description     delete a author from book
Access          PUBLIC
Parameters      isbn,authorId
Method          DELETE
*/

Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
    // update book database

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            $pull: {
                authors: parseInt(req.params.authorId)
            }
        },
        {
            new: true
        }
    );

    // update the author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(req.params.authorId)
        },
        {
            $pull: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );

    return res.json({
        message: "Author was deleted",
        book: updatedBook,
        author: updatedAuthor
    });
});

module.exports = Router;