import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SummaryApi from '../common';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Orders() {
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchData = async () => {
    try {
      const apiCall = await fetch(SummaryApi.getUserOrder.url, {
        method: "GET",
        credentials: "include",
      });
      const dat = await apiCall.json();
      console.log(dat)
      setData(dat);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className='mt-32 mx-40'>
      <div className='flex justify-center mb-11'>
        <h2 className='font-semibold'>My Orders</h2>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell align="right">Total Price</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order) => (
              <StyledTableRow key={order._id}>
                <StyledTableCell component="th" scope="row">
                  {order._id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {order.totalPrice}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(order.createdAt).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {order.status}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button onClick={() => handleViewDetails(order)}>View Details</button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedOrder && (
        <div>
          <h3>Order Details</h3>
          <p>Shipping Address: {selectedOrder.shippingAddress.detailedAddress}, {selectedOrder.shippingAddress.city}</p>
          <h4>Products:</h4>
          <ul>
            {selectedOrder.products.map((product) => (
              <li key={product.productId}>{product.productId.productName} - Quantity: {product.quantity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
