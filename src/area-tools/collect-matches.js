import assertKeys from './assert-keys'
import flatten from 'lodash/array/flatten'
import map from 'lodash/collection/map'
import uniq from 'lodash/array/uniq'
import stringify from 'json-stable-stringify'

/**
 * Collects matched courses from a result object
 * @private
 * @param {Result} expr - the result object to extract matches from
 * @returns {Course[]} matches - the list of matched courses
 */
export default function collectMatches(expr) {
	assertKeys(expr, '$type')
	const type = expr.$type

	// start off with absolutely no matches
	let matches = undefined

	// if a course expression, and the course was used, return the course in
	// an array. returning in an array allows the higher-level expressions to
	// just run `flatten()` to collect all of the courses.
	// this is the "base case."
	if (type === 'course') {
		/* istanbul ignore else: doesn't matter */
		if (expr._result === true) {
			matches = [expr.$course || expr]
		}
	}

	// next, we have the "run collectMatches on all my children" cases.
	else if (type === 'requirement') {
		if (expr.hasOwnProperty('result')) {
			matches = collectMatches(expr.result)
		}
		else {
			matches = []
		}
	}
	else if (type === 'boolean') {
		matches = flatten(map(expr.$and || expr.$or, collectMatches))
	}
	else if (type === 'of') {
		matches = flatten(map(expr.$of, collectMatches))
	}

	// finally, we have the "pre-computed _matches" cases, where the evaluation
	// of the expression attached the matches to the expression itself.
	else if (type === 'modifier') {
		matches = expr._matches
	}
	else if (type === 'occurrence') {
		matches = expr._matches
	}
	else if (type === 'reference') {
		matches = expr._matches
	}
	else if (type === 'where') {
		matches = expr._matches
	}
	else {
		throw new TypeError(`collectMatches(): unknown expression type "${type}"`)
	}

	// then we either return the matches, or an empty array if it's falsy
	return matches ? uniq(matches, stringify) : []
}