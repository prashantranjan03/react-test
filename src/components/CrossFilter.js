import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

const CrossFilter = ({ inputs, onBarClick }) => {
    const dataPoints = inputs.flatMap(input => input.prices.map(price => ({
        year: new Date(price.date).getFullYear(),
        price: price.price,
        malePercentage: price.malePercentage,
    })));

    // Sort dataPoints by year
    dataPoints.sort((a, b) => a.year - b.year);

    // Extract sorted years, prices, and male percentage
    const years = dataPoints.map(dataPoint => dataPoint.year);
    const prices = dataPoints.map(dataPoint => dataPoint.price);
    const malePercentages = dataPoints.map(dataPoint => dataPoint.malePercentage);

    const chartRef = useRef(null);

    const [clickedMalePercentages, setClickedMalePercentages] = useState([]);

    useEffect(() => {
        // setup
        const data = {
            labels: years,
            datasets: [{
                label: 'Yearly Sales',
                data: prices,
                backgroundColor: [
                    'rgba(255, 26, 104, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 26, 104, 1)',
                ],
                borderWidth: 2
            }]
        };

        // config 
        const config = {
            type: 'bar',
            data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                onClick: (evt, item) => {
                    if (item.length > 0) {
                        const clickedMalePercentage = malePercentages[item[0].index];
                        setClickedMalePercentages(clickedMalePercentage); // Add clicked male percentage to the array
                    }
                }
            }
        };

        // render init block
        const myChart = new Chart(
            chartRef.current,
            config
        );

        // Clean-up function
        return () => {
            myChart.destroy();
        };
    }, );

    // Pass the array of male percentages to the parent component
    useEffect(() => {
        onBarClick(clickedMalePercentages);
    }, [clickedMalePercentages, onBarClick]);

    return (
        <div style={{ border: '5px solid #ccc', padding: '20px', marginLeft: '20px', marginRight: '20px', marginBottom: '50px', marginTop: '20px' }}>
            <div className="chartMenu">
                <p>{inputs.type}</p>
            </div>
            <div className="chartCard">
                <div className="chartBox">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default CrossFilter;
