import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import { Card } from 'semantic-ui-react';
import moment from 'moment';


export default class OeeAlarmlar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            durusList: [],
        }
    }


    componentWillMount = () => {
        setInterval(this.durusDetayGetir, 3000);
    }

    // D:/AHMET ÇALIŞMA/OEE/oeeUretimYaz/uretimYaz.js TEN DURUŞ DETAYLARINI ÇEKER
    durusDetayGetir = () => {
        axios.post('http://localhost:6161/durusDetay').then((res) => {
            this.setState({
                durusList: res.data,
            }, () => { console.log(this.state.durusList, " OKAAAYY") })
        }).catch((err) => {
            console.log(err);
        })
    }


    // GELEN DURUŞ DETAYLARINI OEE EKRANINDA SOL ALTTA ALARMLAR OLARAK LİSTEDE 
    // DURUŞ TARİHİ, ADI İLE GÖSTERİR
    renderRow = (props) => {
        const { index, style } = props;

        return (
            <ListItem button style={style} key={index}>
                <ListItemText primary={`${index + 1} - ${moment(this.state.durusList[index].durusBaslangic).format("YYYY-MM-DD HH:mm:ss")} ${this.state.durusList[index].durusAdi} `} />
            </ListItem>

        );
    }

    render() {
        const { durusList } = this.state;

        return (
            <Card className="list-card">
                <div className="list-title">
                    Alarmlar
                </div>
                <div className="classes-root">
                    <FixedSizeList height={300} width={450} itemSize={46} itemCount={durusList.length}>
                        {this.renderRow}
                    </FixedSizeList>
                </div>
            </Card>
        )
    }
}

