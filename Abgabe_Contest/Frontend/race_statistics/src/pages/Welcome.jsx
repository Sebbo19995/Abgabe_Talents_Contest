import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AppNavigation from '../components/AppNavigation/AppNavigation';

const Welcome = () =>{
    return(
    <>
        <AppNavigation/>
        <Card sx={{ maxWidth: 345, textAlign:'center', marginLeft:'28%' }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Welcome everyone!
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Hallo zusammen und herzlich willkommen auf meiner Website. Der Nutzen dieser Website ist es die Ergebnisse der Code Competition zu präsentieren.
            Auf den nachfolgenden Links kommt ihr zu den unterschiedlichen Seiten. Hier können wir entweder in die Vergangenheit oder Zukunft reisen.
            In der Vergangenheit kümmern wir uns um die Analyse und Darstellung von Vergangenen Daten, Dinge wie Spielerprofil, Renn-Ergebnisse oder Wetter werden hier angezeigt.
            In der Zukunft möchten wir die Gewinnchancen von Matchups visualisieren und versuchen vorher zu sagen, wer in einem Rennen wahrscheinlich gewinnen wird.
            In der Hall of Fame werden herausragende Ergebnisse Präsentiert.
            Die Bewertung der Ergebnisse meiner Datenanalyse sind dem PDF zu enthnehmen, ich wünsche viel Spaß!  
            </Typography>
        </CardContent>
        <CardActions>
            <Button style = {{backgroundColor:'grey', marginLeft:'5%'}}><Link to="/past" style={{textDecoration :'None', color:'black'}}>Past</Link></Button>
            <Button style = {{backgroundColor:'grey'}}><Link to="/future" style={{textDecoration :'None', color:'black'}}>Future</Link></Button>
            <br/>
            <Button style = {{backgroundColor:'grey'}}><Link to="/HallOfFame" style={{textDecoration :'None', color:'black'}}>Hall Of Fame</Link></Button>
        </CardActions>
        </Card>
        </>
    )
}
export default Welcome;