import isString from 'lodash/isString'
import uuid from 'uuid/v4'
import {randomChar} from '@gob/lib'

export function Schedule(data = {}) {
	const baseSchedule = {
		id: uuid(),
		active: false,

		index: 1,
		title: `Schedule ${randomChar().toUpperCase()}`,

		clbids: [],
		year: 0,
		semester: 0,

		metadata: {},
	}

	let schedule = Object.assign({}, baseSchedule, data)

	if (!isString(schedule.id)) {
		throw new TypeError('Schedule id must be a string.')
	}

	if (typeof schedule.year === 'string') {
		schedule.year = parseInt(schedule.year, 10)
	}

	if (typeof schedule.semester === 'string') {
		if (schedule.semester === 'FA') {
			return 1
		} else if (schedule.semester === 'WI') {
			return 2
		} else if (schedule.semester === 'SP') {
			return 3
		} else {
			schedule.semester = parseInt(schedule.semester, 10)
		}
	}

	return schedule
}
