import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { CiBank } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import './navbar.css';
import { AuthContext } from '../../providers/auth-provider';

function NavbarComponent()
{
     const [auth, setAuth] = useState<boolean>(false);
     const { token, setToken, setUser } = useContext(AuthContext);

     useEffect(() => {
          if (token)
          {
               setAuth(true);
               return;
          }
          
          setAuth(false);
     }, [token]);

     function logout()
     {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);

          window.location.href = '/signin';
     }

     window.addEventListener('scroll', () => {
          const navbar = document.querySelector('.navbar-aiye');
          if(window.scrollY > 150)
          {
               navbar?.classList.add('fixed-top');
          }
          else
          {
               navbar?.classList.remove('fixed-top');
          }
     });


     return (
          <div className='navbar-aiye'>
               <Navbar bg="dark" variant="dark">
                    <Container fluid>
                         <Navbar.Brand>
                              <Link to="/">
                                   <CiBank size={30} color={'#fff'} />     
                              </Link>

                         </Navbar.Brand>   
                    </Container>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                         <Navbar.Text className="me-5">
                              {
                                   auth ? (
                                        <a className="btn btn-primary"
                                             onClick={() => logout()}
                                        >
                                             Logout
                                        </a>
                                   ) : (
                                        <Link to="/signin" className="btn btn-primary">Login</Link>
                                   )
                              }
                         </Navbar.Text>
                    </Navbar.Collapse>
               </Navbar>
               {
                    auth && 
                         <Navbar variant="light" bg="light">
                         <Container>
                              <Navbar.Brand>
                                   <Link to="/clientes" className="text-dark text-decoration-none">
                                        Clientes
                                   </Link>
                              </Navbar.Brand>
                              <Navbar.Brand>
                                   <Link to="/fornecedores" className="text-dark text-decoration-none">
                                        Fornecedores
                                   </Link>
                              </Navbar.Brand>
                              <Navbar.Brand>
                                   <Link to="/prestadores" className="text-dark text-decoration-none">
                                        Prestadores
                                   </Link>
                              </Navbar.Brand>
                              <Navbar.Brand>
                                   <Link to="/perfil" className="text-dark text-decoration-none">
                                        Perfil
                                   </Link>
                              </Navbar.Brand>
                              <Navbar.Brand>
                                   <Link to="/configuracoes" className="text-dark text-decoration-none">
                                        Configurações   
                                   </Link>   
                              </Navbar.Brand>
                         </Container>
                    </Navbar>
               }
          </div>
     )
}


export default NavbarComponent;