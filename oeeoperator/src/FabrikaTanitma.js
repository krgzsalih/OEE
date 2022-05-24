import React, { Component } from 'react';
import { HashRouter as Router, Link, Redirect } from "react-router-dom";
import Fabrika from "./components/Fabrika";
import HatGir from "./components/HatGir";
import MakineGir from './components/MakineGir';
import TüketimGir from './components/TüketimGir';
import OEE from './components/OEE';

import { fabrikaGir, hatGir, makineGir, tuketimGir, isEmriGir } from './globals/globalFunctions';

import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import MapIcon from '@material-ui/icons/Map';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import TableChartIcon from '@material-ui/icons/TableChart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { AddCircleRounded } from '@material-ui/icons';
import IsEmriGir from './components/IsEmriGir';

export default class FabrikaTanitma extends Component {

  constructor(props) {
    super(props);
    this.state = {
      left: false,
      fabrikaCb: '',
      hatCb: '',
      makineCb: '',
      tüketimCb: '',
      visible: false,
      sayfa: '',
    }
  }

  // FABRİKA COMPONENT İNDE GİRİLEN FABRİKA İSMİ İLE ŞEHİRİ TAŞIR, VERİTABANINA YAZAR
  // fabrikaCb İLE GELEN CALLBACK TE Component İÇİNDE " FABRİKA GİRİŞİ BAŞARILI/BAŞARISIZ "
  // VERMEYE ÇALIŞTIM :) YAKLAŞMIŞTIM AMA TAM VERİMLİ OLMADI.
  fabrikaGir = (fabrika, sehir) => {
    fabrikaGir(fabrika, sehir, (gelen) => {
      this.setState({ sended: true, fabrikaCb: gelen });
    });
  }

  // HATGİR COMPONENTİNDEN GELEN SEÇİLMİŞ FABRİKA İLE HAT I VERİTABANINA EKLER
  hatGir = (secilenFabrika, hat) => {
    hatGir(secilenFabrika, hat, (gelen) => {
      this.setState({ sended: true });
    });
  }

  // MAKİNEGİR COMPONENTİNDEN SEÇİLMİŞ HAT VE MAKİNE ADINI EKLER
  makineGir = (secilenHat, makine) => {
    makineGir(secilenHat, makine, (gelen) => {
      this.setState({ sended: true });
    });
  }

  // TÜKETİMGİR COMPONENTİNDEN SEÇİLMİŞ MAKİNENİN, SEÇİLMİŞ TÜKETİM TÜRÜNÜ VE MİKTARINI EKLER
  tuketimGir = (secilenMakine, secilenTur, tuketimMiktari) => {
    tuketimGir(secilenMakine, secilenTur, tuketimMiktari, (gelen) => {
      this.setState({ sended: true });
    });
  }

  // İŞEMRİGİR COMPONENTİNDEN GİRİLEM BİLGİLERİ VERİTABININDAKİ URETİM TABLOSUNA EKLER
  isEmriGir = (uretimPlanNo, hatNumarasi, uretimNoktasi, urunKodu, urunAdi, planlananUretimAdedi, urunBarkod, planlananSure) => {
    isEmriGir(uretimPlanNo, hatNumarasi, uretimNoktasi, urunKodu, urunAdi, planlananUretimAdedi, urunBarkod, planlananSure, (gelen) => {
      this.setState({ sended: true });
    });
  }

  // YÖNETİM EKRANINDA SOLDAKİ MENÜNÜN SAĞA DOĞRU KAYMA, KAPANMA İŞLEMİNİ GERÇEKLEŞTİRİR
  toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ [anchor]: open });
  };

  render() {
    const { fabrikaCb, sayfa } = this.state;
    return (
      <div className="app">
        {this.props.glnUser.yetkiSinifi != 5 && <Redirect to="/"></Redirect>}


        <AppBar color="default" >
          <Toolbar>
            <IconButton onClick={this.toggleDrawer('left', true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" >
              Apra
            </Typography>
          </Toolbar>
        </AppBar>



        <Toolbar />

        {sayfa === 'oee' && <OEE />}
        {sayfa === 'fabrikaGir' && <Fabrika fabrikaGir={fabrikaGir} fabrikaCb={fabrikaCb} />}
        {sayfa === 'hatGir' && <HatGir hatGir={hatGir} />}
        {sayfa === 'makineGir' && <MakineGir makineGir={makineGir} />}
        {sayfa === 'tüketimGir' && <TüketimGir tüketimGir={tuketimGir} />}
        {sayfa === 'isEmriGir' && <IsEmriGir isEmriGir={isEmriGir} />}

        <React.Fragment key='left'>
          <Drawer anchor='left' open={this.state.left} onClose={this.toggleDrawer('left', false)}>
            <div
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}>
              <List>
                <ListItem onClick={() => { this.setState({ sayfa: 'oee' }) }} button>
                  <TrendingUpIcon />
                  <ListItemText primary='OEE' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'fabrikaGir' }) }} button>
                  <RemoveRedEyeIcon />
                  <ListItemText primary='Fabrika' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'hatGir' }) }} button>
                  <TableChartIcon />
                  <ListItemText primary='Hat' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'makineGir' }) }} button>
                  <TrendingDownIcon />
                  <ListItemText primary='Makine' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <TrendingDownIcon />
                  <ListItemText primary='Tüketim' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'isEmriGir' }) }} button>
                  <AddCircleRounded />
                  <ListItemText primary='İş Emri Gir' />
                </ListItem>
                <ListItem >
                  <ListItemText style={{ paddingLeft: '20px' }} primary='Hat Kullanım Analizleri' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>

                  <ListItemText style={{ paddingLeft: '30px' }} primary='Vardiya Analizi' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <ListItemText style={{ paddingLeft: '30px' }} primary='Hedef/Gerçekleşen' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <ListItemText style={{ paddingLeft: '30px' }} primary='Detay Analiz' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <ListItemText style={{ paddingLeft: '30px' }} primary='Detay Analiz(Pie)' />
                </ListItem>
                <ListItem >
                  <ListItemText style={{ paddingLeft: '20px' }} primary='Makine Kullanım Analizleri' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <ListItemText style={{ paddingLeft: '30px' }} primary='Vardiya Analizi' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <ListItemText style={{ paddingLeft: '30px' }} primary='Hedef/Gerçekleşen' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <ListItemText style={{ paddingLeft: '30px' }} primary='Detay Analiz' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <ListItemText style={{ paddingLeft: '30px' }} primary='Detay Analiz(Pie)' />
                </ListItem>
                <ListItem >
                  <ListItemText style={{ paddingLeft: '20px' }} primary='Hata Analizleri' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <ListItemText style={{ paddingLeft: '30px' }} primary='Makine Duruş İnceleme' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <ListItemText style={{ paddingLeft: '30px' }} primary='MTBF' />
                </ListItem>
              </List>

              <List>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <MapIcon />
                  <ListItemText primary='Ana Sayfa' />
                </ListItem>
                <ListItem onClick={() => { this.setState({ sayfa: 'tüketimGir' }) }} button>
                  <MeetingRoomIcon />
                  <ListItemText primary='Fabrika' />
                </ListItem>

                <Link to="/">
                  <ListItem onClick={() => this.props.setChanged()} button>
                    <ExitToApp />
                    <ListItemText primary='Çıkış Yap' />
                  </ListItem>
                </Link>
              </List>

            </div>
          </Drawer>
        </React.Fragment>
      </div>
    )
  }
}
