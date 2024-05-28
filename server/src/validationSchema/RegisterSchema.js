import {check} from "express-validator"

export const RegisterSchema=[
    check('name', 'Name is required').exists().isLength({min:1, max:100}).trim(),
    check('password', 'Password atleast contain 6 characters').exists().isLength({min:6, max:100}).trim(),
    check('email', 'Email is required').exists().isEmail(),
]