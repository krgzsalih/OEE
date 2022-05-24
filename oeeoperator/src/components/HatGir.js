import React, { Component } from 'react';
import { Button, Dropdown, Input, Form, Table } from 'semantic-ui-react';
import axios from 'axios';
import Fabrika from './Fabrika';
import Typography from '@material-ui/core/Typography';


export default class HatGir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hat: '',
            secilenFabrika: '',
            fabrikaListem: [],
            fabrikaVar: false,
            sayfa: 'hatGir',
        };
    }

    componentDidMount() {
        this.fabrikaGetir();
    }

    // BELİRLİ BİR FABRİKAYA HAT GİRMEK İÇİN FABRİKALARI ÇEKER 
    fabrikaGetir = () => {
        axios.post('http://localhost:6162/admin/fabrikaCek').then((res) => {
            //console.log(res.data.results);
            this.setState({ fabrikaListem: res.data.results }, () => {
                console.log(this.state.fabrikaListem)
            });

        }).catch((err) => {
            console.log(err);
        })
    }

    onChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
        console.log(value, this.state.hat);
    }

    // GİRİLENLERİ GÖNDERİR
    gonder = () => {
        this.props.hatGir(this.state.secilenFabrika, this.state.hat);
        console.log(this.secilenFabrika, this.hat);
        this.setState({
            hat: '',
            secilenFabrika: '',
        });

    }

    // EĞER DAHA HİÇ FABRİKA GİRİLMEMİŞ İSE FABRİKA GİRİŞ EKRANINA YÖNLENDİRME SAĞLAR
    fabrikaKontrol = () => {
        if (this.state.fabrikaListem.length == 0) {
            alert('Lütfen önce fabrika giriniz !');
            this.setState({ sayfa: 'fabrika' });
        }
        //console.log('fabrikaKontrol geldi', this.state.fabrikaListem);
    }
    render() {
        const { hat, secilenFabrika, fabrikaListem, sayfa } = this.state;

        return (
            <div style={{ padding: 12, backgroundColor: "#303030", height: "100vh" }}>
                {sayfa === 'fabrika' ? <Fabrika /> :
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
                                Hat Ekle
                            </Typography>
                        </div>
                        <Table fullWidth>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell>Fabrika Seç</Table.HeaderCell>
                                    <Table.HeaderCell>Hat Adı</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                <Table.Row key={1}>
                                    <Table.Cell>{1}</Table.Cell>
                                    <Dropdown
                                        style={{ width: "100%", marginRight: "20px" }}
                                        className="dropdown-menu"
                                        placeholder="Fabrika'yı Seç"
                                        search
                                        selection
                                        value={secilenFabrika}
                                        name="secilenFabrika"
                                        options={fabrikaListem}
                                        onChange={this.handleChange}
                                        onClick={this.fabrikaKontrol}
                                    />

                                    {/* {fabrikaVar ? <Redirect >{<Fabrika></Fabrika>}</Redirect> : null} */}

                                    <Table.Cell>{<Input style={{ width: "100%", marginLeft: "10px" }} value={hat} name="hat" onChange={this.onChange}></Input>}</Table.Cell>
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
                                        >   Hat Gir
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
