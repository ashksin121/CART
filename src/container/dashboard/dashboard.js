import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {Divider} from '@material-ui/core';
import Chart from 'chart.js';
import "./dashboard.css";
import FrontView from '../../assets/front_view.png';
import SideView from '../../assets/side_view.png';
import GraphPaper from '../../assets/graph.png';

const styles = () => ({
    
});

class Dashboard extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            dotTop: 0,
            dotLeft: 0
        }
    }

    componentDidMount() {
        var ctx = document.getElementById('xAxisChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Displacement in X-axis',
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

        var ctx2 = document.getElementById('yAxisChart');
        var myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Displacement in Y-axis',
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
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        var i=0;
        this.timer = setInterval(() => {
            var x = Math.floor(Math.random() * 5) - 2;
            var y = Math.floor(Math.random() * 5) - 2;
            myChart.data.labels.push(i);
            myChart.data.datasets[0].data.push(x/2);
            myChart2.data.labels.push(i);
            myChart2.data.datasets[0].data.push(y/2);
            myChart.update();
            myChart2.update();
            this.setState({
                dotTop: 7*y,
                dotLeft: 7*x
            })
            i++;
            if(i==30) {
                clearInterval(this.timer);
            }
        }, 500);
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
                    <div style={{
                        width: "100%", height: "600"
                    }}>
                        <div style={{height: "600", width: "75%", float: "left"}}>
                            <div className="dashboardGraphBox">
                                <div className="diagBox">
                                    <div className="diag">
                                        <img src={FrontView} alt="FrontView" style={{height: "140px", margin: "auto"}} />
                                    </div>
                                    <div className="diagText">
                                        Anterior Displacement
                                    </div>
                                </div>
                                <div className="graph">
                                    <canvas id="xAxisChart" width="600" height="200"></canvas>
                                </div>
                            </div>
                            <div className="dashboardGraphBox">
                                <div className="diagBox">
                                    <div className="diag">
                                        <img src={SideView} alt="SideView" style={{height: "140px", margin: "auto"}} />
                                    </div>
                                    <div className="diagText">
                                        Lateral Displacement
                                    </div>
                                </div>
                                <div className="graph">
                                    <canvas id="yAxisChart" height="200" width="600"></canvas>
                                </div>
                            </div>
                        </div>
                        <div className="dotChartBox">
                            <div style={{height: "300px", width: "250px"}}>
                                <img src={GraphPaper} alt="GraphPaper" height="300px" style={{position: "fixed"}} />
                                <div className="dotSafety"></div>
                                <div className="dotDot" style={{top: `${40 + this.state.dotTop}px`, left: `${112 + this.state.dotLeft}px`}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Dashboard);