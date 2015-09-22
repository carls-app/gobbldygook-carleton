const semesters = {
	1: 'Fall',
	2: 'Interim',
	3: 'Spring',
	4: 'Summer Session 1',
	5: 'Summer Session 2',
}

/**
 * Takes a semester number and returns the associated semester string.
 *
 * @param {Number} semester - the semester (number)
 * @returns {String} - the nice semester name
 */
function semesterName(semester) {
	return semesters[semester] || 'Unknown (' + semester + ')'
}

export default semesterName
