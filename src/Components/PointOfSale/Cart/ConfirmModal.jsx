import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, onClose, onConfirm, operation }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {operation === "update" ? (
            <p>Update Confirmation</p>
          ) : (
            <p>Delete Confirmation</p>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {operation === "update" ? (
          <p>Are you sure you want to update?</p>
        ) : (
          <p>Are you sure you want to delete?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={operation === "update" ? "primary" : "danger"}
          onClick={onConfirm}
        >
          {operation === "update" ? "Update" : "Delete"}
        </Button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
