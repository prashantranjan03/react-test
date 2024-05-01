import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

function LineChart({ inputs }) {

    const dataPoints = inputs.flatMap(input => input.prices.map(price => ({
        year: new Date(price.date).getFullYear(),
        price: price.price
    })));

    // Sort dataPoints by year
    dataPoints.sort((a, b) => a.year - b.year);

    // Extract sorted years and prices
    const years = dataPoints.map(dataPoint => dataPoint.year);
    const prices = dataPoints.map(dataPoint => dataPoint.price);
    // Construct chart data and options
    const chartData = {
        labels: years,
        datasets: [
            {
                label: 'Price',
                data: prices,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.3,
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
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Line data={chartData} options={chartOptions} />
        </div>

    );
}


export default LineChart;
