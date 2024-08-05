'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap';

function Page() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (user === "" || password === "") {
      alert("Please enter username and password");
      return;
    }

    try {
      const url = "http://localhost/tims/user.php";
      const res = await axios.post(url, { user, password });
      const userDetails = res.data;

      if (userDetails) {
        localStorage.setItem("username", userDetails.user); // Store username for later use
        if (userDetails.user === 'Admin') {
          router.push("/reports");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid username or password");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submit behavior
      handleLogin();
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <Card bg='dark' style={{ width: '50rem', height: '30rem', padding: '5rem' }}>
        <Card.Header>
          <Card.Title className='text-white'><h2>Login</h2></Card.Title>
          <div className='text-white'><h5>Please Login Here</h5></div>
        </Card.Header>
        <Card.Body>
          <Form onKeyPress={handleKeyPress}>
            <FloatingLabel label="Username" className='mb-3'>
              <Form.Control
                type="text"
                placeholder="Username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Password" className='mb-3'>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <Button variant="primary" onClick={handleLogin}>Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Page;
