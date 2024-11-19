const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;
        // Problem 1: Koi field agar nai aaya to bhi account ban jaa raha hai
        let user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(401).send("You already have an account! Please login")
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.send(err.message);
                } else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname // Problem 2: Koi field agar upar se nai aa rahi thi par yaha uss field ki jarurat hai yaha par to fir ye server crash ho jaayega
                    });

                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("User Created Successfully")
                }
            })
        });

    } catch (err) {
        console.log(err.message);
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(401).send("Email or Password Incorrect");
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.send("You can login");
            } else {
                return res.status(401).send("Email or Password Incorrect");
            }
        })
    } catch (err) {
        console.log(err.message);
    }
};