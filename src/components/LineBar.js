import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import LineChart from './LineChart';
import CrossFilter from './CrossFilter';
import PieChart from './PieChart';


function LineBarPage() {

  const [clickedMalePercentage, setClickedMalePercentage] = useState(null);

    const handleBarClick = (malePercentage) => {
        setClickedMalePercentage(malePercentage); // Update state with clicked male percentage
        console.log(clickedMalePercentage);
    };

  // Retrieve the passed data from the location state
  const location = useLocation();
  const data = location.state && location.state.data;

  console.log('Received data:', data);

  const type = data && data.length > 0 ? data[0].type : '';
  const description = data && data.length > 0 ? data[0].description : '';

  return (
    <>
      
      <div style={{ position: 'absolute', top: 0, right: '50%', bottom: 0, left: 0 }}>
        <CrossFilter inputs={data} onBarClick={handleBarClick}/>
      </div>
      <div style={{height: '450px', marginLeft: '60%', marginTop:'10px'}}>
        <PieChart inputs={data} clickedMalePercentage={clickedMalePercentage}/>
      </div>
      
        <div style={{ border: '5px solid #ccc', padding: '20px', marginLeft: '20px', marginRight: '51%', marginTop: '20px' }}>
          <h3>{type} - {description}</h3>
          {data && <LineChart inputs={data} />}
        </div>
      
    </>
  );
}

export default LineBarPage;
