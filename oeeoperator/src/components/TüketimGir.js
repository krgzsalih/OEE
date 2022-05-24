import React, { Component } from 'react'
import { Button, Input, Dropdown, Form, Table } from 'semantic-ui-react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

import MakineGir from './MakineGir';

export default class TüketimGir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sayfa: 'tüketimGir',
            secilenMakine: '',
            tuketimMiktari: '',
            makineListem: [],
            secilenTur: '',
            tuketimTurleri: [
                { value: 'Elektrik (kW)', text: 'Elektrik (kW)' },
                { value: 'Su Tüketimi (litre)', text: 'Su Tüketimi (litre)' },
                { value: 'Hava Tüketimi (litre)', text: 'Hava Tüketimi (litre)' },
            ]
        };
    }
    componentDidMount() {

    }

    makineGetir = () => {
        axios.post('http://localhost:6162/admin/makineCek').then((res) => {
            //console.log(res.data.results);
            this.setState({ makineListem: res.data.results }, () => {
                console.log(this.state.makineListem)
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    onChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }
    gonder = () => {
        this.props.tuketimGir(this.state.secilenMakine, this.state.secilenTur, this.state.tuketimMiktari);
        this.setState({
            secilenMakine: '',
            tuketimTuru: '',
            tuketimMiktari: '',
            secilenTur: '',
        });
    }

    // EĞER DAHA HİÇ MAKİNE GİRİLMEMİŞ İSE MAKİNE GİRİŞ EKRANINA YÖNLENDİRME SAĞLAR
    makineKontrol = () => {
        if (this.state.makineListem.length == 0) {
            alert('Lütfen önce makine giriniz !');
            this.setState({ sayfa: 'makineGir' });
        }
        //console.log('fabrikaKontrol geldi', this.state.fabrikaListem);
    }
    render() {
        const { secilenMakine, secilenTur, tuketimMiktari, makineListem, tuketimTurleri, sayfa } = this.state;

        return (
            <div style={{ padding: 12, backgroundColor: "#303030", height: "100vh" }}>
                {sayfa === 'makineGir' ? <MakineGir /> :

                    <Form style={{ "width": "100%", "height": "auto" }}
                        onSubmit={this.handleSubmit}>
                        <div style={{

                            "textAlign": "left",
                            "padding-left": "10px",
                            "backgroundColor": "#424242",
                            "color": "#fff",
                            "minHeight": "50px",
                            "width": "100%",
                            "border-radius": "4px",
                        }}>
                            <Typography variant="h4" component="h3">
                                Tüketim Ekle
                            </Typography>
                        </div>
                        <Table fullWidth>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell>Makine Seç</Table.HeaderCell>
                                    <Table.HeaderCell>Tüketim Türü (kW, litre)</Table.HeaderCell>
                                    <Table.HeaderCell>Tüketim Miktarı (birim)</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row key={1}>
                                    <Table.Cell>{1}</Table.Cell>
                                    <Dropdown
                                        style={{ width: "100%" }}
                                        className="dropdown-menu"
                                        placeholder="Makine'yi Seç"
                                        search
                                        selection
                                        value={secilenMakine}
                                        name="secilenMakine"
                                        options={makineListem}
                                        onChange={this.onChange}
                                        onClick={this.makineKontrol}
                                    />
                                    <Table.Cell>
                                        <Dropdown
                                            style={{ width: "100%" }}
                                            className="dropdown-menu2"
                                            placeholder="Tüketim Türünü Seç"
                                            search
                                            selection
                                            value={secilenTur}
                                            name="secilenTur"
                                            options={tuketimTurleri}
                                            onChange={this.onChange}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{<Input style={{ width: "100%" }} value={tuketimMiktari} name="tuketimMiktari" onChange={this.onChange}></Input>}</Table.Cell>
                                </Table.Row>
                            </Table.Body>

                            <Table.Footer fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell colSpan='4'>
                                        <Button
                                            type="submit"
                                            floated='right'
                                            primary
                                            type="submit" onClick={this.gonder}
                                        >   Tüketim Gir
                                        </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Form>
                }
            </div>
        )
    }
}
