import React, { useContext, useEffect, useState } from 'react'
import galleryIcon from '../assets/picture_8560630.png'
import styles from '../css modules/profiledetails.module.css'
import { selectUserById, useUpdateUserMutation, useGetUsersQuery } from '../features/users/usersApiSlice'
import { useParams } from 'react-router-dom'
import DataContext from '../context/DataContext'
import { useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'

const ProfileDetails = () => {
const { profilepic, setProfilepic, handleFileChange, handleDetails, details,setDetails, userId }= useContext(DataContext)
const { token }= useSelector((state) => state.auth)


const { firstname, lastname, email }= details
const { id }= useParams()

const { user }= useGetUsersQuery("usersList", {
    refetchOnFocus: true,
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data }) => ({
        user: data?.entities[id]
    }),
})




//const user = useSelector(state => selectUserById(state, userId))

/* useEffect(()=> {
    setDetails(user.firstname)
    setDetails(user.lastname)
}) */


const [updateUser, {
    isLoading,
    isSuccess, 
    isError,
    error
}]= useUpdateUserMutation()



    const onSaveUserClicked=  async (e) => {
        e.preventDefault()
        const response= await updateUser({ id: user.id, firstname, lastname, profilepic })
        console.log(user)
    }

    const loadFirstname= user? user.firstname: null
    const loadLastname= user? user.lastname: null
    const loadEmail= user? user.email: null
    const loadProfilepic= user? user.profilepic: null

    useEffect(() => {
        setDetails({...details, firstname: loadFirstname, lastname: loadLastname, email: loadEmail})
    }, [loadFirstname, loadLastname])

    useEffect(() => {
        setProfilepic(loadProfilepic)
    }, [loadProfilepic])


/*     useEffect(() => {
        setDetails({...details, lastname: loadLastname })
    }, [loadLastname]) */

   /*  useEffect(() => {
        setDetails({...details, email: loadEmail })
    }) */

    if (!user) return <PulseLoader style={{margin: '43%'}} color={'blue'}/>

 const content=  <div className={styles.profiledetails}>
 <h4>Profile Details</h4>
 {isSuccess? <p>updated!</p>: <p>not</p>}
 <p>Add your details to create a personal touch to your profile</p>
 <form onSubmit={onSaveUserClicked} className={styles.profileform} action="">
     <div className={styles.profpic}>
         <p>Profile Picture</p>
         <div style={profilepic? {padding:'0'}: null} className={styles.filediv}>
             {profilepic && <img src={profilepic} style={{width:'100%', height:'100%',objectFit:'cover', borderRadius:'8px'}}/>}
             <label style={profilepic? {display:'none'}: null}  htmlFor=""><span>+ Upload image</span></label>
             <input  type="file"  accept='image/*' onChange={handleFileChange}/>
         </div>
         <p>image must be below 1024x1024px. Use <br /> PNG or JPG format</p>
     </div>
     <div className={styles.fname}>
         <label htmlFor="">First name</label>
         <input name='firstname' onChange={handleDetails} value={firstname} placeholder='Enter your first name' type="text" />
     </div>
     <div className={styles.lname}>
         <label htmlFor="">Last name</label>
         <input name='lastname' onChange={handleDetails} value={lastname} placeholder='Enter your last name' type="text" />
     </div> 
     <div className={styles.email}>
         <label htmlFor="">Email</label>
         <input name='email' onChange={handleDetails} value={loadEmail} placeholder='Enter your email address' type="email" />
     </div>
     <button type='submit' className={styles.savebtn}>Save</button>
 </form>
 
</div>
   
   
  return content
}

export default ProfileDetails