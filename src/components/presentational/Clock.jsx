import React from "react";

export default class Clock extends React.Component {
	constructor(props) {
		super(props);

		this.tick = this.tick.bind(this);

		this.state = {
			tenMinValue: this.props.values.tenMinValue,
			oneMinValue: this.props.values.oneMinValue,
			tenSecValue: this.props.values.tenSecValue,
			oneSecValue: this.props.values.oneSecValue
		};

		this.timer = setInterval(this.tick, 1000);
	}

	// method called before component receives new props,
	// sets state to new values in order to provide correct values for re render
	componentWillReceiveProps(nextProps) {
		this.setState({
			tenMinValue: nextProps.values.tenMinValue,
			oneMinValue: nextProps.values.oneMinValue,
			tenSecValue: nextProps.values.tenSecValue,
			oneSecValue: nextProps.values.oneSecValue
		});

		// if nextProps specify that the timer should not be running, and if the timer is currently running,
		// then call function to sync state with ControlPanel
		if(!nextProps.running && this.props.running)
			this.props.sync(this.state, true);
	}

	componentWillUnmount() {
		clearInterval(this.timer); // clears instance variable timer from ticking
		// when BottomNavigation is tabbed out of, start timer
		this.props.onDeselect(this.state, this.props.clockMode, this.props.running);
	}

	tick() {
		if(!this.props.running)
			return;

		var tenMin = this.state.tenMinValue;
		var oneMin = this.state.oneMinValue;
		var tenSec = this.state.tenSecValue;
		var oneSec = this.state.oneSecValue;

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

		this.setState({
			tenMinValue: tenMin,
			oneMinValue: oneMin,
			tenSecValue: tenSec,
			oneSecValue: oneSec,
		});

		this.props.sync(this.state, false);

		if(tenMin == 0 && oneMin == 0 && tenSec == 0 && oneSec == 0)
			this.props.sync(this.state, true); // calls function in ControlPanel to synchronize states
	}

	render() {
		var curTime = this.state.tenMinValue.toString() + this.state.oneMinValue.toString() + ":" + this.state.tenSecValue.toString() + this.state.oneSecValue.toString();

		return (<div>{curTime}</div>);
	}
}
