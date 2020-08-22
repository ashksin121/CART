import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {Divider} from '@material-ui/core';
import Chart from 'chart.js';
// var Chart = require('chart.js');
import {Line} from 'react-chartjs-2';
// import { LineChart, Line } from 'recharts';
import "./dashboard.css";

const styles = () => ({
    
});

const Hdata = [65, 59, 80, 81, 56];

class Dashboard extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            myChart: {}
        }
    }

    componentDidMount() {
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: '# of Votes',
                    data: [],
                    // backgroundColor: [
                    //     'rgba(255, 99, 132, 0.2)',
                    //     'rgba(54, 162, 235, 0.2)',
                    //     'rgba(255, 206, 86, 0.2)',
                    //     'rgba(75, 192, 192, 0.2)',
                    //     'rgba(153, 102, 255, 0.2)',
                    //     'rgba(255, 159, 64, 0.2)'
                    // ],
                    borderColor: [
                        // 'rgba(255, 99, 132, 1)',
                        // 'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        // setTimeout(() => {
        //     myChart.data.labels.push("Tuturu")
        //     myChart.data.datasets[0].data.push(15);
        //     myChart.update();
        // }, 5000)

        var i=0;
        this.timer = setInterval(() => {
            myChart.data.labels.push(i);
            myChart.data.datasets[0].data.push((Math.floor(Math.random() * 5) - 2)/2);
            myChart.update();
            i++;
            if(i==15) {
                clearInterval(this.timer);
            }
        }, 2000);

        // myChart.data.labels.push("Tuturu")
        // myChart.data.datasets[0].data.push(15);
        // myChart.update()
        this.setState({ myChart: myChart});

        // var i=0;
        // this.timer = setInterval(() => {

        // })
    }

    render() {
        const { classes, theme } = this.props;

        console.log("myChart", this.state.myChart)

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
                    <div style={{width: "450px"}}>
                        <canvas id="myChart" width="400" height="200"></canvas>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Dashboard);