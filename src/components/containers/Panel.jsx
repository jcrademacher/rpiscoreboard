import React from 'react';
import ControlPanel from "./ControlPanel.jsx";
import StatsPanel from "./StatsPanel.jsx";
import SettingsPanel from "./SettingsPanel.jsx";
import DisplaysPanel from "./DisplaysPanel.jsx";

class Panel extends React.Component {
	constructor(props) {
		super(props);

		this.getTimerValues = this.getTimerValues.bind(this);
		this.runBackgroundTimer = this.runBackgroundTimer.bind(this);

		this.timer = null;
		this.clockMode = "clock";
		this.running = false;
	}

	// gets timer values when BottomNavigation tab has changed
	getTimerValues(values, clockMode, running) {
		this.timerValues = values;
		this.clockMode = clockMode; // gets mode clock was in when ControlPanel was tabbed out of
		this.running = running;

		if(running)
			this.runBackgroundTimer(); // subtracts a second, needed to account for
															   // latency when starting/stopping
		if(this.clockMode == "timer" && running)
			this.timer = setInterval(this.runBackgroundTimer, 1000);
	}

	// runs timer in background
	runBackgroundTimer() {
		var tenMin = this.timerValues.tenMinValue;
		var oneMin = this.timerValues.oneMinValue;
		var tenSec = this.timerValues.tenSecValue;
		var oneSec = this.timerValues.oneSecValue;

		console.log("background timer running");

		oneSec--;

		if(oneSec == -1 && tenSec >= 0) {
	    oneSec = 9;
	    tenSec--;
  	}

	  if(tenSec == -1 && oneMin >= 0) {
	    tenSec = 5;
	    oneMin--;
	  }

	  if(oneMin == -1 && tenMin >= 0) {
	    oneMin = 9;
	    tenMin--;
	  }

		if(tenMin <= 0 && oneMin <= 0 && tenSec <= 0 && oneSec <= 0) {
			clearInterval(this.timer); // stops timer if values have reached 0
			this.running = false;
		}

		// sets timerValues instance variable to newly created timer values
		this.timerValues = {
			tenMinValue: tenMin,
			oneMinValue: oneMin,
			tenSecValue: tenSec,
			oneSecValue: oneSec,
		};

		console.log(this.timerValues);
	}

	render() {
		if(this.props.selectedIndex == "control") {
			if(this.timer != null) { clearInterval(this.timer); }

			return (
				<div>
					<ControlPanel
						onDeselect={this.getTimerValues}
						clockMode={this.clockMode}
						values={this.timerValues}
						running={this.running}
						httpCallback={this.props.httpCallback}
					/>
				</div>
			);
		}
		else if(this.props.selectedIndex == "stats") {
			return (
				<div>
					<StatsPanel
						httpCallback={this.props.httpCallback}
					/>
				</div>
			);
		}
		else if(this.props.selectedIndex == "settings") {
			return (
				<div>
					<SettingsPanel
						httpCallback={this.props.httpCallback}
					/>
				</div>
			);
		}
		else if(this.props.selectedIndex == "displays") {
			return (
				<div>
					<DisplaysPanel
						httpCallback={this.props.httpCallback}
					/>
				</div>
			);
		}
	}
}

export default Panel;
