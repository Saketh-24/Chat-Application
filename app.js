const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`App running at ${PORT}`));
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
