import React, { Component } from 'react'
import { Button, Input, Popup, Form, Table } from 'semantic-ui-react';


export default class HataliUrun extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputUc: '',
            inputDort: '',
            list: ''
        }
    }

    onChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }
    componentWillReceiveProps(props) {
        this.setState({ ulang: props.ulang })
    }
    cLng = (e) => {
        this.state.changeLang(e.target.className.split(' ')[0]);
    }
    gonder = () => {
        this.props.handleSentIt(this.state.inputUc, this.state.inputDort);
        this.props.hataliGonder(this.state.inputDort);
        this.setState({
            inputUc: '',
            inputDort: '',
        })
        alert("Hatalı Ürünler Sisteme Kaydedilmiştir !");
    }

    listele = () => {

    }

    render() {
        const { inputUc, inputDort } = this.state;
        return (
            <div>
                <Popup style={{ "background-color": "rgb(165, 165, 200)", "width": "auto", "height": "auto" }}
                    wide trigger={<Button className="left-buttons3" content='HATALI ÜRÜN' />} on='click'>
                    <div className="popUp-title">
                        <label style={{ "font-size": "20px" }}>Hatalı Ürün Giriş Ekranı</label> <br></br>
                    </div>
                    <Form style={{ "width": "800px", "height": "auto" }}
                        onSubmit={this.handleSubmit}>

                        <Table compact celled definition>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell>Hata Kodu</Table.HeaderCell>
                                    <Table.HeaderCell>Adet</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>1</Table.Cell>
                                    <Table.Cell>{<Input style={{ width: "100%" }} value={inputUc} name="inputUc" onChange={this.onChange}></Input>}</Table.Cell>
                                    <Table.Cell>{<Input style={{ width: "100%" }} value={inputDort} name="inputDort" onChange={this.onChange}></Input>}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Button>+</Button>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell></Table.Cell>
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
                                        >   Ürün Gir
                                        </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Form>
                </Popup>
            </div>
        )
    }
}
