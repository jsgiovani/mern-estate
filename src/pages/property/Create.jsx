import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../../firebase';
import { useSelector } from 'react-redux';
import axiosConnection from '../../config/axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const {currentUser} = useSelector((state) => state.user);

    const [files, setFiles] = useState([]);
    const [alert, setAlert] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [crateAlert, setCrateAlert] = useState();
    const [createError, setCreateError] = useState();
    const navegate = useNavigate();
    const [formData, setFormData] = useState({
        imageUrls:[],
        furnished:false,
        offer:false,
        parking:false,
        type: 'sale',
        name:'',
        description:'',
        address:'',
        regularPrice:0,
        discountPrice:0,
        bedrooms:1,
        bathrooms:1,        
    })


    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        });
    }

    const handleType = (e)=> {
        setFormData({
            ...formData, type:[e.target.id][0]
        });
    }


    const handleChecked = (e)=> {
        setFormData({
            ...formData, [e.target.id]:e.target.checked
        });
    }





    //fn to upload multiples images to firebase
    const handleImageSubmit = (e) =>{
        e.preventDefault();

        //verify if files exists and if is less than 6
        if (files.length>0 && (files.length + formData.imageUrls.length) < 7) {
            setIsLoading(true);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(uploadImage(files[i]));
            }

            Promise.all(promises).then((urls) =>{
                setFormData({...formData, imageUrls:formData.imageUrls.concat(urls)});
                setCreateError(null);
                setIsLoading(false);
            }).catch((error) => {
                setAlert('Each image must be max: 2MB');
                setIsLoading(false);
                setCrateAlert(null);
            });


            
        }else{
            setAlert('You can upload max 6 images');
            setIsLoading(false);
            setCrateAlert(null);

        }

    }



    //submit form

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            if (formData.imageUrls.length<1) {
                return setCreateError('You moust opload at least one image');
            }

            if (formData.offer && +formData.regularPrice < +formData.discountPrice) {
                return setCreateError('Discount price must be less than regular price');
            }

            setIsLoading(true);
            axiosConnection.post('/api/properties', {...formData, userRef:currentUser.user._id });
            setAlert(null);
            setIsLoading(false);
            setCrateAlert('Propierty added successfully');
            setCreateError(null);
            navegate(`/properties/${currentUser.user._id}`);
        } catch (error) {
            setCreateError(error.message);
            setIsLoading(false);
            setCrateAlert(null);
        }
    } 


    //fn to upload image
    const uploadImage = async (file)=>{

        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storeRef = ref(storage, fileName);
            const uploadFile = uploadBytesResumable(storeRef, file);
    
            uploadFile.on('state_changed', 
            
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
    
                (error) =>  {
                    reject(error);
                    setAlert('Image must be max: 2MB');
                },
    
                ()=>{
                    getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) =>{
                        resolve(downloadURL);
                        setAlert(null);
                    })
                }
            );

        });


    }


    const removeImage = (img) =>{
        const fdImages = formData.imageUrls.filter(item => item!=img);
        setFormData({...formData, imageUrls:fdImages});
    }







  return (
    <main className='mx-auto md:max-w-4xl'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Add a Property</h1>

        <form className='px-2 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4' onSubmit={(e) => {handleSubmit(e)}}>

            <div className='space-y-4 md:flex-1'>
                <input 
                    type="text" 
                    id="name" 
                    placeholder='Name'
                    className='bg-white w-full p-2 border rounded-md'
                    required
                    onChange={(e) =>{handleChange(e)}} 
                />



                <textarea 
                    id="description" 
                    rows="5"
                    className='bg-white w-full p-2 border rounded-md resize-none'
                    placeholder='Description'
                    onChange={(e) =>{handleChange(e)}}
                ></textarea>



                <input 
                    type="text" 
                    id="address" 
                    placeholder='Address'
                    className='bg-white w-full p-2 border rounded-md'
                    required
                    onChange={(e) =>{handleChange(e)}} 
                />


                <div className='flex gap-4 flex-wrap'>

                    <div className='flex gap-2'>
                        <input 
                            type="checkbox" 
                            id="sale" 
                            checked = {formData.type ==='sale'}
                            onChange={(e) =>{handleType(e)}}
                        />
                        <label className='text-sm' htmlFor="sale">Sell</label>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                            type="checkbox" 
                            checked = {formData.type ==='rent'}
                            onChange={(e) =>{handleType(e)}}
                            id="rent" 
                        />
                        <label className='text-sm' htmlFor="rent">Rent</label>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                            type="checkbox" 
                            id="parking"
                            checked = {formData.parking}
                            onChange={(e) =>{handleChecked(e)}} 
                        />
                        <label className='text-sm' htmlFor="parking">Parking spot</label>
                    </div>


                    <div className='flex gap-2'>
                        <input 
                            type="checkbox" 
                            id="furnished"
                            checked = {formData.furnished}
                            onChange={(e) =>{handleChecked(e)}}
                        />
                        <label className='text-sm' htmlFor="furnished">Furnished</label>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                            type="checkbox" 
                            id="offer"
                            checked = {formData.offer}
                            onChange={(e) =>{handleChecked(e)}} 
                        />
                        <label className='text-sm' htmlFor="offer">Offer</label>
                    </div>





                </div>

                <div className='flex gap-10'>

                    <div className='flex gap-2 items-center'>


                        <input 
                            type="number" 
                            className='bg-white p-2 border rounded-md w-20' 
                            id="bedrooms"
                            min={1} 
                            defaultValue={1}
                            onChange={(e) =>{handleChange(e)}}
                        />

                        <label htmlFor="bedrooms">Beds</label>

                    </div>

                    <div className='flex gap-2 items-center'>


                        <input 
                            type="number" 
                            className='bg-white p-2 border rounded-md w-20' 
                            id="bathrooms"
                            min={1} 
                            defaultValue={1}
                            onChange={(e) =>{handleChange(e)}}
                        />

                        <label htmlFor="bathrooms">Baths</label>

                    </div>

                </div>

                <div className='flex gap-10'>
                    <div className='flex gap-2 items-center'>


                        <input 
                            type="number" 
                            className='bg-white p-2 border rounded-md w-20' 
                            id="regularPrice"
                            min={0} 
                            defaultValue={0}
                            onChange={(e) =>{handleChange(e)}}
                        />

                        <label className='text-sm' htmlFor="regularPrice"> Regular Price {formData.type =='rent' ? "($/Month)":""}</label>

                    </div>

                </div>

                {formData.offer && (
                    <div className='flex gap-10'>
                        <div className='flex gap-2 items-center'>


                            <input 
                                type="number" 
                                className='bg-white p-2 border rounded-md w-20' 
                                id="discountPrice"
                                min={0} 
                                defaultValue={0}
                                onChange={(e) =>{handleChange(e)}}
                            />

                            <label className='text-sm' htmlFor="discountPrice">Discount price {formData.type =='rent' ? "($/Month)":""}</label>

                        </div>

                    </div>
                )}


            </div>


            <div className='space-y-4 md:flex-1'>
                <h3 className='font-semibold'>Images: <span className='font-normal text-sm'>The first image will be the cover (max 6)</span></h3>

                <div className='flex gap-2'>

                    <input 
                        type="file" 
                        id="images"
                        multiple
                        accept='image/*'
                        className='border border-gray-700 p-2 flex-1 rounded-md'
                        onChange={(e) => {setFiles(e.target.files)}}

                     
                    />

                    <button 
                        onClick={(e) => {handleImageSubmit(e)}}
                        type='button'
                        disabled = {isLoading} 
                        className='border border-green-800 p-2 rounded-md text-green-700 font-semibold uppercase'
                    >
                        {isLoading ? 'Uploading...': 'Upload'}
                    </button>

                </div>
                
                {alert && <p className='text-sm text-red-700'>{alert}</p>}

                {formData.imageUrls.length>0 && (
                    <ul className='space-y-2'>
                       {formData.imageUrls.map((img => {
                            return(
                                <li key={img} className='flex justify-between items-center gap-2 border p-2 rounded-lg'>
                                    <img src={img} alt="img" className='w-20 h-20 object-fit rounded-lg' />
                                    <button onClick={()=>{removeImage(img)}} className='text-red-700 hover:opacity-90 uppercase text-sm'>Remove</button>
                                </li>
                            );
                       }))}
                    </ul>
                )}

                <button 
                    disabled = {isLoading} 
                    className='w-full bg-slate-700 text-white uppercase p-2 rounded-lg hover:opacity-95'
                    type="submit"
                >
                     {isLoading ? 'Creating...': 'Create'}
                </button>
                
                <p className='text-center font-bold text-green-800'>{crateAlert}</p>
                <p className='text-center font-bold text-red-800'>{createError}</p>
            </div>




            
        </form>
    </main>
  )
}

export default Create