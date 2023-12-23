import React from 'react'

const Search = () => {
  return (
    <main className='md:mx-auto md:flex'>
        <div>
            <form className='flex flex-row gap-5 flex-wrap py-10 px-2 md:max-w-sm border-b-2 md:border-none'>

                <div className='flex gap-1 items-center w-full'>
                    <label className='text-sm font-semibold' htmlFor="item">Search term:</label>
                    <input 
                        type="text" 
                        id="item"
                        className='flex-1 rounded-md pl-2 py-1'
                    />
                </div>

                <div className='flex gap-1 items-center'>
                    <label className='text-sm' htmlFor="all">Type:</label>
                    <input 
                        type="checkbox" 
                        id="all"
                    />
                    <label className='text-sm' htmlFor="all">Rent & Sale</label>
                </div>

                <div className='flex gap-2 items-center'>
                    <label className='text-sm' htmlFor="rent">Rent</label>
                    <input 
                        type="checkbox" 
                        id="rent"
                    />
                </div>


                <div className='flex gap-2 items-center'>
                    <label className='text-sm' htmlFor="parking">Parking</label>
                    <input 
                        type="checkbox" 
                        id="parking"
                    />
                </div>


                <div className='flex gap-2 items-center'>
                    <label className='text-sm' htmlFor="furnished">Furnished</label>
                    <input 
                        type="checkbox" 
                        id="furnished"
                    />
                </div>

                <div className='flex gap-2 items-center'>
                    <label className='text-sm' htmlFor="order">Sort by:</label>
                    <select name="order" id="order" className='border rounded-md pl-2 pr-10 py-1 bg-white text-sm text-left'>
                        <option value="high">Price: High to low</option>
                        <option value="low">Price: Low to high</option>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>

                <button className='block w-full bg-slate-800 text-white font-bold rounded-lg p-2 uppercase hover:opacity-95'>
                    Search
                </button>

            </form>
        </div>

        <div className='py-10 px-2 md:border-l-2 md:h-screen'>
            <h1 className='text-2xl font-semibold'>Results</h1>
        </div>
    </main>
  )
}

export default Search