import React from 'react'
import styles from '../css modules/customize.module.css'
import AddLink from './AddLink'

const Customize = () => {
  return (
    <div className={styles.seconddash}>
        <h4>Customize your links</h4>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
        <AddLink />
    </div>
  )
}

export default Customize