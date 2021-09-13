// import React, {useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { authRoutes, publicRoutes } from "./routes";
import { HOME_PAGE } from "../const/const";
import { observer } from "mobx-react-lite";
import { useAppSelector } from '../../store/reducers';
import PrivateRoute from './PrivateRouter';


const AppRouter = observer(() => {
    // const isAuth = useAppSelector((state) => state.user.auth)
    // const isAuth = localStorage.getItem('isAuth')
    // const validAuth = () => {
    //     if (isAuth) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    return (
        <Switch>
            {authRoutes.map(({ path, Component }, index) =>
                <PrivateRoute key={index}>
                    <Route path={path} component={Component} exact />
                </PrivateRoute>
            )}
            {publicRoutes.map(({ path, Component }, index) =>
                <Route key={index} path={path} component={Component} exact />
            )}
            <Redirect to={HOME_PAGE} />
        </Switch>
    );
});

export default AppRouter;