import api from "../services/api";
import { IFornecedoresPrestadores } from "./interfaces";


export async function putFornecedoresPrestadores(token: string, id: string, tipo: string, data: IFornecedoresPrestadores): Promise<boolean>
{
     return api.put(`/fornecedores-prestadores/${id}?tipo=${tipo}`, data, {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     })
     .then(() => {
          return true;
     })
     .catch(() => {
          return false;
     });
}


