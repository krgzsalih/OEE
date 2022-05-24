import React, { Component } from 'react';
import { Button, Form, } from 'semantic-ui-react';
import Typography from '@material-ui/core/Typography';

export default class IsEmriGir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uretimPlanNo: '',
            hatNumarasi: '',
            uretimNoktasi: '',
            urunKodu: '',
            urunAdi: '',
            planlananUretimAdedi: '',
            urunBarkod: '',
            planlananSure: '',
        };
    }

    onChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    // GİRİLEN İŞ EMRİ BİLGİLERİNİ ÜST COMPONENTE ORADAN VERİ TABANINA İLETİLMESİNİ SAĞLAR
    gonder = () => {
        if (this.state.uretimPlanNo !== '' && this.state.hatNumarasi !== '' && this.state.uretimNoktasi !== '' && this.state.urunKodu !== '' && this.state.urunAdi !== '' && this.state.planlananUretimAdedi !== '' && this.state.urunBarkod !== '' && this.state.planlananSure !== '') {
            this.props.isEmriGir(this.state.uretimPlanNo, this.state.hatNumarasi, this.state.uretimNoktasi, this.state.urunKodu, this.state.urunAdi, this.state.planlananUretimAdedi, this.state.urunBarkod, this.state.planlananSure);
            this.setState({
                uretimPlanNo: '',
                hatNumarasi: '',
                uretimNoktasi: '',
                urunKodu: '',
                urunAdi: '',
                planlananUretimAdedi: '',
                urunBarkod: '',
                planlananSure: '',
            });
        } else {
            alert('Lütfen boş yerleri doldurunuz.');
        }
    }

    // kontrol = () => {
    //     if (this.state.sonuc === "OK") {
    //         alert('Kaydedildi');
    //     } else {
    //         alert('Kaydetme Başarısız');
    //         this.setState({ sonuc: '' });
    //     }
    // }

    render() {
        const { uretimPlanNo, hatNumarasi, uretimNoktasi, urunKodu, urunAdi, planlananUretimAdedi, planlananSure, urunBarkod } = this.state;

        return (
            <div style={{ padding: 12, backgroundColor: "#303030", height: "100vh" }}>
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
                        İş Emri Gir
                    </Typography>
                </div>
                <Form className="isEmriForm" style={{ padding: "60px", alignItems: "center" }}>
                    <Form.Group unstackable widths={4}>
                        <Form.Input label='Üretim Plan No' placeholder='Üretim Plan No'
                            value={uretimPlanNo} name="uretimPlanNo" onChange={this.onChange}
                        />
                        <Form.Input label='Hat Numarası' placeholder='Hat Numarası'
                            value={hatNumarasi} name="hatNumarasi" onChange={this.onChange}
                        />
                        <Form.Input label='Üretim Noktası (Makine No)' placeholder='Üretim Noktası (Makine No)'
                            value={uretimNoktasi} name="uretimNoktasi" onChange={this.onChange}
                        />
                        <Form.Input label='Ürün Kodu' placeholder='Ürün Kodu'
                            value={urunKodu} name="urunKodu" onChange={this.onChange}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group unstackable widths={4}>
                        <Form.Input label='Ürün Adı' placeholder='Ürün Adı'
                            value={urunAdi} name="urunAdi" onChange={this.onChange}
                        />
                        <Form.Input label='Planlanan Üretim Adedi' placeholder='Planlanan Üretim Adedi'
                            value={planlananUretimAdedi} name="planlananUretimAdedi" onChange={this.onChange}
                        />
                        <Form.Input label='Ürün Barkod' placeholder='Ürün Barkod'
                            value={urunBarkod} name="urunBarkod" onChange={this.onChange}
                        />
                        <Form.Input label='Planlanan Süre (dk)' placeholder='Planlanan Süre'
                            value={planlananSure} name="planlananSure" onChange={this.onChange}
                        />
                    </Form.Group>
                    <br></br>
                    <Button
                        className="isEmriButon"
                        onClick={this.gonder}
                        primary
                    >İş Emri Gir
                    </Button>
                </Form>

            </div>
        )
    }
}
