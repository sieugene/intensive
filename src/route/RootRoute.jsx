import React from 'react'
import App from './../app';
import { Route } from 'react-router-dom';
import Authpage from './../components/auth/Authpage';
import TodosPage from '../components/todo/TodosPage';



const RootRoute = () => {
    return(
        <>
            <Route exact path="/" component={App} />
            <Route path="/auth" component={Authpage} />
            <Route exact path='/todo' component={TodosPage}/>
        </>
    )
}


export default RootRoute