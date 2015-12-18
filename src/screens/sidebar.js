import React, {Component, PropTypes} from 'react'
import omit from 'lodash/object/omit'
import history from '../history'

import Button from '../components/button'
import CourseSearcher from './course-searcher'
import GraduationStatus from './graduation-status'
import Icon from '../components/icon'
import Toolbar from '../components/toolbar'
import Separator from '../components/separator'
import ShareSheet from './share-sheet'

import CourseRemovalBox from '../components/course-removal-box'

import './sidebar.scss'

export default class Sidebar extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		areas: PropTypes.array.isRequired,
		canRedo: PropTypes.bool.isRequired,
		canUndo: PropTypes.bool.isRequired,
		courses: PropTypes.array.isRequired,
		student: PropTypes.object.isRequired,
	}

	static contextTypes = {
		location: PropTypes.object,
	}

	goHome = () => {
		history.pushState(null, '/')
	}

	showShareSheet = () => {
		const query = {...this.context.location.query, share: null}
		history.pushState(null, this.context.location.pathname, query)
	}

	closeSearchSidebar = () => {
		const query = omit(this.context.location.query, ['partialSearch', 'search'])
		history.pushState(null, this.context.location.pathname, query)
	}

	openSearchSidebar = () => {
		const query = {...this.context.location.query, search: null}
		history.pushState(null, this.context.location.pathname, query)
	}

	render() {
		const { actions, canUndo, canRedo, student, courses, areas } = this.props
		const isSearching = 'partialSearch' in this.context.location.query || 'search' in this.context.location.query

		return (
			<aside className='sidebar'>
				<Toolbar className='student-buttons'>
					<Button title='Students' onClick={this.goHome}>
						<Icon name='ios-people-outline' type='block' />
					</Button>
					<Button title='Search' onClick={isSearching ? this.closeSearchSidebar : this.openSearchSidebar}>
						<Icon name='ios-search' type='block' />
					</Button>

					<Separator type='spacer' />

					<Button title='Undo' onClick={actions.undo} disabled={!canUndo}>
						<Icon name={`ios-undo${!canUndo ? '-outline' : ''}`} type='block' />
					</Button>
					<Button title='Redo' onClick={actions.redo} disabled={!canRedo}>
						<Icon name={`ios-redo${!canRedo ? '-outline' : ''}`} type='block' />
					</Button>

					<Separator type='spacer' />

					<Button title='Share' onClick={this.showShareSheet}>
						<Icon name='ios-upload-outline' type='block' />
						{'share' in this.context.location.query && <ShareSheet student={this.props.student} />}
					</Button>
				</Toolbar>

				<CourseRemovalBox studentId={student.id} actions={actions} />

				{!isSearching
					? <GraduationStatus
						{...{actions, student, courses, areas}}
						isHidden={isSearching}
					/>
					: <CourseSearcher
						{...{actions, student}}
						isHidden={!isSearching}
						closeSearchSidebar={this.closeSearchSidebar}
					/>}
			</aside>
		)
	}
}
