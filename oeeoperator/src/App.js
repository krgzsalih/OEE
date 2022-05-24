import './App.css';
import Login from './Login';
import FabrikaTanitma from './FabrikaTanitma';
import Operator from './Operator';

import { girisForm } from './globals/globalFunctions';
import { HashRouter as Router, Route, Redirect } from "react-router-dom";

import React, { Component } from 'react'
import TalimatSayfasi from './components/TalimatSayfasi';
import Fabrika from './components/Fabrika';
import HatGir from './components/HatGir';
import MakineGir from './components/MakineGir';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glnUser: [],
      girisOnayi: null,
      sayfa: 'fabrikaGir',
    }
  }

  // LOGİNDE GİRİLEN USER,PASSWORD BİLGİLERİNİ globalFunction.js'e GÖNDERİR. ORADAN BACKENDE 
  girisYap = (kullaniciAdi, sifre) => {
    girisForm(kullaniciAdi, sifre, (gelen) => {
      //console.log("gln", gelen.results[0]);
      this.setState({
        sended: true,
        glnUser: gelen.results[0],
        girisOnayi: gelen.results
      });

    });
  }

  // OPERATOR VE YÖNETİCİ EKRANINDAKİ ÇIKIŞ YAP BUTONLARINA BASINCA ÇALIŞIR. 
  // ANA DİZİNDE Kİ KULLANICIYI SIFIRLAR
  setChanged = () => {
    this.setState({
      glnUser: [], girisOnayi: [],
    });
  }

  render() {
    const { glnUser, girisOnayi } = this.state;

    return (
      <div>
        <Route path='/' exact render={
          () => (
            <Login girisYap={this.girisYap} girisOnayi={girisOnayi}></Login>
          )
        }>
        </Route>


        {/*     YÖNETİCİ EKRANIDIR    */}
        <Route path='/fabrikaTanıtma' exact render={
          () => (
            <FabrikaTanitma setChanged={this.setChanged} glnUser={glnUser}></FabrikaTanitma>
          )
        }>
        </Route>


        <Route path='/fabrikaGir' exact render={
          () => (
            <Fabrika></Fabrika>
          )
        }>
        </Route>

        <Route path='/hatGir' exact render={
          () => (
            <HatGir></HatGir>
          )
        }>
        </Route>

        <Route path='/makineGir' exact render={
          () => (
            <MakineGir></MakineGir>
          )
        }>
        </Route>


        <Route path='/operator' exact render={
          () => (
            <Operator setChanged={this.setChanged} glnUser={glnUser}></Operator>
          )
        }>
        </Route>

        <Route path='/montaj_talimat' exact render={
          () => (
            <TalimatSayfasi />
          )
        }>
        </Route>

        {glnUser.yetkiSinifi == 1 && <Redirect to='/operator'></Redirect>}
        {glnUser.yetkiSinifi == 5 && <Redirect to='/fabrikaTanıtma'></Redirect>}

      </div>

    )
  }
}