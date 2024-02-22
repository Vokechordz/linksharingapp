import { store } from '../../app/store';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import React from 'react'
import { useSelector } from 'react-redux';

const Prefetch = () => {
 useEffect (()=> {
    console.log('subscribing')
    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {force: true}))
    
 }, []) 

 return <Outlet />
}

export default Prefetch