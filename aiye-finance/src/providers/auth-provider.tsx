import { createContext, useState, useEffect } from "react";
import { IUser } from "../helpers/interfaces";
import { getUser } from "../helpers/get";


interface AuthContextData
{
     user: IUser | null;
     token: string | null;    
     setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);


function AuthProvider({ children }: React.PropsWithChildren)
{
     const [user, setUser] = useState<IUser | null>(null);
     const [token, setToken] = useState<string | null>(null);

     useEffect(() => {
          setUserData();
     }, [token]);

     useEffect(() => {
          if (token)
          {
               localStorage.setItem("token", token);
          }

     }, [token]);

     async function setUserData()
     {
          const token = localStorage.getItem("token") as string;

          if (token)
          {
               setToken(token);
               localStorage.setItem("token", token);
               setUser(await getUser(token));
          }
     }

     return (
          <AuthContext.Provider value={{ user, token, setToken }}>
               {children}
          </AuthContext.Provider>
     );
}


export default AuthProvider;