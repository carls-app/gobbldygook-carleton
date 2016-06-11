const React = require('react')
const {Component, PropTypes} = React
import {map} from 'lodash-es'
import InlineCourse from './inline-course'

import compareProps from '../helpers/compare-props'
import toPrettyTerm from '../helpers/to-pretty-term'
import expandYear from '../helpers/expand-year'
import semesterName from '../helpers/semester-name'

const GROUP_BY_TO_TITLE = {
	'Day of Week': days => days,
	'Department': depts => depts,
	'GenEd': gereqs => gereqs,
	'Semester': sem => semesterName(sem),
	'Term': term => toPrettyTerm(term),
	'Time of Day': times => times,
	'Year': year => expandYear(year),
	'None': () => '',
}

export default class CourseResultsList extends Component {
	static propTypes = {
		groupBy: PropTypes.string.isRequired,
		results: PropTypes.array.isRequired,
		sortBy: PropTypes.string,
		studentId: PropTypes.string,
	};

	shouldComponentUpdate(nextProps) {
		return compareProps(this.props, nextProps)
	}

	render() {
		// console.log('CourseResultsList.render')
		const { results, groupBy: groupByValue, studentId } = this.props

		return (
			<ul className='term-list'>
				{map(results, ([groupTitle, courses]) => {
					const title = GROUP_BY_TO_TITLE[groupByValue](groupTitle)
					return <li key={groupTitle} className='course-group'>
						{title && <p className='course-group-title'>{title}</p>}
						<ul className='course-list'>
							{map(courses, (course, index) =>
								<li key={index}>
									<InlineCourse course={course} studentId={studentId} />
								</li>)}
						</ul>
					</li>
				})}
			</ul>
		)
	}
}
