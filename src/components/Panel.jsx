import React from 'react';
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Arrow from 'material-ui/svg-icons/maps/navigation';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';

class Panel extends React.Component {

	constructor(props) {
		super(props);

		this.parent = this;

		console.log(this);

		this.handleRadioButton = this.handleRadioButton.bind(this);
		this.getTimerModificationState = this.getTimerModificationState.bind(this);
		this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
		this.handleScoreChange = this.handleScoreChange.bind(this);
		this.handleTimerChange = this.handleTimerChange.bind(this);

		this.state = {
      clockMode: "clock",
			timerRunning: false,

			tenMinValue: parseInt(this.formatTime().charAt(0)),
			oneMinValue: parseInt(this.formatTime().charAt(1)),
			tenSecValue: parseInt(this.formatTime().charAt(3)), // skip over 2 because index 2 is a colon
			oneSecValue: parseInt(this.formatTime().charAt(4)),

			homeScore: 0,
			awayScore: 0
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
			this.setState({
				tenMinValue: 0,
				oneMinValue: parseInt(time.charAt(0)),
				tenSecValue: parseInt(time.charAt(2)), // skip over 1 for the colon in "5:00"
				oneSecValue: parseInt(time.charAt(3))
			});
		}
		else {
			this.setState({
				tenMinValue: parseInt(time.charAt(0)),
				oneMinValue: parseInt(time.charAt(1)), // skip over 2 for the colon
				tenSecValue: parseInt(time.charAt(3)),
				oneSecValue: parseInt(time.charAt(4))
			});
		}
	}

  handleRadioButton(e, value) {
    this.setState({clockMode: value});

    if(value == "clock") {
			this.setState({
				timerRunning: false,

				tenMinValue: parseInt(this.formatTime().charAt(0)),
				oneMinValue: parseInt(this.formatTime().charAt(1)),
				tenSecValue: parseInt(this.formatTime().charAt(3)), // skip over 2 because index 2 is a colon
				oneSecValue: parseInt(this.formatTime().charAt(4))
			});
		}
		else {
			this.setState({
				tenMinValue: 0,
				oneMinValue: 0,
				tenSecValue: 0,
				oneSecValue: 0
			});
		}
  }

	handleScoreChange(method) {
		var xhr = new XMLHttpRequest();

		// sends http request over network to server to handle score change
		xhr.open("POST", "control/" + method, true);
		xhr.send();

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

		this.setState({
			tenMinValue: parseInt(e.target.value.charAt(0)),
			oneMinValue: parseInt(e.target.value.charAt(1)),
			tenSecValue: parseInt(e.target.value.charAt(3)),
			oneSecValue: parseInt(e.target.value.charAt(4))
		});
	}

	handleTimerChange(e) {
		var btn = this.refs.timer;

		console.log(btn.props.label);

		if(btn.props.label == "Start Timer") {
			this.setState({
				timerRunning: true
			});
		}
		else {
			this.setState({
				timerRunning: false
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
    var curTime;

		if(this.state.clockMode == "clock") {
			curTime = this.state.oneMinValue + ":" + this.state.tenSecValue + this.state.oneSecValue;
		}
		else {
			// for some reason without toString() the code doesnt display this leading 0
			curTime = this.state.tenMinValue.toString() + this.state.oneMinValue + ":" + this.state.tenSecValue + this.state.oneSecValue;
		}

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

			redSlider: {
				marginLeft: "33%",
				height: 200
			},

			greenSlider: {

			},

			blueSlider: {
				
			}
		}

    if(this.props.selectedPanel == "control") {
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
								<td>{curTime}<br/></td>
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
										onClick={() => {this.handleScoreChange("home-up")}}
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
					<div style={{width: "100%", textAlign: "center", border: "1px solid black"}}>
						<Divider/>
						<br/>
						<Slider
							style={styles.redSlider}
							defaultValue={235}
							min={0}
							max={235}
							step={1}
							axis="y"
						/>
						<Slider
							style={styles.greenSlider}
							defaultValue={235}
							min={0}
							max={235}
							step={1}
							axis="y"
						/>
						<Slider
							style={styles.blueSlider}
							defaultValue={235}
							min={0}
							max={235}
							step={1}
							axis="y"
						/>
					<br/>
					<br/>
					</div>
        </div>
      );
    }
    else if(this.props.selectedPanel == "stats") {
      return (
        <div>
          stats panel
        </div>
      );
    }
  }
}

export default Panel;
