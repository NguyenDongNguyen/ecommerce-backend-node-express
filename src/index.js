const express = require("express");
const dotnev = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");

dotnev.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

routes(app);

mongoose
    .connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log("Connect Db success!");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log("Server is running in port: ", +port);
});
