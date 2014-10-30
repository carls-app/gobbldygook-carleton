'use strict';

import * as _ from 'lodash'
import * as Promise from 'bluebird'
import {courseCache} from './db'

// query = {
// 		'title': {values: ['Chinese'], flags: ['caseInsensitive', 'partialMatch']},
// 		'year': {values: [2009, 2010], bool: 'OR'},
// 		'level': {values: [200], flags: ['>=']},
// 		'type': {values: ['Lab', 'Research', 'Topic'], bool: 'NOT', flags: ['caseInsensitive']}
// }

var checkSingleQuery = _.curry(function(query, valueToCheck, against) {
	if (_.isArray(valueToCheck) || _.isString(valueToCheck)) {
		return _.contains(valueToCheck, against)
	} else {
		return valueToCheck === against
	}
})

var checkAgainstQuery = _.curry(function(queryObject, course) {
	var results = {}

	_.each(queryObject, function(singleQuery, key) {
		if (!singleQuery.bool || singleQuery.bool === 'AND') {
			results[key] = _.all(singleQuery.values, checkSingleQuery(singleQuery, course[key]))
		} else if (singleQuery.bool === 'OR') {
			results[key] = _.any(singleQuery.values, checkSingleQuery(singleQuery, course[key]))
		} else if (singleQuery.bool === 'NOT') {
			results[key] = !_.any(singleQuery.values, checkSingleQuery(singleQuery, course[key]))
		}
	})

	return _.all(results)
})

function queryCourses(query) {
	var results = _.chain(courseCache)
		.filter(course => _.contains(course.title, query))
		.sortBy('term')
		.reverse()
		.value()
	return results
}

window.queryCourses = queryCourses
export default queryCourses
