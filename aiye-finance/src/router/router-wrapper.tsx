import { Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../providers/auth-provider';


interface Props
{
     defaultComponent: React.ComponentType;
     isPrivate: boolean;
}


function RouterWrapper({
     defaultComponent,
     isPrivate,
}: Props)
{
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const { token } = useContext(AuthContext);


     useEffect(() => {

          if (token)
          {
               setIsAuthenticated(true);
               return;
          }

          setIsAuthenticated(false);
     }, [token]);

     if (isPrivate && !isAuthenticated)
     {
          return <Navigate to="/signin" />;
     }

     if (!isPrivate && isAuthenticated)
     {
          return <Navigate to="/" />;
     }

     const Component = defaultComponent;

     return <Component />;    
}


export default RouterWrapper;