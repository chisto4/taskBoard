import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "./routes";
import {HOME_PAGE} from "../const/consts";
// import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    // const {user} = useContext(Context)
const isAuth = false
    // console.log(user)
    return (
        <Switch>
            {/* {user.isAuth && authRoutes.map(({path, Component}) => */}
            {authRoutes.map(({path, Component}) =>
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