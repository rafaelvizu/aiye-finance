import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import ModalBootstrap5 from '../../components/Modal';
import { Form } from 'react-bootstrap';
import { MainDataContext } from '../../providers/main-data-provider';
import { IFornecedoresPrestadores } from '../../helpers/interfaces';
import { toast } from 'react-toastify';
import { RxUpdate } from 'react-icons/rx';
import { ListGroup } from 'react-bootstrap';


function Fornecedores()
{    
     const [fornecedoresFiltrados, setFornecedoresFiltrados] = useState<IFornecedoresPrestadores[]>([]);
     const [search, setSearch] = useState<string>('');
     const { getAll, fornecedores } = useContext(MainDataContext);

     window.document.title = 'Fornecedores - Aiye Finance';


     useEffect(() => {
          if (fornecedores)
          {
               setFornecedoresFiltrados(fornecedores.filter((fornecedor) => {
                    return fornecedor.nome.toLowerCase().includes(search.toLowerCase());
               }));
          }

     }, [fornecedores]);
  
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
                         <ModalBootstrap5 textButton="Novo" titleModal="Adicionar Fornecedor">
                              <h1>
                                   ad
                              </h1>
                         </ModalBootstrap5>
                    </Col>
                    <Col xs={6}>
                         <Button variant="primary" 
                         title='Atualizar fornecedores'
                         onClick={() => {
                              toast.info('Atualizando fornecedores...');
                              getAll();
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


export default Fornecedores;