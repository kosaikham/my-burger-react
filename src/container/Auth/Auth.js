import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from "../../store/action/index";
import { updatedObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail"
        },
        value: "test@test.com",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "123456",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = updatedObject(this.state.controls,{
      [inputIdentifier]: updatedObject(this.state.controls[inputIdentifier],{
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        ),
        touched: true
      })
    })
    this.setState({ controls: updatedForm });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  componentDidMount(){
    if(!this.props.building && this.props.authRedirectPath !== '/'){
      this.props.onSetAuthRedirectPath('/')
    }
  }

  render() {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(element => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        invalid={!element.config.valid}
        touched={element.config.touched}
        changed={event => this.inputChangedHandler(event, element.id)}
      />
    ));

    if(this.props.loading){
      form = <Spinner />;
    }

    let message = null;
    if(this.props.error){
      message = <p>{this.props.error.message}</p>;
    }

    let redirect = null;
    if(this.props.isAuth){
      redirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {redirect}
        {message}
        <form onSubmit={this.formSubmitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          Switch to {this.state.isSignUp ? "SignIn" : "SignUp"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.idToken !== null,
    authRedirectPath: state.auth.authRedirectPath,
    building: state.burgerBuilder.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
