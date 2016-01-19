import React, {Component, PropTypes} from 'react'
import StudentPicker from '../components/student-picker'
import Loading from '../../../components/loading'
import mapValues from 'lodash/object/mapValues'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { destroyStudent, loadStudents } from '../../../redux/students/actions'

export default class StudentPickerContainer extends Component {
	static propTypes = {
		destroyStudent: PropTypes.func.isRequired,
		loadStudents: PropTypes.func.isRequired,
		routing: PropTypes.object.isRequired,
		students: PropTypes.object.isRequired,
	};

	// since we are starting off without any data, there is no initial value
	state = {
		filterText: '',
		isEditing: false,
		sortBy: 'dateLastModified',
		groupBy: 'nothing',
	};

	componentWillMount() {
		this.props.loadStudents()
	}

	onFilterChange = ev => {
		this.setState({filterText: ev.target.value.toLowerCase()})
	};

	onGroupChange = () => {};

	onSortChange = () => {
		const options = ['dateLastModified', 'name', 'canGraduate']
		const currentIndex = options.indexOf(this.state.sortBy)
		const nextIndex = (currentIndex + 1) % options.length
		this.setState({sortBy: options[nextIndex]})
	};

	onToggleEditing = () => {
		this.setState({isEditing: !this.state.isEditing})
	};

	render() {
		// if (this.props.students.isLoading) {
		// 	return <Loading>Loading students…</Loading>
		// }

		// const students = mapValues(this.props.students.data, s => s.present)
		const students = this.props.students
		return (
			<StudentPicker
				destroyStudent={this.props.destroyStudent}
				filterText={this.state.filterText}
				groupBy={this.state.groupBy}
				isEditing={this.state.isEditing}
				onAddStudent={this.onAddStudent}
				onFilterChange={this.onFilterChange}
				onGroupChange={this.onGroupChange}
				onOpenSearchOverlay={this.onOpenSearchOverlay}
				onSortChange={this.onSortChange}
				onToggleEditing={this.onToggleEditing}
				routing={this.props.routing}
				sortBy={this.state.sortBy}
				students={students}
			/>
		)
	}
}


const mapStateToProps = state => ({
	students: state.processed,
	routing: state.routing,
})

const mapDispatchToProps = dispatch => ({
	...bindActionCreators({destroyStudent, loadStudents}, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentPickerContainer)