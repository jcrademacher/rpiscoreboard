import React from 'react';
import RaisedButton from "material-ui/RaisedButton";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const Panel = React.createClass({

  getInitialState: function() {
    return (
      {
        clockMode: "clock"
      }
    );
  },

  // gets current time
  getTime: function() {
    var date = new Date();

    var h = date.getHours();

    if (h > 12) {
      h -= 12;
    }

    if(this.state.clockMode == "clock") {
      // needed because date.getMinutes() returns just a single digit when less than 10
      if(date.getMinutes() < 10)
        return (h + ":" + "0" + date.getMinutes())
      else
        return (h + ":" + date.getMinutes());
    }
    else {
      return "00:00";
    }
  },

  handleRadioButton: function(e, value) {
    this.setState({clockMode: value});

  },

  render: function() {
    var curTime = this.getTime();

		var styles = {
			clock: {
				fontSize: 80,
				align: "center",
				width: "100%"
			},

			table: {
				textAlign: "center"
			},

			score: {
				align: "left",
				fontSize: 80
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
								<tr>
									<td style={styles.clock}>{curTime}</td>
								</tr>
								<tr>
									<td style={styles.score}>0</td>
									<td style={styles.score}>0</td>
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
