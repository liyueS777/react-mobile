
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect,withRouter } from "react-router-dom";
 
export const PrivateRoute = ({ component: ComposedComponent, ...rest }) => {
  class Authentication extends Component {
    render() {
      let isLogin= this.props.isLogin
        ? this.props.isLogin
        : localStorage.getItem("userinfo")
          ? localStorage.getItem("userinfo")
          : "";
      return (
        <Route
          {...rest}
          render={props =>
            !isLogin? (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            ) : (
              <ComposedComponent {...props} />
            )
          }
        />
      );
    }
  }
  const mapStateToProps = (state) => {
      return {
        isLogin: state.login.loginStatus
      }
  }
  const AuthenticationContainer = connect(mapStateToProps,null)(Authentication);
  return <AuthenticationContainer />;
}