// import React, {useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { HOME_PAGE } from "../const/const";
import { observer } from "mobx-react-lite";
import { authRoutes, publicRoutes } from "./routes";
import { useAppSelector } from '../../store/reducers';

const AppRouter = observer(() => {
    // const isAuth = localStorage.getItem('isAuth')
    const isAuth = useAppSelector((state) => state.user.auth)

    const validAuth = () => {
        if (isAuth) {
            return true
        } else {
            return false
        }
    }
    return (
        <Switch>
            {validAuth() && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            <Redirect to={HOME_PAGE} />
        </Switch>
    );
});
export default AppRouter;