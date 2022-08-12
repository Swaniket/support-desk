import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTickets,
  getAdminState,
} from "../../features/admin/adminSlice";

import CustomCard from "../../components/custom-card-component/CustomCard";
import "./dashboard.css";
import CustomTable from "../../components/custom-table-component/CustomTable";
import ViewTicket from "../../components/view-ticket-component/ViewTicket";

function Dashboard() {
  const dispatch = useDispatch();

  const [openViewTicket, setOpenViewTicket] = useState(false);
  const [viewTicketData, setViewTicketData] = useState({});

  const { tickets, isLoading, isError } = useSelector(getAdminState);

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const closeViewTicketModal = () => {
    setOpenViewTicket(false);
    setViewTicketData({});
    dispatch(fetchAllTickets());
  };

  const handleEditUser = (rowData) => {
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
      dataField: "userEmail",
      text: "User Email",
      sort: true,
    },
    {
      dataField: "userName",
      text: "User name",
      sort: true,
    },
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
      text: "Description",
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
      <div className="card-layout">
        <CustomCard title="Total Tickets" value="100" />
        <CustomCard title="Open Ticket" value="97" />
        <CustomCard title="Resolved Tickets" value="3" />
      </div>
      <CustomTable data={tickets} columns={columns} key="id" loading={isLoading} />
      <ViewTicket
        show={openViewTicket}
        handleClose={closeViewTicketModal}
        data={viewTicketData}
        type="adminForm"
      />
    </>
  );
}

export default Dashboard;
