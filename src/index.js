import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import Director from './views/Director';
import HomePage from './views/HomePage'
import Weather from "./views/Weather"

ReactDOM.render(
  <Router>
    <Director>
      <Route exact path = "/" component={HomePage}/>
      <Route exact path = "/weather" component={Weather}/>
    </Director>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
