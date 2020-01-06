import React from 'react';

const About = () => {
  return (
    <div style={{padding:'20px'}}>
      This is a fully-featured, wireless LED scoreboard that can be controlled from any WiFi enabled device. It is powered by a Raspberry Pi Model 3B, an Arduino Uno, white LED strips, and individually addressable RGB LED strips. <br/><br/>The scoreboard can keep scores of up to 19 points for each team, act as a standard digital clock, and count down from up to 99 minutes and 59 seconds. The center display, which keeps time, is also capable of changing colors. See the colors tab section below for more information.
      <br/>
      <h3>Usage</h3>
      <p style={{marginLeft: '10px'}}>
        Use the tabs on bottom navigator to switch between this about page, the controls page, and the colors page.
        <br/><br/>
        <i>Status Bar</i><br/>
        <p style={{marginLeft: '10px'}}>
          The status bar indicates whether or not the app is connected the scoreboard. Use the browser's refresh button to reconnect if the app becomes disconnected.
        </p>
        <i>Home Tab</i><br/>
        <p style={{marginLeft: '10px'}}>Use the +1/-1 buttons to increment or decrement the home and away scores.
          <br/><br/>Use the game timer buttons to set a preset countdown timer. In order to set a game timer, the mode must first be changed to 'Timer Mode'.
          <br/><br/>Use the start/stop clock button to start or stop the timer (this functionality is diabled when in 'Clock Mode').
        </p>
        <i>Colors Tab</i><br/>
      </p>
      <h3>Weather Resistance</h3>
      <p style={{marginLeft: '10px'}}>
        <strong>IMPORTANT: The scoreboard is by no means waterproof.</strong> It can certainly handle light rain and snow, but please do not leave it out in the rain or snow for longer than 2 hours.
        <br/><br/>I recommend placing it under the lip of a roof or hung from the outside of a shed.
        <br/><br/>Note that the bottom edge of the plexiglass is not clamped on. This is a vulnerable entry point for moisture, therefore <strong>do not store the scoreboard with this edge facing upwards</strong>.
      </p>
      <h3>Troubleshooting</h3>
      <p style={{marginLeft: '10px'}}>
        <i>The status bar says disconnected</i><br/><br/>
        Refresh your browser. If that doesn't work, restart the scoreboard and once it has started then refresh your browser.<br/><br/>
        <i>The timer buttons won't set a timer</i><br/><br/>
        Make sure the board is in 'Timer Mode'. If your app says it is, tap this button again to force the scoreboard into 'Timer Mode'.<br/><br/>
        <i>Some LEDs are not turning on or look discolored</i><br/><br/>
        Check the wiring in back of the board. It is possible a power line became disconnected. Use the terminal blocks with a flathead screwdriver to crimp the power cable back in place.<br/><br/>

        If all else fails, call or text Jack for help.
      </p>
      <h3>Acknowledgements</h3>
      <p style={{marginLeft: '10px'}}>
        Created by Jack Rademacher and Adam Vicinus, Winter 2015.
        <br/><br/>You can view the code for this front-end application at <a href="https://github.com/jcrademacher/rpiscoreboard">here</a>.
        <br/><br/>You can view the code for the back-end python server and arduino code at <a href="https://github.com/jcrademacher/scoreboard-api">here</a>
      </p>
    </div>
  );
}

export default About;
