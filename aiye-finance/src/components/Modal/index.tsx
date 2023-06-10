import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';


interface IModalBootstrap5
{
     children: React.ReactNode;
     handleSave: () => void;
     textButton: string;
     titleModal?: string;
}

function ModalBootstrap5(props: IModalBootstrap5)
{

     const [show, setShow] = useState(false);
     return (
          <>
               <Button variant="primary" onClick={() => setShow(true)}>
                    {props.textButton}
               </Button>

               <Modal show={show} onHide={() => setShow(false)} centered>
                    <Modal.Header closeButton>
                         <Modal.Title>{props.titleModal}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         {props.children}
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={() => setShow(false)}>Sair</Button>
                         <Button variant="primary" onClick={props.handleSave}>Salvar</Button>

                    </Modal.Footer>
                    
               </Modal>
          </>
               
     )

}


export default ModalBootstrap5;