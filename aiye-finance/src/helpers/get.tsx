import api from "../services/api";
import { IFornecedoresPrestadores, IUser } from "./interfaces";

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
          if (error.status === 401)
          {
               localStorage.removeItem("token");
               window.location.href = "/signin";
          }
          return null;
     });
}


export async function getFornecedoresPrestadores(token: string, page: number, 
     search: string, tipo: string): Promise<IFornecedoresPrestadores[] | null>
{
     return api.get(`/fornecedores?page=${page}&search=${search}&tipo=${tipo}`, {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     })
     .then((response) => {
          return response.data.fornecedoresPrestadores as IFornecedoresPrestadores[] | [];
     })
     .catch((error) => {
          if (error.status === 401)
          {
               localStorage.removeItem("token");
               window.location.href = "/signin";
          }
          return null;
     });
}    