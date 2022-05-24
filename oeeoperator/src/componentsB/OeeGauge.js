import React, { Component } from 'react'
import GaugeChart from 'react-gauge-chart'
import { Card } from 'semantic-ui-react'

import '../App.css';

export default class OeeGauge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oee:props.oee,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({oee:nextProps.oee});
    }
    render() {
        const {oee} = this.state;
        const chartStyle={
            width: 470,
            height: 270,
        }

        return (
            <div >
                <Card className="gauge-chart-card">
                    <div className="pie-title">
                        Makine Oee
                    </div>
                    <div >
                        <GaugeChart id="gauge-chart2" style={chartStyle}
                            nrOfLevels={20} 
                            percent={oee}
                        />
                    </div>
                </Card>
                
            </div>
        )
    }
}

