import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

import Toolbar from '../components/toolbar'
import Button from '../components/button'
import Icon from '../components/icon'
import StudentList from '../components/student-list'

import './student-picker.scss'

export function StudentPicker(props) {
	const {
		actions,
		filterText,
		groupBy,
		isEditing,
		onAddStudent,
		onFilterChange,
		onGroupChange,
		onOpenSearchOverlay,
		onSortChange,
		onToggleEditing,
		sortBy,
		students,
	} = props

	return (
		<div className='students-overview'>
			<heading className='app-title'>
				<h1>GobbldygooK</h1>
				<h2>A Course Scheduling Helper</h2>
			</heading>

			<div className='student-list-toolbar'>
				<Toolbar className='student-list-buttons'>
					<Button className='student-list--button' onClick={onOpenSearchOverlay}>
						<Icon name='android-search' />
						Courses
					</Button>

					<input
						type='search'
						className='student-list-filter'
						placeholder='Filter students'
						value={filterText}
						onChange={onFilterChange}
					/>

					<Button className='student-list--button' onClick={onSortChange}>
						<Icon name='funnel' />
						Sort
					</Button>

					<Button className='student-list--button' onClick={onGroupChange} disabled>
						<Icon name='android-apps' />
						Group
					</Button>

					<Button className='student-list--button' onClick={onToggleEditing}>
						<Icon name='android-menu' />
						Edit
					</Button>

					<Link to={'wizard/'}>
					<Button className='student-list--button' onClick={onAddStudent}>
						<Icon name='android-add' />
						New
					</Button>
					</Link>
				</Toolbar>

				<div>
					<span>Sorting by <b>{sortBy}</b> (a-z);</span>{' '}
					<span>grouping by <b>{groupBy}</b>.</span>
				</div>
			</div>

			<StudentList
				actions={actions}
				filter={filterText}
				isEditing={isEditing}
				sortBy={sortBy}
				students={students}
			/>
		</div>
	)
}
StudentPicker.propTypes = {
	actions: PropTypes.object.isRequired,
	filterText: PropTypes.string.isRequired,
	groupBy: PropTypes.string.isRequired,
	isEditing: PropTypes.bool.isRequired,
	onAddStudent: PropTypes.func.isRequired,
	onFilterChange: PropTypes.func.isRequired,
	onGroupChange: PropTypes.func.isRequired,
	onOpenSearchOverlay: PropTypes.func.isRequired,
	onSortChange: PropTypes.func.isRequired,
	onToggleEditing: PropTypes.func.isRequired,
	sortBy: PropTypes.string.isRequired,
	students: PropTypes.object.isRequired,
}

export default class StudentPickerContainer extends Component {
	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		students: PropTypes.object,
	};

	static contextTypes = {
		location: PropTypes.object.isRequired,
		router: PropTypes.object.isRequired,
	};

	constructor() {
		super()

		// since we are starting off without any data, there is no initial value
		this.state = {
			filterText: '',
			isEditing: false,
			sortBy: 'modified',
			groupBy: 'nothing',
		}
	}

	onAddStudent = () => {
		const query = {...this.context.location.query, 'student-wizard': null}
		this.context.router.push({pathname: this.context.location.pathname, query})
	}

	onOpenSearchOverlay = () => {
		const query = {...this.context.location.query, 'search-overlay': null}
		this.context.router.push({pathname: this.context.location.pathname, query})
	}

	onFilterChange = ev => {
		this.setState({filterText: ev.target.value.toLowerCase()})
	}

	onGroupChange = () => {}

	onSortChange = () => {
		this.setState({sortBy: this.state.sortBy === 'modified' ? 'name' : 'modified'})
	}

	onToggleEditing = () => {
		this.setState({isEditing: !this.state.isEditing})
	}

	render() {
		// console.log('StudentPicker#render')
		return (
			<StudentPicker
				{...this.props}
				filterText={this.state.filterText}
				groupBy={this.state.groupBy}
				isEditing={this.state.isEditing}
				onAddStudent={this.onAddStudent}
				onFilterChange={this.onFilterChange}
				onGroupChange={this.onGroupChange}
				onOpenSearchOverlay={this.onOpenSearchOverlay}
				onSortChange={this.onSortChange}
				onToggleEditing={this.onToggleEditing}
				sortBy={this.state.sortBy}
			/>
		)
	}
}
