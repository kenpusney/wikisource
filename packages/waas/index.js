
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const github = require("./api/github")

const app = express();

const route = express.Router();

github(route);

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", route);

app.listen(3000);