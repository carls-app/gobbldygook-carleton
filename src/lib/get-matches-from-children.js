import collectMatches from './collect-matches'
import filter from 'lodash/collection/filter'
import flatten from 'lodash/array/flatten'
import includes from 'lodash/collection/includes'
import isArray from 'lodash/lang/isArray'
import isRequirementName from './is-requirement-name'
import keys from 'lodash/object/keys'
import map from 'lodash/collection/map'
import pluck from 'lodash/collection/pluck'
import stringify from 'json-stable-stringify'
import uniq from 'lodash/array/uniq'

/**
 * Extract the matched courses from all children.
 * @private
 * @param {Object} expr - the current result expression
 * @param {Requirement} ctx - the host requirement
 * @returns {Course[]} - the list of matched courses
 */
export default function getMatchesFromChildren(expr, ctx) {
	// grab all the child requirement names from this requirement
	let childKeys = filter(keys(ctx), isRequirementName)

	// either use all of the child requirements in the computation,
	/*eslint no-empty: 0 */
	if (expr.$children === '$all') {
		// do nothing; the default case.
	}

	// or just use some of them (those listed in expr.$children)
	else if (isArray(expr.$children)) {
		const requested = pluck(expr.$children, '$requirement')
		childKeys = filter(childKeys, key => includes(requested, key))
	}

	// `uniq` had the same problem here that the dirty course stuff struggles
	// with. That is, uniq works on a per-object basis, so when you write down
	// the same course for several reqs, they'll be different objects.
	// Therefore, we turn each object into a sorted JSON representation of
	// itself, and uniq based on that.
	// (I opted for passing iteratee to uniq, rather than mapping, to let lodash optimize a bit.)

	// finally, collect the matching courses from the requested children
	const matches = map(childKeys, key => collectMatches(ctx[key]))
	const flatMatches = flatten(matches)
	const uniquedMatches = uniq(flatMatches, stringify)

	return uniquedMatches
}
