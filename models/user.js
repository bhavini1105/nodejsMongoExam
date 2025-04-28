const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username : String ,
    email : String,
    password: String,
    task : String,
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user"
    }

},{timestamps : true});

const User = mongoose.model("User",userSchema);

module.exports = User;