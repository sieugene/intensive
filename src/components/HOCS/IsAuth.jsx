import React from "react";
import { userSelector, initSelector } from "./../../ducks/auth";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const isAuth = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuth: null,
      };
    }
    componentDidUpdate(prevProps) {
      if (prevProps.init !== this.props.init && this.props.init === true) {
        this.setState({
          isAuth:
            this.props.isAuth !== null || undefined
              ? this.props.isAuth
              : undefined,
        });
      }
    }
    render() {
      if (this.state.isAuth === null) {
        return <div>Loading...</div>;
      } else if (this.state.isAuth) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <Redirect to="/" />;
      }
    }
  };
};

let mapStateToProps = (state) => {
  return {
    isAuth: userSelector(state),
    init: initSelector(state),
  };
};
export const withAuth = (WrappedComponent) =>
  connect(mapStateToProps, null)(isAuth(WrappedComponent));
