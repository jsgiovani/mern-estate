import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import axiosConnection from "../config/axios";
import { useCookies } from 'react-cookie';
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";


const Profile = () => {

    const {currentUser, error, loading} = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [alerts, setAlerts] = useState([]);
    const [file, setFile ] = useState(undefined);
    const [uploadPorcentage, setUploadPorcentage] = useState();
    const [formData, setFormData] = useState({});



    const dispatch = useDispatch();


  

    //fn to upload image to server
    const uploadImage = (file)=>{

        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storeRef = ref(storage, fileName);
        const uploadFile = uploadBytesResumable(storeRef, file);

        uploadFile.on('state_changed', 
        
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadPorcentage(`Upload is ${parseInt(progress)}% done`);
            },

            (error) =>  {
                setAlerts('Image must be max: 2MB');
                setUploadPorcentage(null);
            },

            ()=>{
                getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) =>{
                    setFormData({...formData, photo: downloadURL});
                    setAlerts(null);
                })
            }
        )

    }


    useEffect(() => {
        if (file) {
            uploadImage(file)
        }
    }, [file])

    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }




    //handle form submit fn
    const handleSubmit = async (e) =>{
        e.preventDefault();

    

        try {

            dispatch(updateUserStart());

            const {data} = await axiosConnection.put(`/api/users/${currentUser.user._id}`,formData,{
                headers:{
                    'authorization': localStorage.getItem('token'),
                }
            });

            dispatch(updateUserSuccess(data));
            setAlerts('updated succesfully');
        } catch (error) {

            setAlerts(error.response.data.message);
            dispatch(updateUserFailure(error.message));
        }
    };




  return (
    <div className='mx-auto md:max-w-lg'>

        <h1 className='text-3xl font-bold text-slate-800 text-center my-7'>Profile</h1>



        <form className='px-2 space-y-5' onSubmit={(e) => {handleSubmit(e)}}>

            <input 
                className="hidden" 
                type="file" 
                accept="image/png, image/jpeg"
                onChange={(e) => {setFile(e.target.files[0])}}  
            />

            <div className="flex justify-center items-center flex-col">
                <img 
                    className="rounded-full  w-24 h-24 object-cover cursor-pointer"
                    src={formData.photo || currentUser.user.photo} 
                    alt="user img"
                    onClick={()=>fileRef.current.click()}
                />

               {uploadPorcentage && (
                <p className="text-center text-green-700">{uploadPorcentage}</p>
               )}


               

            </div>

            <input 
                type="text" 
                placeholder='Username'
                className='bg-white w-full p-2 border rounded-md'
                defaultValue={currentUser.user.username}
                id="username"
                onChange={(e) => {handleChange(e)}}

            />

            <input 
                type="email" 
                placeholder='Email'
                className='bg-white w-full p-2 border rounded-md'
                defaultValue={currentUser.user.email}
                id="email"
                onChange={(e) => {handleChange(e)}}
            />

            <input 
                type="password" 
                placeholder='Password'
                className='bg-white w-full p-2 border rounded-md'
                id="password"
                onChange={(e) => {handleChange(e)}}

            />

            <button 
                className='w-full bg-slate-700 text-white uppercase p-2 rounded-lg hover:opacity-95'
                type="submit"
                disabled = {loading}
            >
                {loading ? 'Loading...':'Update'}
            </button>


            <button 
                className='w-full bg-green-700 text-white uppercase p-2 rounded-lg hover:opacity-95'
                type='button'
            >
                Create Listing
            </button>


            {error ? <span className="text-center text-red-700">{console.log(error)}</span> : ''}

            <div className="flex justify-between text-red-700 font-semibold">
                <button>Delete Account</button>
                <button>Log out</button>
            </div>


        </form>






    </div>
  )
}

export default Profile