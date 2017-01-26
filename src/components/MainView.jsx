import React from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper';
// icons for tabs
import StatsIcon from 'material-ui/svg-icons/action/assessment';
import ControlIcon from 'material-ui/svg-icons/action/build';
import Panel from "./Panel.jsx"

const MainView = React.createClass({

  getInitialState: function() {
    return {tabIndex: 0}
  },

  render: function() {
    var panel;
    if(this.state.tabIndex == 0) {
      panel = "stats";
    }
    else {
      panel = "control";
    }

    return (<div style={{textAlign: "center"}}>
      <Paper zDepth={1}>
        <div>
          <BottomNavigation selectedIndex={this.state.tabIndex}>
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
          </BottomNavigation>
        </div>
        <div>
          <Panel selectedPanel={panel}/>
        </div>
      </Paper>
    </div>);
  }
});

export default MainView;
