import { Grid, Form } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class UretimBilgileri extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        //console.log(this.props.gelenUser, " geldi");
        //console.log(this.props.gelenUrunBilgileri, " geldi");
    }
    
    render() {
        return (
            <div>
                <Form className="form-uretimBilgileri">
                    <Grid columns={2} padded='vertically'>
                        <Grid.Column>    
                            <label><h3>Operatör</h3></label>
                            <input disabled={true} value={this.props.gelenUser.calisanAdi}/>
                            <label><h3>Üretim Plan No</h3></label>
                            <input disabled={true} value={this.props.gelenUrunBilgileri.uretimPlanNo}/>
                            <label><h3>Hat Numarası</h3></label>
                            <input disabled={true} value={this.props.gelenUrunBilgileri.hatNumarasi}/>
                            <label><h3>Üretim Noktası</h3></label>
                            <input disabled={true} value={this.props.gelenUrunBilgileri.uretimNoktasi}/>
                        </Grid.Column>
                        <Grid.Column>
                            <label><h3>Ürün Kodu</h3></label>
                            <input disabled={true} value={this.props.gelenUrunBilgileri.urunKodu}/>
                            <label><h3>Ürün Adı</h3></label>
                            <input disabled={true} value={this.props.gelenUrunBilgileri.urunAdi}/>
                            <label><h3>Planlanan Üretim Adedi</h3></label>
                            <input disabled={true} value={this.props.gelenUrunBilgileri.planlananUretimAdedi}/>
                        </Grid.Column>
                    </Grid>
                </Form>
            </div>
        )
    }
}
