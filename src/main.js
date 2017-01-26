import React from 'react';
import ReactDOM from 'react-dom';
import Content from "./components/Content.jsx"
import Title from './components/Title.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainView from './components/MainView.jsx'

const App = () => (
  <MuiThemeProvider>
    <Content>
      <Title/>
      <MainView/>
    </Content>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
