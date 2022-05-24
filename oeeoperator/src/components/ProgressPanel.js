import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../App.css";


import React, { Component } from 'react'

export default class ProgressPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progressPercentage: props.progressPercentage,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({progressPercentage: nextProps.progressPercentage});
    }
    

    render() {
        const {progressPercentage} = this.state;
        return (
            <div>
                    <CircularProgressbar value={progressPercentage} text={`${progressPercentage}%`} 
                    styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0,
                    
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                    
                        // Text size
                        textSize: '16px',
                    
                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.5,
                    
                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',
                    
                        // Colors
                        pathColor: `rgba(250, 40, 40, ${progressPercentage / 100})`,
                        textColor: '#f8',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                      })} />
            </div>
        )
    }
}
