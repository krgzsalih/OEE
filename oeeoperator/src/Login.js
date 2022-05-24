import React, { Component } from 'react';
import { Button, Input, Form } from 'semantic-ui-react';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            kullaniciAdi:'',
            sifre:'',
            girisOnayi: props.girisOnayi,
        }
    }
    
    componentWillReceiveProps(nextProps){
        //nextProps, sadece propları taşıyan bir obje, onstructor daki propsun günceli, yeni değer anlamı taşımıyor tek başına, yeni değerleri taşıyor.
        this.setState({girisOnayi:nextProps.girisOnayi}, ()=>{this.onay()});
    }
    onChange=(e,{name,value}) => {
        this.setState({[name]:value});
    }

    // GİRİŞ BAŞARILI VEYA BAŞIRISIZ MESAJI, YAPMAYA ÇALIŞTIM YAPAMADIM
    onay=()=>{
        console.log(this.state.girisOnayi, '  geldiiii');
        // if (this.state.girisOnayi > 0 ) {
        //     alert("Giriş Başarılı")
        // }else{
        //     alert("Kullanıcı adı veya şifre yalnış !")
        // }
    }

    gonder=()=>{
        this.props.girisYap(this.state.kullaniciAdi, this.state.sifre);
    } 
    
    render() {
        const {kullaniciAdi, sifre, glnUser} = this.state;
         //console.log(glnUser, " render içi")
        return (
            <div className="App-header">
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Kullanıcı Adı</label>
                        <Input value={kullaniciAdi} name="kullaniciAdi" placeholder='Kullanıcı Adı' 
                            onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Şifre</label> 
                        <Input value={sifre} name="sifre" placeholder='Şifre' type="password"
                            onChange={this.onChange} />
                    </Form.Field>
                        
                    <Button type='submit' onClick={this.gonder}
                        
                    >Giriş Yap</Button>  

                            
                </Form>
            </div>
        )
    }
}
