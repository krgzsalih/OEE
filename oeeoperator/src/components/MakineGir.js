import React, { Component } from 'react';
import { Button, Input, Popup, Dropdown, Form, Table } from 'semantic-ui-react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import HatGir from './HatGir';

export default class MakineGir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            makine: '',
            secilenHat: '',
            hatListem: [],
            sayfa: 'makineGir',
        };
    }
    componentDidMount() {

    }

    hatGetir = () => {
        axios.post('http://localhost:6162/admin/hatCek').then((res) => {
            //console.log(res.data.results);
            this.setState({ hatListem: res.data.results }, () => {
                console.log(this.state.hatListem)
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    onChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }
    gonder = () => {
        this.props.makineGir(this.state.secilenHat, this.state.makine);
        this.setState({
            makine: '',
            secilenHat: '',
        });
    }

    // EĞER DAHA HİÇ HAT GİRİLMEMİŞ İSE HAT GİRİŞ EKRANINA YÖNLENDİRME SAĞLAR
    hatKontrol = () => {
        if (this.state.hatListem.length == 0) {
            alert('Lütfen önce hat giriniz !');
            this.setState({ sayfa: 'hatGir' });
        }
        //console.log('fabrikaKontrol geldi', this.state.fabrikaListem);
    }

    render() {
        const { makine, secilenHat, hatListem, sayfa } = this.state;

        return (
            <div style={{ padding: 12, backgroundColor: "#303030", height: "100vh" }}>
                {sayfa === 'hatGir' ? <HatGir /> :
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
                                Makine Ekle
                            </Typography>
                        </div>
                        <Table fullWidth>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell>Hat Seç</Table.HeaderCell>
                                    <Table.HeaderCell>Makine Adı</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row key={1}>
                                    <Table.Cell>{1}</Table.Cell>
                                    <Dropdown
                                        style={{ width: "100%" }}
                                        className="dropdown-menu"
                                        placeholder="Hat Seç"
                                        search
                                        selection
                                        value={secilenHat}
                                        name="secilenHat"
                                        options={hatListem}
                                        onChange={this.onChange}
                                        onClick={this.hatKontrol}
                                    />
                                    <Table.Cell>{<Input style={{ width: "100%", marginLeft: "10px" }} value={makine} name="makine" onChange={this.onChange}></Input>}</Table.Cell>

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
                                        >   Makine Gir
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
