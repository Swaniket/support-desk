import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchTickets,
  reset,
  getTicket,
} from "../../features/tickets/ticketSlice";

import BackButton from "../../components/back-button-component/BackButton";
import CustomTable from "../../components/custom-table-component/CustomTable";
import ViewTicket from "../../components/view-ticket-component/ViewTicket";

function Tickets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openViewTicket, setOpenViewTicket] = useState(false);
  const [viewTicketData, setViewTicketData] = useState({});

  const { tickets, isLoading, isSuccess } = useSelector(getTicket);

  // Will run on unmount
  useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset());
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const closeViewTicketModal = () => {
    setOpenViewTicket(false);
    setViewTicketData({});
  };

  const handleEditUser = (rowData) => {
    // navigate(`/ticket/${rowData._id}`);
    setViewTicketData(rowData);
    setOpenViewTicket(true);
  };

  const viewTicketButton = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        <button
          className="btn btn-outline-dark"
          onClick={() => handleEditUser(row)}
        >
          View Ticket
        </button>
      </>
    );
  };

  const columns = [
    {
      dataField: "project",
      text: "Project Name",
      sort: true,
    },
    {
      dataField: "title",
      text: "Issue Title",
      sort: true,
    },
    {
      dataField: "description",
      text: "Issue Description",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Created",
      sort: true,
    },
    {
      dataField: "actions",
      text: "Action",
      formatter: viewTicketButton,
      style: { fontSize: "small" },
    },
  ];

  return (
    <>
      <BackButton url="/" />
      <section>
        <h1 className="heading">My Tickets</h1>
      </section>
      <div className="tickets">
        <CustomTable data={tickets} columns={columns} key="id" />
      </div>
      <ViewTicket
        show={openViewTicket}
        handleClose={closeViewTicketModal}
        data={viewTicketData}
      />
    </>
  );
}

export default Tickets;