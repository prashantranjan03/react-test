import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ selectedData, inputs, clickedMalePercentage }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    console.log('clickedMalePercentage:', clickedMalePercentage);

    useEffect(() => {
        // Calculate male and female percentages based on selected data if available
        let malePercentage = 0;
        if (selectedData) {
            const maleCount = selectedData.filter(data => data.gender === 'Male').length;
            const totalCount = selectedData.length;
            malePercentage = (maleCount / totalCount) * 100;
        } else {
            // Calculate male percentage based on inputs if no selected data
            let totalMalePercentage = 0;
            let malePercentageCount = 0;
            inputs.forEach(input => {
                input.prices.forEach(price => {
                    if (!isNaN(parseFloat(price.malePercentage))) {
                        totalMalePercentage += parseFloat(price.malePercentage);
                        malePercentageCount++;
                    }
                });
            });
            malePercentage = malePercentageCount > 0 ? totalMalePercentage / malePercentageCount : 0;
        }

        // Calculate female percentage based on male percentage
        const femalePercentage = 100 - malePercentage;
        const clickedFemalePercentage = 100 - clickedMalePercentage;

        // Create or update the chart instance
        const ctx = chartRef.current.getContext('2d');

        if (clickedMalePercentage !== null && clickedMalePercentage !== undefined && clickedFemalePercentage!==100) {
            console.log('clickedMalePercentage:', clickedMalePercentage);
            console.log('clickedFemalePercentage:', clickedFemalePercentage);
            if (chartInstanceRef.current) {
                chartInstanceRef.current.data.labels = ['Male', 'Female'];
                chartInstanceRef.current.data.datasets[0].data = [clickedMalePercentage, clickedFemalePercentage];
                chartInstanceRef.current.update();
            } else {
                const newChartInstance = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Male', 'Female'],
                        datasets: [{
                            label: 'Male vs Female Customers',
                            data: [clickedMalePercentage, clickedFemalePercentage],
                            backgroundColor: ['#007bff', '#ffc107']
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
                chartInstanceRef.current = newChartInstance;
            }
        } else {
            console.log('clickedMalePercentage is null or undefined');
            if (chartInstanceRef.current) {
                chartInstanceRef.current.data.labels = ['Male', 'Female'];
                chartInstanceRef.current.data.datasets[0].data = [malePercentage, femalePercentage];
                chartInstanceRef.current.update();
            } else {
                const newChartInstance = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Male', 'Female'],
                        datasets: [{
                            label: 'Male vs Female Customers',
                            data: [malePercentage, femalePercentage],
                            backgroundColor: ['#007bff', '#ffc107']
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
                chartInstanceRef.current = newChartInstance;
            }
        }
    }, [selectedData, inputs, clickedMalePercentage]);

    return <canvas ref={chartRef} />;
};

export default PieChart;
