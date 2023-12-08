import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosConnection from '../config/axios';
import { CookiesProvider, useCookies } from "react-cookie";

const SignIn = () => {

    const [loading, setLoading] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [cookies, setCookie] = useCookies(["user"]);

    const navegate = useNavigate();

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
            const {data} = await axiosConnection.post('/api/auth/login',{...dt});
            //generate cookie session
            setCookie("access_token", data.token);
            navegate('/')
            
        } catch (error) {
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

            <button className='w-full bg-red-800 text-white uppercase p-2 rounded-lg hover:opacity-95'>
                Continue with google
            </button>

        </form>

        <div className='p-2 flex gap-2'>
            <p>Dont  Have an account?</p>
            <Link className='text-blue-700' to="/sign-up">Sign up</Link>
        </div>

    </div>
  )
}

export default SignIn