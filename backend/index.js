const express= require('express');
const app= express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const {DBConnection} = require('./database/userdb.js');
const User = require("./model/Users.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());


DBConnection();

app.get('/', (req,res)=>{
    res.send('first server program');
})

app.post('/register', async (req,res)=>{
    try{
        //get all data from req body
        const {fullname, username, email, password} = req.body;
        //check if all data exists
        if(!(fullname && username && email && password)){
            return res.status(400).json({message: "Please fill all fields"});
        }
        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send("User already exists");
        }
        //encrypt the password
        const hashPassword = bcrypt.hashSync(password, 10);

        //save the user to the database
        const user = await User.create({
            fullname,
            username,
            email,
            password: hashPassword,
        });

        //generate a token for user and send it
        const token = jwt.sign({id:user._id , email}, process.env.SECRET_KEY,{
            expiresIn: '1d'
        });

        user.password = undefined;
        res.status(201).json({
            message: "You have successfully registered!",
            user,
            token
        })

    }catch(error){
        console.error(error);
    }
});

app.post('/login', async (req, res)=>{
    try{
        const {email, password} = req.body;
        if(!(email && password)){
            return res.status(400).json({message: "Please fill all fields"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send("User does not exist");
        }

        const enteredPassword = await bcrypt.compare(password, user.password);
        if(!enteredPassword){
            return res.status(401).send("Incorrect password");
        }
        
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;

        //store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, //only manipulate by server not by client/user
        };

        //send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });

    }catch(error){
        console.log(error.message);
    }
});

app.listen(8000, ()=>{
    console.log('server is running on port 8000');
});