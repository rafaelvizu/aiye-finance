import api from "../services/api";


export function getUser(token: string) 
{
     return api.get('/auth/get-me', {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     })
     .then((response) => {
          return response.data.user;
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