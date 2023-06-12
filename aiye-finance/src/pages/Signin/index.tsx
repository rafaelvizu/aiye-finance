import { useState, useContext } from "react";
// form bootstrap para login
import Form from 'react-bootstrap/Form';
// botão bootstrap
import Button from 'react-bootstrap/Button';
// container bootstrap
import Container from 'react-bootstrap/Container';
// row bootstrap
import Row from 'react-bootstrap/Row';
// col bootstrap
import Col from 'react-bootstrap/Col';
// form event
import { FormEvent } from "react";
import { postSignin } from "../../helpers/post";
// context
import { AuthContext } from "../../providers/auth-provider";



function Signin()
{
     const [username, setUsername] = useState<string>('');
     const [password, setPassword] = useState<string>('');
     const { setToken } = useContext(AuthContext);

     window.document.title = 'Login - Aiye Finance';


     // adicionar tipo de submit
     async function handleSubmit(e: FormEvent<HTMLFormElement>)
     {
          console.log('submit');
          e.preventDefault();
          const token: string | null = await postSignin(username, password);

          if (token !== null)
          {
               setToken(token);
               await new Promise(resolve => setTimeout(resolve, 500));
               window.location.href = '/';
          }

          setUsername('');
          setPassword('');
          
          return;
     }

     return (
          <Container className="mt-5">
               <Row>
                    <Col md={{ span: 6, offset: 3 }} className="mt-5">
                         <h1 className="text-center">Login</h1>
                         <hr className="mt-4" />
                    </Col>
                    <Col md={{ span: 6, offset: 3 }}>
                         <Form className="p-5" onSubmit={(e) => handleSubmit(e)}>
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                   <Form.Label>Nome de usuário</Form.Label>
                                   <Form.Control type="text" placeholder="nome de usuário" 
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username} required
                                        pattern="^[a-zA-Z0-9]{3,30}$"
                                        title="O nome de usuário deve conter apenas letras e números, e deve ter entre 3 e 30 caracteres"
                                   />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                   <Form.Label>Senha</Form.Label>
                                   <Form.Control type="password" placeholder="senha" 
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password} required
                                        maxLength={20} minLength={6}
                                        title="A senha deve ter entre 6 e 20 caracteres"
                                   />
                              </Form.Group>
                              <Button variant="primary" type="submit" className="w-100">
                                   Entrar
                              </Button>
                         </Form>
                    </Col>
               </Row>
          </Container>
     )
}


export default Signin;