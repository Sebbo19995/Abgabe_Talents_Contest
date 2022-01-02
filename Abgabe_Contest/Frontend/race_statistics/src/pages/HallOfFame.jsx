import {React, useState, useEffect} from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Top3Card from '../components/DataVisualization/Top3Card';
import AppNavigation from '../components/AppNavigation/AppNavigation';
import axios from 'axios';

const HallOfFame = () =>{
    const [dataLoaded, setDataLoaded] = useState(false);
    const [mostWins, setMostWins] = useState([])
    const [mostTracks, setMostTracks] = useState([])

    useEffect(async()=>{
        if (!dataLoaded) {
            const resultWins = await axios.get('http://127.0.0.1:5000/getMostWins');
            setMostWins(resultWins.data)
            const resultTracks = await axios.get('http://127.0.0.1:5000/getMostTracks');
            setMostTracks(resultTracks.data)           


            setDataLoaded(true)
        }
    });
    return(
        <div>
        <h1 style={{textAlign:'center'}}><EmojiEventsIcon/>Willkommen in der Hall of Fame<EmojiEventsIcon/></h1>
        <AppNavigation></AppNavigation>
        <Top3Card headline = {'Meiste Siege'} winner = {mostWins} type = {'Fahrer'}background = {'lightgray'}></Top3Card>
        <Top3Card headline = {'Beliebteste Strecke'} winner = {mostTracks} type = {'Strecke'}></Top3Card>
        
        </div>
    )
}
export default HallOfFame;