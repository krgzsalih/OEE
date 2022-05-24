import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class UretimBaslat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedButton: false,
            uretimSinyali: 1,
            aciklama: 'Üretim Sinyali Geldi',
        };
    }

    sinyalGonder = () => {
        this.props.sinyalGonder(this.state.uretimSinyali, this.state.aciklama);
        console.log("üretim başladı", this.state.uretimSinyali);

    }
    render() {
        return (
            <div>
                <Button onClick={this.sinyalGonder} className="right-buttons">OPERASYONU BAŞLAT </Button>
            </div>
        )
    }
}
