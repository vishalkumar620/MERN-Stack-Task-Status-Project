import {validationResult} from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode, JWT_TOKEN_SECRET } from "../utils/constant.js";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const Register = async (req, res)=>{

    const errors=validationResult(req);

    if (errors.isEmpty()){
        const {name, password, email} = req.body;

        // Hashing the password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        
        // If user is already exists 
        const userExist = await User.findOne({email})

        if (userExist){
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Email already exists"))
        }


        
        // Saving to db 
        try{
            const result = await User.create({
                name: name,
                email: email,
                password: hashPassword,
                
            })

            const token = Jwt.sign({userId:result._id}, JWT_TOKEN_SECRET);


            return res.json(jsonGenerate(StatusCode.SUCCESS,"Registration successfull", {userId:result._id, token:token}))
        } catch (error) {
            console.log(error)
            return res.json(error)
        }

    }
    return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error", errors.mapped()))
}

export default Register