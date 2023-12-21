import React, { useEffect, useState } from 'react'
import axiosConnection from '../config/axios';

const Contact = ({property}) => {


    const [owner, setOwner] = useState({});



    const fetchOwner = async(ownerId)=>{
        try {
            const {data} = await axiosConnection.get(`/api/users/${ownerId}`, {
                headers:{
                    'authorization': localStorage.getItem('token'),
                }
            });

            setOwner({...data});
            
        } catch (error) {
            console.log(error);
        }


    }


    useEffect(() => {
    
    }, [fetchOwner(property.userRef)])


    

  return (
    <>
        {owner && owner.username && (
            <div className='my-6'>
                <p className='mb-2'>Contact <span className='font-semibold'>{owner.username}</span> for <span className='font-semibold'>{property.name}</span> </p>
                <textarea 
                    id="message" 

                    rows="5"
                    className='bg-white w-full p-2 border rounded-md resize-none'
                    placeholder='Message'
                    onChange={(e) =>{}}
                ></textarea>

                <button className='bg-green-800 py-2 px-8 text-white font-semibold rounded-lg text-sm mt-4 w-full md:w-auto'>
                    Send message
                </button>

            </div>

        )}

    </>
  )
}

export default Contact