import React, { useEffect, useState } from 'react'
import styles from '../css modules/register.module.css'
import { Link } from 'react-router-dom'
import DevLink from '../assets/DevLink'
import { useAddNewUserMutation } from '../features/users/usersApiSlice'
import hidden from '../assets/hidden_7517867.png'
import show from '../assets/eye_9736337.png'

const Register = () => {
  const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const passwordRegex= /^[A-z0-9!@#$%]{4,20}$/


  const [email, setEmail]= useState('')
  const [validEmail, setValidEmail]= useState(false)
  const [password, setPassword]= useState('')
  const [validPassword, setValidPassword]= useState(false)
  const [password2, setPassword2]= useState('')
  const [validPassword2, setValidPassword2]= useState(false)


  useEffect(()=> {
    setValidEmail(emailRegex.test(email))
  }, [email])

  useEffect(()=> {
    setValidPassword(passwordRegex.test(password))
  }, [password])


  useEffect(()=> {
    setValidPassword2(password===password2)
  }, [password,password2])

  const onEmailChanged= (e) => {
    setEmail(e.target.value)
  }
  const onPasswordChanged= (e) => {
    setPassword(e.target.value)
  }
  const onPassword2Changed= (e) => {
    setPassword2(e.target.value)
  }

  const canRegister= [validEmail, validPassword].every(Boolean)

  const [ addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }]= useAddNewUserMutation()
 
  const onRegisterClicked= async(e) => {
    e.preventDefault()
    if (canRegister) {
      await addNewUser({email, password})
    }
  }

  const [showPassword, setShowPassword]= useState(true)
  const [showPassword2, setShowPassword2]= useState(true)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  let showButton= null

  if (showPassword) {
    showButton= (
      <img className={styles.showbutton} role='button' onClick={handleTogglePassword} src={show} alt="" />
    )
  } else {
    showButton= (
      <img className={styles.showbutton} role='button' onClick={handleTogglePassword} src={hidden} alt="" />
    )
  }
  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2)
  }

  let showButton2= null

  if (showPassword2) {
    showButton2= (
      <img className={styles.showbutton} role='button' onClick={handleTogglePassword2} src={show} alt="" />
    )
  } else {
    showButton2= (
      <img className={styles.showbutton} role='button' onClick={handleTogglePassword2} src={hidden} alt="" />
    )
  }


  return (
    <div className={styles.login}>
        <div className={styles.devlink}>
           <DevLink/>
           <h2>devlinks</h2>
        </div>

        <h2>Register</h2>
        {isSuccess? <p>Account has been created</p>: null}
        <p className={styles.addp}>Fill in your details to create a new account</p>
        <form action="" className={styles.form} onSubmit={onRegisterClicked}>
            <label className={styles.labell} htmlFor=""><p>Email address</p> {!validEmail && email? <p>please enter a valid email address</p>: null}</label>
            <input onChange={onEmailChanged} value={email} placeholder='e.g. olomuvokee@gmail.com' type="email" />
            <br />
            <label style={!validPassword? {color: 'red'}: null} htmlFor="">Password</label>
            <input onChange={onPasswordChanged} value={password} placeholder='At least 8 characters' type={showPassword? 'text': 'password'} />
            {showButton}
            <br />
            <label className={styles.labell} htmlFor=""><p>Confirm password</p> {!validPassword2? <p>please check again</p>: null}</label>
            <input onChange={onPassword2Changed} value={password2} placeholder='At least 8 characters' type={showPassword2? 'text': 'password'} />
            {showButton2} 
            {!validPassword? <p style={{fontSize: '13px', color: 'red'}}>password must contain at least 8 characters</p>: ''}
            <button style={!canRegister? {cursor: 'not-allowed', backgroundColor: ' hsla(240, 83%, 56%,0.5 )'}: null} disabled={!canRegister}>create new account</button>
        </form>
        
        <p className={styles.dont}>Already have an account? <Link className={styles.dontLink} to="/">Sign in</Link></p>



    
    </div>
  )
}

export default Register