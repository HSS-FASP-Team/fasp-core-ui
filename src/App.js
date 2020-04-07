import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import  './i18n'
import ResetPasswordComponent from './views/Pages/Login/ResetPasswordComponent';
import UpdateExpiredPasswordComponent from './views/Pages/Login/UpdateExpiredPasswordComponent';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const ForgotPassword = React.lazy(() => import('./views/Pages/Login/ForgotPasswordComponent'));
const UpdateExpiredPassword = React.lazy(() => import('./views/Pages/Login/UpdateExpiredPasswordComponent'));
const ResetPassword = React.lazy(() => import('./views/Pages/Login/ResetPasswordComponent'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  render() {
    return (
      
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" exact name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/login/:message" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route exact path="/forgotPassword" exact name="Forgot Password" render={props => <ForgotPassword {...props}/>} />
              <Route exact path="/updateExpiredPassword" exact name="Update expired password" render={props => <UpdateExpiredPassword {...props}/>} />
              <Route exact path="/resetPassword/:username/:token" exact name="Reset password" render={props => <ResetPassword {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}



export default App;
