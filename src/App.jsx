import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import Create from "./pages/property/Create"
import Properties from "./pages/property/Properties"
import Edit from "./pages/property/Edit"
import Property from "./pages/property/Property"

function App() {

  return <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/about" element = {<About/>}/>
        <Route path="/sign-in" element = {<SignIn/>}/>
        <Route path="/sign-up" element = {<SignUp/>}/>

        <Route element = {<PrivateRoute/>}>
          <Route path="/profile" element = {<Profile/>}/>
          <Route path="/properties/create" element = {<Create/>}/>
          <Route path="/properties/:id/update" element = {<Edit/>}/>
        </Route>

        <Route path="/properties/:id" element = {<Property/>}/>
    </Routes>





  </BrowserRouter>
}

export default App
