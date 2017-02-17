import React from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper';
// icons for tabs
import StatsIcon from 'material-ui/svg-icons/action/assessment';
import ControlIcon from 'material-ui/svg-icons/action/build';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import DisplaysIcon from 'material-ui/svg-icons/av/video-label';
import Panel from "./Panel.jsx";
import LinearProgress from "material-ui/LinearProgress";

const MainView = React.createClass({

  getInitialState: function() {
    return {tabIndex: 1}
  },

  render: function() {
    var panel;

		var styles = {
			paper: {
				backgroundColor: "#f5fafa"
			}
		};

		var i = this.state.tabIndex;

    if(i == 0) {
      panel = "stats";
    }
    else if(i == 1){
      panel = "control";
    }
		else if(i == 2) {
			panel = "displays";
		}
		else if(i == 3) {
			panel = "settings"
		}
		else {
			panel = "control";
		}

    return (<div style={{textAlign: "center"}}>
      <Paper zDepth={4} style={styles.paper}>
        <div>
          <BottomNavigation style={{backgroundColor: "#e5e5e5"}} selectedIndex={this.state.tabIndex}>
            <BottomNavigationItem
              label="View Stats"
              icon={<StatsIcon/>}
              onClick={() => this.setState({tabIndex: 0})}
            />
            <BottomNavigationItem
              label="Control Board"
              icon={<ControlIcon/>}
              onClick={() => this.setState({tabIndex: 1})}
            />
						<BottomNavigationItem
							label="Displays"
							icon={<DisplaysIcon/>}
							onClick={() => this.setState({tabIndex: 2})}
						/>
						<BottomNavigationItem
              label="Settings"
              icon={<SettingsIcon/>}
              onClick={() => this.setState({tabIndex: 3})}
            />
          </BottomNavigation>
        </div>
        <div>
          <Panel selectedIndex={panel}/>
        </div>
      </Paper>
    </div>);
  }
});

export default MainView;
