const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {

    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, //dato que quiero guardar dentro del token.
            process.env.JWT_SECRET,
            { expiresIn: "1d" }, // tiempo de expiracion del token.
            (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);   

            });
    })


}

module.exports = createAccessToken;