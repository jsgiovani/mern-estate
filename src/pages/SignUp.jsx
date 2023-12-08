import { useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosConnection from '../config/axios';

const SignUp = () => {

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    //handle form submit fn
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const data = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const request = await axiosConnection.post('/api/auth/register',{...data});

            console.log(request.data);

        } catch (error) {
            console.log(error);
        }

    };


  return (
    <div className='mx-auto md:max-w-lg'>
        <h1 className='text-3xl font-bold text-slate-800 text-center my-7'>Sign Up</h1>

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
            >
                Sign up
            </button>

            <button className='w-full bg-red-800 text-white uppercase p-2 rounded-lg hover:opacity-95'>
                Continue with google
            </button>

        </form>

        <div className='p-2 gap-2 hidden'>
            <p>Have an account?</p>
            <Link className='text-blue-700' to="/sign-in">Sign in</Link>
        </div>

    </div>
  )
}

export default SignUp