import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import LinearProgress from '@material-ui/core/LinearProgress';


import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


const data = [
    {name: '1', rt: 55, vt: 4, et:10, st:3, ct:1, bt:27},
    {name: '2', rt: 0, vt: 2, et:10, st:0, ct:0, bt:88},
    {name: '3', rt: 70, vt: 6, et:10, st:0, ct:0, bt:14},
    {name: '4',  rt: 85, vt: 4, et:10, st:0, ct:0, bt:1},
    {name: '5',  rt: 90, vt: 5, et:4, st:0, ct:0, bt:1},
    {name: '6',  rt: 82, vt: 3, et:10, st:0, ct:0, bt:5},
    {name: '7', rt: 80, vt: 7, et:10, st:0, ct:0, bt:3},
    {name: '8', rt: 65, vt: 4, et:10, st:0, ct:0, bt:21},
    {name: '9', rt: 0, vt: 5, et:10, st:0, ct:3, bt:82},
    {name: '10', rt: 10, vt: 2, et:10, st:10, ct:0, bt:68},
     {name: '11', rt: 55, vt: 4, et:10, st:3, ct:1, bt:27},
    {name: '12', rt: 0, vt: 2, et:10, st:0, ct:0, bt:88},
    {name: '13', rt: 70, vt: 6, et:10, st:0, ct:0, bt:14},
    {name: '14',  rt: 85, vt: 4, et:10, st:0, ct:0, bt:1},
    {name: '15',  rt: 90, vt: 5, et:4, st:0, ct:0, bt:1},
    {name: '16',  rt: 82, vt: 3, et:10, st:0, ct:0, bt:5},
    {name: '17', rt: 80, vt: 7, et:10, st:0, ct:0, bt:3},
    {name: '18', rt: 65, vt: 4, et:10, st:0, ct:0, bt:21},
    {name: '19', rt: 0, vt: 5, et:10, st:0, ct:3, bt:82},
    {name: '20', rt: 10, vt: 2, et:10, st:10, ct:0, bt:68},
        {name: '21', rt: 55, vt: 4, et:10, st:3, ct:1, bt:27},
    {name: '22', rt: 0, vt: 2, et:10, st:0, ct:0, bt:88},
    {name: '23', rt: 70, vt: 6, et:10, st:0, ct:0, bt:14},
    {name: '24',  rt: 85, vt: 4, et:10, st:0, ct:0, bt:1},
    {name: '25',  rt: 90, vt: 5, et:4, st:0, ct:0, bt:1},
    {name: '26',  rt: 82, vt: 3, et:10, st:0, ct:0, bt:5},
    {name: '27', rt: 80, vt: 7, et:10, st:0, ct:0, bt:3},
    {name: '28', rt: 65, vt: 4, et:10, st:0, ct:0, bt:21},
    {name: '29', rt: 0, vt: 5, et:10, st:0, ct:3, bt:82},
    {name: '30', rt: 10, vt: 2, et:10, st:10, ct:0, bt:68},
    
    
];

const useStyles = makeStyles((theme) => ({

    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight:'150px',
      maxHeight:'150px'
    },
    img: {
      width: '100px',
      height: '100px',
    },
    table: {
      minWidth: 650,
    },
    label: {
        background: '#31cc4b',
        fontWeight:"bold"
    },
    avatar: {
        background: '#00695C',
      
    },
    colorPrimary: {
        backgroundColor: '#00695C',
    },
    barColorPrimary: {
        backgroundColor: '#42f560',
    }
  }));
  

function EnerjiTuketim(){
    const classes = useStyles();
    const [state] = React.useState({
        completed: 80,
    });
    return(
        <Grid item sm={12} xs={12}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                   
                        <div style={{width:'100%',height:140}}>
                            <ResponsiveContainer>
                                <BarChart width={800} height={140} data={data}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend />
                                    <Bar name="Lighting" dataKey="rt" stackId="a" fill="#03fc5a" />
                                    <Bar name="Plug" dataKey="vt" stackId="a" fill="#fce803" />
                                    <Bar name="Air Condition" dataKey="et" stackId="a" fill="#fc0318"/>
                                    <Bar name="MFG" dataKey="st" stackId="a" fill="#b8b8b8"/>
                                    <Bar name="Air Compressor" dataKey="ct" stackId="a" fill="#0031e3"/>
                                    <Bar name="Fire" dataKey="bt" stackId="a" fill="#9f00e3"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                  
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EnerjiTuketim;