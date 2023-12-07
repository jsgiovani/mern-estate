import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='mx-auto md:max-w-lg'>
        <h1 className='text-3xl font-bold text-slate-800 text-center my-7'>Sign Up</h1>

        <form className='px-2 space-y-4'>

            <input 
                type="text" 
                placeholder='Username'
                className='bg-white w-full p-2 border rounded-md'  
            />

            <input 
                type="email" 
                placeholder='Email'
                className='bg-white w-full p-2 border rounded-md'  
            />

            <input 
                type="password" 
                placeholder='Password'
                className='bg-white w-full p-2 border rounded-md'  
            />

            <button className='w-full bg-slate-700 text-white uppercase p-2 rounded-lg hover:opacity-95'>
                Sign up
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