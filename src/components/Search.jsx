import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axiosConnection from "../config/axios";

const Search = () => {

    const navegate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState([]);

    const [sidebarData, setSidebarData] = useState({
        item:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:true,
        sort:'created_at',
        order:'desc'
    });

    const search = async() =>{
        try {
            setLoading(true);
            const urlParams = new URLSearchParams(location.search);
            const {data} = await axiosConnection.get(`/api/search?${urlParams.toString()}`);
            setProperties(...data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const item =urlParams.get('item', sidebarData.item);
        const type = urlParams.get('type', sidebarData.type);
        const parking = urlParams.get('parking', sidebarData.parking);
        const furnished = urlParams.get('furnished', sidebarData.furnished);
        const offer = urlParams.get('offer', sidebarData.offer);
        const sort = urlParams.get('sort', sidebarData.sort);
        const order = urlParams.get('order', sidebarData.order);
        
        if (item || type || parking || furnished || offer || sort || order) {
           setSidebarData({
            item: item || '',
            type: type || 'all',
            parking: parking === 'true' ? true:false,
            furnished: furnished === 'true' ? true:false,
            offer: offer === 'true' ? true:false,
            sort: sort || 'created_at',
            order: order || 'desc'

            }); 
        };


        search();


    }, [location.search])

    const handleChange = (e)=>{

        if (e.target.id ==='item') {
            setSidebarData({...sidebarData, [e.target.id]:e.target.value})
        }

        

        if (e.target.type ==='select-one') {
            const sort = e.target.value.split('_')[0];
            const order = e.target.value.split('_')[1];
            setSidebarData({...sidebarData, sort, order})
        }



        if (e.target.id ==='all' || e.target.id ==='rent' || e.target.id ==='sale') {
            setSidebarData({...sidebarData, type:e.target.id})
        }

        if (e.target.id ==='parking' || e.target.id === 'furnished' || e.target.id ==='offer') {
            setSidebarData({...sidebarData, [e.target.id]:e.target.checked || e.target.checked ==='true' ? true:false});
        }

        
    }


    const handleSubmit = (e)=>{
        e.preventDefault();

        //set data to url
        const urlParams = new URLSearchParams();
        urlParams.set('item', sidebarData.item);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navegate(`/search?${searchQuery}`);
    }

    if (loading) return (<p className="text-center py-5 font-semibold">Searching...</p>);


  return (
    <main className='md:mx-auto md:flex'>
        <aside>
            <form className='flex flex-row gap-5 flex-wrap py-10 px-2 md:max-w-sm border-b-2 md:border-none' onSubmit={handleSubmit}>

                <div className='flex gap-1 items-center w-full'>
                    <input 
                        type="search" 
                        id="item"
                        className='flex-1 rounded-md pl-2 py-1'
                        placeholder='Search...'
                        value={sidebarData.item}
                        onChange={handleChange}
                    />
                </div>

                <div className='flex gap-1 items-center'>
                    <label className='text-sm' htmlFor="all">Type:</label>
                    <input 
                        type="checkbox" 
                        id="all"
                        checked = {sidebarData.type ==='all' ? true:false}
                        onChange={handleChange}
                    />
                    <label className='text-sm' htmlFor="all">Rent & Sale</label>
                </div>

                <div className='flex gap-2 items-center'>
                    <label className='text-sm' htmlFor="rent">Rent</label>
                    <input 
                        type="checkbox" 
                        id="rent"
                        checked = {sidebarData.type === 'rent' ? true:false}
                        onChange={handleChange}
                    />
                </div>

                <div className='flex gap-2 items-center'>
                    <label className='text-sm' htmlFor="sale">Sale</label>
                    <input 
                        type="checkbox" 
                        id="sale"
                        onChange={handleChange}
                        checked = {sidebarData.type === 'sale' ? true:false}
                    />
                </div>


                <div className='flex gap-2 items-center'>
                    <label className='text-sm' htmlFor="parking">Parking</label>
                    <input 
                        type="checkbox" 
                        id="parking"
                        onChange={handleChange}
                        checked = {sidebarData.parking}
                    />
                </div>


                <div className='flex gap-2 items-center'>
                    <label className='text-sm' htmlFor="furnished">Furnished</label>
                    <input 
                        type="checkbox" 
                        id="furnished"
                        onChange={handleChange}
                        checked = {sidebarData.furnished}
                    />
                </div>

                <div className='flex gap-2 items-center'>
                    <label className='text-sm' htmlFor="offer">Offer</label>
                    <input 
                        type="checkbox" 
                        id="offer"
                        onChange={handleChange}
                        checked = {sidebarData.offer}
                    />
                </div>

                <div className='flex gap-2 items-center'>
                    <label className='text-sm' htmlFor="order">Sort by:</label>

                    <select 
                        id="order" 
                        className='border rounded-md pl-2 pr-10 py-1 bg-white text-sm text-left'
                        onChange={handleChange}
                        defaultValue={'created_at_desc'}
                    >
                        <option value="regularPrice_desc">Price: High to low</option>
                        <option value="regularPrice_asc">Price: Low to high</option>
                        <option value="created_at_desc">Latest</option>
                        <option value="created_at_asc">Oldest</option>
                    </select>

                </div>

                <button 
                    className='block w-full bg-slate-800 text-white font-bold rounded-lg p-2 uppercase hover:opacity-95'
                    type="submit"
                >
                    Search
                </button>

            </form>
        </aside>

        <div className='py-10 px-2 md:border-l-2 md:h-screen'>
            <h1 className='text-2xl font-semibold'>Results</h1>

            
        </div>
    </main>
  )
}

export default Search