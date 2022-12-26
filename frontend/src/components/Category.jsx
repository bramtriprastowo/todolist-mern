import React from 'react'
import styles from './Category.module.css'

const Category = (props) => {
  return (
    <button className={`${styles.button}`}>{props.categoryName}</button>
  )
}

export default Category