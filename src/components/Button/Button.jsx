import React from 'react'

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
			{hasImg ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='20'
					height='20'
					viewBox='0 0 20 20'
					fill='none'
					className={styles.img}
				>
					<path
						d='M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z'
						stroke='#FAFAFA'
						stroke-width='2'
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
					<path
						d='M10 6.39999V13.6'
						stroke='#FAFAFA'
						stroke-width='2'
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
					<path
						d='M6.4 10H13.6'
						stroke='#FAFAFA'
						stroke-width='2'
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
				</svg>
			) : (
				''
			)}
			{title}
		</button>
	)
}

export default Button
