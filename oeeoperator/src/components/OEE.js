import React, { Component } from 'react';
import axios from 'axios';
import OeeGauge from '../componentsB/OeeGauge';
import GaugeKullanilabilirlik from '../componentsB/GaugeKullanilabilirlik';
import GaugePerformans from '../componentsB/GaugePerformans';
import GaugeKalite from '../componentsB/GaugeKalite';
import PieOee from '../componentsB/PieOee';
import OeeÜretim from '../componentsB/OeeÜretim';
import OeeAlarmlar from '../componentsB/OeeAlarmlar';

import { Card } from 'semantic-ui-react'

import Typography from '@material-ui/core/Typography';

export default class OEE extends Component {  
  constructor(props) {
    super(props);
    this.state={
      listem: null,
      oee:null,
      availability:null,
      performance:null,
      quality:null,
      planlanmisUretim:null,
      toplamUretim:null,
      durusNedeni:null,
      durusSuresi:null,
    }
  }

  componentDidMount() {
    console.log("mounted!");
    setInterval(this.veriGuncelle,1000); 
  }
  
  // YÖNETİM EKRANINDAKİ OEE SEKMESİNE CANLI VERİLERİ ÇEKER VE AŞAĞIDA PROP İLE GÖNDERİLİR
  veriGuncelle=()=>{
    axios.post('http://localhost:6163/admin/oee').then((res)=>{
      this.setState({
        listem:res.data,
        oee:res.data.oee,          
        availability: res.data.kullanilabilirlik,
        performance: res.data.performans,
        quality: res.data.kaliteOrani,
        planlanmisUretim: res.data.planlanmisUretim,
        toplamUretim: res.data.toplamUretim,
        
        durusNedeni: res.data.durusNedeni,
        durusSuresi: res.data.durus,
      }, ()=>{console.log(this.state.listem)})
    }).catch((err)=>{
        console.log(err);
    })
  }  

  render() {

    const {oee, availability, performance, quality, planlanmisUretim, toplamUretim, durusNedeni, durusSuresi} =this.state;
   
    return(
      <div style={{padding:12,  backgroundColor: "#303030", height: "100vh"}}>
          <div style={{
            
              "textAlign": "left",
              "padding-left": "10px", 
              "backgroundColor": "#424242",
              "color": "#fff",
              "minHeight":"50px",
              "width": "100%",
              "border-radius": "4px",
              }}>
                  <Typography variant="h4" component="h3">
                      OEE
                  </Typography>
          </div>

          <div className="gaugesClass">
              <OeeGauge oee={oee/100}/>              
              <GaugeKullanilabilirlik availability = {availability/100}/>
              <GaugePerformans performance={performance/100}/>
              <GaugeKalite quality={quality/100}/>
           
          </div>

          <div className="gaugesClass2">
              <OeeAlarmlar durusNedeni={durusNedeni}/>
              <PieOee durusNedeni={durusNedeni} durusSuresi={durusSuresi}/>
              <Card className="oee-grafics2">
                <OeeÜretim planlanmisUretim={planlanmisUretim} toplamUretim={toplamUretim}/>
              </Card>
          </div>
          <br></br>
          <div style={{
            backgroundColor: '#fff', 
            width: '100%', 
            height: '50px', 
            paddingTop: '15px', 
            borderRadius: '5px',
            marginTop: '10px',
            fontSize: '30px',
            color: 'tomato'
          }}>
            Toplam üretilen adet : {toplamUretim}
          </div>

      </div>
    )
  }
}
