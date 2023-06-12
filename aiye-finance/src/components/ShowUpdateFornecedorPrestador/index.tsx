import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// bootstrap
import { Container, Form } from 'react-bootstrap';
// helpers
import { getFornecedoresPrestadoresById } from '../../helpers/get';
import { toast } from 'react-toastify';
import { formatCEP, formatCNPJ, formatCPF, formatTelefone, formatUF, unformatCEP, unformatCNPJ, unformatCPF, unformatTelefone } from '../../helpers/formatText';
// components
import Loading from '../Loading';
import { putFornecedoresPrestadores } from '../../helpers/put';
import { IFornecedoresPrestadores } from '../../helpers/interfaces';


function ShowUpdateFornecedorPrestador()
{
     const { id } = useParams<{ id: string }>();

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

     const [loading, setLoading] = useState<boolean>(true);

     useEffect(() => {
          getFornecedorPrestador();
     }, [])


     async function getFornecedorPrestador()
     {
          let tipo = '';
          if (window.location.href.includes('fornecedores'))
          {
               tipo = 'FORNECEDOR';
          }
          else 
          {
               tipo = 'PRESTADOR';
          }

          const data = await getFornecedoresPrestadoresById(localStorage.getItem('token') as string, id as string, tipo);
          if (data)
          {
               setNome(data.nome);
               setEmail(data.email || null);
               setCpf(data.cpf ? formatCPF(data.cpf) : null);
               setCnpj(data.cnpj ? formatCNPJ(data.cnpj) : null);
               setTelefone_1(data.telefone_1 ? formatTelefone(data.telefone_1) : null);
               setTelefone_2(data.telefone_2 ? formatTelefone(data.telefone_2) : null);
               setEndereco(data.endereco || null);
               setNumero(data.numero || null);
               setComplemento(data.complemento || null);
               setBairro(data.bairro || null);
               setCidade(data.cidade || null);
               setUf(data.uf ? formatUF(data.uf) : null);
               setCep(data.cep ? formatCEP(data.cep) : null);
               setObservacao(data.observacao || null);
               setLoading(false);
               return;
          }

          await new Promise(resolve => setTimeout(resolve, 1000));
          window.location.href = `/${tipo}es`;
     }

     async function handleUpdate(e: React.FormEvent<HTMLFormElement>)
     {
          e.preventDefault();

          const data = {
               nome,
               email,
               cpf: cpf ? unformatCPF(cpf) : null,
               cnpj: cnpj ? unformatCNPJ(cnpj) : null,
               telefone_1: telefone_1 ? unformatTelefone(telefone_1) : null,
               telefone_2: telefone_2 ? unformatTelefone(telefone_2) : null,
               endereco,
               numero,
               complemento,
               bairro,
               cidade,
               uf: uf || null,
               cep: cep ? unformatCEP(cep) : null,
               observacao,
          } as IFornecedoresPrestadores;

          const tipo = window.location.href.includes('fornecedores') ? 'FORNECEDOR' : 'PRESTADOR';

          const response = await putFornecedoresPrestadores(localStorage.getItem('token') as string, id as string, tipo, data);
          if (response)
          {
               toast.success('Atualizado com sucesso!');
               return;
          }

          toast.error('Erro ao atualizar!');
          
     }

     if (loading)
     {
          return <Loading />
     }
     
     return (
          <Container className="mt-5">
               <h1>Ver {
                    window.location.href.includes('fornecedores') ? 'Fornecedor' : 'Prestador'
               }</h1>    
               <hr />
               <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleUpdate(e)}>
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
                              onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => setCpf(formatCPF(e.currentTarget.value))}
                         />
                         <Form.Label className="mb-1 mt-3">
                              CNPJ
                         </Form.Label>
                         <Form.Control type="text" placeholder="CNPJ"
                              value={cnpj ? cnpj : ''}
                              onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                              maxLength={18} minLength={18}
                              onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => setCnpj(formatCNPJ(e.currentTarget.value))}
                         />
                         <Form.Label className="mb-1 mt-3">
                              Telefone 1
                         </Form.Label>
                         <Form.Control type="text" placeholder="Telefone 1"
                              maxLength={15}
                              value={telefone_1 ? telefone_1 : ''}
                              onChange={(e) => setTelefone_1(formatTelefone(e.target.value))}
                              minLength={15}
                              onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => setTelefone_1(formatTelefone(e.currentTarget.value))}
                         />
                         <Form.Label className="mb-1 mt-3">
                              Telefone 2
                         </Form.Label>
                         <Form.Control type="text" placeholder="Telefone 2"
                              value={telefone_2 ? telefone_2 : ''}
                              onChange={(e) => setTelefone_2(formatTelefone(e.target.value))}
                              maxLength={15} minLength={15}
                              onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => setTelefone_2(formatTelefone(e.currentTarget.value))}
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
                              onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => setUf(formatUF(e.currentTarget.value))}
                         />
                         <Form.Label className="mb-1 mt-3">
                              CEP
                         </Form.Label>
                         <Form.Control type="text" placeholder="CEP"
                              value={cep ? cep : ''}
                              onChange={(e) => setCep(formatCEP(e.target.value))}
                              maxLength={9} minLength={9}
                              onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => setCep(formatCEP(e.currentTarget.value))}
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
          </Container>
     );

}


export default ShowUpdateFornecedorPrestador;