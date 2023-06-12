// para fazer um loading usando o bootstrap, basta usar o componente spinner
import { Spinner, Container } from 'react-bootstrap';


function Loading()
{
     return (
          <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
               <Spinner animation="border" variant="primary" />
          </Container>
     );
}

export default Loading;