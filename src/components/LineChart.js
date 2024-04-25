import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

function LineChart({ inputs }) {
    const [chartKey, setChartKey] = useState(0); 
    const chartRef = useRef(null);

    useEffect(() => {
        return () => {
            if (chartRef.current && chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }
        };
    }, [chartRef.current]);
    

    useEffect(() => {
        
        setChartKey(prevKey => prevKey + 1);
    }, [inputs]); 

    // Extract prices from each input's prices array
    const years = inputs.flatMap(input => input.prices.map(price => new Date(price.date).getFullYear()));
    const prices = inputs.flatMap(input => input.prices.map(price => price.price));

    // Construct chart data and options
    const chartData = {
        labels: years, 
        datasets: [
            {
                label: 'Price',
                data: prices, 
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                
                title: {
                    display: true,
                    text: 'Year',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price',
                },
                beginAtZero: false,
            },
        },
    };

    return (<>
        
        <div style={{padding:50}}>
            <Line key={chartKey} ref={chartRef} data={chartData} options={chartOptions} />
        </div></>
    );
}


export default LineChart;
