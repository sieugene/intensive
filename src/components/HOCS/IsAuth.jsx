import React, { useState, useEffect } from "react";
import { userSelector, initSelector } from "./../../ducks/auth";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from 'redux';


const isAuth = Component => (props) => {
  const [auth, setAuth] = useState(null)
  useEffect(() => {
    if (props.init === true) {
      setAuth(props.isAuth !== null || undefined
        ? props.isAuth
        : undefined)
    }
  }, [props])
  if (auth === null) {
    return <div className="load">Loading...</div>;
  } else if (auth) {
    return <Component/>
  }else{
    return <Redirect to="/"/>
  }
}  

const mapStateToProps = (state) => ({
  isAuth: userSelector(state),
    init: initSelector(state),
})

const withAuth = compose(connect(mapStateToProps,null),isAuth)

export default withAuth