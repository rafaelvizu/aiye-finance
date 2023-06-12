import { createContext, useState, useEffect, useContext } from 'react';
import { IFornecedoresPrestadores } from '../helpers/interfaces';
import { getFornecedoresPrestadores } from '../helpers/get';
import { toast } from 'react-toastify';
import { AuthContext } from './auth-provider';


interface IMainDataProvider
{
     fornecedores: IFornecedoresPrestadores[];
     prestadores: IFornecedoresPrestadores[];
     getAll: () => Promise<void>;
}

interface IMainDataProviderProps
{
     children: React.ReactNode;
}

export const MainDataContext = createContext<IMainDataProvider>({} as IMainDataProvider);

function MainDataProvider({ children }: IMainDataProviderProps)
{
     const [fornecedores, setFornecedores] = useState<IFornecedoresPrestadores[]>([]);
     const [prestadores, setPrestadores] = useState<IFornecedoresPrestadores[]>([]);
     const { token } = useContext(AuthContext);

     useEffect(() => {
          if (token) {
               getAll();
          }
     }, [token]);

     async function getAll()
     {
          if (token) {
               const fornecedoresData = await getFornecedoresPrestadores(token, 'FORNECEDOR');
               const prestadoresData = await getFornecedoresPrestadores(token, 'PRESTADOR');
               if (fornecedoresData && prestadoresData) {
                    setFornecedores(fornecedoresData);
                    setPrestadores(prestadoresData);
                    
               }
               else 
               {
                    toast.error('Erro ao buscar fornecedores');
                    setFornecedores([]);
                    setPrestadores([]);
               }

          }
     }

     return (
          <MainDataContext.Provider value={{ fornecedores, prestadores, getAll }}>
               {children}
          </MainDataContext.Provider>
     )
}


export default MainDataProvider;