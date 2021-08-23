// import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "./routes";
import {HOME_PAGE} from "../const/const";
// import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const tokenTrue = localStorage.getItem('token')
const isAuth = tokenTrue
    return (
        <Switch>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={HOME_PAGE}/>
        </Switch>
    );
});

export default AppRouter;