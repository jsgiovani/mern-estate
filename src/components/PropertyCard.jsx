import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";

const PropertyCard = ({property}) => {
    const {_id,name,address, bathrooms, bedrooms, description, discountPrice, furnished, imageUrls, offer, parking, regularPrice, type, } = property;
  return (
    <li className="rounded-md shadow-md overflow-hidden hover:shadow-lg">
        <Link to={`/properties/${_id}`}>
            <img 
                src={imageUrls[0]}
                className="md:w-full md:h-64 object-cover" 
                alt={name} 
            />

            <div className="p-4">
                <h2 className="font-semibold capitalize text-slate-700 truncate ... text-lg mb-1 ">{name}</h2>
                
                <div className="flex items-center text-sm gap-1">
                    <CiLocationOn className="text-red-700" />
                    <p className="text-sm mb-1 truncate">{address}</p>
                </div>
                <p className="truncate ... py-1 text-sm">{description}</p>

                <h3 className='font-semibold py-1'>${offer ? regularPrice-discountPrice : regularPrice} {type ==='rent' ? '/ month': ''} </h3>

                   
                <div className="flex gap-4 items-center">
                    <span>{bathrooms} Baths</span>
                    <span>{bedrooms} Beds</span>
                </div>
            </div>

        </Link>
    </li>
  )
}

export default PropertyCard