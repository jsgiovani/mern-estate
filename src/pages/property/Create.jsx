import React from 'react'

const Create = () => {
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
                     
                    />

                    <button className='border border-green-800 p-2 rounded-md text-green-700 font-semibold uppercase'>Upload</button>
                </div>

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