const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./src/routes");

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));