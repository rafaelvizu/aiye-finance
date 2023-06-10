import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import ModalBootstrap5 from '../../components/Modal';
import { Form } from 'react-bootstrap';
import { IFornecedoresPrestadores } from '../../helpers/interfaces';
import { getFornecedoresPrestadores } from '../../helpers/get';
import { toast } from 'react-toastify';
import { RxUpdate } from 'react-icons/rx';
import { ListGroup } from 'react-bootstrap';


function Fornecedore()
{    
     const [fornecedores, setFornecedores] = useState<IFornecedoresPrestadores[]>([]);
     const [fornecedoresFiltrados, setFornecedoresFiltrados] = useState<IFornecedoresPrestadores[]>([]);
     const [search, setSearch] = useState<string>('');


     useEffect(() => {
          document.title = "Fornecedores";
          handleFornecedores();

     }, []);

     async function handleFornecedores()
     {
          const token = localStorage.getItem('token');
          if (token) {
               const fornecedores = await getFornecedoresPrestadores(token, 'FORNECEDOR');
               console.log(fornecedores);
               if (fornecedores) {
                    setFornecedores(fornecedores);
               }
               else 
               {
                    toast.error('Erro ao buscar fornecedores');
                    setFornecedores([]);
               }
          }
     }
     

     
     const [show, setShow] = useState(false);
     return (
          <Container> 
               <h1 className="text-left mt-5 lead">Fornecedores</h1>
               <hr className='mb-5' />
               <Row className="d-flex justify-content-between">
                    <Col xs={12}>
                         <Form>
                              <Form.Group className="mb-3 float-center" controlId="formBasicEmail">
                                   <Form.Control type="search" placeholder="Pesquisar" 
                                        value={search}
                                        onChange={(e) => {
                                             setSearch(e.target.value);
                                             setFornecedoresFiltrados(fornecedores.filter((fornecedor) => {
                                                  return fornecedor.nome.toLowerCase().includes(e.target.value.toLowerCase());
                                             }));
                                        }}
                                        title='Pesquisar fornecedores'
                                   />
                              </Form.Group>
                         </Form>
                    </Col>
                    <Col xs={6}>
                         <ModalBootstrap5 textButton="Novo" titleModal="Adicionar Fornecedor" handleSave={() => {
                              setShow(false);          
                         }}>
                              <h1>
                                   ad
                              </h1>
                         </ModalBootstrap5>
                    </Col>
                    <Col xs={6}>
                         <Button variant="primary" 
                         title='Atualizar fornecedores'
                         onClick={() => {
                              toast.info('Atualizando fornecedores');
                              handleFornecedores();
                         }} className="float-end">
                              <RxUpdate className="mb-1" /> Atualizar
                         </Button>
                    </Col>
               </Row>

               <Row>
                    <Col xs={12}>
                         <ListGroup>
                              {
                                   fornecedoresFiltrados.map((fornecedor) => {
                                        return (
                                             <ListGroup.Item key={fornecedor.id} action>
                                                  {fornecedor.nome}
                                             </ListGroup.Item>
                                        )
                                   })
                              }

                         </ListGroup>
                    </Col>
               </Row>

          </Container>
               
     )

}


export default Fornecedore;