import React, { useContext } from 'react'
import { addField, setTextValue, } from '../features/linksSlice'
import { useSelector } from 'react-redux'
import Github from '../assets/github.png'
import Twitter from '../assets/twitter_3670127.png'
import Linkedin from '../assets/linkedin_3488338.png'
import Youtube from '../assets/youtube_3938026.png'
import Facebook from '../assets/facebook_2504903 (1).png'
import Frontendmentor from '../assets/favicon-32x32.png'
import arrow from '../assets/right-arrow_545682.png'
import whitearrow from '../assets/whitearrow.png'
import { selectAllFields } from '../features/linksSlice'
import styles from '../css modules/firstdash.module.css'
import DataContext from '../context/DataContext'

const FirstDash = () => {

  const fields= useSelector(selectAllFields)
  const { profilepic, details }= useContext(DataContext)


  return (
    <div className={styles.firstdash}>
        <div className={styles.firstdash1}>
         <div className={styles.firstdash2}>
           <img src={profilepic} alt="" />
           <h4>{details.firstname} {details.lastname}</h4>
           <p>{details.email}</p>
           {fields.map((field, index)=> (
            <div style={
              field.selectValue=== "Github"? {backgroundColor:'black', boxShadow: '2px 2px 8px #888888'}:
              field.selectValue=== "Linkedin"? {backgroundColor:'blue', boxShadow: '2px 2px 8px #888888'}:
              field.selectValue=== "Facebook"? {backgroundColor:'rgb(58, 58, 148)', boxShadow: '2px 2px 8px #888888'}:
              field.selectValue=== "Twitter"? {backgroundColor:'black', color:'white', boxShadow: '2px 2px 8px #888888'}:
              field.selectValue=== "Youtube"? {backgroundColor:'red', color:'white', boxShadow: '2px 2px 8px #888888'}:
              field.selectValue=== "Frontendmentor"? {backgroundColor:'white', color:'black', boxShadow: '2px 2px 8px #888888'}: {backgroundColor: '#FFFFFF'}
            } 
            key={index} className={styles.firstdashlink}>
            <img src={
              field.selectValue=== "Github"? Github:
              field.selectValue=== "Frontendmentor"? Frontendmentor:
              field.selectValue=== "Linkedin"? Linkedin:
              field.selectValue=== "Youtube"? Youtube:
              field.selectValue=== "Facebook"? Facebook:
              field.selectValue=== "Twitter"? Twitter: null

              } alt="" />
              {field.selectValue}
              {field.selectValue==='Twitter' || 'Github' &&  <img style={{marginLeft:'auto', cursor:'pointer'}} src={whitearrow} alt="" />}
              {field.selectValue==='Frontendmentor' &&  <img style={{marginLeft:'auto', cursor:'pointer'}} src={arrow} alt="" />}
            </div>
         ))}
          <p></p>
         </div>
        </div>
    </div>
  )
}

export default FirstDash