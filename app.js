// Starting template
const express = require("express");
const app = express();
const port = 3000;
// const path = require("path");

// app.use(express.static(path.join(__dirname), "public"));
app.use(express.static("public"));

// Get root (/)
// root = https://localhost:[port]
app.get("/", (req, res) => {
  // res.send("Hello World"); // This text will display on page
  res.get("index.html");
});

// Listen and display message in console
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
