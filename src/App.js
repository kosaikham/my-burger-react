import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import { connect } from 'react-redux';
import * as actions from './store/action/index';
import lazyLoading from './hoc/LazyLoading/LazyLoading';

const Checkout = lazyLoading(() => {
  return import('./container/Checkout/Checkout');
})

const Orders = lazyLoading(() => {
  return import('./container/Orders/Orders');
})

const Auth = lazyLoading(() => {
  return import('./container/Auth/Auth');
})

const Logout = lazyLoading(() => {
  return import('./container/Auth/Logout/Logout');
})

class App extends Component {
  componentDidMount(){
    this.props.onTryAuthCheck();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if(this.props.isAuth){
      routes = (
        <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAuthCheck: () => dispatch(actions.authCheckAuto())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
