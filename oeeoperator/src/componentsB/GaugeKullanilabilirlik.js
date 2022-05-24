import React, { Component } from 'react'
import GaugeChart from 'react-gauge-chart'
import { Card} from 'semantic-ui-react'

import '../App.css'

export default class GaugeKullanilabilirlik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availability:props.availability,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({availability:nextProps.availability});
    }
    render() {
        const { availability } = this.state;
        const chartStyle={
            width: 470,
            height: 270,
        }

        return (
            <div >
                <Card className="gauge-chart-card">
                    <div className="pie-title">
                        Makine Kullanılabilirlik
                    </div>
                    <div >
                        <GaugeChart id="gauge-chart3" style={chartStyle}
                            nrOfLevels={20} 
                            percent={availability}
                        />
                    </div>
                </Card>
            </div>
        )
    }
}
