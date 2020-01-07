import React, { Component } from 'react'

import { Range, Button } from 'react-onsenui'

export default class ColorControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      red: 100,
      green: 100,
      blue: 100
    };
  }
  
  changeColors() {
    var toSend = "setColor/"

    // var redColor = parseInt(this.state.red / this.maxSliderVal * this.maxColorVal);
    // var greenColor = parseInt(this.state.green / this.maxSliderVal * this.maxColorVal);
    // var blueColor = parseInt(this.state.blue / this.maxSliderVal * this.maxColorVal);

    toSend += String.fromCharCode(this.state.red)
    toSend += String.fromCharCode(this.state.green)
    toSend += String.fromCharCode(this.state.blue)

    console.log(toSend)

    this.props.socket.send(toSend)
  }

  render() {
    const styles = {
      colorContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center"
      },
      colorBar: {
        width: "100%"
      },
      colorLabel: {
        marginRight: 8,
        minWidth: "50px"
      },
      container: {
        padding: "20px",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute"
      },
      sliderContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%"
      },
      presetContainer: {
        height: "30%"
      },
      updateColorContainer: {
        
      },
      updateColorButton: {
        width: "100%",
        textAlign: "center"
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.sliderContainer}>
          {/* RED COLOR BAR */}
          <div style={styles.colorContainer}>
            <div style={styles.colorLabel}>
              Red: 
            </div>
            <Range 
              style={styles.colorBar}
              value={this.state.red}
              onChange={(e) => this.setState({red: parseInt(event.target.value)})}
              className="red-slider"
            />
          </div>
          {/* GREEN COLOR BAR */}
          <div style={styles.colorContainer}>
            <div style={styles.colorLabel}>
              Green: 
            </div>
            <Range 
              style={styles.colorBar}
              value={this.state.green}
              onChange={(e) => this.setState({green: parseInt(event.target.value)})}
              className="green-slider"
            />
          </div>
          {/* BLUE COLOR BAR */}
          <div style={styles.colorContainer}>
            <div style={styles.colorLabel}>
              Blue: 
            </div>
            <Range 
              style={styles.colorBar}
              value={this.state.blue}
              onChange={(e) => this.setState({blue: parseInt(event.target.value)})}
              className="blue-slider"
            />
          </div>
          <Button
            style={styles.updateColorButton}
            onClick={() => this.changeColors()}
          >
            Update Color
          </Button>
        </div>
      </div>
    );
  }
}
