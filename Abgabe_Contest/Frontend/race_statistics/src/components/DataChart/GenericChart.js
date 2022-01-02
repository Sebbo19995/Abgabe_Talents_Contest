import React from 'react'
import { BarChart, Legend, Bar, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
const GenericChart = (props) => {
    const data = [{name: '20.03.', uv: 400, pv: 1400, amt: 2400},{name: '20.4. ', uv: 200, pv: 1000, amt: 2400},{name: '20.6.', uv: 100, pv: 2400, amt: 2400},{name: 'Page B', uv: 200, pv: 2400, amt: 2400},{name: 'Page B', uv: 200, pv: 2400, amt: 2400},{name: 'Page B', uv: 200, pv: 2400, amt: 2400},{name: 'Page B', uv: 200, pv: 2400, amt: 2400},{name: 'Page B', uv: 200, pv: 2400, amt: 2400},{name: 'Page B', uv: 200, pv: 2400, amt: 2400}];
    return(
        
       
        <BarChart width={730} height={250} data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Monat" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Gewonnenes_Geld" fill="#1bd1ffB3" />
        <Bar dataKey="Verlorenes_Geld" fill="ff4040" />
      </BarChart>
         
    )
}
export default GenericChart;
