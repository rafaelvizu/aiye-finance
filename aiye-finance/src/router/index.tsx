import { HashRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import RouterWrapper from "./router-wrapper";

// pages
import Signin from "../pages/Signin";
import Fornecedore from "../pages/Fornecedores";
import Prestadores from "../pages/Prestadores";
import ShowUpdateFornecedorPrestador from "../components/ShowUpdateFornecedorPrestador";
import Configuracoes from "../pages/Configuracoes";


function Router() 
{
     return (
          <HashRouter>
               <NavbarComponent />
               <Routes>
                    <Route path="/" element={<RouterWrapper isPrivate={true} defaultComponent={Signin} />} />
                    <Route path="/signin" element={<RouterWrapper isPrivate={false} defaultComponent={Signin} />} />
                    <Route path="/fornecedores" element={<RouterWrapper isPrivate={true} defaultComponent={Fornecedore} />} />
                    <Route path="/fornecedores/:id" element={<RouterWrapper isPrivate={true} defaultComponent={ShowUpdateFornecedorPrestador} />} />
                    <Route path="/prestadores" element={<RouterWrapper isPrivate={true} defaultComponent={Prestadores} />} />
                    <Route path="/prestadores/:id" element={<RouterWrapper isPrivate={true} defaultComponent={ShowUpdateFornecedorPrestador} />} />
                    <Route path="/configuracoes" element={<RouterWrapper isPrivate={true} defaultComponent={Configuracoes} />} />


               </Routes>

          </HashRouter>
     )
}


export default Router;