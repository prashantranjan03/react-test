import React from 'react';
import { useLocation } from 'react-router-dom';
import LineChart from './LineChart'; 

function LineBarPage() {
  // Retrieve the passed data from the location state
  const location = useLocation();
  const data = location.state && location.state.data;

  console.log('Received data:', data); 

  const type = data && data.length > 0 ? data[0].type : '';
  const description = data && data.length > 0 ? data[0].description : '';

  return (
    <div>
      <h3>{type} - {description}</h3>
      {data && <LineChart inputs={data} />}
    </div>
  );
}

export default LineBarPage;
