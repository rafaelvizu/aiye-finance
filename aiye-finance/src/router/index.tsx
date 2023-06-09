import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "../components/Navbar";

// pages
import Signin from "../pages/Signin";


function Router() 
{
     return (
          <BrowserRouter>
               <NavbarComponent />
               
               <Routes>
                    <Route path="signin" element={<Signin/>} />
               </Routes>
          </BrowserRouter>
     )
}


export default Router;