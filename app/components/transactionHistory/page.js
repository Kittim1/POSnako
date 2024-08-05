'use client'
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transaction history from API
    axios.get('http://localhost/tims/transactions.php') // Assume this endpoint exists
      .then(response => setTransactions(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h3>Transaction History</h3>
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.details}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TransactionHistory;
