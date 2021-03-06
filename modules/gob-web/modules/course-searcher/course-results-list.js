// @flow
import React, {Component} from 'react'
import map from 'lodash/map'
import {DraggableCourse} from '../course'
import debug from 'debug'
const log = debug('web:react')

import {compareProps} from '@gob/lib'
import {
	toPrettyTerm,
	expandYear,
	semesterName,
} from '@gob/school-st-olaf-college'

const GROUP_BY_TO_TITLE = {
	'Day of Week': days => days,
	Department: depts => depts,
	GenEd: gereqs => gereqs,
	Semester: sem => semesterName(sem),
	Term: term => toPrettyTerm(term),
	'Time of Day': times => times,
	Year: year => expandYear(year),
	None: () => '',
}

type Props = {
	groupBy: string,
	results: any[],
	sortBy?: string,
	studentId?: string,
}

export default class CourseResultsList extends Component<Props> {
	shouldComponentUpdate(nextProps: Props) {
		return compareProps(this.props, nextProps)
	}

	render() {
		log('CourseResultsList.render')
		const {results, groupBy: groupByValue, studentId} = this.props

		return (
			<ul className="term-list">
				{map(results, ([groupTitle, courses]) => {
					const title = GROUP_BY_TO_TITLE[groupByValue](groupTitle)
					return (
						<li key={groupTitle} className="course-group">
							{title && (
								<p className="course-group-title">{title}</p>
							)}
							<ul className="course-list">
								{courses.map((course, index) => (
									<li key={index}>
										<DraggableCourse
											course={course}
											studentId={studentId}
										/>
									</li>
								))}
							</ul>
						</li>
					)
				})}
			</ul>
		)
	}
}
