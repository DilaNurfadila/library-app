// Starting template
const express = require("express");
const bp = require("body-parser");
require("dotenv").config();
const mysql = require("mysql");

const port = process.env.PORT || 3000;
// const path = require("path");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: "",
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

const app = express();
// app.use(express.static(path.join(__dirname), "public"));
app.use(express.static("public"));
app.use(bp.urlencoded({ extended: false }));

app.set("views", __dirname + "/public");
app.set("view engine", "ejs");

// Get root (/)
// root = https://localhost:[port]
app.get("/", (req, res) => {
  // Menampilkan list
  db.query("select * from books", (err, rows) => {
    if (err) throw err;
    res.render("index.ejs", { books: rows });
  });
});

app.get("/addbook", (req, res) => {
  // Menampilkan list
  db.query("select * from books", (err, rows) => {
    if (err) throw err;
    res.render("addBook.ejs", { books: rows });
  });
});

app.post("/", (req, res) => {
  // Membuat data
  //   console.log(req.body);
  const { bookTitle, bookWriter, bookPublisher, publicationYear } = req.body;
  const sql = `insert into books values(NULL, '${bookTitle}', '${bookWriter}', '${bookPublisher}', '${publicationYear}')`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    // res.render("addBook.ejs");
    res.redirect("/");
  });
});

app.get("/:id/detailbook", (req, res) => {
  // Menampilkan detail
  const { id } = req.params;
  const sql = `select * from books where id=${id}`;
  // const kontak = dummyData.find((item) => item.id === parseInt(id));
  db.query(sql, (err, row) => {
    if (err) throw err;
    // console.log(row);

    const book = row[0];
    res.render("detailBook.ejs", { book });
  });
});

app.get("/:id/editbook", (req, res) => {
  // Mengubah data
  const { id } = req.params;
  const sql = `select * from books where id=${id}`;
  db.query(sql, (err, row) => {
    if (err) throw err;

    const book = row[0];
    res.render("editBook.ejs", { book });
  });
});

app.post("/:id/editbook", (req, res) => {
  // Menyimpan data
  const { id } = req.params;
  const { bookTitle, bookWriter, bookPublisher, publicationYear } = req.body;
  const sql = `update books set bookTitle='${bookTitle}', bookWriter='${bookWriter}', bookPublisher='${bookPublisher}', publicationYear='${publicationYear}' where id=${id}`;
  db.query(sql, (err, row) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/:id/delete", (req, res) => {
  // Menghapus data
  const { id } = req.params;
  const sql = `delete from books where id=${id}`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Listen and display message in console
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
