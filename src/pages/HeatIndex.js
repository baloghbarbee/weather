import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import './HeatIndex.css'
import Button from '@mui/material/Button';

function HeatIndexCalculator() {
    const [temperature, setTemperature] = useState('');
    const [relativeHumidity, setRelativeHumidity] = useState('');
    const [fahrenheitChecked, setFahrenheitChecked] = useState(true);
    const [heatIndex, setHeatIndex] = useState();


    const convertToFahrenheit = (celsius) => {
        return celsius * (9 / 5) + 32;
    };

    const handleChange = (event) => {
        setFahrenheitChecked(event.target.checked);
    };


    const calculateHeatIndex = () => {
        const T = parseFloat(temperature);
        const rh = parseFloat(relativeHumidity);

        if (Number(T) && Number(rh)) {

            const temperatureFahrenheit = fahrenheitChecked === false ? convertToFahrenheit(T) : T
            if (temperatureFahrenheit < 80) {
                alert('Air temperature cant be less than 80F')
            }
            
            // Calculate heat index
            const heatIndexValue =
                -42.379 + (2.04901523 * temperatureFahrenheit) + (10.14333127 * rh) - (0.22475541 * temperatureFahrenheit * rh) -
                (6.83783 * Math.pow(10, -3) * Math.pow(temperatureFahrenheit, 2)) - (5.481717 * Math.pow(10, -2) * Math.pow(rh, 2)) +
                (1.22874 * Math.pow(10, -3) * Math.pow(temperatureFahrenheit, 2) * rh) +
                (8.5282 * Math.pow(10, -4) * temperatureFahrenheit * Math.pow(rh, 2)) -
                (1.99 * Math.pow(10, -6) * Math.pow(temperatureFahrenheit, 2) * Math.pow(rh, 2));

            setHeatIndex(heatIndexValue.toFixed(2));
        } else {
            setHeatIndex('Invalid input');
        }
    };

  return (
        <div className='heatIndex'>
            <div className='inputPart'> 
                <div className='text'>Air Temperature:</div>
                    <input
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                    />
            </div>
            <div className='switch'>
                <p>°C</p><Switch type='checkbox' className="theme-switch__input" color="primary" checked={fahrenheitChecked} onChange={handleChange}/><p>°F</p>
            </div>
            <div className='inputPart'>
                <div className='text'>Relative Humidity (%):</div>
                    <input
                        type="number"
                        value={relativeHumidity}
                        onChange={(e) => setRelativeHumidity(e.target.value)}
                    />
            </div>
            <div className='calculate'>
                <Button variant='contained' onClick={calculateHeatIndex}>Calculate Heat Index</Button>
            </div>
            {heatIndex && <p>Heat Index: {heatIndex} °F</p>}
        </div>
    );
};

export default HeatIndexCalculator;
