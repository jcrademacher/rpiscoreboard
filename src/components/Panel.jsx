import React from 'react';
import RaisedButton from "material-ui/RaisedButton";

const Panel = React.createClass({

  render: function() {
    if(this.props.selectedPanel == "control") {
      return (
        <div>
          control board
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
