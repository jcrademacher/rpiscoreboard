import React from 'react';
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Arrow from 'material-ui/svg-icons/maps/navigation';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Clock from '../presentational/Clock.jsx';

class ControlPanel extends React.Component {

	constructor(props) {
		super(props);

		this.parent = this;

		this.handleRadioButton = this.handleRadioButton.bind(this);
		this.getTimerModificationState = this.getTimerModificationState.bind(this);
		this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
		this.handleScoreChange = this.handleScoreChange.bind(this);
		this.handleTimerChange = this.handleTimerChange.bind(this);
		this.syncTimer = this.syncTimer.bind(this);

		var cmode = this.props.clockMode == "clock";

		this.state = {
      clockMode: this.props.clockMode,
			timerRunning: this.props.running,

			homeScore: 0,
			awayScore: 0
		};

		this.values = {
			// ternary operator checks if clockMode is in clock mode
			// if so, format new time, if not, display passed timer values as props
			tenMinValue: cmode ? parseInt(this.formatTime().charAt(0)) : this.props.values.tenMinValue,
			oneMinValue: cmode ? parseInt(this.formatTime().charAt(1)) : this.props.values.oneMinValue,
			// skip over 2 because index 2 is a colon
			tenSecValue: cmode ? parseInt(this.formatTime().charAt(3)) : this.props.values.tenSecValue,
			oneSecValue: cmode ? parseInt(this.formatTime().charAt(4)) : this.props.values.oneSecValue,
		};
	}

	formatTime() {
		var date = new Date();

    var h = date.getHours();
		var m = date.getMinutes();

    if (h > 12) {
      h -= 12;
    }

		if (m < 10 && h < 10) {
			return ("0" + h + ":0" + m);
		}
    else if (m < 10 && h >= 10) {
			return (h + ":0" + m);
		}
		else if (m >= 10 && h < 10) {
			return ("0" + h + ":" + m);
		}
		else {
			return (h + ":" + m);
		}
	}

	getTimerBtnState(prop) {
		if(prop == "color") {
			if(this.state.timerRunning)
				return "#fc6f6f"; // green
			else return "#c1dad6"; // red
		}

		if(prop == "label") {
			if(this.state.timerRunning)
				return "Stop Timer";
			else return "Start Timer";
		}
	}

	getTimerModificationState() {
		return this.state.clockMode == "clock" || this.state.timerRunning;
	}

	handlePresetTime(time, event) {
		if(time == "5:00") {
			this.values = {
				tenMinValue: 0,
				oneMinValue: parseInt(time.charAt(0)),
				tenSecValue: parseInt(time.charAt(2)), // skip over 1 for the colon in "5:00"
				oneSecValue: parseInt(time.charAt(3))
			};
		}
		else {
			this.values = {
				tenMinValue: parseInt(time.charAt(0)),
				oneMinValue: parseInt(time.charAt(1)), // skip over 2 for the colon
				tenSecValue: parseInt(time.charAt(3)),
				oneSecValue: parseInt(time.charAt(4))
			};
		}

		// gets rid of colon, and adds 0 in front of 500
		time = time == "5:00" ? "0500" : time.replace(":","");

		this.props.httpCallback("POST", "control/time/" + time, null);
	}

  handleRadioButton(e, value) {
    this.setState({clockMode: value});

    if(value == "clock") {
			this.setState({
				timerRunning: false,

				clockMode: value,
			});

			this.values = {
				tenMinValue: parseInt(this.formatTime().charAt(0)),
				oneMinValue: parseInt(this.formatTime().charAt(1)),
				tenSecValue: parseInt(this.formatTime().charAt(3)), // skip over 2 because index 2 is a colon
				oneSecValue: parseInt(this.formatTime().charAt(4))
			};
		}
		else {
			this.setState({
				timerRunning: false,

				clockMode: value,
			});

			this.values = {
				tenMinValue: 0,
				oneMinValue: 0,
				tenSecValue: 0,
				oneSecValue: 0
			};
		}

		this.props.httpCallback("POST", "control/mode/" + value, null);
  }

	handleScoreChange(method) {
		var newScore;

		if(method == "home-up") {
			if (this.state.homeScore + 1 > 19)
				newScore = 0;
			else newScore = this.state.homeScore + 1;

			this.setState({homeScore: newScore});
		}

		else if(method == "home-down") {
			if (this.state.homeScore - 1 < 0)
				newScore = 19;
			else newScore = this.state.homeScore - 1;

			this.setState({homeScore: newScore});
		}

		else if(method == "away-up") {
			if (this.state.awayScore + 1 > 19)
				newScore = 0;
			else newScore = this.state.awayScore + 1;

			this.setState({awayScore: newScore});
		}

		else if(method == "away-down") {
			if (this.state.awayScore - 1 < 0)
				newScore = 19;
			else newScore = this.state.awayScore - 1;

			this.setState({awayScore: newScore});
		}

		this.props.httpCallback("POST", "control/score/" + method, null);
	}

	handleTextFieldChange(e, newVal) {
		var str = e.target.value;
		var enteredChar = str.substring(str.length - 1);

		if (/\D/.test(enteredChar)) {  // regexp tests for any non-digit characters
			e.target.value = newVal.substr(0,str.length - 1); // delete last char
			return;
		}

		if(newVal.length == 1)
			str = "00:00" + str;

		str = str.replace(":","");

		if(str.length == 5)
			str = str.substring(1);
		else if(str.length == 3)
			str = "0" + str;

		e.target.value = str.substr(0,2) + ":" + str.substring(2);

		this.values = {
			tenMinValue: parseInt(e.target.value.charAt(0)),
			oneMinValue: parseInt(e.target.value.charAt(1)),
			// ternary operator checks if tenSecValue is greater than five
			// if so, set value to 5, if not, leave original value
			tenSecValue: parseInt(e.target.value.charAt(3)) > 5 ? 5 : parseInt(e.target.value.charAt(3)),
			oneSecValue: parseInt(e.target.value.charAt(4))
		};

		if(parseInt(str.charAt(2)) > 5)
			str = str.substring(0,2) + "5" + str.substring(3);

		// sends http POST and removes colon from time
		this.props.httpCallback("POST", "control/time/" + str, null);
	}

	handleTimerChange(e) {
		var btn = this.refs.timer;

		var start = btn.props.label == "Start Timer";

		if(start) {
			if (!(this.values.tenMinValue == 0 &&
					this.values.oneMinValue == 0 && // if timer is not at 0
					this.values.tenSecValue == 0 &&
					this.values.oneSecValue == 0)) {
				this.setState({
					timerRunning: true
				});
			}
		}
		else {
			this.setState({
				timerRunning: false
			});
		}

		this.props.httpCallback("POST", "control/timer/" + start ? "start" : "stop", null);
	}

	// callback for Clock components
	// called when timer stops, syncs clock values in this.state
	syncTimer(values, shouldStop) {
		// syncs values with ControlPanel
		this.values = values;

		if(this.state.clockMode == "timer" && shouldStop) {
			this.setState({
				timerRunning: false,
			});
		}
	}

	textOnFocus(event) {
		event.target.value = "";
	}

	textOnBlur(event) {
		event.target.value = "00:00";
	}

  render() {
		var styles = {
			clock: {
				fontSize: 80,
			},

			table: {
				width: "100%"
			},

			middle: {
				fontSize: 20
			},

			score: {
				textAlign: "center",
				fontSize: 100,
				width: "50"
			},

			scoreButton: {
				height: "70",
				width: "50"
			},

			upStyle: {
				height: "50",
				width: "50",
			},

			downStyle: {
				height: "50",
				width: "50",
				transform: "rotate(180deg)"
			},

			center: {
				width: "600",
			},

			gameTimes: {
				margin: 10,
				width: 200,
				height: 50,
				fontSize: 17
			},

			start: {
				width: 250,
				height: 70,
				margin: 10
			},
		};

		return (
      <div>
        <span>
          <RadioButtonGroup
            defaultSelected={this.state.clockMode == "clock" ? "clock" : "timer"}
            style={{textAlign: "left", padding: 8, fontSize: 14}}
            onChange={this.handleRadioButton}
          >
            <RadioButton label="Clock Mode" value="clock"/>
            <RadioButton label="Timer Mode" value="timer"/>
          </RadioButtonGroup>
        </span>
				<div>
					<table style={styles.table}>
						<tr style={styles.clock}>
							<td/>
							<td style={{fontSize: 40, fontWeight: "bold"}}>
								Home
							</td>
							<td>
								<Clock
									running={this.state.timerRunning}
									values={this.values}
									clockMode={this.state.clockMode}
									sync={this.syncTimer}
									onDeselect={this.props.onDeselect}
								/>
							</td>
							<td style={{fontSize: 40, fontWeight: "bold"}}>
								Away
							</td>
							<td/>
						</tr>
						<tr>
							<td/>
							<td style={styles.score}>{this.state.homeScore}</td>
							<td style={styles.center}>
								<FlatButton
									style={styles.gameTimes}
									backgroundColor="#E8D0A9"
									disabled={this.getTimerModificationState()}
									onClick={this.handlePresetTime.bind(this, "5:00")}
									labelStyle={styles.gameTimes}
									label="5:00 Game"
								/>
								<FlatButton
									style={styles.gameTimes}
									backgroundColor="#E8D0A9"
									disabled={this.getTimerModificationState()}
									onClick={this.handlePresetTime.bind(this, "10:00")}
									label="10:00 Game"
									labelStyle={styles.gameTimes}
								/>
								<br/>
								<FlatButton
									style={styles.gameTimes}
									backgroundColor="#E8D0A9"
									disabled={this.getTimerModificationState()}
									onClick={this.handlePresetTime.bind(this, "15:00")}
									label="15:00 Game"
									labelStyle={styles.gameTimes}
								/>
								<FlatButton
									style={styles.gameTimes}
									backgroundColor="#E8D0A9"
									disabled={this.getTimerModificationState()}
									onClick={this.handlePresetTime.bind(this, "20:00")}
									label="20:00 Game"
									labelStyle={styles.gameTimes}
								/>
							</td>
							<td style={styles.score}>{this.state.awayScore}</td>
							<td/>
            </tr>
						<tr>
							<td/>
							<td>
								<RaisedButton
									style={styles.scoreButton}
									icon={<Arrow style={styles.upStyle} color="white"/>}
									onClick={() => this.handleScoreChange("home-up")}
									backgroundColor="#acd1e9"
								/>
								<br/><br/>
								<RaisedButton
									style={styles.scoreButton}
									icon={<Arrow style={styles.downStyle} color="white"/>}
									onClick={() => {this.handleScoreChange("home-down")}}
									backgroundColor="#6d929b"
								/>
							</td>
							<td style={styles.middle}>
								<span style={{margin: "10"}}>Enter a custom time:</span>
								<TextField
									id="textfield"
									inputStyle={{textAlign: "center", fontSize: 20}}
									hintStyle={{textAlign: "center"}}
									defaultValue="00:00"
									onChange={this.handleTextFieldChange}
									onFocus={this.textOnFocus}
									onBlur={this.textOnBlur}
									disabled={this.getTimerModificationState()}
								/>
							</td>
							<td>
								<RaisedButton
									style={styles.scoreButton}
									icon={<Arrow style={styles.upStyle} color="white"/>}
									onClick={() => {this.handleScoreChange("away-up")}}
									backgroundColor="#acd1e9"
								/>
								<br/><br/>
								<RaisedButton
									style={styles.scoreButton}
									icon={<Arrow style={styles.downStyle} color="white"/>}
									onClick={() => {this.handleScoreChange("away-down")}}
									backgroundColor="#6d929b"
								/>
							</td>
							<td/>
						</tr>
						<tr>
							<td/>
							<td/>
							<td>
								<FlatButton
									ref="timer"
									label={this.getTimerBtnState("label")}
									disabled={this.state.clockMode == "clock"}
									backgroundColor={this.getTimerBtnState("color")}
									style={styles.start}
									labelStyle={{fontSize: 20}}
									onClick={this.handleTimerChange}
								/>
							<br/>
							<br/>
							</td>
						</tr>
					</table>
				</div>
      </div>
    );
  }
}

export default ControlPanel;
