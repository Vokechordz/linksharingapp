import { Outlet, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import usePersist from "../../hooks/usePersist";
import { selectCurrentToken } from "./authSlice";

import React from 'react'

const PersistLogin = () => {

    const [persist]= usePersist()
    const token= useSelector(selectCurrentToken)
    const effectRan= useRef(false)

    const [trueSuccess, setTrueSuccess]= useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }]= useRefreshMutation()

    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV != 'development') { 

        const verifyRefreshToken= async () => {
            console.log('verifying refresh token')
            try {
                //const response =
                await refresh()
                //const { accessToken }= response.data
                setTrueSuccess(true)
            }
            catch (err) {
                console.log(err)
            }
        }

        if (!token && persist) verifyRefreshToken()
    }

    return () => effectRan.current = true
    }, [])


    let content
    if (!persist) { //persist: no
        console.log('no persist')
        content= <Outlet />
    } else if (isLoading) {//persist: yes, token: yes
        console.log('loading')
        content= <p>Loading...</p>
    } else if (isError) { //persist: yes, token:no
        console.log('error')
        content= (
            <p>please log in again</p>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token:yes
        console.log('success')
        content= <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token:yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content= <Outlet />
    }

    return content

}

export default PersistLogin