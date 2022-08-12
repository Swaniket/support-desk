import { Button, Modal, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { getTicket } from "../../features/tickets/ticketSlice";
import { closeTicket } from "../../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../../features/auth/authSlice";

function ViewTicket({ show, handleClose, data, type }) {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(getTicket);
  const isAdmin = useSelector(getAdmin);

  const onTicketClose = async () => {
    if (data.status === "closed") toast.error("Ticket is already closed");
    const res = await dispatch(closeTicket(data._id));

    if (res.payload.project) {
      toast.success("Ticket Closed");
      handleClose();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <small>ID: {data._id}</small>{" "}
            <span className={`status status-${data.status}`}>
              {data.status}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <h4>Issue: {data.title}</h4>
            {/* Date */}
            <small>
              Date Submitted: {new Date(data.createdAt).toLocaleString("en-US")}
            </small>
            {/* Description */}
            <div className="ticket-desc">
              <h5>Description</h5>
              <p>{data.description}</p>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Exit
          </Button>
          {isAdmin && type === "adminForm" && (
            <button
              className="btn btn-outline-danger"
              onClick={onTicketClose}
              disabled={data.status === "closed" || isLoading}
            >
              {isLoading ? "loading..." : "Close Ticket"}
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewTicket;
