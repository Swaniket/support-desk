const getTicketKPIS = (tickets) => {
  const totalTickets = tickets.length;

  var openTickets = 0;
  tickets.forEach((ticket) => {
    if (ticket.status === "new") {
      openTickets = openTickets + 1;
    }
  });

  var closedTickets = 0;
  tickets.forEach((ticket) => {
    if (ticket.status === "closed") {
      closedTickets = closedTickets + 1;
    }
  });
  return { totalTickets, openTickets, closedTickets };
};

module.exports = {
  getTicketKPIS,
};
