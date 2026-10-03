// imports
const argon2 = require("argon2");
const userModel = require("../models/userModel");

const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        // user info validation
        if (!name || !username || !email || !password) {
            return res.status(400).json({
                message: "Bad request",
            });
        }

        // password hashing
        const hashed_pwd = await argon2.hash(password);

        // upserting user details into db
        const user = await userModel.create({
            name: name,
            username: username,
            email: email,
            password: hashed_pwd,
        });

        return res.status(201).json({
            message: "user created success",
            user: {
                name : user.name,
                username : user.username,
                email : user.email,
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "internal server error",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Bad request",
            });
        }
        // checking whether user exists or not
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }
        // pwd verification
        if (await argon2.verify(user.password, password)) {
            // jwt setup
            // attach token to cookie

            res.status(200).json({
                message: "login success",
            })
        } else {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "internal server error",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,

};
