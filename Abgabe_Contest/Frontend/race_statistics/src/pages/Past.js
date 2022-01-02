
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppNavigation from '../components/AppNavigation/AppNavigation';
import GenericDataGrid from '../components/DataGrid/GenericDataGrid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Piechart from '../components/DataVisualization/piechart';
import Card from '@mui/material/Card';
import GenericChart from '../components/DataChart/GenericChart';

const Past = () => {

    /* Set all needed State Hooks */
    let [driverData, setDriverData] = useState([]);
    const [currentDriver, setCurrentDriver] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);
    const [gridTogle, setGridTogle] = useState(false)
    const [driverInfoTogle, setDriverInfoTogle] = useState(false)
    const [wins, setWins]= useState(0)
    const [defeats, setDefeats] = useState(0)
    const [lastMatchups, setLastMatchups] = useState([])
    const [nemesis, setNemesis] = useState([])
    const [errorFlag, setErrorFlag] = useState(false)
    const [favoriteTracks, setFavoriteTracks] = useState([])
    const [money,setMoney] = useState([])

    /* Set column Data for Tables */
    const columnsDriverData = [{field:'id', headerName:'ID'},{field:'driver', headerName:'Driver'}];
    const columnsMatchups = [{field: 'id', headerName:'Id'},{field:'Herausforderung_Datum', headerName:'Herausforderung_Datum', width: 200},{field:'Herausforderung_gefahren', headerName:'Herausforderung_gefahren',width: 200,}, {field:'Herausforderer', headerName:'Herausforderer', width: 150,},{field:'Gegner',headerName: 'Gegner'},{field:'Geldeinsatz', headerName:'Geldeinsatz', width: 150,},{field:'Gewinner',headerName:'Gewinner'}]
    const columnsNemesis = [{field: 'id', headerName:'Id'},{field:'Herausforderer', headerName:'Herausforderer', width: 150},{field:'Gegner',headerName: 'Gegner'}, {field:'Rennen_gegeneinander',headerName: 'Rennen_Gegeneinander', width: 200}]
    const columnsFavoriteTracks = [{field: 'id', headername:'Id'}, {field:'Strecke', headername:'Strecke'},{field:'Auf_Strecke_gefahren',headername:'Auf_Strecke_gefahren', width: 200}]
    
    /* Handle Button Clicks */
    const handleSubmit = () => {
        setDriverInfoTogle(!driverInfoTogle);
        setErrorFlag(false)
    }
    const handleGridChange = (event) => {
        setGridTogle(!gridTogle)
    }
    const handleDriverChange = (event) => {
            setCurrentDriver(event.target.value);
    }

    /* Retrieve Data from Backend Server */

    const handleClick = async() =>{
        try{
            const resultWins = await axios.post('http://127.0.0.1:5000/getDriverWins',{id:currentDriver})
            if (resultWins.data[0] === 0 & resultWins.data[1] === 0){
                setErrorFlag(true)
                setGridTogle(false)
            }
            setWins(resultWins.data[0]);
            setDefeats(resultWins.data[1]);
        }
        catch{console.log('Error bei Request'); setErrorFlag(true)}
        try{
        const resultMatchups = await axios.post('http://127.0.0.1:5000/getLastMatchups',{id:currentDriver})
        setLastMatchups(resultMatchups.data)
        }
        catch{console.log('Error bei Request'); setErrorFlag(true)}
        try{
            const resultMatchups = await axios.post('http://127.0.0.1:5000/getNemesis',{id:currentDriver})
            setNemesis(resultMatchups.data)
            }
        catch{console.log('Error bei Request'); setErrorFlag(true)};
        try{
            const resultFavorite = await axios.post('http://127.0.0.1:5000/getFavoriteTrack',{id:currentDriver})
            setFavoriteTracks(resultFavorite.data)
            }
        catch{console.log('Error bei Request'); setErrorFlag(true)}
        try{
            const resultMoney = await axios.post('http://127.0.0.1:5000/getMoney',{id:currentDriver})
            setMoney(resultMoney.data)
            console.log(money)
            }
        catch{console.log('Error bei Request'); setErrorFlag(true)}
    }
    useEffect(async()=>{
        if (!dataLoaded) {
            const result = await axios.get('http://127.0.0.1:5000/getDriverIds');
            setDriverData(result.data);
            setDataLoaded(true)
            
        }
    });
        return (
            <div>
            {!driverInfoTogle | errorFlag ? <><AppNavigation/>
            <h1 style = {{color:'White'}}>Welcome to the Past</h1>
            <TextField
                label="Fahrer-ID"
                value={currentDriver}
                onChange ={handleDriverChange}
                helperText="Bitte Fahrer-Nummer eingeben"
                >
                <p></p>
                </TextField>
                <Button variant="contained" onClick={() =>{handleSubmit(); handleClick()}} >Fahrer Profil anschauen</Button>
                {errorFlag ? <h2 style={{color:'red'}}>Bitte Zahl aus Liste eingeben</h2> : <></>}
                <Button variant="outlined" onClick = {handleGridChange}>{!gridTogle ? <p>Fahrerliste einblenden</p>:<p>Fahrerliste ausblenden</p>}</Button>
                {!gridTogle ? <></>:<GenericDataGrid sx={{width : 500}}rows={driverData} columns = {columnsDriverData} />}</>:
                
                <div>
                <Button variant="contained" onClick={handleSubmit}>Zur Suche</Button>

                <h1> Überblick zu Fahrer {currentDriver}</h1>
                <Card style={{}}>
                <Card sx={{padding:'20',float:'left', backgroundColor :'white', display:'inline-block', height:400, width:300, textAlign:'center'}}>
                <h3>Gewinnrate</h3>
                <Piechart  data = {[{x:'wins', y:wins},{x:'defeats', y:defeats}]} color={['green','red']}></Piechart>
                <p style={{ paddingLeft:'1%', marginTop:'-2%'}}>Siege: {wins}, Niederlagen {defeats}</p>
                <p style={{ paddingLeft:'1%'}}>Gewinnrate: {(wins / (defeats+wins) * 100).toFixed(2)}%</p>
                </Card>
                
                <Card style={{display:'inline-block', float:'left', height:400, width:400}}>
                <h3 style={{textAlign:'center'}}>Lieblingsstrecken</h3>
                <GenericDataGrid rows={favoriteTracks} columns = {columnsFavoriteTracks} sx={{width:'300'}} />
                </Card>
                <Card style={{display:'inline-block', float:'left', height:400, width:500, overflow:'scroll'}}>
                    <h3 style={{textAlign:'center'}}>Gewonnenes/Verlorenes Geld</h3>
                    <GenericChart data = {money}></GenericChart>
                </Card>
                </Card>
                <Card style={{backgroundColor:'lightgray', float:'none'}}>
                    <h1>Letzte Matchups:</h1>
                    <GenericDataGrid rows={lastMatchups} columns = {columnsMatchups} />
                </Card>
                <Card style={{}}>
                    <h1>Erzfeinde</h1>
                    <h3>(Gegner, gegen die die meisten Rennen gefahren wurden)</h3>
                    <GenericDataGrid sx={{width : 550}}rows={nemesis} columns = {columnsNemesis} />
                </Card>
                <Button style = {{backgroundColor:'grey'}}><Link to="/HallOfFame" style={{textDecoration :'None', color:'black'}}>Hall Of Fame</Link></Button>
                
                </div>
                
                }
            </div>
        )
}
export default Past

