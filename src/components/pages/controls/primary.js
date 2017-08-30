import React, { Component } from 'react';

import { Radio, Button, Input } from 'react-onsenui';

export default class PrimaryControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clockMode: true,
      customTime: ""
    }
  }

  setMode(val) {
    const {
      socket
    } = this.props;

    this.setState({
      clockMode: val
    });

    socket.send("clockMode/" + val);
  }

  setTime(val) {
    this.props.socket.send("setTime/" + val)
  }

  startTimer() {
    this.props.socket.send("timer");
  }

  setTimer0() {
    this.props.socket.send("setTimer0");
  }

  changeScore(side, direction) {
    const {
      socket
    } = this.props

    if(side == "home" && direction) {
      socket.send("home/+1");
    }
    else if(side == "home" && !direction) {
      socket.send("home/-1");
    }
    else if(side == "away" && direction) {
      socket.send("away/+1");
    }
    else if(side == "away" && !direction) {
      socket.send("away/-1");
    }
  }

  render() {
    const styles = {
      container: {
        textAlign: "center",
        padding: "10px"
      },
      mode: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center"
      },
      radioButton: {
        borderRadius: 25,
        border: "1px solid rgb(200,200,200)",
        textAlign: "center",
        paddingLeft: 2,
        marginRight: 8
      },
      button: {
        margin: 8,
        width: 160
      },
      fullWidthButton: {
        width: "95%",
        marginBottom: 12
      },
      scoreButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        position: "relative"
      },
      homeContainer: {
        width: "50%",
        borderRight: "1px solid rgb(200,200,200)"
      },
      awayContainer: {
        width: "50%",
        borderLeft: "1px solid rgb(200,200,200)"

      },
      scoreButton: {
        width: "110px",
        height: "90px",
        marginBottom: 12
      }
    }

    return (
      <div style={styles.container}>
        {/*** MODE ***/}

        <div style={styles.mode}>
          <Button
            style={styles.mode}
            modifier="quiet"
            onClick={() => this.setMode(true)}
          >
            <Radio
              style={styles.radioButton}
              checked={this.state.clockMode}
            />
            <span style={{color: "black"}}>Clock Mode</span>
          </Button>
          <Button
            style={styles.mode}
            modifier="quiet"
            onClick={() => this.setMode(false)}
          >
            <Radio
              style={styles.radioButton}
              checked={!this.state.clockMode}
            />
            <span style={{color: "black"}}>Timer Mode</span>
          </Button>
        </div>
        <br/>

        {/*** PRESET TIME BUTTONS ***/}

        <Button
          modifier="outline"
          style={styles.button}
          onClick={() => this.setTime("0500")}
        >
          5:00 Game
        </Button>
        <Button
          modifier="outline"
          style={styles.button}
          onClick={() => this.setTime("1000")}
        >
          10:00 Game
        </Button>
        <br/>
        <Button
          modifier="outline"
          style={styles.button}
          onClick={() => this.setTime("1500")}
        >
          15:00 Game
        </Button>
        <Button
          modifier="outline"
          style={styles.button}
          onClick={() => this.setTime("2000")}
        >
          20:00 Game
        </Button>
        <br/><br/>

        {/*** TIMER ACTIONS ***/}

        <div>
          <Button
            style={styles.fullWidthButton}
            onClick={() => this.startTimer()}
          >
            Start/Stop Timer
          </Button>
          <Button
            style={styles.fullWidthButton}
            modifier="outline"
            onClick={() => this.setTimer0()}
          >
            Set Clock to 0
          </Button>
        </div>

        {/*** SCORE ACTIONS ***/}

        <div style={styles.scoreButtonContainer}>
          <div style={styles.homeContainer}>
            <h4>HOME</h4>
            <Button
              style={styles.scoreButton}
              onClick={() => this.changeScore("home", true)}
            >
              <h1>+1</h1>
            </Button>
            <Button
              style={styles.scoreButton}
              onClick={() => this.changeScore("home", false)}
              modifier="outline"
            >
              <h1>-1</h1>
            </Button>
          </div>
          <div style={styles.awayContainer}>
            <h4>AWAY</h4>
            <Button
              style={styles.scoreButton}
              onClick={() => this.changeScore("away", true)}
            >
              <h1>+1</h1>
            </Button>
            <Button
              style={styles.scoreButton}
              onClick={() => this.changeScore("away", false)}
              modifier="outline"
            >
              <h1>-1</h1>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
