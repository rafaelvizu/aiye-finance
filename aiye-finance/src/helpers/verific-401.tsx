export default function Verific401(errorAxios: any) : void
{
     if (errorAxios.response.status === 401)
     {
          localStorage.removeItem("token");
          window.location.href = "/signin";
     }
}