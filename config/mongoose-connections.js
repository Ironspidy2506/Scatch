const mongoose = require('mongoose');
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
    .then(function () {
        dbgr("Mongoose Connected");
        // Jab tak environment set nai honge tab tak kuch bhi print nai hohga in the console because of this dbgr
    })
    .catch(function (err) { 
        dbgr(err);
    });

module.exports = mongoose.connection;