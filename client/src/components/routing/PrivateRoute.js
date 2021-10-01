import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
    return (
        <div>
            <Route {...rest} render={props => !isAuthenticated && !loading ? (
                <Redirect to='login'/>
            ) : (<Component {...props}/>)}/>
        </div>
    )
}

export default PrivateRoute;
