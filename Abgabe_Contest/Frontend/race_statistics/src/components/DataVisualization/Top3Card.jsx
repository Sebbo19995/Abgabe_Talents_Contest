import {React} from 'react';
import Card from '@mui/material/Card';

const Top3Card = (props) =>{
    return(
        <Card style = {{display:"inline-block", width:'30%', margin:'0.5%'}} sx = {{backgroundColor: props.background}}>
            <h2>{props.headline}</h2>
            {props.winner.map((value, index) => (<Card key={index} sx={{ backgroundColor: props.background, borderBottom: 1, borderTop: 1}}><p style ={{fontSize:'2em'}} >Platz {index+1}: {props.type} {value['sieger']}, Wert:{value['Wert']}</p></Card>))}
            
            
        </Card>
    )
}

export default Top3Card;