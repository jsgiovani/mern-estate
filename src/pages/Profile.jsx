import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import axiosConnection from "../config/axios";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, logoutUserFailure, logoutUserStart, logoutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";



const Profile = () => {

    const {currentUser, error, loading} = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [alerts, setAlerts] = useState([]);
    const [file, setFile ] = useState(undefined);
    const [uploadPorcentage, setUploadPorcentage] = useState();
    const [formData, setFormData] = useState({});
    const [showPropertiesError, setShowPropertiesError] = useState();
    const [properties, setProperties] = useState([]);
    const navegate = useNavigate();



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


    const deleteAccount = async()=>{
        try {
            dispatch(deleteUserStart())
            const {data} = await axiosConnection.delete(`/api/users/${currentUser.user._id}`,{
                headers:{
                    'authorization': localStorage.getItem('token'),
                }
            });

            if (data.success ==false ) {
                dispatch(deleteUserFailure(error.message));
                return;
            }

            dispatch(deleteUserSuccess(data))
            localStorage.removeItem('token');
            navegate('/');
            
            
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }


    const logout = async() =>{

        try {
            dispatch(logoutUserStart())
            const {data} = await axiosConnection.get(`/api/auth/logout`);

            if (data.success ==false ) {
                dispatch(logoutUserFailure(error.message));
                return;
            }

            dispatch(logoutUserSuccess(data));
            localStorage.removeItem('token');
            localStorage.removeItem('persist:root');
            navegate('/login');
        } catch (error) {
            dispatch(logoutUserFailure(error.message));
        }
        
    }


    //fn to show all user properties
    const handleShowProperties = async()=>{
        try {
            const {data} = await axiosConnection.get(`/api/users/properties/${currentUser.user._id}`);
            setProperties(data);
        } catch (error) {
            setShowPropertiesError(error.message);
        }
    }



    //fn to delete property
    const handleDeleteProperty = async(id) =>{

        try {
            const {data} = await axiosConnection.delete(`/api/properties/${id}`,{
                headers:{
                    'authorization': localStorage.getItem('token'),
                }
            });

            setProperties((prev) => prev.filter((item) => item._id !==id));

        } catch (error) {
            console.log(error);
        }

    }



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


            <Link 
                to={'/properties/create'}
                className='w-full bg-green-700 text-white uppercase p-2 rounded-lg hover:opacity-95 block text-center'
                type='button'
            >
                Create Listing
            </Link>


            {error ? <span className="text-center text-red-700">{console.log(error)}</span> : ''}

            <div className="flex justify-between text-red-700 font-semibold">
                <button onClick={deleteAccount}>Delete Account</button>
                <button onClick={logout}>Log out</button>
            </div>


        </form>


        <button onClick={handleShowProperties} className="text-center w-full my-4 text-gray-700">Show Properties</button>

        {properties.length>0 && (
            <ul className="space-y-2">
                <h2 className="text-center text-2xl font-bold mb-4">Your listing</h2>
                {
                    properties.map((property) =>{
                        const {_id, name, imageUrls} = property;
                        return (
                            <li key={_id} className="border p-3 flex items-center justify-between rounded-md">
                                <Link to = "#" className="flex items-center gap-2">
                                    <img className="w-12" src={imageUrls[0]} alt='img property' />
                                    <h3 className="hover:underline font-semibold truncate">{name}</h3>
                                </Link>

                                <div className="flex flex-col items-start">
                                    <button onClick={()=>{handleDeleteProperty(_id)}} className='text-red-700 hover:opacity-90 uppercase text-sm'>Delete</button>
                                    <Link to={`/properties/${_id}/update`} className='text-green-700 hover:opacity-90 uppercase text-sm'>Edit</Link>
                                </div>
                            </li>
                        );
                    })

                }
            </ul>
        )
         
        }








    </div>
  )
}

export default Profile