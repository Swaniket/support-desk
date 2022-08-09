import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchTicket,
  reset,
  getTicket,
} from "../../features/tickets/ticketSlice";
import BackButton from "../../components/back-button-component/BackButton";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Ticket() {
  const { ticketId } = useParams();
  const dispatch = useDispatch();

  const { ticket, isLoading, isSuccess, isError, message } =
    useSelector(getTicket);

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(fetchTicket(ticketId));
  }, [dispatch, isError, message, ticketId]);

  return <div>Ticket</div>;
}

export default Ticket;
