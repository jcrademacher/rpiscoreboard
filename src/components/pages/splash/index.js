import React, { Component } from 'react';
import { Button } from 'react-onsenui';

const Splash = ({ connecting, errorMsg, onTryAgain, proceedAnyway }) => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
    },

    buttonPad: {
      margin: "8px"
    }
  }

  return (
    <div style={styles.container}>
      {
      connecting ? (
        <h2>Connecting...</h2>
      )
      :
      (
        <div style={{ textAlign: "center" }}>
          <h2>{errorMsg}</h2>
          <Button
            onClick={onTryAgain}
            style={styles.buttonPad}
          >
            Try again
          </Button>
          <Button
            modifier="outline"
            style={styles.buttonPad}
            onClick={proceedAnyway}
          >
            Proceed anyway
          </Button>
        </div>
      )
      }
    </div>
  );
}

export default Splash;
