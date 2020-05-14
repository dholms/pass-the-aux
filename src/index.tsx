import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from "@material-ui/core/styles";

import store from './redux/store'
import theme from './theme'

import App from './App'

import 'typeface-roboto'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
