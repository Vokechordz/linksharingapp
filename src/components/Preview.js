
import React, { useContext } from 'react'
import styles from '../css modules/preview.module.css'
import FirstDash from './FirstDash'
import Github from '../assets/github.png'
import Twitter from '../assets/twitter_3670127.png'
import Linkedin from '../assets/linkedin_3488338.png'
import Youtube from '../assets/youtube_3938026.png'
import Facebook from '../assets/facebook_2504903 (1).png'
import Frontendmentor from '../assets/favicon-32x32.png'
import arrow from '../assets/right-arrow_545682.png'
import whitearrow from '../assets/whitearrow.png'
import { useNavigate, useParams } from 'react-router-dom'
import DataContext from '../context/DataContext'
import { selectAllFields } from '../features/linksSlice'
import { useSelector } from 'react-redux'
import { useGetUsersQuery } from '../features/users/usersApiSlice'
import { PulseLoader } from 'react-spinners'
import { useGetLinksQuery } from '../features/links/linksApiSlice'

const Preview = () => {
  const { profilepic, details }= useContext(DataContext)
  const { id }= useParams()

const { user }= useGetUsersQuery("usersList", {
    refetchOnFocus: true,
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data }) => ({
        user: data?.entities[id]
    }),
})

const { data, isLoading: dataLoading } = useGetLinksQuery('linksList', {refetchOnMountOrArgChange:true, refetchOnFocus: true})
const totalLinks= data?.entities
//console.log(totalLinks)
const finalArr = [];

for (const key in totalLinks) {
  if (totalLinks.hasOwnProperty(key) && totalLinks[key].user === id) {
    const { selectValue, textValue, _id, index } = totalLinks[key];
    const objectLook = {
      selectValue: selectValue,
      textValue: textValue,
      id: _id,
      index: index
    };
    finalArr.push(objectLook);
  }
}

const loadFirstname= user? user.firstname: details.firstname
const loadLastname= user? user.lastname: details.lastname
const loadEmail= user? user.email: details.email
const loadProfilepic= user? user.profilepic: details.profilepic


    const navigate= useNavigate()
    
    const fields= useSelector(selectAllFields)
    const shareLink= () => {
     if (navigator.share) {
          navigator.share({
               title: 'Check out my Porfolio!',
               url: window.location.href
          })
     }
    }

    const mapp= finalArr.length > 0 ? finalArr: fields
    if (!user && dataLoading && !finalArr.length) return <PulseLoader style={{margin: '0 0 0 0'}} color={'blue'}/>

    const content= (
      <div>
      <section className={styles.container}>
      <div className={styles.previewheader}>
               <button onClick={()=> navigate(`/dashboard/${id}`)}>Back to Editor</button>
               <button onClick={shareLink}>Share Link</button>
           </div>
           



           <div className={styles.prevcard}>
              <img src={loadProfilepic} alt="" />
              <h1>{loadFirstname} {loadLastname}</h1>
           <p>{loadEmail}</p>
           {mapp.map((field, index)=> (
            <div style={
              field.selectValue=== "Github"? {backgroundColor:'black'}:
              field.selectValue=== "Linkedin"? {backgroundColor:'blue'}:
              field.selectValue=== "Facebook"? {backgroundColor:'rgb(58, 58, 148)'}:
              field.selectValue=== "Twitter"? {backgroundColor:'black', color:'white'}:
              field.selectValue=== "Youtube"? {backgroundColor:'red', color:'white'}:
              field.selectValue=== "Frontendmentor"? {backgroundColor:'white', color:'black'}: {backgroundColor: '#FFFFFF'}
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
              {field.selectValue==='Twitter' || 'Github' &&  <img onClick={()=> window.open(field.textValue, '_blank')} style={{marginLeft:'auto', cursor:'pointer'}} src={whitearrow} alt="" />}
              {field.selectValue==='Frontendmentor' &&  <img style={{marginLeft:'auto', cursor:'pointer'}} src={arrow} alt="" />}
            </div>
         ))}
           </div>
      </section>
 </div>
    )


  return content
}

export default Preview