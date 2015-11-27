import clone from 'lodash/lang/clone'
import contains from 'lodash/collection/contains'
import filter from 'lodash/collection/filter'
import find from 'lodash/collection/find'
import findIndex from 'lodash/array/findIndex'
import findKey from 'lodash/object/findKey'
import findWarnings from '../helpers/find-course-warnings'
import flatten from 'lodash/array/flatten'
import identity from 'lodash/utility/identity'
import isArray from 'lodash/lang/isArray'
import isNumber from 'lodash/lang/isNumber'
import isTrue from '../helpers/is-true'
import isUndefined from 'lodash/lang/isUndefined'
import map from 'lodash/collection/map'
import omit from 'lodash/object/omit'
import pluck from 'lodash/collection/pluck'
import present from 'present'
import reject from 'lodash/collection/reject'
import round from 'lodash/math/round'
import some from 'lodash/collection/some'
import stringify from 'json-stable-stringify'
import zipObject from 'lodash/array/zipObject'
import {v4 as uuid} from 'uuid'
const debug = require('debug')('gb:models')

import randomChar from '../helpers/random-char'

const now = new Date()

export default function Student(data) {
	const startTime = present()

	const baseStudent = {
		id: uuid(),
		name: 'Student ' + randomChar(),
		version: VERSION,

		creditsNeeded: 35,

		matriculation: now.getFullYear() - 2,
		graduation: now.getFullYear() + 2,
		advisor: '',

		dateLastModified: new Date(),
		dateCreated: new Date(),

		studies: [],
		schedules: {},
		overrides: {},
		fabrications: {},

		settings: {},
	}

	const student = {
		...baseStudent,
		...data,
	}

	if (isArray(student.schedules)) {
		student.schedules = zipObject(map(student.schedules, s => [s.id, s]))
	}

	debug(`Student(): it took ${round(present() - startTime, 2)} ms to make a student`)

	return student
}


////////
////////
////////

export function changeStudentName(student, newName) {
	return {...student, name: newName}
}
export function changeStudentAdvisor(student, newAdvisor) {
	return {...student, advisor: newAdvisor}
}
export function changeStudentCreditsNeeded(student, newCreditsNeeded) {
	return {...student, creditsNeeded: newCreditsNeeded}
}
export function changeStudentMatriculation(student, newMatriculation) {
	return {...student, matriculation: newMatriculation}
}
export function changeStudentGraduation(student, newGraduation) {
	return {...student, graduation: newGraduation}
}
export function changeStudentSetting(student, key, value) {
	return {...student, settings: {...student.settings, [key]: value}}
}


export function addScheduleToStudent(student, newSchedule) {
	return {...student, schedules: {...student.schedules, [newSchedule.id]: newSchedule}}
}

export function destroyScheduleFromStudent(student, scheduleId) {
	debug(`Student.destroySchedule(): removing schedule ${scheduleId}`)

	const deadSched = student.schedules[scheduleId]
	const schedules = omit(student.schedules, [scheduleId])

	if (deadSched && deadSched.active) {
		const otherSchedKey = findKey(schedules, sched =>
			sched.year === deadSched.year &&
			sched.semester === deadSched.semester &&
			sched.id !== deadSched.id)

		if (otherSchedKey) {
			schedules[otherSchedKey] = {...schedules[otherSchedKey], active: true}
		}
	}

	return {...student, schedules}
}


export function addCourseToSchedule(student, scheduleId, clbid) {
	if (!isNumber(clbid)) {
		throw new TypeError('addCourse(): clbid must be a number')
	}

	let schedule = clone(find(student.schedules, {id: scheduleId}))
	if (!schedule) {
		throw new ReferenceError(`Could not find a schedule with an ID of ${scheduleId}.`)
	}

	// If the schedule already has the course we're adding, just return the student
	if (contains(schedule.clbids, clbid)) {
		return student
	}

	debug(`adding clbid ${clbid} to schedule ${schedule.id} (${schedule.year}-${schedule.semester}.${schedule.index})`)

	schedule.clbids = schedule.clbids.concat(clbid)

	return {...student, schedules: {...student.schedules, [schedule.id]: schedule}}
}

export function removeCourseFromSchedule(student, scheduleId, clbid) {
	if (!isNumber(clbid)) {
		throw new TypeError('removeCourse(): clbid must be a number')
	}

	let schedule = clone(find(student.schedules, {id: scheduleId}))

	if (!schedule) {
		throw new ReferenceError(`Could not find a schedule with an ID of ${scheduleId}.`)
	}

	// If the schedule doesn't have the course we're removing, just return the student
	if (!contains(schedule.clbids, clbid)) {
		return student
	}

	debug(`removing clbid ${clbid} from schedule ${schedule.id} (${schedule.year}-${schedule.semester}.${schedule.index})`)

	schedule.clbids = reject(schedule.clbids, id => id === clbid)

	return {...student, schedules: {...student.schedules, [schedule.id]: schedule}}
}

export function moveCourseToSchedule(student, fromScheduleId, toScheduleId, clbid) {
	debug(`Student.moveCourse(): moving ${clbid} from schedule ${fromScheduleId} to schedule ${toScheduleId}`)

	student = removeCourseFromSchedule(student, fromScheduleId, clbid)
	student = addCourseToSchedule(student, toScheduleId, clbid)

	return {...student}
}


export function addAreaToStudent(student, areaOfStudy) {
	return {...student, studies: [...student.studies, areaOfStudy]}
}

export function removeAreaFromStudent(student, areaQuery) {
	return {...student, studies: reject([...student.studies], areaQuery)}
}


export function setOverrideOnStudent(student, key, value) {
	let overrides = {...student.overrides}
	overrides[key] = value
	return {...student, overrides}
}

export function removeOverrideFromStudent(student, key) {
	let overrides = {...student.overrides}
	delete overrides[key]
	return {...student, overrides}
}


export function addFabricationToStudent(student, fabrication) {
	let fabrications = {...student.fabrications, [fabrication.id]: fabrication}
	return {...student, fabrications}
}

export function removeFabricationFromStudent(student, fabricationId) {
	let fabrications = {...student.fabrications}
	delete fabrications[fabricationId]
	return {...student, fabrications}
}


export function encodeStudent(student) {
	return encodeURIComponent(stringify(student))
}

export function saveStudent(student) {
	// grab the old (still JSON-encoded) student from localstorage
	// compare it to the current one
	// if they're different, update dateLastModified, stringify, and save.
	const oldVersion = localStorage.getItem(student.id)

	if (oldVersion !== stringify(student)) {
		debug(`saving student ${student.name} (${student.id})`)
		const student = student.dateLastModified = new Date()
		localStorage.setItem(student.id, stringify(student))
	}
}



export function moveScheduleInStudent(student, scheduleId, {year, semester}={}) {
	if (year === undefined && semester === undefined) {
		throw new RangeError('moveScheduleInStudent: Either year or semester must be provided.')
	}
	if (!isUndefined(year) && !isNumber(year)) {
		throw new TypeError('moveScheduleInStudent: year must be a number.')
	}
	if (!isUndefined(semester) && !isNumber(semester)) {
		throw new TypeError('moveScheduleInStudent: semester must be a number.')
	}

	let schedule = clone(find(student.schedules, {id: scheduleId}))
	if (!schedule) {
		throw new ReferenceError(`moveScheduleInStudent: Could not find a schedule with an ID of "${scheduleId}".`)
	}

	if (isNumber(year)) {
		schedule.year = year
	}
	if (isNumber(semester)) {
		schedule.semester = semester
	}

	return {...student, schedules: {...student.schedules, [schedule.id]: schedule}}
}

export function reorderScheduleInStudent(student, scheduleId, index) {
	let old = find(student.schedules, {id: scheduleId})
	if (!old) {
		throw new ReferenceError(`Could not find a schedule with an ID of ${scheduleId}.`)
	}

	let schedule = {...old, index: index}
	return {...student, schedules: {...student.schedules, [schedule.id]: schedule}}
}

export function renameScheduleInStudent(student, scheduleId, title) {
	let old = find(student.schedules, {id: scheduleId})
	if (!old) {
		throw new ReferenceError(`Could not find a schedule with an ID of ${scheduleId}.`)
	}

	let schedule = {...old, title: title}
	return {...student, schedules: {...student.schedules, [schedule.id]: schedule}}
}

export function reorderCourseInSchedule(student, scheduleId, {clbid, index}) {
	if (!isNumber(clbid)) {
		throw new TypeError('reorderCourse(): clbid must be a number')
	}

	let schedule = clone(find(student.schedules, {id: scheduleId}))
	if (!schedule) {
		throw new ReferenceError(`Could not find a schedule with an ID of ${scheduleId}.`)
	}

	const oldIndex = findIndex(schedule.clbids, id => id === clbid)

	schedule.clbids = [...schedule.clbids]
	schedule.clbids.splice(oldIndex, 1)
	schedule.clbids.splice(index, 0, clbid)

	return {...student, schedules: {...student.schedules, [schedule.id]: schedule}}
}


export function validateSchedule(schedule) {
	// Checks to see if the schedule is valid
	return schedule.courses.then(courses => {
		// only check the courses that have data
		courses = reject(courses, isUndefined)

		// Step one: do any times conflict?
		const conflicts = findWarnings(courses, schedule)

		const flattened = flatten(conflicts)
		const filtered = filter(flattened, identity)
		const warnings = pluck(filtered, 'warning')
		const hasConflict = some(warnings, isTrue)

		if (hasConflict) {
			debug('schedule conflicts', conflicts, hasConflict)
		}

		return {hasConflict, conflicts}
	})
}
