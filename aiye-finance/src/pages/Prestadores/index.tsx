import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import ModalBootstrap5 from '../../components/Modal';
import { Form } from 'react-bootstrap';
import { MainDataContext } from '../../providers/main-data-provider';
import { IFornecedoresPrestadores } from '../../helpers/interfaces';
import { toast } from 'react-toastify';
import { RxUpdate } from 'react-icons/rx';
import { ListGroup } from 'react-bootstrap';
import { postFornecedoresPrestadores } from '../../helpers/post';


function Prestadores()
{    
     const [prestadoresFiltrados, setPrestadoresFiltrados] = useState<IFornecedoresPrestadores[]>([]);
     const [search, setSearch] = useState<string>('');
     const { getAll, prestadores } = useContext(MainDataContext);

     const [nome, setNome] = useState<string>('');
     const [email, setEmail] = useState<string | null>(null);
     const [cpf, setCpf] = useState<string | null>(null);
     const [telefone_1, setTelefone_1] = useState<string | null>(null);
     const [telefone_2, setTelefone_2] = useState<string | null>(null);
     const [endereco, setEndereco] = useState<string | null>(null);
     const [numero, setNumero] = useState<number | null>(null);
     const [complemento, setComplemento] = useState<string | null>(null);
     const [bairro, setBairro] = useState<string | null>(null);  
     const [cidade, setCidade] = useState<string | null>(null);
     const [uf, setUf] = useState<string | null>(null);
     const [cep, setCep] = useState<string | null>(null);
     const [observacoes, setObservacoes] = useState<string | null>(null);  

     window.document.title = 'Prestadores - Aiye Finance';


     useEffect(() => {
          if (prestadores)
          {
               setPrestadoresFiltrados(prestadores.filter((prestador) => {
                    return prestador.nome.toLowerCase().includes(search.toLowerCase());
               }));
          }

     }, [prestadores]);


     async function handleSave()
     {
          //
     }
  
     const [show, setShow] = useState(false);
     return (
          <Container> 
               <h1 className="text-left mt-5 lead">Prestadores</h1>
               <hr className='mb-5' />
               <Row className="d-flex justify-content-between">
                    <Col xs={12}>
                         <Form>
                              <Form.Group className="mb-3 float-center" controlId="formBasicEmail">
                                   <Form.Control type="search" placeholder="Pesquisar" 
                                        value={search}
                                        onChange={(e) => {
                                             setSearch(e.target.value);
                                             setPrestadoresFiltrados(prestadores.filter((prestador) => {
                                                  return prestador.nome.toLowerCase().includes(e.target.value.toLowerCase());
                                             }))
                                        }}
                                        title='Pesquisar prestadores'
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
                         title='Atualizar prestadores'
                         onClick={() => {
                              toast.info('Atualizando prestadores...');
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
                                   prestadoresFiltrados.map((prestador) => {
                                        return (
                                             <ListGroup.Item key={prestador.id} action>
                                                  {prestador.nome}
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


export default Prestadores;