import {validationResult} from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const Login = async (req, res)=>{

    const errors = validationResult(req);
    if (errors.isEmpty()){
        const {email, password} = req.body;
        
        // Check user already present or not 
        const user = await User.findOne({email})
        if (!user){
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "User Not Present"))
        }

        // Verify password 
        const verified = bcrypt.compareSync(password, user.password)

        if (!verified){
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Incorrect Password"))
        }

        const token = Jwt.sign({userId:user._id}, JWT_TOKEN_SECRET);

        return res.json(jsonGenerate(StatusCode.SUCCESS,"Login successful", {userId:user._id, token:token}))


    }
    res.send(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation Error",errors.mapped()))

}
export default Login