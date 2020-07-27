import React from 'react'
import App from './../app';
import { Route } from 'react-router-dom';
import Authpage from './../components/auth/Authpage';


const RootRoute = () => {
    return(
        <>
            <Route exact path="/" component={App} />
            <Route path="/auth" component={Authpage} />
        </>
    )
}


export default RootRoute