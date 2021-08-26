// import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "./routes";
import {HOME_PAGE} from "../const/const";
import {observer} from "mobx-react-lite";
import { useAppSelector } from '../../store/reducers';


const AppRouter = observer(() => {
    const isAuth = useAppSelector((state) => state.user.auth)
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