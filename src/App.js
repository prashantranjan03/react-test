import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import GraphForm from './components/GraphForm';
import LineBar from './components/LineBar';

function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/graph-form" element={<GraphForm/>} />
          <Route path="/line-bar" element={<LineBar/>} />
          
        </Routes>
      
    </Router>
  );
}

export default App;
