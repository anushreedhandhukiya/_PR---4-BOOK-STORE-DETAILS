const express = require("express");
const db = require("./db");
const booksdata = require("./schema");
const middleware = require("./books.middleware");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("welcome to the book store");
});

app.get("/books/book/:id", async (req, res) => {
    const { id } = req.params;
    const books = await booksdata.findById(id);

    if (books) {
        res.status(200).send(books);
    }
    else {
        res.status(404).send("Book not found");
    }
});

app.get("/books", async (req, res) => {
    const books = await booksdata.find(req.body);
    res.send(books);
});

app.post("/books/addbooks", middleware, async (req, res) => {
    const data = await booksdata.create(req.body);
    res.status(200).send(data);
});

app.delete("/books/delete/:id", async (req, res) => {
    const { id } = req.params;
    const updated = await booksdata.findByIdAndDelete(id);
    res.send(updated);
});

app.post("/", async (req, res) => {
    let data = await booksdata.create(req.body);
    res.send(data);
});

app.patch("/books/update/:id", async (req, res) => {
    const { id } = req.params;
    const data = await booksdata.findByIdAndUpdate(id, req.body);
    res.send(data);
});

app.get("/books/filter", async (req, res) => {
    const { author, category, title, sort } = req.query

    if (author) {
        const fill = await booksdata.find({ author: author })
        res.send(fill)
    }

    else if (category) {
        const fill = await booksdata.find({ category: category })
        res.send(fill)
    }

    else if (title) {
        const fill = await booksdata.find({ title: title})
        res.send(fill)
    }

    else if (sort == "lth") {
        const fill = await booksdata.find().sort({ price: 1 })
        res.send(fill)
    }

    else if (sort == "htl") {
        const fill = await booksdata.find().sort({ price: -1 })
        res.send(fill)
    }

})

app.listen(8090, () => {
    console.log("listing port 8090");
    db();
});
