import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosConnection from '../config/axios';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PropertyCard from '../components/PropertyCard';


const Home = () => {

    const [offerProperties, setOfferProperties] = useState([]);
    const [rentProperties, setRentProperties] = useState([]);
    const [saleProperties, setSaleProperties] = useState([]);

    const fetchOfferProperties = async()=>{

        try {
            const {data:offerProperties} = await axiosConnection.get(`/api/search?offer=true&limit=3`);
            setOfferProperties(offerProperties);
            fetchRentProperties();
        } catch (error) {
            console.log(error);
        }
    }

    const fetchRentProperties = async()=>{

        try {
            const {data} = await axiosConnection.get(`/api/search?type=rent&limit=3`);
            setRentProperties(data);
            fetchSeleProperties();
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSeleProperties = async()=>{

        try {
            const {data} = await axiosConnection.get(`/api/search?type=sale&limit=3`);
            setSaleProperties(data);
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        fetchOfferProperties();
    }, []);




  return (
    <main>
      {/* Top */}

      <section className='p-12 px-3  space-y-5 md:max-w-7xl md:mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl md:text-5xl '>Find your next <span className='text-slate-500'>perfect</span> <span className='block'>place with ease</span></h1>
        <p className='text-gray-400 text-sm md:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ipsam qui sed deleniti possimus placeat obcaecati porro doloribus ab repellat sunt saepe illum, error nisi nobis voluptas atque. Sit, blanditiis.</p>
         
        <Link className='inline-block text-sm md:text-lg text-blue-800 hover:underline' to="/search">Lets start now...</Link>
      </section>

      {/* Swiper */}

      {
        offerProperties && offerProperties.length>0 && (
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                pagination={{ clickable: true }}
            >
                {offerProperties.map((property) =>(

                    <SwiperSlide key={property._id}>
                        <div 
                            className='h-[500px]'
                            style={{ 
                                background:`url(${property.imageUrls[0]})`,
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'cover',
                                backgroundPosition:'center center' 
                            }}
                        >

                        </div>
                    </SwiperSlide>
                ))}

            </Swiper> 

        )
      }

      {/* Rent and sale Section */}

      <section className='p-12 px-3 md:max-w-7xl md:mx-auto'>

        <div className='mb-10'>
            <div className='flex justify-between items-center mb-2'>
                <h2 className='mb-2 font-semibold text-xl text-slate-700'>Recent offers</h2>
                <Link className='text-sm hover:underline text-blue-500' to="/search?offer=true">Show more</Link>

            </div>
            
            <ul className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 gap-4">
                {offerProperties && offerProperties.length>0 && offerProperties.map((property => {
                return(
                    <PropertyCard key={property._id} property = {property}/>
                );
                }))}
            </ul>

        </div>

        <div className='mb-10'>
            <div className='flex justify-between items-center mb-2'>
                <h2 className='mb-2 font-semibold text-xl text-slate-700'>Recent for sale</h2>
                <Link className='text-sm hover:underline text-blue-500' to="/search?type=sale">Show more</Link>

            </div>
            
            <ul className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 gap-4">
                {saleProperties && saleProperties.length>0 && saleProperties.map((property => {
                return(
                    <PropertyCard key={property._id} property = {property}/>
                );
                }))}
            </ul>

        </div>

        <div className='mb-10'>
            <div className='flex justify-between items-center mb-2'>
                <h2 className='mb-2 font-semibold text-xl text-slate-700'>Recent for rent</h2>
                <Link className='text-sm hover:underline text-blue-500' to="/search?type=rent">Show more</Link>

            </div>
            
            <ul className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 gap-4">
                {rentProperties && rentProperties.length>0 && rentProperties.map((property => {
                return(
                    <PropertyCard key={property._id} property = {property}/>
                );
                }))}
            </ul>

        </div>






      </section>

    </main>
  )
}

export default Home