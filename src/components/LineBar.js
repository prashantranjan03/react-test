import React from 'react';
import { useLocation } from 'react-router-dom';
import LineChart from './LineChart'; 

function LineBarPage() {
  // Retrieve the passed data from the location state
  const location = useLocation();
  const data = location.state && location.state.data;

  console.log('Received data:', data); 

  return (
    <div>
      <h2>Line Chart</h2>
      {data && <LineChart inputs={data} />}
    </div>
  );
}

export default LineBarPage;
