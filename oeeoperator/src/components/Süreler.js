import React, { Component } from 'react'

export default class Süreler extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <div className="left-progress">
                  
                  <label>Planlanan Süre</label> <br></br> <br></br>
                  <label>{this.props.gelenUrunBilgileri.planlananSure} Dk</label> <br></br> <br></br><br></br><br></br>

                  <label>Operasyon Süresi</label> <br></br> <br></br>
                  <label>Dk</label>
                  
                </div>
            </div>
        )
    }
}
