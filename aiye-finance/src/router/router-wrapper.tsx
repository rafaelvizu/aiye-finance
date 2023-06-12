import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
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
     const { token } = useContext(AuthContext);


     if (isPrivate && !token)
     {
          return <Navigate to="/signin" />;
     }

     if (!isPrivate && token)
     {
          return <Navigate to="/" />;
     }

     const Component = defaultComponent;

     return <Component />;    
}


export default RouterWrapper;