import React from 'react';

import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {
   const {user,loading} = useAuth()

    if(loading)
    {
        return <div><span class="loader"></span></div>
    }
    if(!user)
    {
        return <Navigate to='/login'></Navigate>
    }
    return children
};

export default PrivateRoute;