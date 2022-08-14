import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";

function CustomTable({ data, columns, loading }) {
  const emptyDataMessage = () => { return <span className="text-middle">No tickets to show</span>;}

  return (
    <>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        loading={loading}
        striped
        hover
        pagination={paginationFactory({
          sizePerPage: 5,
          sizePerPageList: [
            {
              text: "5 Items",
              value: 5,
            },
            {
              text: "10 Items",
              value: 10,
            },
            {
              text: "All Items",
              value: data.length,
            },
          ],
        })}
        overlay={overlayFactory({
          spinner: true,
          background: "rgba(211, 211, 211, 0.3)",
        })}
        noDataIndication={emptyDataMessage}
      />
    </>
  );
}

export default CustomTable;
