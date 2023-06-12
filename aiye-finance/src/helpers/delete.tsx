import api from "../services/api";


export async function deleteFornecedorPrestador(id: number, token: string) : Promise<boolean>
{
     return api.delete(`/fornecedores-prestadores/${id}`, {
          headers: {
               'Authorization': `Bearer ${token}`
          },
     })
     .then(() => {
          return true;
     })
     .catch(() => {
          return false;
     });
}