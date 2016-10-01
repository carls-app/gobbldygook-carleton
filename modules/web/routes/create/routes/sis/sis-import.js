import React, {Component, PropTypes} from 'react'
import serializeError from 'serialize-error'
import Button from 'modules/web/components/button'
import {
	getStudentInfo,
	checkIfLoggedIn,
	ExtensionNotLoadedError,
	ExtensionTooOldError,
	convertStudent,
	semesterName,
} from 'modules/schools/stolaf'
import {getCourse} from 'modules/web/helpers/get-courses'
import StudentSummary from 'modules/web/routes/student/components/student-summary'
import map from 'lodash/map'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import { RadioGroup, Radio } from 'react-radio-group'
import { initStudent } from 'modules/web/redux/students/actions/init-student'
import { connect } from 'react-redux'
import withRouter from 'react-router/lib/withRouter'
import './sis-import.scss'

class SISImportScreen extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired, // redux
		router: PropTypes.object.isRequired,
	};

	state = {
		loggedIn: null,
		checkingLogin: true,
		error: null,
		ids: [],
		selectedId: null,
		student: null,
	};

	componentWillMount() {
		this.checkLoginState()
	}

	checkLoginState = () => {
		checkIfLoggedIn()
			.then(ids => {
				if (ids.length === 1) {
					this.setState({loggedIn: true, checkingLogin: false, selectedId: ids[0]})
				}
				else {
					this.setState({loggedIn: true, checkingLogin: false, ids})
				}
			})
			.catch(err => {
				console.error(err)
				this.setState({loggedIn: false, checkingLogin: false})
				if (err instanceof ExtensionNotLoadedError) {
					this.setState({error: 'The extension is not loaded properly.'})
				}
				else if (err instanceof ExtensionTooOldError) {
					this.setState({error: 'The extension is too old.'})
				}
				else {
					this.setState({error: serializeError(err)})
				}
			})
	};

	handleImportData = () => {
		getStudentInfo(this.state.selectedId)
			.then(info => convertStudent(info, getCourse))
			.then(student => this.setState({student}))
			.catch(err => {
				console.error(err)
				this.setState({error: serializeError(err)})
			})
	};

	handleCreateStudent = () => {
		let action = initStudent(this.state.student)
		this.props.dispatch(action)
		this.props.router.push(`/s/${action.payload.id}`)
	};

	handleSelectId = value => {
		this.setState({selectedId: value})
		this.handleImportData()
	};

	render() {
		let {
			student,
			checkingLogin,
			loggedIn,
			error,
			ids,
		} = this.state

		return (
			<div>
				<header className='header'>
					<h1>Import from the SIS</h1>
				</header>

				<p>
					{checkingLogin
						? 'Checking login…'
						: loggedIn
							? "Great! You're logged in."
							: 'Not logged in. Please log in to the SIS in another tab.'}
				</p>

				{error
					? <details className='error-spot'>
						<summary>
							<strong>{error.name}</strong>: {error.message}
						</summary>
						<pre className='error-stack'>
							{error.stack}
						</pre>
					</details>
					: null}

				{!loggedIn ? <Button disabled={checkingLogin} onClick={this.checkLoginState}>Check Again</Button> : null}

				{ids.length > 1 ? <div>
					<p>Hang on one second… we found multiple student IDs. Which one is yours?</p>
					<RadioGroup name='student-id' selectedValue={this.state.selectedId} onChange={this.handleSelectId}>
						{map(ids, id => <label><Radio value={id} /> {id}</label>)}
					</RadioGroup>
				</div> : null}

				{student
					? <div>
						<StudentSummary student={student} showMessage={false} />
						<ul>
							{map(groupBy(student.schedules, 'year'), (schedules, year) =>
								<li>{year}:
									<ul>
										{map(sortBy(schedules, 'semester'), schedule =>
											<li>{semesterName(schedule.semester)}:
												<ul>
													{map(schedule.courses, course =>
														<li>{course.deptnum} – {course.name}</li>
													)}
												</ul>
											</li>
										)}
									</ul>
								</li>
							)}
						</ul>
					</div>
					: null}

				<div>
					{loggedIn ? student
						? <Button onClick={this.handleCreateStudent}>Import Student</Button>
						: <Button disabled={!loggedIn} onClick={this.handleImportData}>Fetch Student</Button>
					: null}
				</div>
			</div>
		)
	}
}


let mapDispatch = dispatch => ({dispatch})

export default connect(undefined, mapDispatch)(withRouter(SISImportScreen))
