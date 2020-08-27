import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {Divider} from '@material-ui/core';
import Chart from 'chart.js';
import "./dashboard.css";
import FrontView from '../../assets/front_view.png';
import SideView from '../../assets/side_view.png';
import GraphPaper from '../../assets/graph.png';
import UserLogo from '../../assets/user_logo.png';
import {db} from '../../firebase';

const styles = () => ({
    
});

class Dashboard extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            dotTop: 0,
            dotLeft: 0,
            data: [0,0,0],
            values: [0,0,0]
        }
    }

    componentDidMount() {
        var ctx = document.getElementById('xAxisChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [0],
                datasets: [{
                    label: 'Displacement in X-axis',
                    data: [0],
                    backgroundColor: [
                        'rgba(241, 238, 238, 0)'
                    ],
                    borderColor: [
                        'blue'
                    ],
                    borderWidth: 2,
                    circular: false
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                }
            }
        });

        var ctx2 = document.getElementById('yAxisChart');
        var myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: [0],
                datasets: [{
                    label: 'Displacement in Y-axis',
                    data: [0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0)',
                    ],
                    borderColor: [
                        'green'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                }
            }
        });

        // db.collection("sensors").doc("sensorsdata").get()
        // .then(snapshot => {
        //     console.log(snapshot.data())
        // })

        var i=0;
        var values = [0,0,0];
        var displayData = [0,0,0];
        this.timer = setInterval(() => {

            db.collection("sensors").doc("sensorsdata").get()
            .then(doc => {
                var data = doc.data()['gyroscope'];
                // console.log("data", data);
                if(data) {
                    data.map(d => {
                        var diff = [0,0,0];
                        diff[0] = d.x - values[0];
                        diff[1] = d.y - values[1];
                        diff[2] = d.z - values[2];
                        displayData = diff;
                        values[0] = d.x;
                        values[1] = d.y;
                        values[2] = d.z;
                        console.log("displayData", displayData);
                        var x = displayData[0];
                        var y = displayData[2];
                        var n = myChart.data.labels.length;
                        myChart.data.labels.push(n);
                        myChart.data.datasets[0].data.push(x);
                        myChart2.data.labels.push(n);
                        myChart2.data.datasets[0].data.push(y);
                        myChart.update();
                        myChart2.update();
                        this.setState({
                            dotTop: 100*y,
                            dotLeft: 100*x
                        })
                    })
                    // var diff = [];
                    // for(var i=0;i<3;i++) {
                    //     // console.log(data[i] - prevData[i])
                    //     diff.push(0.5*(data[i] - prevData[i]));
                    // }
                    // // console.log("diff", diff)
                    // values = diff;
                    // prevData = data;
                    // this.setState({
                    //     data: data,
                    //     values: diff
                    // })
                    // console.log("values", values);
                }

                // var x = values[0];
                // var y = values[2];
                // var n = myChart.data.labels.length;
                // myChart.data.labels.push(n);
                // myChart.data.datasets[0].data.push(x);
                // myChart2.data.labels.push(n);
                // myChart2.data.datasets[0].data.push(y);
                // myChart.update();
                // myChart2.update();
                // this.setState({
                //     dotTop: 500*y,
                //     dotLeft: 500*x
                // })
            })
            i++;
            console.log(i);
            if(i==30) {
                clearInterval(this.timer);
            }
        }, 500);
    }

    render() {
        const { classes, theme } = this.props;

        // console.log("myData", this.state.dotLeft, this.state.dotLeft);

        return (
            <div className="dashboard">
                <div className="dashboardSidebar">
                    <div className="sideHeading">
                        <span style={{color: "#67217c"}}>C</span>
                        <span style={{color: "#f06706"}}>A</span>
                        <span style={{color: "#1e9e8e"}}>R</span>
                        <span style={{color: "#eda009"}}>T</span>
                    </div>
                    <Divider light style={{
                        backgroundColor: "white"
                    }} />
                </div>
                <div className="dashboardAppbar">
                    <img src={UserLogo} slt="UserLogo" height="45px" style={{marginRight: "30px", cursor: "pointer"}} />
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