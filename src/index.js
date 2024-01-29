const express = require("express");
const dotnev = require("dotenv");
dotnev.config();

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    return res.send("Hello world everyone");
});

app.listen(port, () => {
    console.log("Server is running in port: ", +port);
});
