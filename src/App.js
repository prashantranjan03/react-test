import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import GraphForm from './components/GraphForm';
import LineBar from './components/LineBar';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/graph-form" element={<GraphForm/>} />
          <Route path="/line-bar" element={<LineBar/>} />
          <Route path="/old-route" element={<Navigate to="/new-route" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
