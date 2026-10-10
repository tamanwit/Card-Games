// imports
const argon2 = require("argon2");
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
};

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
        console.error(error);
        return res.status(500).json({
            error: error.message,
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
            const payload = {
                id : user._id
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn : '1d'})

            res.status(200).cookie("token", token, cookieOptions).json({
                message: "login success",
            })
        } else {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message,
            message: "internal server error",
        });
    }
};

const getProfile = async (req, res)=>{
    try{
        const id = req.user.id
        const user = userModel.findById(id)
        if(!user){
            return res.status(404).json({
                message : "User not found"
            })
        }
        
        return res.status(200).json({
            message : "success",
            userDetails : {
                name : user.name,
                email : user.email,
                username : user.username
            }
        })

    } catch(error){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    
};