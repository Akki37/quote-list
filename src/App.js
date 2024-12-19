import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './styles.css';
import LoginPage from './components/LoginPage';
import QuoteList from './components/QuoteList';
import QuoteCreation from './components/QuoteCreation';

const App = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    navigate('/quote-list');
  };

  return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          />

          <Route
            path="/quote-list"
            element={<QuoteList />}
          />

          <Route
            path="/quote-creation"
            element={<QuoteCreation />}
          />
        </Routes>
      </div>
  );
};

export default App;
