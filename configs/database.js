const { default: mongoose } = require("mongoose");

require("dotenv").config();

const db = ()=>{
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("DataBase connected...");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = db;