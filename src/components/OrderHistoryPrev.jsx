import React from 'react'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'
import { useSelector } from 'react-redux'

const OrderHistoryPrev = () => {
  const columns = [

    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Price (Rs)",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "payment",
      headerName: "Payment",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1,
    }
  ];

  const {cartItems} = useSelector(state=>state.cart)

  return (
    <div className="order-history-container">
      <div className="profile-headings">
        <h1>Order History</h1>
      </div>
      <div className="order-history-table">
        <DataGrid rows={cartItems} columns={columns} components={{Toolbar: GridToolbar}} pageSizeOptions={[4, 8, 12]}/>
      </div>
    </div>
  )
}

export default OrderHistoryPrev