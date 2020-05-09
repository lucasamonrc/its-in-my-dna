const express = require("express");
const path = require("path");
const cors = require("cors");

const routes = require("./src/routes");

const PORT = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.use(express.json());
//app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('./views/index.html'));


app.listen(PORT, () => `Server listening on ${PORT}`);
