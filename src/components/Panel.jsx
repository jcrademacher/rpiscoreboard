import React from 'react';
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Arrow from 'material-ui/svg-icons/maps/navigation';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const Panel = React.createClass({

  getInitialState: function() {
    return (
      {
        clockMode: "clock",
				tenMinValue: parseInt(this.formatTime().charAt(0)),
				oneMinValue: parseInt(this.formatTime().charAt(1)),
				tenSecValue: parseInt(this.formatTime().charAt(3)), // skip over 2 because index 2 is a colon
				oneSecValue: parseInt(this.formatTime().charAt(4))
      }
    );
  },

	formatTime: function() {
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
	},

  handleRadioButton: function(e, value) {
    this.replaceState({clockMode: value});

    if(value == "clock") {
			this.replaceState({
				tenMinValue: parseInt(this.formatTime().charAt(0)),
				oneMinValue: parseInt(this.formatTime().charAt(1)),
				tenSecValue: parseInt(this.formatTime().charAt(3)), // skip over 2 because index 2 is a colon
				oneSecValue: parseInt(this.formatTime().charAt(4))
			});
		}
		else {
			this.replaceState({
				tenMinValue: 0,
				oneMinValue: 0,
				tenSecValue: 0,
				oneSecValue: 0
			});
		}
  },

	handleTextFieldChange: function(e) {
		var str = e.target.value;

		if (/\D/.test(str))  // regexp tests for any non-digit characters
			e.target.value = str.substr(0,str.length - 1); // delete last char
		if(str.length > 4)
			e.target.value = str.substr(0,str.length - 1);
	},

	handleScoreChange: function(method) {
		var xhr = new XMLHttpRequest();

		// sends http request over network to server to handle score change
		xhr.open("POST", "control/" + method, true);
		xhr.send();
	},

  render: function() {
    var curTime = this.state.tenMinValue.toString() + this.state.oneMinValue + ":" + this.state.tenSecValue + this.state.oneSecValue;

		var styles = {
			clock: {
				fontSize: 80,
			},

			table: {
				border: "1px solid black",
				width: "100%"
			},

			middle: {
				fontSize: 20
			},

			score: {
				textAlign: "center",
				fontSize: 80,
				border: "1px solid black",
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
				border: "1px solid black"
			},

			gameTimes: {
				margin: 10,
				width: 200,
				height: 50,
				fontSize: 17
			}
		}

    if(this.props.selectedPanel == "control") {
      return (
        <div>
          <div>
            <span>
              <RadioButtonGroup
              defaultSelected="clock"
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
									<td style={{border: "1px solid black"}}/>
									<td style={{border: "1px solid black"}}/>
									<td>{curTime}</td>
									<td style={{border: "1px solid black"}}/>
									<td style={{border: "1px solid black"}}/>
								</tr>
								<tr>
									<td style={{border: "1px solid black"}}/>
									<td style={styles.score}>0</td>
									<td style={styles.center}>
										<FlatButton
											style={styles.gameTimes}
											backgroundColor="#E8D0A9"
										>5:00 Game</FlatButton>
										<FlatButton
											style={styles.gameTimes}
											backgroundColor="#E8D0A9"
										>10:00 Game</FlatButton>
										<br/>
										<FlatButton
											style={styles.gameTimes}
											backgroundColor="#E8D0A9"
										>15:00 Game</FlatButton>
										<FlatButton
											style={styles.gameTimes}
											backgroundColor="#E8D0A9"
										>20:00 Game</FlatButton>
									</td>
									<td style={styles.score}>0</td>
									<td style={{border: "1px solid black"}}/>
		            </tr>
								<tr>
									<td style={{border: "1px solid black"}}/>
									<td style={{border: "1px solid black"}}>
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
											inputStyle={{textAlign: "center"}}
											defaultValue="00:00"
											onChange={this.handleTextFieldChange}
										/>
									</td>
									<td style={{border: "1px solid black"}}>
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
									<td style={{border: "1px solid black"}}/>
								</tr>
							</table>
						</div>
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
});

export default Panel;
