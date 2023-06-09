import { useState } from "react";
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



function Signin()
{
     const [username, setUsername] = useState<string>('');
     const [password, setPassword] = useState<string>('');


     // adicionar tipo de submit
     async function handleSubmit(e: FormEvent<HTMLFormElement>)
     {
          e.preventDefault();
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
                                        value={username}
                                   />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                   <Form.Label>Senha</Form.Label>
                                   <Form.Control type="password" placeholder="senha" 
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
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