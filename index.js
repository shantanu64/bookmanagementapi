require("dotenv").config();

// framework
const express = require("express");

const mongoose = require("mongoose");


const { parse } = require("dotenv");

// Microservices Routes

const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

// initializing
const bookapi = express();

// configurations
bookapi.use(express.json());

// Establish database connection mongodb
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true
    }).then(() => console.log("Connection Established!"));

// Initializing Microservices

bookapi.use("/book", Books);
bookapi.use("/author", Authors);
bookapi.use("/publication", Publications);


// listening port for server
bookapi.listen(3000, () => console.log("Server Running"));