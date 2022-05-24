import React, { Component } from 'react'
import HataliUrun from './HataliUrun';
import MontajTalimat from './MontajTalimat';
import SeriNoOkut from './SeriNoOkut';
import { form, hataliGonder } from '../globals/globalFunctions';


export default class LeftButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            barkod: "",
        }
    }
    // GİRİLEN HATALI ÜRÜNÜ ADET SAYISI VE AÇIKLAMASI İLE BİRLİKTE VERİ TABANINA GÖNDERİR
    // D:/ahmet çalışma/ OEE / oeeoperator/ backend/ index.js 
    handleSentIt = (inputUc, inputDort) => {
        form(inputUc, inputDort, (gelen) => {
            this.setState({ sended: true });
        });
    }

    // GİRİLEN HATALI ÜRÜN SAYISINI CANLI DA HESAPLAMAK İÇİN BACKENDE GÖNDERİR
    // D:/ahmet çalışma/ OEE / oeeUretim.js
    hataliGonder = (iskarta)=>{
        hataliGonder(iskarta, (gelen) => {
            this.setState({ sended: true });
        });
    }

    handleCallback = (childData) => {
        this.props.urunGetir(childData);
    }

    render() {

        return (

            <div>
                <SeriNoOkut parentCallback={this.handleCallback} />
                <br></br>

                <MontajTalimat />

                <br></br>
                <HataliUrun handleSentIt={this.handleSentIt} hataliGonder={this.hataliGonder} />
            </div>
        )
    }
}
