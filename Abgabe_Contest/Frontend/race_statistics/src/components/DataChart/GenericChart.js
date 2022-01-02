import React from 'react'
import { BarChart, Legend, Bar, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
const GenericChart = (props) => {
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
