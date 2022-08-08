import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

function CustomTable({ data, columns }) {
  return (
    <>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
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
      />
    </>
  );
}

export default CustomTable;
