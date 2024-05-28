import {validationResult} from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/constant.js";
import Todo from "../models/Todo.js"
import User from "../models/User.js"

export const createTodo = async (req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Todo is required", error.mapped()))
    }
    try {
        const result = await Todo.create({
            userId:req.userId,
            desc: req.body.desc, 
        })
        console.log(result)
        if (result){
            const user = await User.findOneAndUpdate({_id:req.userId},
               {
                $push: {todos:result}
               })
            return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo created successfully", result))   
        }
    } catch (error){
        return res.json(jsonGenerate(StatusCode.SUCCESS, "Something is wrong", error))   

    }
}