import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { app } from '../../firebase';

const Create = () => {

    const [files, setFiles] = useState([]);
    const [alert, setAlert] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        images:[]
    })

    console.log(formData);


    //fn to upload multiples images to firebase
    const handleImageSubmit = (e) =>{
        e.preventDefault();

        //verify if files exists and if is less than 6
        if (files.length>0 && (files.length + formData.images.length) < 7) {
            setIsLoading(true);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(uploadImage(files[i]));
            }

            Promise.all(promises).then((urls) =>{
                setFormData({...formData, images:formData.images.concat(urls)});
                setAlert(null);
                setIsLoading(false);
            }).catch((error) => {
                setAlert('Each image must be max: 2MB');
                setIsLoading(false);
            });


            
        }else{
            setAlert('You can upload max 6 images');
            setIsLoading(false);

        }

        e.target=null;

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
        const fdImages = formData.images.filter(item => item!=img);
        setFormData({...formData, images:fdImages});
    }




  return (
    <main className='mx-auto md:max-w-4xl'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Add a Property</h1>

        <form className='px-2 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4'>

            <div className='space-y-4 md:flex-1'>
                <input 
                    type="text" 
                    id="name" 
                    placeholder='Name'
                    className='bg-white w-full p-2 border rounded-md'
                    required 
                />



                <textarea 
                    id="description" 
                    rows="5"
                    className='bg-white w-full p-2 border rounded-md resize-none'
                    placeholder='Description'
                ></textarea>



                <input 
                    type="text" 
                    id="address" 
                    placeholder='Address'
                    className='bg-white w-full p-2 border rounded-md'
                    required 
                />


                <div className='flex gap-4 flex-wrap'>

                    <div className='flex gap-2'>
                        <input 
                            type="checkbox" 
                            id="sale" 
                        />
                        <label className='text-sm' htmlFor="sale">Sell</label>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                            type="checkbox" 
                            id="rent" 
                        />
                        <label className='text-sm' htmlFor="rent">Rent</label>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                            type="checkbox" 
                            id="parking" 
                        />
                        <label className='text-sm' htmlFor="parking">Parking spot</label>
                    </div>


                    <div className='flex gap-2'>
                        <input 
                            type="checkbox" 
                            id="furnished" 
                        />
                        <label className='text-sm' htmlFor="furnished">Furnished</label>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                            type="checkbox" 
                            id="offer" 
                        />
                        <label className='text-sm' htmlFor="offer">Offer</label>
                    </div>





                </div>

                <div className='flex gap-10'>

                    <div className='flex gap-2 items-center'>


                        <input 
                            type="number" 
                            className='bg-white p-2 border rounded-md w-20' 
                            id="beds"
                            min={1} 
                            defaultValue={1}
                        />

                        <label htmlFor="beds">Beds</label>

                    </div>

                    <div className='flex gap-2 items-center'>


                        <input 
                            type="number" 
                            className='bg-white p-2 border rounded-md w-20' 
                            id="baths"
                            min={1} 
                            defaultValue={1}
                        />

                        <label htmlFor="baths">Baths</label>

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
                        />

                        <label className='text-sm' htmlFor="regularPrice">Regular price ($/Month)</label>

                    </div>

                </div>

                <div className='flex gap-10'>
                    <div className='flex gap-2 items-center'>


                        <input 
                            type="number" 
                            className='bg-white p-2 border rounded-md w-20' 
                            id="discountPrice"
                            min={0} 
                            defaultValue={0}
                        />

                        <label className='text-sm' htmlFor="discountPrice">Discount price ($/Month)</label>

                    </div>

                </div>

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

                {formData.images.length>0 && (
                    <ul className='space-y-2'>
                       {formData.images.map((img => {
                            return(
                                <li key={img} className='flex justify-between items-center gap-2 border p-2 rounded-lg'>
                                    <img src={img} alt="img" className='w-24 h-20 object-fit rounded-lg' />
                                    <button onClick={()=>{removeImage(img)}} className='text-red-700 hover:opacity-90 uppercase text-sm'>Remove</button>
                                </li>
                            );
                       }))}
                    </ul>
                )}

                <button 
                    className='w-full bg-slate-700 text-white uppercase p-2 rounded-lg hover:opacity-95'
                    type="submit"
                >
                    Add property
                </button>
            </div>


            
        </form>
    </main>
  )
}

export default Create