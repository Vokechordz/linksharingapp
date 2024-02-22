import { Navigate, Outlet } from "react-router-dom";
import React from 'react'
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const { token }= useSelector((state) => state.auth)
    return token? <Outlet /> : <Navigate to='/' replace />
}

export default PrivateRoute