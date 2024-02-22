import React, { useContext, useEffect, useState } from 'react'
import { Link,useNavigate, useLocation, useParams } from 'react-router-dom'
import DevLink from '../assets/DevLink'
import styles from '../css modules/dashHeader.module.css'
import linkIcon from '../assets/link_4368534.png'
import profileIcon from '../assets/cowboy_6543087.png'
import prevIcon from '../assets/visibility_295599.png'
import Customize from './Customize'
import ProfileDetails from './ProfileDetails'
import DataContext from '../context/DataContext'
import { useSendLogOutMutation } from '../features/auth/authApiSlice'



const DashHeader = () => {
  const{ id }= useParams()
  const { page, display, setPage }= useContext(DataContext)
  const { pathname }= useLocation()
  const navigate= useNavigate()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }]= useSendLogOutMutation()

  useEffect(()=> {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

const onLogoutClicked = () => sendLogout()

if (isLoading) return <p>Logging out...</p>

if (isError) return <p>Error: {error.data?.message}</p>

  return (
    <div style={pathname=== `/dashboard/${id}/preview`? {position:'absolute', left:'-999999999px'}: null} className={styles.overallhead}>
      <div className={styles.DashHeader}>
      <DevLink/>


     <div className={styles.linkprof}>
     <div onClick={()=> setPage(1)} className={styles.linkhead}>
        <Link  className={styles.linkk}><img src={linkIcon} alt="" /> <span className={styles.spanlink}>Links</span></Link>
      </div>
      <div onClick={()=> setPage(2)} className={styles.profhead}>
        <Link className={styles.linkk}><img src={profileIcon} alt="" /> <span className={styles.spanlink}>Profile Details</span></Link>
        <Link onClick={onLogoutClicked}>logout</Link>
      </div>
     </div>


      <button onClick={()=> navigate(`/dashboard/${id}/preview`)}>Preview</button>
    </div>


    <div className={styles.headmobile}>
      <DevLink/>
      <Link onClick={()=> setPage(1)}><img className={styles.profcon} src={linkIcon} alt="" /></Link>
      <Link onClick={()=> setPage(2)}><img className={styles.profcon} src={profileIcon} alt="" /></Link>
      <img onClick={()=> navigate(`/dashboard/${id}/preview`)} role='button' className={styles.prevIcon} src={prevIcon} alt="" />
    </div>
    </div>
  )
}

export default DashHeader