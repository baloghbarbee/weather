import React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Weather.css'
import TablePagination from '@mui/material/TablePagination';


function WeatherPage() {
    const [weatherData, setWeatherData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,rain,surface_pressure'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                const weatherDataArray = data.hourly.time.map((timestamp, index) => ({
                    time: new Date(timestamp).toLocaleString(),
                    temperature_2m: data.hourly.temperature_2m[index],
                    relative_humidity_2m: data.hourly.relative_humidity_2m[index],
                    surface_pressure: data.hourly.surface_pressure[index],
                    rain: data.hourly.rain[index],
                }));
                setWeatherData(weatherDataArray);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
 


    return (
        <div className='weatherTable'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Datetime</TableCell>
                            <TableCell align="right">Rain</TableCell>
                            <TableCell align="right">Surface Pressure</TableCell>
                            <TableCell align="right">Relative Humidity</TableCell>
                            <TableCell align="right">Temperature</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weatherData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((data) => (
                            <TableRow
                            key={data.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {data.time}
                                </TableCell>
                                <TableCell align="right">{data.rain}</TableCell>
                                <TableCell align="right">{data.surface_pressure}</TableCell>
                                <TableCell align="right">{data.relative_humidity_2m}</TableCell>
                                <TableCell align="right">{data.temperature_2m}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={weatherData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            ></TablePagination>
        </div>
    );
};



export default WeatherPage;

