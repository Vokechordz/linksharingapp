import React, { useState } from 'react'
import styles from '../css modules/dashboard.module.css'
import FirstDash from './FirstDash'
import Customize from './Customize'
import ProfileDetails from './ProfileDetails'
import SecondDash from './SecondDash'
import { display } from '../features/linksSlice'

const DashBoard = () => {
 


  return (
    <div className={styles.dashboard}>
     <FirstDash />




    <SecondDash/>
    </div>
  )
}

export default DashBoard