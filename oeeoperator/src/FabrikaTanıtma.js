import React, { Component } from 'react';
import { Button, Form} from 'semantic-ui-react';
import { HashRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import Fabrika from "./components/Fabrika";
import HatGir from "./components/HatGir";
import MakineGir from './components/MakineGir';
import TüketimGir from './components/TüketimGir';

import { fabrikaGir, hatGir, makineGir, tuketimGir } from './globals/globalFunctions';


export default class FabrikaTanıtma extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fabrikaCb: '',
      hatCb: '',
      makineCb: '',
      tüketimCb: '',
    }
  }
  fabrikaGir = (fabrika, sehir) => {
    fabrikaGir(fabrika, sehir, (gelen) => {
      this.setState({ sended: true , fabrikaCb: gelen });
    });
  }
  hatGir = (secilenFabrika, hat) => {
    hatGir(secilenFabrika, hat, (gelen) => {
      this.setState({ sended: true });
    });
  }
  makineGir = (secilenHat, makine) => {
    makineGir(secilenHat, makine, (gelen) => {
      this.setState({ sended: true });
    });
  }
  tuketimGir = (secilenMakine, secilenTur, tuketimMiktari) => {
    tuketimGir(secilenMakine, secilenTur, tuketimMiktari, (gelen) => {
      this.setState({ sended: true });
    });
  }

  render() {
    const {fabrikaCb} = this.state;
    return (
      <Router>
        <Switch>
          {this.props.glnUser.yetkiSinifi != 5 && <Redirect to="/"></Redirect>}
          <div className="fabrika-header">
            <Form className="fabrika-form"
              onSubmit={this.handleSubmit}>

              <Fabrika fabrikaGir={this.fabrikaGir} fabrikaCb={fabrikaCb} />
              <br></br>
              <HatGir hatGir={this.hatGir} />
              <br></br>
              <MakineGir makineGir={this.makineGir} />
              <br></br>
              <TüketimGir tuketimGir={this.tuketimGir} />
            </Form>

            <Link to="/">
              <Button className="fbrk-tntm-cikis" onClick={() => this.props.setChanged()}>Çıkış Yap</Button>
            </Link>
            
          </div>

        </Switch>
      </Router>
    )
  }
}
