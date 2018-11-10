import React, { Component } from "react";
import {connect} from 'react-redux';
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.css";

class Layout extends Component {
  state = {
    sideDrawer: false
  };

  sideDrawerOpenedHandler = () => this.setState({ sideDrawer: true });

  sideDrawerClosedHandler = () => {
    this.setState(prevState => {
      return {
        sideDrawer: !prevState.sideDrawer
      };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar 
          isAuth={this.props.isAuth}
          showSideDrawer={this.sideDrawerOpenedHandler} />
        <SideDrawer
          isAuth={this.props.isAuth}
          open={this.state.sideDrawer}
          clicked={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.idToken !== null
  }
}

export default connect(mapStateToProps)(Layout);
