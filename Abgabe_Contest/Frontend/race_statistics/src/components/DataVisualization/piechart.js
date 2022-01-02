import React from 'react';
import {VictoryPie, VictoryLabel} from 'victory';
const Piechart = (props) => {	
    return(
        
        <svg  width = '60%' height = '60%' viewBox={"50 50 300 300"} style={{ paddingLeft:'2%'}}>
        <VictoryPie
        standalone={false}
        width={300}
        style={{
            labels: { fontSize: 20}}}
        colorScale={props.color}
        data={props.data}
        labelRadius={20}
        animate={{duration : 4000}}
        
        />
       </svg>
    )
}
export default Piechart;