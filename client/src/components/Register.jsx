import React, { useEffect } from 'react'
import {useState} from "react";
import { register } from '../services/api';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './partials/Header'


function Register() {

    const [form, setForm] = useState({
        name:"",
        email:"",
        password:"",
    })

    const [errors, setErrors] = useState(null);

    const navigation = useNavigate();

    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(user){
            return navigation('/')
        }
    })

    const handleInputChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = async ()=>{
        const result = await register(form);
        if(result.status===200){
            if (result.data.status===201){
                setErrors(result.data.data);
                toast(result.data.message);
                return;

            }
            if (result.data.status===200){
                localStorage.setItem('user', JSON.stringify(result.data.data))
                navigation('/')
                return;
            }
            if (result.data.status===202){
                toast(result.data.message)
                return;
            }
        }else{
            toast('Something went wrong, please try again')
    
        }
    }


  return (
    <div>
        <Header/>
        <div className="container">
            <ToastContainer/>
            <div className="row justify-content-md-center mt-4">
                <div className="col-lg-5 card border-primary mb-3">
                    <div className="card-header h4 text-center">
                        Register An Account
                    </div>
                    <div className="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1" class="form-label mt-4">Name</label>
                      <input type="text" name="name" onChange={handleInputChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                      {
                        errors?.name && <small id="emailHelp" class="form-text text-danger">{errors.name.msg}</small>

                      }
                    
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1" class="form-label mt-4">Email</label>
                      <input type="email" name="email" onChange={handleInputChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
                    
                      {
                        errors?.email && <small id="emailHelp" class="form-text text-danger">{errors.email.msg}</small>

                      }
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1" class="form-label mt-4">Password</label>
                      <input type="password" name="password" onChange={handleInputChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Password" />
                      {
                        errors?.password && <small id="emailHelp" class="form-text text-danger">{errors.password.msg}</small>

                      }
                    </div>
                    <br />

                    
                    <button type="button" onClick={handleSubmit}  class="col-sm-6 center btn btn-outline-primary">Register Now</button>
                    
                    </div>

                </div>
            </div>
        </div>
     
    </div>
  )
}

export default Register
