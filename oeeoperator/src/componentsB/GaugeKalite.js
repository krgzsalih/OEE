import React, { Component } from 'react'
import GaugeChart from 'react-gauge-chart'
import { Card } from 'semantic-ui-react'

import '../App.css'

export default class GaugeKalite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quality:props.quality,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({quality:nextProps.quality},()=>{
            //console.log(this.state)
        });
    }
    render() {
        const {quality} = this.state;
        const chartStyle={
            width: 470,
            height: 270,
        }


        return (
            <div >
                <Card className="gauge-chart-card">
                    <div className="pie-title">
                        Makine Kalite
                    </div>
                    <div >
                        <GaugeChart id="gauge-chart5" style={chartStyle}
                            nrOfLevels={20} 
                            percent={quality}
                        />
                    </div>
                </Card>
            </div>
        )
    }
}
