const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
    console.log(">> check token: ", req.headers.token);
    const token = req.headers.token.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(404).json({
                message: "The authentication",
                status: "ERROR",
            });
        }
        const { payload } = decoded;
        if (payload?.isAdmin) {
            next();
        } else {
            return res.status(404).json({
                message: "The authentication",
                status: "ERROR",
            });
        }
    });
};

module.exports = {
    authMiddleWare,
};
