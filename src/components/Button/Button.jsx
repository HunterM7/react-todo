import React from 'react'
import { plusIcon } from '../../assets/icons'

import styles from './Button.module.scss'

const Button = ({
  title = 'Button',
  color = 'green',
  isHollow = false,
  hasImg,
  onClick,
}) => {
  return (
    <button
      className={`
			${styles.wrapper}
				${styles[color]}
				${isHollow ? styles.hollow : ''}
			`}
      onClick={onClick}
    >
      {hasImg ? <div className={styles.img}>{plusIcon}</div> : ''}
      {title}
    </button>
  )
}

export default Button
