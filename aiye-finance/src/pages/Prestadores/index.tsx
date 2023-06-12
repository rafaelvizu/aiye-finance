import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MainDataContext } from '../../providers/main-data-provider';
import { IFornecedoresPrestadores } from '../../helpers/interfaces';

import { postFornecedoresPrestadores } from '../../helpers/post';
import { AuthContext } from '../../providers/auth-provider';
// styles
import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { RxUpdate } from 'react-icons/rx';
import { ListGroup } from 'react-bootstrap';
// components
import Loading from '../../components/Loading';
import ModalBootstrap5 from '../../components/Modal';
// helpers
import { formatCEP, formatCNPJ, 
     formatCPF, formatTelefone, 
     formatUF, unformatCEP, 
     unformatCNPJ, unformatCPF, 
     unformatTelefone 
} from '../../helpers/formatText';
import { deleteFornecedorPrestador } from '../../helpers/delete';


function Prestadores()
{    
     const [prestadoresFiltrados, setPrestadoresFiltrados] = useState<IFornecedoresPrestadores[]>([]);
     const [search, setSearch] = useState<string>('');
     const [loading, setLoading] = useState<boolean>(false);

     const { prestadores, getAll } = useContext(MainDataContext);
     const { token } = useContext(AuthContext);

     const [nome, setNome] = useState<string>('');
     const [email, setEmail] = useState<string | null>(null);
     const [cpf, setCpf] = useState<string | null>(null);
     const [cnpj, setCnpj] = useState<string | null>(null);
     const [telefone_1, setTelefone_1] = useState<string | null>(null);
     const [telefone_2, setTelefone_2] = useState<string | null>(null);
     const [endereco, setEndereco] = useState<string | null>(null);
     const [numero, setNumero] = useState<number | null>(null);
     const [complemento, setComplemento] = useState<string | null>(null);
     const [bairro, setBairro] = useState<string | null>(null);  
     const [cidade, setCidade] = useState<string | null>(null);
     const [uf, setUf] = useState<string | null>(null);
     const [cep, setCep] = useState<string | null>(null);
     const [observacao, setObservacao] = useState<string | null>(null);  

     window.document.title = 'Prestadores - Aiye Finance';


     useEffect(() => {
          setPrestadoresFiltrados(prestadores.filter((prestador) => {
               return prestador.nome.toLowerCase().includes(search.toLowerCase());
          }));
     }, [prestadores]);


     async function handleSave(e: React.FormEvent<HTMLFormElement>)
     {
          e.preventDefault();
          setLoading(true);
          const data = {
               nome,
               email: email ? email : null,
               cpf: cpf ? unformatCPF(cpf as string) : null,
               cnpj: cnpj ? unformatCNPJ(cnpj as string) : null,
               telefone_1: telefone_1 ? unformatTelefone(telefone_1 as string) : null,
               telefone_2: telefone_2 ? unformatTelefone(telefone_2 as string) : null,
               endereco: endereco ? endereco : null,
               numero: numero ? numero : null,
               complemento: complemento ? complemento : null,
               bairro: bairro ? bairro : null,
               cidade: cidade ? cidade : null,
               uf: uf ? uf : null,
               cep: cep ? unformatCEP(cep as string) : null,
               observacao: observacao ? observacao : null,
          } as IFornecedoresPrestadores;

          const response = await postFornecedoresPrestadores(data, token as string, 'PRESTADOR');

          setLoading(false);

          if (response)
          {
               toast.success('Prestador adicionado com sucesso');
               getAll();
               clearFields();
               return;
          }
     }

     async function handleDelete(id: number) 
     {
          setLoading(true);
          const response = await deleteFornecedorPrestador(id, token as string);

          setLoading(false);

          if (response)  
          {
               toast.success('Prestador excluído com sucesso');
               getAll();
               return;
          }

          toast.error('Erro ao excluir fornecedor');
     }

     function clearFields()
     {
          setNome('');
          setEmail(null);
          setCpf(null);
          setCnpj(null);
          setTelefone_1(null);
          setTelefone_2(null);
          setEndereco(null);
          setNumero(null);
          setComplemento(null);
          setBairro(null);
          setCidade(null);
          setUf(null);
          setCep(null);
          setObservacao(null);
     }

  
     if (loading)
     {
          return <Loading />
     }
     
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
                         <ModalBootstrap5 textButton="Novo" titleModal="Adicionar Prestador">
                              <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSave(e)}>
                                   <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="mb-1">
                                             Nome
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Nome"
                                             value={nome}
                                             onChange={(e) => setNome(e.target.value)}
                                             minLength={1} maxLength={100}
                                             required
                                        />
                                   
                                        <Form.Label className="mb-1 mt-3">
                                             Email
                                        </Form.Label>
                                        <Form.Control type="email" placeholder="Email"
                                             value={email ? email : ''}
                                             onChange={(e) => setEmail(e.target.value)}
                                             maxLength={100}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             CPF
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="CPF"
                                             value={cpf ? cpf : ''}
                                             onChange={(e) => setCpf(formatCPF(e.target.value))}
                                             maxLength={14} minLength={14}
                                             onPaste={(e) => { setCpf(formatCPF(e.clipboardData.getData('text'))) }}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             CNPJ
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="CNPJ"
                                             value={cnpj ? cnpj : ''}
                                             onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                                             maxLength={18} minLength={18}
                                             onPaste={(e) => { setCnpj(formatCNPJ(e.clipboardData.getData('text'))) }}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             Telefone 1
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Telefone 1"
                                             maxLength={15}
                                             value={telefone_1 ? telefone_1 : ''}
                                             onChange={(e) => setTelefone_1(formatTelefone(e.target.value))}
                                             minLength={15}
                                             onPaste={(e) => { setTelefone_1(formatTelefone(e.clipboardData.getData('text'))) }}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             Telefone 2
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Telefone 2"
                                             value={telefone_2 ? telefone_2 : ''}
                                             onChange={(e) => setTelefone_2(formatTelefone(e.target.value))}
                                             maxLength={15} minLength={15}
                                             onPaste={(e) => { setTelefone_2(formatTelefone(e.clipboardData.getData('text'))) }}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             Endereço
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Endereço"
                                             value={endereco ? endereco : ''}
                                             onChange={(e) => setEndereco(e.target.value)}
                                             maxLength={100} minLength={1}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             Número
                                        </Form.Label>
                                        <Form.Control type="number" placeholder="Número"
                                             value={numero ? numero : ''}
                                             onChange={(e) => setNumero(Number(e.target.value))}
                                             min={0}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             Complemento
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Complemento"
                                             value={complemento ? complemento : ''}
                                             onChange={(e) => setComplemento(e.target.value)}
                                             maxLength={100} minLength={1}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             Bairro
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Bairro"
                                             value={bairro ? bairro : ''}
                                             onChange={(e) => setBairro(e.target.value)}
                                             maxLength={100} minLength={1}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             Cidade
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Cidade"
                                             value={cidade ? cidade : ''}
                                             onChange={(e) => setCidade(e.target.value)}
                                             maxLength={100} minLength={1}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             UF
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="UF"
                                             value={uf ? uf : ''}
                                             onChange={(e) => setUf(formatUF(e.target.value))}
                                             maxLength={2} minLength={2}
                                             onPaste={(e) => { setUf(formatUF(e.clipboardData.getData('text'))) }}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             CEP
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="CEP"
                                             value={cep ? cep : ''}
                                             onChange={(e) => setCep(formatCEP(e.target.value))}
                                             maxLength={9} minLength={9}
                                             onPaste={(e) => { setCep(formatCEP(e.clipboardData.getData('text'))) }}
                                        />
                                        <Form.Label className="mb-1 mt-3">
                                             Observações
                                        </Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Observações"
                                             value={observacao ? observacao : ''}
                                             onChange={(e) => setObservacao(e.target.value)}
                                             maxLength={250} minLength={1}
                                        />
                                        <Form.Control type="submit" className="mt-3 bg-primary text-white"
                                             value="Salvar" 
                                        />
                                   </Form.Group>
                              </Form>                              
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
                         <ListGroup className="mt-3">
                              {
                                   prestadoresFiltrados.map((prestador) => {
                                        return (
                                             <ListGroup.Item key={prestador.id} action>
                                                  <Row>
                                                       <Col xs={6}>
                                                            <h5 className="mb-1">{prestador.nome}</h5>
                                                       </Col>

                                                       <Col xs={6} className="d-flex justify-content-end"> 
                                                            <Link className="btn btn-primary me-2" to={`/prestadores/${prestador.id}`}>
                                                                 Editar
                                                            </Link>
                                                            <Button variant="danger" className="me-2"
                                                                 onClick={() => handleDelete(prestador.id as number)}
                                                            >
                                                                 Excluir   
                                                            </Button>

                                                       </Col>

                                                  </Row>
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