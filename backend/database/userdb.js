const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
const DBConnection = async ()=>{
    const MONGODB_URL = process.env.MONGODB_URI;
   // console.log(MONGODB_URL);
    try {
        await mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
        console.log("Connected to MongoDB");
    }catch(error){
        console.log("Error in connecting to MongoDB", error);
    }
};

module.exports = {DBConnection};