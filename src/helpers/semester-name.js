const semesters = new Map([
	[0, 'Abroad'],
	[1, 'Fall'],
	[2, 'Interim'],
	[3, 'Spring'],
	[4, 'Summer Session 1'],
	[5, 'Summer Session 2'],
	[9, 'Non-St. Olaf'],
])

/**
 * Takes a semester number and returns the associated semester string.
 *
 * @param {String|Number} semester - the semester (number)
 * @returns {String} - the nice semester name
 */
export default function semesterName(semester) {
	if (typeof semester === 'string') {
		semester = parseInt(semester, 10)
	}
	return semesters.has(semester)
        ? semesters.get(semester)
        : 'Unknown (' + semester + ')'
}
