import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {

    const {currentUser} = useSelector((state) => state.user);
    const [alerts, setAlerts] = useState([]);


    //handle form submit fn
    const handleSubmit = async (e) =>{
        e.preventDefault();
    };

  return (
    <div className='mx-auto md:max-w-lg'>
        <h1 className='text-3xl font-bold text-slate-800 text-center my-7'>Profile</h1>

        <div className="flex justify-center items-center">
            <img 
                className="rounded-full  w-16 h-16 object-cover"
                src={currentUser.user.photo} 
                alt="user img"
            />
        </div>


        {alerts && (
            <p className='px-2 text-red-500 rounded-md mb-4'>{alerts}</p>
        )}

        <form className='px-2 space-y-5' onSubmit={(e) => {handleSubmit(e)}}>

            <input 
                type="text" 
                placeholder='Username'
                className='bg-white w-full p-2 border rounded-md'
                defaultValue={currentUser.user.username}
            />

            <input 
                type="email" 
                placeholder='Email'
                className='bg-white w-full p-2 border rounded-md'
                defaultValue={currentUser.user.email}
            />

            <input 
                type="password" 
                placeholder='Password'
                className='bg-white w-full p-2 border rounded-md'
            />

            <button 
                className='w-full bg-slate-700 text-white uppercase p-2 rounded-lg hover:opacity-95'
            >
                Update
            </button>


            <button 
                className='w-full bg-green-700 text-white uppercase p-2 rounded-lg hover:opacity-95'
            >
                Create Listing
            </button>


            <div className="flex justify-between text-red-700 font-semibold">
                <button>Delete Account</button>
                <button>Log out</button>
            </div>


        </form>






    </div>
  )
}

export default Profile