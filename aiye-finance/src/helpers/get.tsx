import api from "../services/api";
import { IFornecedoresPrestadores, IUser } from "./interfaces";
import Verific401 from "./verific-401";


export function getUser(token: string) : Promise<IUser | null>
{
     return api.get('/auth/get-me', {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     })
     .then((response) => {
          return response.data.user as IUser;
     })
     .catch((error) => {
          Verific401(error);
          return null;
     });
}


export async function getFornecedoresPrestadores(token: string, tipo: string): Promise<IFornecedoresPrestadores[] | null>
{
     return api.get(`/fornecedores-prestadores?tipo=${tipo}`, {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     })
     .then((response) => {
          return response.data.fornecedoresPrestadores as IFornecedoresPrestadores[] | [];
     })
     .catch((error) => {
          Verific401(error);
          return null;
     });
}    