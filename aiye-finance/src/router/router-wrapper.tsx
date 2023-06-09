import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


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

     useEffect(() => {
          const token = localStorage.getItem('@token');

          if (token)
          {
               setIsAuthenticated(true);
               return;
          }

          setIsAuthenticated(false);
     }, []);

     if (isPrivate && !isAuthenticated)
     {
          return <Navigate to="/" />;
     }

     if (!isPrivate && isAuthenticated)
     {
          return <Navigate to="/dashboard" />;
     }

     const Component = defaultComponent;

     return <Component />;    
}


export default RouterWrapper;