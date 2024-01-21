import React from 'react';
import { useState, useEffect } from 'react';
import './Chart.css';
import { LineChart } from '@mui/x-charts/LineChart';

function TemperatureChart() {
    const [temperatureData, setTemperatureData] = useState([]);
    const [timeData, setTimeData] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m`
                );
        
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setTemperatureData(data.hourly.temperature_2m);
                setTimeData(data.hourly.time);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
  
    const take = (arr, n = 1) => arr.slice(0, n);


    return (
        <div className='chart'>
            <h2>Temperature Forecast Chart For London</h2>
            <LineChart
                xAxis={[{ dataKey: 'year',
                    data: take(timeData.map(xy => {
                        return +new Date(xy)
                    }), 163),
                    valueFormatter: (v) => new Date(v).toDateString(),
                }]}
                series={[ 
                    { data: take(temperatureData, 163) }
                ]}  
                width={800}
                height={500} 
            />
        </div>
    );
};
  
export default TemperatureChart;
