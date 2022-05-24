import React, { Component } from 'react';
import BarcodeReader from 'react-barcode-reader'

import { Button, Form, Popup, Input } from 'semantic-ui-react';

export default class SeriNoOkut extends Component {
    constructor(props){
        super(props)
        this.state = {
          result: 'No result',
        }
      }
      handleScan=(data)=>{
        this.setState({
          result: data,
        })
        this.props.parentCallback(data);
      }
      handleError=(err)=>{
        console.error(err)
      }

    render() {
        return (
            <div>
                <Popup style={{"background-color":"rgb(165, 165, 200)", "width": "300px", "height":"200px"}}
                    position
                    wide trigger={<Button className="left-buttons" content='SERİ NO OKUT KOMPONENT EKLE / ÇIKAR' />} on='click'>
                    <Form >
                      <BarcodeReader
                            onError={this.handleError}
                            onScan={this.handleScan}
                        />
                        <Input type="text" name="myname">{this.state.result}</Input>
                    </Form>
                      
                </Popup>   
            </div>
        )
    }
}