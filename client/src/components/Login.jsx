import React, { useEffect, useState } from 'react'
import { login } from '../services/api';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './partials/Header'


function Login({}) {
    const navigation = useNavigate();

    const [form,setForm] = useState({
        email: "",
        password: "",
    })

    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(user){
            return navigation('/')
        }
    })

    

    const [errors, setErrors] = useState(null);

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    };

    const handleSubmit= async ()=>{
        const result = await login(form);
        console.log("form", result);
        setErrors(null)
        if(result.status==200){
            if (result.data.status===200){
                localStorage.setItem('user', JSON.stringify(result.data.data))
                navigation("/");
                return;

            }
            if(result.data.status ===201){
                setErrors(result.data.data)
                return;
            }

            if (result.data.status ===202){
                toast(result.data.message);
                return;
            }
        }


    }


  return (
    <>
    <Header/>
    <div className="container">
        <ToastContainer />
        <div className='row justify-content-center mt-4'>
            <div className="col-lg-5 card border-primary mt-4">
            
                <div className="card-body">
                  <h4 className="card-title">Login Now</h4>
                  <div class="form-group">
                      <label for="exampleInputEmail1" class="form-label mt-4">Email</label>
                      <input type="email" onChange={handleChange} name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
                      {
                        errors?.email && <small id="emailHelp" class="form-text text-danger">{errors.email.msg}</small>

                      }
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1" class="form-label mt-4">Password</label>
                      <input type="password" onChange={handleChange} name="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=" Enter Password" />
                      {
                        errors?.password && <small id="emailHelp" class="form-text text-danger">{errors.password.msg}</small>

                      }
                    </div>
                    <br />
                    
                    <button type="button" onClick={handleSubmit} class="col-sm-4 center btn btn-outline-primary">Login</button>
                </div>
            </div>

        </div>
     
    </div>
    </>
  )
}

export default Login
