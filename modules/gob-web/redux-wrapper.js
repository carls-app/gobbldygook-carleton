import React, {cloneElement} from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import Notifications from './modules/notifications'

const ReduxWrapper = props => (
	<Provider store={props.store}>
		<div id="app-wrapper">
			{cloneElement(props.children)}
			<Notifications />
		</div>
	</Provider>
)

ReduxWrapper.propTypes = {
	children: PropTypes.node,
	store: PropTypes.object.isRequired,
}

export default ReduxWrapper
