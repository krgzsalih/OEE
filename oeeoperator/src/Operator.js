import React, { Component } from 'react'
import { HashRouter as Router, Link, Redirect } from "react-router-dom";

import OperatorCard from './components/OperatorCard';
import UretimBilgileri from './components/UretimBilgileri';
import LeftButtons from './components/LeftButtons';
import RightButtons from './components/RightButtons';
import Süreler from './components/Süreler';
import ProgressPanel from "./components/ProgressPanel";
import MakineNo from './components/MakineNo';

import { Card, Button } from 'semantic-ui-react';
import { bitisSinyaliGonder, uretimSinyaliGonder, urunGetir } from './globals/globalFunctions';
import axios from 'axios';


export default class Operator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gelenUser: this.props.glnUser,
            progressPercentage: null,
            gelenUrunBilgileri: [],
            uretimVar: null,
            uretimVar2: null,
        }
    }

    // OPERATÖR EKRANINDA ÜRETİM BAŞLAT COMP'A BASINCA ÇALIŞIR, ÜRETİM SİNYALİ "1" GELİR
    // globalFunctions.js' E GİDER ORADAN BACKENDE 
    uretimSinyaliGonder = (sinyal) => {
        uretimSinyaliGonder(sinyal, (gelen) => {
            this.setState({ sended: true, sinyal: 1 });
        });
    }

    
    // OPERATÖR EKRANINDA BİTİR COMP'A BASINCA ÇALIŞIR, HEM MAKİNE HEM ÜRETİM SİNYALİ "0" GELİR
    // globalFunctions.js' E GİDER ORADAN BACKENDE
    bitisSinyaliGonder = (makineBitisSinyali) => {
        bitisSinyaliGonder(makineBitisSinyali, (gelen) => {
            this.setState({ sended: true });
        });
    }

    // ÜRETİM VE DURUŞ SİNYALLERİNE GÖRE COMPONENT RENKLENDİRME
    // RightButtons İÇİNDE BULUNAN -OPERASYON BAŞLAT- , - DURUŞ GİR - KOMPONENTLERİNDEN SİNYALLERİ ALIR
    // 0 GELİNCE KIRMIZI, 1 GELİNCE YEŞİL 
    canliRenkBelirle = (gelenSinyal) => {
        //console.log(' gelenSinyal' , gelenSinyal)
        this.setState({ uretimVar: gelenSinyal });
        if (gelenSinyal == 0) {
            this.setState({ uretimVar2: false });
            //<StartSnackbar/>
        } else {
            this.setState({ uretimVar2: true });
            //<StartSnackbar/>
        }
    }

    componentDidMount() {
        console.log('mounted');
        setInterval(this.performansGetir, 1000);
        setInterval(this.kalpAtisi, 3000);

    }

    // OPERATÖR EKRANINDA SAĞ ÜSTTEKİ PERFORMANS BARINA VERİ GETİRİR
    performansGetir = () => {
        axios.post('http://localhost:6161/performansGauge').then((res) => {
            this.setState({ progressPercentage: res.data.performans })
        }).catch((err) => {
            console.log(err);
        })
    }

    // HALİ HAZIRDA SÜREKLİ ÇALIŞAN APİ YE SORGU ATARAK SİSTEMİN ÇALIŞIP ÇALIŞMADIĞINI KONTROL EDER
    // SİSTEMDEN YANIT GELMEYİNCE SORGU HATAYA DÜŞECEĞİ İÇİN HATA KISMINDA DEĞİŞKENİ FALSE YAPARAK EKRANI KIRMIZI RENGİ YAPAR
    kalpAtisi = () => {
        axios.post('http://localhost:6163/admin/oee').then((res) => {
            this.setState({ uretimVar2: true });
        }).catch((err) => {
            console.log(err);
            this.setState({ uretimVar2: false });
        })
    }

    // LeftButton.js İN İÇİNDE SeriNoOkut KOMPONENTİNDE BARKOD OKUYUCU İLE TARATILAN BARKODU
    // BURAYA KADAR TAŞIR, globalFunction.js TAN BACKENDE, ORADAN VERİ TABANINDAN İŞ EMRİ BİLGİLERİ ÇEKER
    urunGetir = (urunBilgileri) => {
        urunGetir(urunBilgileri, (gelen) => {
            console.log("geldiler  ", gelen.results[0]);
            this.setState({ sended: true, gelenUrunBilgileri: gelen.results[0] });
        });
    }

    render() {
        const { gelenUser, progressPercentage, gelenUrunBilgileri, uretimVar2 } = this.state;
        return (

            <div>
                {this.props.glnUser.yetkiSinifi != 1 && <Redirect to="/"></Redirect>}

                <div className="App">
                    <div className="makineNo" style={{ backgroundColor: uretimVar2 ? 'green' : 'red', }} >
                        <MakineNo />
                    </div>

                    <div className="operator">
                        <div className="left-column">

                            <div className="left-column1">
                                <div className="left-column1-a">
                                    <OperatorCard gelenUser={gelenUser} />
                                </div>
                                <div className="left-column1-b">
                                    <UretimBilgileri gelenUser={gelenUser} gelenUrunBilgileri={gelenUrunBilgileri} />
                                </div>
                            </div>

                            <div className="left-column2">
                                <LeftButtons urunGetir={this.urunGetir} />
                            </div>
                        </div>

                        <div className="right-column">
                            <div className="right-column1">
                                <Button className="right-column-first" active="false">Performans Durumu</Button>

                                <Card className="progress">
                                    <Süreler gelenUrunBilgileri={gelenUrunBilgileri} />
                                    <div className="progress-bar">
                                        <ProgressPanel progressPercentage={progressPercentage} />
                                    </div>
                                </Card>
                            </div>

                            <div className="right-column2">
                                <RightButtons canliRenkBelirle={this.canliRenkBelirle} bitisSinyaliGonder={this.bitisSinyaliGonder} />
                                <Link to='/'>
                                    <Button className="operator-cikis" onClick={() => this.props.setChanged()}>Çıkış Yap</Button>
                                </Link>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
