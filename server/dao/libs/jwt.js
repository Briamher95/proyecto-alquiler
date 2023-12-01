const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {

    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);   

            });
    })


}

module.exports = createAccessToken;