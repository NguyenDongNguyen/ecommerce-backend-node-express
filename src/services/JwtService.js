const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "30s" }
    );

    return access_token;
};

const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "365d" }
    );

    return refresh_token;
};

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, decoded) => {
                if (err) {
                    console.log(err);
                    resolve({
                        status: "ERROR",
                        message: "The authentication",
                    });
                }
                console.log(">> check decoded: ", decoded);
                const { payload } = decoded;
                const access_token = await genneralAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin,
                });
                console.log(">> access token: ", access_token);
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    access_token,
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService,
};
