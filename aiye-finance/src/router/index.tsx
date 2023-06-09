import { HashRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import RouterWrapper from "./router-wrapper";

// pages
import Signin from "../pages/Signin";


function Router() 
{
     return (
          <HashRouter>
               <NavbarComponent />
               <Routes>
                    <Route path="/" element={<RouterWrapper isPrivate={true} defaultComponent={Signin} />} />
                    <Route path="/signin" element={<RouterWrapper isPrivate={false} defaultComponent={Signin} />} />
               </Routes>

          </HashRouter>
     )
}


export default Router;