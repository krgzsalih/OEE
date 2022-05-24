import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



import Typography from '@material-ui/core/Typography';
import GaugeChart from 'react-gauge-chart';


import TuketimSayfaGrafik from './TuketimSayfaGrafik';
import TuketimSayfaPie from './TuketimSayfaPie';

import { Area, Tooltip, Line, ComposedChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer} from 'recharts';



const data = [
    {name: '4/24', tbf: 7,sinir:8},
    {name: '4/25', tbf: 1,sinir:8},
    {name: '4/26', tbf: 2,sinir:8},
    {name: '4/27', tbf: 4,sinir:8},
    {name: '4/28', tbf: 5,sinir:8},
    {name: '4/29', tbf: 2,sinir:8},
];

function Su(){
   
  

    return(
        <div style={{padding:12}}>
            <Grid container direction="row" xs={12} sm={12} spacing={2}>
                <Grid  justify="center" item xs={12} sm={5}>
                    <Grid container direction="row" xs={12} sm={12} spacing={2}>
                        
                        <Grid  justify="center" item xs={12} sm={7}>
                            <Paper style={{height:135}}>
                                <Typography>Bu Günkü Su Kullanımı</Typography>
                                <div style={{textAlign:'center', lineHeight:'90px'}}>
                                    <div style={{fontSize:'30px'}}>
                                        250 m3
                                    </div>
                                </div>
                                
                            </Paper>
                            <Paper style={{height:135, marginTop:10}} >
                                <Typography>Aylık Su Kullanımı</Typography>
                                <div style={{textAlign:'center', lineHeight:'90px'}}>
                                    <div style={{fontSize:'30px'}}>
                                       123,432m3
                                    </div>
                                </div>
                                
                            </Paper>
                        </Grid>
                        <Grid  justify="center" item xs={12} sm={5}>
                            <Paper  style={{height:280}}>
                                <Typography>
                                    Anlık Su Tüketimi
                                </Typography>
                                <div style={{textAlign:'center'}}>
                                    <GaugeChart needleColor={'#6C699C'} arcsLength={[0.5, 0.3, 0.2]} colors={['#5BE12C', '#F5CD19', '#EA4228']} formatTextValue={(value) => (value*10)+'m3'} id="gauge-chart1"    percent={0.12}    />
                                </div>                            
                            </Paper>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid  justify="center" item xs={12} sm={7} spacing={2}>
                    <Grid xs={12} sm={12} spacing={2}>
                        <Paper style={{height:280}}>
                            <Paper elevation={0}>
                                <Typography>
                                    Su Tüketimi - Zaman
                                </Typography>
                            </Paper>
                            <div style={{width:'100%',height:'90%'}}>
                                <ResponsiveContainer>
                                    <ComposedChart data={data}
                                            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Area type='monotone' name='Kullanım' dataKey='tbf' stroke='#8884d8' fill='#8884d8' />
                                        <Line type="monotone" name='Sınır' dataKey="sinir" stroke="#FF0000" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                            
                        </Paper>
                    </Grid>
                    
                </Grid>
            </Grid>
            <Grid container direction="row" xs={12} sm={12} spacing={2}>
                <Grid xs={12} sm={5} style={{padding:'10px'}}>
                    <Paper  style={{height:280}}>
                        <Typography>
                            Su Tüketimi Bölüm Dağılımı
                        </Typography>
                        <TuketimSayfaPie></TuketimSayfaPie>
                                                   
                    </Paper>
                </Grid>
                <Grid xs={12} sm={7} style={{padding:'10px'}}>
                    <Paper  style={{height:280}}>
                        <Typography>
                            Su Tüketimi Bölüm Dağılımı
                        </Typography>
                        <TuketimSayfaGrafik></TuketimSayfaGrafik>                           
                    </Paper>
                </Grid>
            </Grid>
            <Grid container direction="row" xs={12} spacing={2}>
                <Grid xs={4} style={{padding:'10px'}}>
                    <Paper  style={{height:180}}>
                        <Typography> 1. Vardiya Tüketim Toplamı</Typography>
                            <div style={{textAlign:'center', lineHeight:'90px'}}>
                                <div style={{fontSize:'30px'}}>
                                    3,112m3
                                </div>
                            </div>
                    </Paper>
                </Grid>
                <Grid xs={4} style={{padding:'10px'}}>
                    <Paper  style={{height:180}}>
                        <Typography> 2. Vardiya Tüketim Toplamı</Typography>
                        <div style={{textAlign:'center', lineHeight:'90px'}}>
                            <div style={{fontSize:'30px'}}>
                            2,875m3
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid xs={4} style={{padding:'10px'}}>
                    <Paper  style={{height:180}}>
                        <Typography> 3. Vardiya Tüketim Toplamı</Typography>
                        <div style={{textAlign:'center', lineHeight:'90px'}}>
                            <div style={{fontSize:'30px'}}>
                                3,444m3
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Su;

