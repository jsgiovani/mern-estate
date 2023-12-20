import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosConnection from '../../config/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Property = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [property, setProperty] = useState({})


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

    console.log(property);

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
                                // backgroundSize:'cover',
                                backgroundPosition:'center center' 
                            }}
                        >
                           
                        </div>
                    </SwiperSlide>
                ))}
               
            </Swiper> 

        )}

         
    </main>
  )
}

export default Property