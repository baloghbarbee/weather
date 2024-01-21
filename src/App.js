import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Button from '@mui/material/Button';
import './App.css'
import WeatherPage from './pages/Weather.js'; 
import ChartPage from './pages/Chart'; 
import HeatIndexPage from './pages/HeatIndex.js'; 



function HomePage() {
    return (
        <BrowserRouter>
            <div className="weatherHomePage">
                <header className="App-header">
                    <Link to="/weather"><Button variant="contained" className='weatherButton'>Weather</Button></Link>
                    <Link to="/chart"><Button variant="contained" className='chartButton'>Chart</Button></Link>
                    <Link to="/heatIndex"><Button variant="contained" className='heatIndexButton'>Heat Index</Button></Link>
                </header>
                <section className='content'>
                    <Routes>
                        <Route path="/weather" element={<WeatherPage />} />
                        <Route path="/chart" element={<ChartPage />} />
                        <Route path="/heatIndex" element={<HeatIndexPage />} />
                    </Routes>
                </section>
            </div>
        </BrowserRouter>
    );
}

export default HomePage;
