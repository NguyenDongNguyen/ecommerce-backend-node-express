const express = require("express");
const dotnev = require("dotenv");
const { default: mongoose, connect } = require("mongoose");
dotnev.config();

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    return res.send("Hello world everyone");
});

mongoose
    .connect(
        `mongodb+srv://ndn030802:${process.env.MONGO_DB}@cluster0.escnmx6.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("Connect Db success!");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log("Server is running in port: ", +port);
});
