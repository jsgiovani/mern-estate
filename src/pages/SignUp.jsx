import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosConnection from '../config/axios';

const SignUp = () => {

    const [loading, setLoading] = useState(false);
    const [alerts, setAlerts] = useState([]);

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const navegate = useNavigate();


    //handle form submit fn
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const dt = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            await axiosConnection.post('/api/auth/register',{...dt});
            navegate('/sign-in');
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
                type="text" 
                placeholder='Username'
                className='bg-white w-full p-2 border rounded-md'
                ref={usernameRef}  
            />

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
                {loading ? 'Loading...' : 'Register'}
            </button>

            <button className='w-full bg-red-800 text-white uppercase p-2 rounded-lg hover:opacity-95'>
                Continue with google
            </button>

        </form>

        <div className='p-2 flex gap-2'>
            <p>Have an account?</p>
            <Link className='text-blue-700' to="/sign-in">Sign in</Link>
        </div>

    </div>
  )
}

export default SignUp