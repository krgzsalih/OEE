import React, { Component } from 'react';
import { Button, Input, Popup, Form, Table } from 'semantic-ui-react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class Fabrika extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { id: 1, value: false },
            ],
            fabrika: '',
            sehir: '',
            // sonuc: this.props.fabrikaCb.sonuc,
        };
    }

    handleChange = e => {
        const id = e.target.id;
        this.setState(prevState => {
            return {
                list: prevState.list.map(
                    li => (li.id === +id ? {
                        ...li,
                        value: !li.value
                    } : li)
                )
            };
        });
    };
    handleClick = () => {
        this.setState(prevState => {
            return {
                list: prevState.list.filter(li => !li.value)
            };
        });
    };

    onChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    gonder = () => {
        if (this.state.fabrika !== '' && this.state.sehir !== '') {
            this.props.fabrikaGir(this.state.fabrika, this.state.sehir);

            console.log(this.state.sonuc, "fabrika cb geldi");
            if (this.state.sonuc !== '') {
                console.log(this.state.sonuc, " sonuc geldiiii");
                //this.kontrol();
            }
            this.setState({
                list: [
                    { id: 1, value: false },
                ],
                fabrika: '',
                sehir: '',
                sonuc: '',
            });
        } else {
            alert('Lütfen bir değer giriniz')
        }
    }

    // GELEN CALLBACK E GÖRE BAŞARILI VEYA BAŞARISIZ DEMEYE ÇALIŞTIM, TAM ANLAMIYLA OLMADI
    kontrol = () => {
        if (this.state.sonuc === "OK") {
            alert('Kaydedildi');
        } else {
            alert('Kaydetme Başarısız');
            this.setState({ sonuc: '' });
        }
    }

    render() {
        const { fabrika, sehir } = this.state;

        return (
            <div style={{padding: 12, backgroundColor: "#303030", height: "100vh"}}>
                <Form style={{ "width": "100%", "height": "auto" }}
                    onSubmit={this.handleSubmit}>
                    <div style={{
                        "textAlign": "left",
                        "padding-left": "10px", 
                        "backgroundColor": "#424242",
                        "color": "#fff",
                        "minHeight":"50px",
                        "width": "100%",
                        "border-radius": "4px",
                        }}>
                        <Typography variant="h4" component="h3">
                            Fabrika Ekle
                        </Typography>
                    </div>
                    <Table fullWidth >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell />
                                <Table.HeaderCell>Fabrika</Table.HeaderCell>
                                <Table.HeaderCell>Şehir</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.list.map(e => (
                                <Table.Row key={e.id}>
                                    <Table.Cell>{e.id}</Table.Cell>
                                    <Table.Cell>{<Input style={{width: "100%"}} value={fabrika} name="fabrika" onChange={this.onChange}></Input>}</Table.Cell>
                                    <Table.Cell>{<Input style={{width: "100%"}} value={sehir} name="sehir" onChange={this.onChange}></Input>}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>

                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell />
                                <Table.HeaderCell colSpan='9'>
                                    <Button
                                        type="submit"
                                        floated='right'
                                        primary
                                        type="submit" onClick={this.gonder}
                                    >   Fabrika Gir
                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Form>

            </div>
        )
    }
}
