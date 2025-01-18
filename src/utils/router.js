import {useRoutes} from 'react-router-dom'
import Layout from "../components/Layout/Layout.jsx";
import Main from "../pages/Main/Main";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import React from 'react'



export default function Router() {
    const routes = useRoutes([{
        path: '',
        element: <Layout/>,
        children:[
            {
                path: '/',
                element: <Main/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    }])
    return routes
}