import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    // Validate password criteria
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Login successful');
      // Redirect to the next page only if login is successful
      navigate('/graph-form');
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div style={{ width: '500px', margin: '0 auto', padding: '50px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', marginTop: '5%' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }}
          />
          {errors.email && <div style={{ color: 'red', fontSize: '0.8em' }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }}
          />
          {errors.password && <div style={{ color: 'red', fontSize: '0.8em' }}>{errors.password}</div>}
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <a href="/forgot-password" style={{ fontSize: '1em', textDecoration: 'none', color: '#110251' }}>Forgot Password?</a>
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '5px', backgroundColor: '#110251', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
