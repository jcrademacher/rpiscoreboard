import React from 'react';

import  { Toolbar } from 'react-onsenui';

const StatusBar = ({ isConnected, index }) => {

  const styles = {
    subtitle: {
      fontWeight: "normal",
      fontSize: "10px"
    },
    title: {
      height: "auto",
      fontSize: "20px"
    },
    smallTitle: {
      height: "16px",
      position: "relative",
      transform: "translateY(-5px)",
      fontSize: "18px"
    },
    connected: {
      color: "rgb(90, 180, 14)"
    },
    disconnected: {
      color: "rgb(185, 0, 0)"
    }
  }

  const titles = ["RadCinus Scoreboard", "About"];

  const title = titles[index];
  const connectedStyle = isConnected ? styles.connected : styles.disconnected;
  const showStatus = index == 0;

  return (
    <Toolbar style={{ height: "50px" }}>
      {
        showStatus ?
          <div className="center">
            <div style={styles.smallTitle}>{title}</div>
            <div style={styles.subtitle}>
              <span>Status: </span>
              <span style={connectedStyle}>{ isConnected ? "Connected" : "Disconnected"}</span>
            </div>
          </div>
        :
          <div className="center">
            <div style={styles.title}>{title}</div>
          </div>
      }
    </Toolbar>
  );
}

export default StatusBar;
