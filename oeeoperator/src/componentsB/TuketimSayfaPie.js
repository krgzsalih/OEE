import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import {PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer} from 'recharts';

const data = [  {name: 'Lighting', value: 2938}, 
                {name: 'Plug', value: 156}, 
                {name: 'Air Condition', value: 6022}, 
                {name: 'MFG', value: 4722}, 
                {name: 'Air Compressor', value: 1319},
                {name: 'Fire', value: 180}];
const COLORS = ['#03fc5a', '#fce803', '#fc0318', '#b8b8b8','#0031e3','#9f00e3'];



const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


function TuketimSayfaPie(){
   
 
    return(
       
        <Grid item sm={12} xs={12}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div style={{width:'100%',height:200}}>
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie data={data} 
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={80} 
                                            fill="#8884d8">
                                                {
                                                data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                            }
                                            </Pie>
                                            <Tooltip></Tooltip>
                                            <Legend
                                                verticalAlign="top"
                                                layout="vertical"
                                                align="right"
                                                wrapperStyle={{
                                                    paddingLeft: "10px"
                                                }}
                                            />
                                        </PieChart> 
                                    </ResponsiveContainer>
                                </div>
                </Grid>
            </Grid>
        </Grid>
           


    )
}

export default TuketimSayfaPie;


