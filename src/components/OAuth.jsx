import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import axiosConnection from '../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from "react-cookie";
import { loginSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const OAuth = () => {
    const dispatch = useDispatch();
    const navegate = useNavigate();

    const handleClick = async (e) =>{
        e.preventDefault();

        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const {user} = await signInWithPopup(auth, provider);
            const {email, displayName, photoURL} = user;


            const data = {
                name: displayName,
                email,
                photo: photoURL
            };

            const {data:dt} = await axiosConnection.post('/api/auth/google',{...data});
          
            dispatch(loginSuccess(dt))
            localStorage.setItem('token', dt.token);
            navegate('/')


            
        } catch (error) {
            console.log('signin not successful');
        }
    }

  return (
    <button onClick={(e) => {handleClick(e)}} type='button' className='w-full bg-red-800 text-white uppercase p-2 rounded-lg hover:opacity-95'>
        Continue with google
    </button>
  )
}
