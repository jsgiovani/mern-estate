import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
    const {currentUser} = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">

        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

            <Link to='/' className="font-bold md:text-xl">
                <span className="text-slate-500 md:text-xl">Real</span>
                <span className="text-slate-700">Estate</span>
            </Link>

            <form className="bg-slate-100 rounded-md p-1 flex items-center">

                <input 
                    className="p-1 bg-transparent outline-none w-32 md:w-64" 
                    type="text" 
                    placeholder="Search..." 
                />

                <FaSearch className="text-slate-500" />
            </form>

            <nav className="flex gap-5 items-center">
                <Link className="hidden md:flex text-slate-700 hover:underline" to="/">Home</Link>
                <Link className="hidden md:flex text-slate-700 hover:underline" to="/about">About</Link>

                {currentUser ? (
                    <Link className="text-slate-700 hover:underline" to="/profile">
                        <img className="rounded-full w-7 h-7 object-cover" src={currentUser.user.photo} alt='user img' />
                    </Link>
                    
                    ):(
                        
                    <Link className="text-slate-700 hover:underline" to="/sign-in">Sign in</Link>
                )}
              
            </nav>
        </div>

    </header>
  )
}

export default Header