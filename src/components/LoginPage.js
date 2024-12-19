import React, { useState } from 'react';
import { loginUser } from '../api';

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const token = await loginUser(username, otp);
      onLoginSuccess(token);
      console.log({token});
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin}>Submit</button>
    </div>
  );
};

export default LoginPage;
