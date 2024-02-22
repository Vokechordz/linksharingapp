import React, { useState, useRef, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import styles from '../../css modules/login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import DevLink from '../../assets/DevLink'
import hidden from '../../assets/hidden_7517867.png'
import show from '../../assets/eye_9736337.png'
import DataContext from '../../context/DataContext'
import usePersist from '../../hooks/usePersist'

const Login = () => {
  const userRef= useRef()
  const errRef= useRef()
  const [email, setEmail]= useState('')
  const [password, setPassword]=useState('')
  const [errMsg, setErrMsg]= useState('')
  const [persist, setpersist]= usePersist()

  const { userId, setUserId }= useContext(DataContext)

  const [showPassword, setShowPassword]= useState(true)
  
  const navigate= useNavigate()
  const dispatch= useDispatch()

  

  const [login, { isLoading }]= useLoginMutation()

  useEffect(()=> {
    userRef.current.focus()
  }, [])

  useEffect(()=> {
    setErrMsg('')
  }, [email, password])

  if(isLoading) return <p>Loading...</p>

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const { accessToken, userId }= await login({ email, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUserId(userId)
      setEmail('')
      setPassword('')
      navigate(`/dashboard/${userId}`)
    } catch (err) {
      if (!err.status) {
        setErrMsg('No server response')
      } else if (err.status===400) {
        setErrMsg('Missing email or password')
      } else if (err.status===401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  const handleEmailInput= (e)=> {
    setEmail(e.target.value)
  }
  const handlePwdInput= (e)=> {
    setPassword(e.target.value)
  }
  const handleToggle= () => setpersist(prev => !prev)

 

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


  return (
    <div className={styles.login}>
        <div className={styles.devlink}>
           <DevLink/>
           <h2>devlinks</h2>
        </div>

        <h2>Login</h2>
        { userId }
        <p className={styles.addp}>Add your details below to get back in the app</p>
        <p ref={errRef} style={!errMsg? {position: 'absolute', left:'-999999px'}: null}>{errMsg}</p>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="">Email address</label>
            <input ref={userRef} autoComplete='off' required onChange={handleEmailInput} value={email} placeholder='e.g. olomuvokee@gmail.com' type="email" />
            <br />
            <label htmlFor="">Password</label>
            <input value={password} onChange={handlePwdInput} required placeholder='Enter your password' type={showPassword? 'text': 'password'} />
            {showButton}
            <button>login</button>
        </form>
        
        <p className={styles.dont}>Don't have an account? <Link className={styles.dontLink} to="/register">Create an account</Link></p>



    
    </div>
  )
}

export default Login