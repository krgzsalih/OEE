import React, { Component } from 'react'
import GaugeChart from 'react-gauge-chart'
import { Card } from 'semantic-ui-react'

import '../App.css'

export default class GaugePerformans extends Component {

    constructor(props) {
        super(props);
        this.state = {
            performance:props.performance,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({performance:nextProps.performance});
    }

    render() {
        const {performance} = this.state;
        const chartStyle={
            width: 470,
            height: 270,
        }


        return (
            <div >
                <Card className="gauge-chart-card">
                    <div className="pie-title">
                        Makine Performans
                    </div>
                    <div >
                        <GaugeChart id="gauge-chart4" style={chartStyle}
                            nrOfLevels={20} 
                            percent={performance}
                        />
                    </div>
                </Card>
            </div>
        )
    }
}
