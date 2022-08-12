import { Modal, Button } from "react-bootstrap";

function CustomModal({ show, handleClose, onConfirm, message }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Attention!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
