const {Schema}=require("mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
});
module.exports={UserSchema};