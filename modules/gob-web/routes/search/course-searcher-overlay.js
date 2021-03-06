import React from 'react'
import PropTypes from 'prop-types'
import withRouter from 'react-router/lib/withRouter'

import Modal from '../../components/modal'
import CourseSearcher from '../../modules/course-searcher/course-searcher-container'
import './course-searcher-overlay.scss'

function CourseSearcherOverlay(props) {
	const boundCloseModal = () => props.router.push({pathname: '/'})

	return (
		<Modal onClose={boundCloseModal} contentLabel="Search">
			<CourseSearcher closeSearcher={boundCloseModal} />
		</Modal>
	)
}

CourseSearcherOverlay.propTypes = {
	router: PropTypes.object.isRequired,
}

export default withRouter(CourseSearcherOverlay)
