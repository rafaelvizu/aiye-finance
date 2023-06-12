import api from "../services/api";
import { toast } from 'react-toastify'
import { IFornecedoresPrestadores } from "./interfaces";


export async function postSignin(username: string, password: string) : Promise<string | null>
{
     return api.post('/auth/signin', {
          username,
          password,
     })
     .then((response) => {
          toast.success('Login realizado com sucesso');
          return response.data.token;
     })
     .catch((error) => {
          console.error(error);
          toast.error('Erro ao fazer login: ' + error.response.data.message);
          return null;
     });
}  

export async function postFornecedoresPrestadores(data: IFornecedoresPrestadores, token: string, tipo: string) : Promise<IFornecedoresPrestadores | null>
{
     // tipo é uma query
     return api.post(`/tipo/${tipo}`, data, {
          headers: {
               Authorization: `Bearer ${token}`,
          }
     })
     .then((response) => {    
          toast.success('Fornecedor adicionado com sucesso');
          return response.data.fornecedorPrestador as IFornecedoresPrestadores;
     })
     .catch((error) => {
          console.error(error);
          toast.error('Erro ao adicionar fornecedor: ' + error.response.data.message);
          return null;
     });
}