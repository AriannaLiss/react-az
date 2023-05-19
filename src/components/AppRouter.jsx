import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '../router';

const AppRouter = () => {
    return (        
        <Routes>
            {routes.map((route, index) => 
                <Route key={index} path={route.path} element={route.component}/>
            )}
            <Route path='/' element = {<Navigate to='/posts'/>}/>
        </Routes>
    );
};

export default AppRouter;