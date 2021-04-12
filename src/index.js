import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bills from './views/Bills'; 
import reportWebVitals from './reportWebVitals';
import CreateBills from './views/CreateBills'
import Logins from './views/Logins'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'



const Root = () => {
  return (
      <Router>
        <Switch>
          <Route exact path='/' component={Logins} />
          <ProtectedRoute exact path='/accueil' component={Bills} />
          <ProtectedRoute exact path='/createbill' component={CreateBills} />
        </Switch>
      </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
