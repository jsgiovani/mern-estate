import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosConnection from '../config/axios';
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/user/userSlice';
import { OAuth } from '../components/OAuth';

const SignIn = () => {

    const [alerts, setAlerts] = useState([]);
    const {loading, error} = useSelector((state) => state.user);

    const navegate = useNavigate();
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    //handle form submit fn
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const dt = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            dispatch(loginStart());
            const {data} = await axiosConnection.post('/api/auth/login',{...dt});
            dispatch(loginSuccess(data));
            localStorage.setItem('token', data.token);
            navegate('/');
            
        } catch (error) {
            dispatch(loginFailure(error.response.data.message));
            setAlerts(error.response.data.message)
        }

    };

        

  return (
    <div className='mx-auto md:max-w-lg'>
        <h1 className='text-3xl font-bold text-slate-800 text-center my-7'>Sign Up</h1>

        {alerts && (
            <p className='px-2 text-red-500 rounded-md mb-4'>{alerts}</p>
        )}

        <form className='px-2 space-y-4' onSubmit={(e) => {handleSubmit(e)}}>


            <input 
                type="email" 
                placeholder='Email'
                className='bg-white w-full p-2 border rounded-md'
                ref={emailRef}  
            />

            <input 
                type="password" 
                placeholder='Password'
                className='bg-white w-full p-2 border rounded-md'
                ref={passwordRef}  
            />

            <button 
                className='w-full bg-slate-700 text-white uppercase p-2 rounded-lg hover:opacity-95'
                disabled = {loading}
            >
                {loading ? 'Loading...' : 'Login'}
            </button>

           <OAuth/>

        </form>

        <div className='p-2 flex gap-2'>
            <p>Dont  Have an account?</p>
            <Link className='text-blue-700' to="/sign-up">Sign up</Link>
        </div>

    </div>
  )
}

export default SignIn