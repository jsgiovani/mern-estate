import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosConnection from '../../config/axios';
import { FaBath, FaBed } from 'react-icons/fa';
import { FaSquareParking } from "react-icons/fa6";
import { BiFridge } from "react-icons/bi";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useSelector } from 'react-redux';
import Contact from '../../components/Contact';


const Property = () => {

    const {currentUser} = useSelector((state) => state.user);

    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [property, setProperty] = useState({});
    const [contact, setContact] = useState(false);


    //swiper

    //fetch property throw APi
    const fetchProperty = async (id) =>{

        try {
           setIsLoading(true);
            const request = await axiosConnection.get(`/api/properties/${id}`);

            setProperty({...request.data});
        
            setIsLoading(false);

        } catch (error) {
            setError(true);
        }
    }


    console.log(property);

    useEffect(() => {
        fetchProperty(id);
    }, [])


    if (isLoading) {
        return (
            <p className='text-center pt-10 text-xl'>Loading...</p>
        );
    }


    if (error) {
        return (
            <p className='text-center pt-10 text-xl text-red-600'>Something went wrong</p>
        );
    }


  return (
    <main>

        {property.imageUrls && !isLoading && !error && (
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                pagination={{ clickable: true }}
            >
                {property.imageUrls.map((url) =>(
                    <SwiperSlide key={url}>
                        <div 
                            className='h-[500px]'
                            style={{ 
                                background:`url(${url})`,
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'cover',
                                backgroundPosition:'center center' 
                            }}
                        >

                        </div>
                    </SwiperSlide>
                ))}

            </Swiper> 

        )}


        <div className='px-2 md:max-w-6xl md:mx-auto'>
            <h1 className='font-bold text-xl md:text-3xl mt-5 md:my-10 text-slate-700'>{property.name} - ${property.offer ? property.regularPrice - property.discountPrice : property.regularPrice} {property.type ==='rent' ? '/month': ''} </h1>
            <div className='flex gap-2 items-center my-10'>
                <span className='bg-red-800 py-1 px-5 text-white font-semibold rounded-lg text-sm'>{property.type ==='rent' ? 'For Rent': 'For Sale'}</span>
                {property.offer && (
                    <span className='bg-green-800 py-1 px-5 text-white font-semibold rounded-lg text-sm'>${property.discountPrice} discount</span>
                )}
            </div>

            <p className='mt-5 text-slate-800 text-justify'>{property.description}</p>

            <ul className='my-5 flex items-center gap-4 flex-wrap'>
                <li className='text-green-900 flex gap-1 items-center font-bold text-xl'>
                    <FaBed />
                    <small>{property.bedrooms} Beds</small>
                </li>

                <li className='text-green-900 flex gap-1 items-center font-bold text-xl'>
                    <FaBath/>
                    <small>{property.bathrooms} Beds</small>
                </li>

                <li className='text-green-900 flex gap-1 items-center font-bold text-xl'>
                    <FaSquareParking />

                    {property.parking ? (
                        <small>Parking</small>
                    ):(
                        <small>No parking</small>
                    )}
                </li>

                <li className='text-green-900 flex gap-1 items-center font-bold text-xl'>
                    <BiFridge  />

                    {property.parking ? (
                        <small>Furnished</small>
                    ):(
                        <small>No Furnished</small>
                    )}
                </li>
            </ul>

            {currentUser && currentUser.user._id!==property.userRef && !contact && (
                <button onClick={()=>{setContact(true)}} className='uppercase bg-slate-700 text-white rounded-lg px-6 py-2 font-bold w-full md:w-auto my-5'>
                    Contact owner
                </button>

            )}


            {contact && (
                <Contact property={property}/>
            )}

        </div>
    </main>
  )
}

export default Property