import React from 'react';

const Content = React.createClass({
  render() {
    var style = {
      fontFamily: "Roboto",
      fontWeight: '700',
      color: "#3a3a3a",
    };

    return (<div style={style} id="content">{this.props.children}</div>);
  }
});

export default Content;
