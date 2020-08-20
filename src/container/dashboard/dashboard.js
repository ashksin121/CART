import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import "./dashboard.css";

const styles = () => ({
    label: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#2c3642',
            },
        },
        '& label.Mui-focused': {
            color: '#2c3642',
            fontWeight: "bold"
        },
    }
  });

class Dashboard extends Component {

  render() {
    const { classes, theme } = this.props;
    return (
        <div className="dashboard">
            <div className="dashboardSidebar">
                <div className="sideHeading">
                    CART
                </div>
            </div>
            <div className="dashboardAppbar">

            </div>
            <div className="dashboardMain">

            </div>
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);