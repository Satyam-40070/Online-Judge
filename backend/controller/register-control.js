import User from '../model/Users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register = async (req,res)=>{
    try{
        //get all data from req body
        const {fullname, username, email, password} = req.body;
        console.log(req.body);
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
        res.status(500).json({ message: "Internal server error" });
    }

}