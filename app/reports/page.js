'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

const Reports = () => {
  const [recentSales, setRecentSales] = useState({ items: [], cash: 0 });
  const [recentChange, setRecentChange] = useState(0);
  const [user, setUser] = useState(''); // Default user can be set here or dynamically fetched

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost/tims/transaction.php?user=${user}`);
        const transactions = response.data;

        // Assuming the last transaction is the most recent sales data
        const lastTransaction = transactions[transactions.length - 1] || { items: [], cash: 0 };

        // Assuming `items` is an array of objects in the format { productID, qty, price }
        const detailedItems = await Promise.all(lastTransaction.items.map(async item => {
          const productResponse = await axios.get(`http://localhost/tims/product.php?productID=${item.productID}`);
          const product = productResponse.data;
          return {
            ...item,
            product: product.Name // Assuming the product name is stored in `Name` field
          };
        }));

        setRecentSales({ ...lastTransaction, items: detailedItems });

        const totalAmount = detailedItems.reduce((sum, item) => sum + item.qty * item.price, 0);
        setRecentChange(lastTransaction.cash - totalAmount);
      } catch (error) {
        console.error("There was an error fetching the user transactions!", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <Container className="mt-5" style={{ background: 'linear-gradient(to bottom, #001f3f, #001845)', padding: '5px', minHeight: '100vh' }}>
      <header>
        <div className="text-center" style={{ color: 'white' }}>
          <h1>Z-report</h1>
          <h2>Sales of the Day</h2>
        </div>
      </header>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Qty</th>
            <th>Product</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {recentSales.items.map((item, index) => (
            <tr key={index}>
              <td>{item.qty}</td>
              <td>{item.product}</td>
              <td>₱{item.price.toFixed(2)}</td>
              <td>₱{(item.qty * item.price).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"><strong>Total</strong></td>
            <td>₱{recentSales.items.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3"><strong>Cash Rendered</strong></td>
            <td>₱{!isNaN(recentSales.cash) ? recentSales.cash.toFixed(2) : '0.00'}</td>
          </tr>
          <tr>
            <td colSpan="3"><strong>Change</strong></td>
            <td>₱{recentChange.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Reports;
