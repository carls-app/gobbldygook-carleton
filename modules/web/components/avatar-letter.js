// @flow
import React, {PropTypes} from 'react'
import cx from 'classnames'
import {isString} from 'lodash'

import './avatar-letter.scss'

const AvatarLetter = ({className, value=''}) => (
	<div className={cx('avatar-letter', className)}>
		{isString(value) ? value[0] : ''}
	</div>
)

AvatarLetter.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
}

export default AvatarLetter
