import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import { sinyalGonder } from '../globals/globalFunctions';
import DurusGirPopUp from './DurusGirPopUp';
import UretimBaslat from './UretimBaslat';
import { toast } from "react-toastify";

toast.configure({
    draggable: false,

    //etc you get the idea
});

export default class RightButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uretim: false,
            uretimZaman: '',
            sinyal: 1,
            makineBitisSinyali: 0,
            uretimSnack: null,
        }
    }

    bitisSinyaliGonder = () => {
        this.props.bitisSinyaliGonder(this.state.makineBitisSinyali);
    }

    // ÜRETİM SİNYALİ VEYA DURUŞLARDAN GELEN SİNYALİ VERİ TABANINA GÖNDERİR
    sinyalGonder = (durusSinyali, durusAciklamasi, durusSinyalId) => {
        sinyalGonder(durusSinyali, durusAciklamasi, durusSinyalId, (gelen) => {
            this.setState({ sended: true });
        });

        this.props.canliRenkBelirle(durusSinyali);

        //console.log(this.state.uretimSnack, "  DEFAULT VAL");

        // SAĞ ÜSTTE SİNYALE GÖRE BİLDİRİM GELİR (DURDU, BAŞLADI)
        if (durusSinyali == 0) {
            this.setState({ uretimSnack: false });
            toast.error(' ÜRETİM DURDU ');
        } else {
            this.setState({ uretimSnack: true });
            toast.success(' ÜRETİM BAŞLADI ');
        }
        console.log(this.state.uretimSnack, ' çıkış');
    }


    render() {
        return (
            <div>
                <UretimBaslat sinyalGonder={this.sinyalGonder} />
                <br></br>
                <DurusGirPopUp sinyalGonder={this.sinyalGonder} />
                <br></br>
                <Button onClick={this.bitisSinyaliGonder} className="right-buttons3">BİTİR VE ETİKET YAZDIR</Button>

            </div>
        )
    }
}
