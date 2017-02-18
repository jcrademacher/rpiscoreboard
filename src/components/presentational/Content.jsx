import React from 'react';

const Content = React.createClass({
  render() {
    var style = {
      fontFamily: "Raleway, Roboto, sans-serif",
      fontWeight: "300",
      color: "#3a3a3a",
    };

    return (<div style={style} id="content">{this.props.children}</div>);
  }
});

export default Content;
