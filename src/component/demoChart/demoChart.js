import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {Divider} from '@material-ui/core';
import {Line} from 'react-chartjs-2';
// import "./dashboard.css";

import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dps = [{x: 1, y: 10}, {x: 2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}];   //dataPoints.
var xVal = dps.length + 1;
var yVal = 15;
var updateInterval = 1000;

const styles = () => ({
    
});

const Hdata = [65, 59, 80, 81, 56];

class Dashboard extends Component {    
    constructor(props) {
        super(props);
        this.updateChart = this.updateChart.bind(this);
        this.state = {
            data : [0],
            chartState: {
                datasets: [
                    {
                        label: 'Rainfall',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: [0]
                    }
                ]
            }
        }
    }

    componentDidMount() {
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		dps.push({x: xVal,y: yVal});
		xVal++;
		// if (dps.length >  10 ) {
		// 	dps.shift();
		// }
		this.chart.render();
	}

    render() {
        const { classes, theme } = this.props;

        console.log("data", this.state.data)

        const options = {
			// title :{
			// 	text: "Dynamic Line Chart"
			// },
			data: [{
				type: "line",
				dataPoints : dps
			}]
		}

        var state = {    
            datasets: [
                {
                    label: 'Rainfall',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.state.data
                }
            ]
        }

        return (
            <div className="dashboard">
                <div className="dashboardSidebar">
                    <div className="sideHeading">
                        CART
                    </div>
                    <Divider light style={{
                        backgroundColor: "white"
                    }} />
                </div>
                <div className="dashboardAppbar">

                </div>
                <div className="dashboardMain">
                    <div style={{width: "250px"}}>
                        <CanvasJSChart options = {options} 
                            onRef={ref => this.chart = ref}
                            style={{
                                height: "250px"
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Dashboard);