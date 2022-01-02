import { React, useState, useEffect } from 'react';
import AppNavigation from '../components/AppNavigation/AppNavigation';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import GenericDataGrid from '../components/DataGrid/GenericDataGrid';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {PieChart, Pie, Legend, Cell,BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const Future = () =>{

    const [driverInfoTogle, setDriverInfoTogle] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false);
    const [driverData, setDriverData] = useState([])
    const [currentDriver, setCurrentDriver] = useState('');
    const [currentDriver2, setCurrentDriver2] = useState('');
    const [gridTogle, setGridTogle] = useState(false)
    const [data, setData] = useState([])
    const COLORS = ["#90EE90", "#FF7F7F"];
    const columnsDriverData = [{field:'id', headerName:'ID'},{field:'driver', headerName:'Driver'}];

    useEffect(async()=>{
        if (!dataLoaded) {
            const result = await axios.get('http://127.0.0.1:5000/getDriverIds');
            setDriverData(result.data);
            setDataLoaded(true)
            
        }
    });

    const handleGridChange = (event) => {
        setGridTogle(!gridTogle)
    }
    const handleSubmit = () => {
        setDriverInfoTogle(!driverInfoTogle);
    }

    const handleDriverChange = (event) => {
        setCurrentDriver(event.target.value);
    }
    const handleDriverChange2 = (event) => {
        setCurrentDriver2(event.target.value);
    }
    const handleReset = () =>{
        setCurrentDriver('')
        setCurrentDriver2('')
        setData([])

    }

    const handleClick = async() =>{
        try{
            const resultData = await axios.post('http://127.0.0.1:5000/getPrediction',{id1:currentDriver, id2:currentDriver2})
            if (resultData.data[0] == 0 & resultData.data[1] == 0){
            }
            else{
                setData(resultData.data)
            }
        }
        catch{

        }
    }
    return(
        <>
        <AppNavigation/>
        <h1 style = {{color:'White'}}>Welcome to the Future</h1>
        <Box sx={{height:20}}></Box>
        <TextField
                label="Fahrer-ID"
                value={currentDriver}
                onChange ={handleDriverChange}
                helperText="Bitte Fahrer-Nummer eingeben"
                >
                <p></p>
                </TextField>
        <TextField
                label="Gegner-ID"
                value={currentDriver2}
                onChange ={handleDriverChange2}
                helperText="Bitte Gegner-Nummer eingeben"
                >
                <p></p>
                </TextField>
        <Button variant="contained" onClick={() =>{handleSubmit(); handleClick()}} >Gewinner vorhersagen</Button>
        <Button variant="contained" onClick={handleReset} >Reset</Button>
        <Button variant="outlined" onClick = {handleGridChange}>{!gridTogle ? <p>Fahrerliste einblenden</p>:<p>Fahrerliste ausblenden</p>}</Button>
        {!gridTogle ? <></>:<GenericDataGrid sx={{width : 500}}rows={driverData} columns = {columnsDriverData} />}
        <Box sx={{height:20}}></Box>
        <Card style={{display:'inline-block', float:'left', height:300, width:500}}>
        <h3 style={{textAlign:'center'}}>Vergangene Rennen gegeneinander:</h3>
        <PieChart width={500} height={200}>
                <Pie data={[data[0],data[1]]} dataKey="Gegen_Gegner" nameKey="Name" cx="50%" cy="50%" outerRadius={50} fill="color" label = "Name">
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Legend></Legend>
            </PieChart> 
        </Card>
        <Card style={{display:'inline-block', float:'left', height:300, width:550}}>
        <h3 style={{textAlign:'center'}}>Persönliche Gewinnchance gegen alle Gegner:</h3>
             <BarChart width={430} height={200} data={[data[2]]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Gewinnrate_Fahrer" fill="#90EE90" />
            <Bar dataKey="Gewinnrate_Gegner" fill="#FF7F7F" />
        </BarChart>
        </Card>
        
        <Card style={{display:'inline-block', float:'none', height:300, width:450, margin:'5%', marginLeft:'20%'}}>
            <h3 style={{textAlign:'center'}}>Gewinnchance Gesamt:</h3>
            <PieChart width={400} height={200}>
                <Pie data={[data[0],data[1]]} dataKey="Value" nameKey="Name" cx="50%" cy="50%" outerRadius={50} fill="color" label = "Name">
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Legend></Legend>
            </PieChart> 
            </Card>
        </>
    )
}

export default Future;