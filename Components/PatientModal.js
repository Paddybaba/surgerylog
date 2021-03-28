import Modal from 'react-modal'
import useState from 'react'
import 'bootstrap/dist/css/bootstrap.css'

function PatientModal({show, setShow}) {
    // const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <button variant="primary" onClick={handleShow}>
          New Patient Details
        </button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Don't even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
            <button variant="primary">Understood</button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default PatientModal;