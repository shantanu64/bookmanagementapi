let books = [
    {
        ISBN: "12345ONE",
        title: "NodeJs",
        authors: [1],
        language: "EN",
        pubDate: "2021-07-07",
        numOfPage: "100",
        category: ["Fiction", "Programming", "Tech","webdev"],
        publication: 1
    },
    {
        ISBN: "12345TWO",
        title: "EXPRESSJs",
        authors: [2],
        language: "EN",
        pubDate: "2021-07-07",
        numOfPage: "100",
        category: ["Fiction", "Programming", "Tech","wp"],
        publication: 1
    }
];

const authors = [
    {
        id: 1,
        name: "shantanu",
        books: ["12345ONE"]
    },
    {
        id: 2,
        name: "isha",
        books: ["12345TWO"]
    }
];

const publications = [
    {
        id: 1,
        name:"Chakra",
        books:["12345ONE"]
    },
    {
        id: 2,
        name:"VSCODE",
        books:["12345TWO"]
    }
];

module.exports = {books, authors, publications};