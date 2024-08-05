'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import UserManagement from '../userManagement/page';
import ProductManagement from '../productManagement/page';  
import SalesReports from '../salesReport/page';  
import TransactionHistory from '../transactionHistory/page';  
import Settings from '../settings/page';  

function AdminDashboard() {
  // State to manage the active tab
  const [activeKey, setActiveKey] = useState('user-management');

  return (
    <Container fluid>
      <Row>
        <Col md={2} className='bg-dark text-white p-3'>
          <h4>Admin Dashboard</h4>
          <Nav 
            variant="pills" 
            className="flex-column" 
            activeKey={activeKey} 
            onSelect={(selectedKey) => setActiveKey(selectedKey)}
          >
            <Nav.Item>
              <Nav.Link eventKey="user-management">User Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="product-management">Product Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sales-reports">Sales Reports</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="transaction-history">Transaction History</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="settings">Settings</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10}>
          <Tab.Content className='p-3'>
            <Tab.Pane eventKey="user-management">
              <UserManagement />
            </Tab.Pane>
            <Tab.Pane eventKey="product-management">
              <ProductManagement />
            </Tab.Pane>
            <Tab.Pane eventKey="sales-reports">
              <SalesReports />
            </Tab.Pane>
            <Tab.Pane eventKey="transaction-history">
              <TransactionHistory />
            </Tab.Pane>
            <Tab.Pane eventKey="settings">
              <Settings />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
