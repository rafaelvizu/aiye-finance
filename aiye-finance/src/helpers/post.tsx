import api from "../services/api";
import { toast } from 'react-toastify'


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