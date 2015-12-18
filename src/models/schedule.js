import isString from 'lodash/lang/isString'
import {v4 as uuid} from 'uuid'

import randomChar from '../helpers/random-char'

export default function Schedule(data={}) {
	const baseSchedule = {
		id: uuid(),
		active: false,

		index: 1,
		title: `Schedule ${randomChar().toUpperCase()}`,

		clbids: [],
		year: 0,
		semester: 0,
	}

	let schedule = {
		...baseSchedule,
		...data,
	}

	if (!isString(schedule.id)) {
		throw new TypeError('Schedule id must be a string.')
	}

	return schedule
}
