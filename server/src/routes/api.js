import express from "express"
import Register from "../controllers/Register.controller.js";
import Login from "../controllers/Login.controller.js";
import { createTodo } from "../controllers/Todo.controller.js";
import { RegisterSchema} from "../validationSchema/RegisterSchema.js";
import { LoginSchema} from "../validationSchema/LoginSchema.js";
import {check} from "express-validator"
import { GetTodos } from "../controllers/TodoList.controller.js";
import { MarkTodo } from "../controllers/MarkTodo.controller.js";
import { RemoveTodo } from "../controllers/RemoveTodo.controller.js";

const apiRoute= express.Router()
export const apiProtected = express.Router()

apiRoute.post('/register',RegisterSchema, Register)
apiRoute.post('/login',LoginSchema,Login)

// Protected routes 
// Create 
apiProtected.post('/create-todo',[check("desc", "Todo desc is required").exists()], createTodo);
// Read 
apiProtected.get('/todolist', GetTodos);
// Update 
apiProtected.patch('/marktodo',[check("todo_id","Todo id is required").exists()], MarkTodo );
// Delete 
apiProtected.delete('/deletetodo',[check("todo_id","Todo id is required").exists()], RemoveTodo );


export default apiRoute;