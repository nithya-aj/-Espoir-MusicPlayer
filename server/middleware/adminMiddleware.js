const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    console.log(token, "it's the token");

    if (!token) return res.status(400).send("Access denied, no token available.");
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, validToken) => {
        if (err) {
            return res.status(400).send({ message: "invalid token" });
        } else {
            console.log(validToken, "is token here...");
            console.log(validToken.username,"is name presented in token?");
            if (!validToken.isAdmin)
                return res
                    .status(403)
                    .send({ message: "You don't have access to this content!" });
            req.user = validToken;
            next();
        }
    });
};