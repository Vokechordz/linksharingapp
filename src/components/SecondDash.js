import React, { useState } from 'react'
import FirstDash from './FirstDash'
import Customize from './Customize'
import ProfileDetails from './ProfileDetails'
import { useContext } from 'react'
import DataContext from '../context/DataContext'

const SecondDash = () => { 
const { page, display }= useContext(DataContext)

  return (
    display[page]
  )
}

export default SecondDash