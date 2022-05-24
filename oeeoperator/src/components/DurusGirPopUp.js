import { Button, Grid, Popup } from 'semantic-ui-react'
import React, { Component } from 'react';
import axios from 'axios';

export default class DurusGirPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemsId: 0,
      itemsLabel: [],
      clickedButton: false,
      durusSinyali: 0,
      durusAciklamasi: '',
      ilkPopup: false,
    };
  }

  componentWillMount = () => {
    setInterval(this.durusKodlariGetir, 1000);
  }

  durusKodlariGetir = () => {
    axios.post('http://localhost:6161/durusKodlari').then((res) => {
      this.setState({
        items: res.data,
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  handleEdit = (e, b) => {

    console.log(b.ahmetpropu, " durusAciklamasi");
    console.log(b.ahmetpropu2, " durusID");
    this.sinyalGonder(this.state.durusSinyali, b.ahmetpropu, b.ahmetpropu2)
    this.setState({ ilkPopup: false })
    /*
     e.preventDefault();
     console.log(id);
     console.log(durusAciklamasi);
     this.setState({
       clickedButton: true,
       durusAciklamasi: durusAciklamasi,
     });*/
  };

  sinyalGonder = (a, b, c) => {
    this.props.sinyalGonder(a, b, c);
  }
  render() {
    const { items, ilkPopup } = this.state;
    return (
      <div>
        <Button id='referansBut' onClick={() => { this.setState({ ilkPopup: true }) }} className="right-buttons2" content='DURUŞ GİR / BEKLET' />
        <Popup id='refPop'
          position="top right"
          style={{ "background-color": "rgb(165, 165, 200)", "flex-direction": "column" }} wide open={ilkPopup}>

          <div className="popUp-title">
            <label style={{ "font-size": "25px" }}>Duruş Nedenleri</label> <br></br>
          </div>

          <Grid divided columns='equal' style={{ "width": "550px", "height": "auto" }}>

            {items.map((item, index) => (
              <Popup
                key={item.id}
                style={{ "background-color": "rgb(140, 100, 100)", "flex-direction": "column" }}
                wide trigger={<Button className="popUp-ici-button" content={item.durusAciklamasi} />}
                on='click'
                position='middle'
                size='large'
                inverted
              >

                <Grid className="durusNedeniOnayPenceresi">
                  <label style={{ "font-size": "25px", "margin": "10px" }}>Emin misin ?</label>
                  <br></br>
                  <Button
                    ahmetpropu={item.durusAciklamasi}
                    ahmetpropu2={item.id}
                    onClick={(e, d) => {
                      this.handleEdit(e, d)
                    }}
                    className="onayButtons"
                    color='blue'
                    fluid>Evet</Button>
                  <Button
                    className="onayButtons"
                    color='red'
                    fluid>Hayır</Button>
                </Grid>
              </Popup>
            ))}
            {/*<Checkbox defaultChecked={this.state.isChecked} onChange={this.toggleCheck} className="checkbox-ici" label='Makine Arıza' />*/}

            <Grid.Row>
              <Popup
                trigger={<Button color='blue' content='Aksiyon Ekranı' fluid />}
                content='Aksiyon giriş talebi gönder'
                position='right'
                size='large'
                inverted
              />
            </Grid.Row>
          </Grid>
        </Popup>
      </div>
    )
  }
}
