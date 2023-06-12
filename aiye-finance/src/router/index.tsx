import { HashRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import RouterWrapper from "./router-wrapper";

// pages
import Signin from "../pages/Signin";
import Fornecedore from "../pages/Fornecedores";
import Prestadores from "../pages/Prestadores";


function Router() 
{
     return (
          <HashRouter>
               <NavbarComponent />
               <Routes>
                    <Route path="/" element={<RouterWrapper isPrivate={true} defaultComponent={Signin} />} />
                    <Route path="/signin" element={<RouterWrapper isPrivate={false} defaultComponent={Signin} />} />
                    <Route path="/fornecedores" element={<RouterWrapper isPrivate={true} defaultComponent={Fornecedore} />} />
                    <Route path="/prestadores" element={<RouterWrapper isPrivate={true} defaultComponent={Prestadores} />} />

               </Routes>

          </HashRouter>
     )
}


export default Router;