import {check} from "express-validator"

export const LoginSchema=[
    check('email', 'Invalid email').exists().isEmail(),
    check('password', 'Password is required').exists().isLength({min:1, max:100}).trim(),
]