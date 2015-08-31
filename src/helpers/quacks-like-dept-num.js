import deptNumRegex from './dept-num-regex'

/**
 * Checks if a string looks like a deptnum.
 *
 * @param {String} deptNumString - the deptnum
 * @returns {Boolean} - does it quack like a deptnum?
 */
function quacksLikeDeptNum(deptNumString) {
	return deptNumRegex.test(deptNumString)
}

export default quacksLikeDeptNum