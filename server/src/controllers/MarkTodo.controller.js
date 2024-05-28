import {validationResult} from "express-validator";
import { StatusCode } from "../utils/constant.js";
import { jsonGenerate } from "../utils/helper.js";
import Todo from "../models/Todo.js";

export const MarkTodo = async (req, res)=>{
    const error = validationResult(req);

    if (!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Todo id is required", error.mapped()))
    }
    try{
        const todo = await Todo.findOneAndUpdate({
            _id:req.body.todo_id,
            userId: req.userId,
        },[{
            $set:{
                isCompleted:{
                    $eq:[false, "$isCompleted"]
                }
            }
        }])

        if(todo){
            return res.json(jsonGenerate(StatusCode.SUCCESS, "Updated", todo))
        }
    } catch(error){
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not updated", null))

    }
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Todo is not present", null))
}

