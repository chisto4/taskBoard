import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../store/reducers';

type Props = React.PropsWithChildren<RouteProps>;

const PrivateRoute: React.FC<Props> = ({ children, ...rest }: Props) => {
  const auth = useAppSelector((state) => state.user.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;