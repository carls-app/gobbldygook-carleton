import React from 'react'
import PropTypes from 'prop-types'
import CourseExpression from './expression--course'
import ResultIndicator from './result-indicator'

import has from 'lodash/has'
import map from 'lodash/map'
import plur from 'plur'
import {humanizeOperator} from '@gob/examine-student'
import debug from 'debug'
const log = debug('web:react')

import './expression.scss'

const JOINERS = {
	$and: 'AND',
	$or: 'OR',
}

function makeBooleanExpression({expr, ctx}) {
	let kind = '$invalid'

	if ('$and' in expr) {
		kind = '$and'
	} else if ('$or' in expr) {
		kind = '$or'
	}

	const contents = expr[kind].reduce((acc, exp, i) => {
		if (i > 0) {
			acc.push(
				<span key={`${i}-joiner`} className="joiner">
					{JOINERS[kind]}
				</span>,
			)
		}

		acc.push(<Expression key={i} expr={exp} ctx={ctx} />)

		return acc
	}, [])

	return {contents}
}

const ofLookup = {
	all: 'All of',
	any: 'Any of',
	none: 'None of',
}

function makeOfExpression({expr, ctx}) {
	const description =
		ofLookup[expr.$count.$was] ||
		`${expr._counted || 0} of ${humanizeOperator(expr.$count.$operator)} ${
			expr.$count.$num
		} from among`

	// const contents = map(orderBy(expr.$of, ['_result'], ['desc']), (ex, i) =>
	const contents = map(expr.$of, (ex, i) => (
		<Expression key={i} expr={ex} ctx={ctx} />
	))

	return {description, contents}
}

function makeModifierExpression({expr}) {
	const op = humanizeOperator(expr.$count.$operator)
	const num = expr.$count.$num
	const needs = `${op} ${num} ${plur(expr.$what, expr.$count.$num)}`
	let from = expr.$from
	if (expr.$from === 'where') {
		from = 'courses where ' + makeWhereQualifier(expr.$where)
	}
	const description = `${expr._counted} of ${needs} from ${from}`
	return {description}
}

let operators = {
	$lte: '<=',
	$gte: '>=',
	$eq: 'is',
}
let keys = {
	gereqs: 'G.E.',
}
export function makeWhereQualifier(where) {
	let operator = operators[where.$operator] || '?'
	let key = keys[where.$key] || where.$key
	return `${key} ${operator} ${where.$value}`
}

export function makeWhereExpression({expr}) {
	const op = humanizeOperator(expr.$count.$operator)
	const num = expr.$count.$num
	const needs = `${op} ${num}`
	const qualifier = makeWhereQualifier(expr.$where)
	const distinct = expr.$distinct ? 'distinct ' : ''
	const word = expr.$count.$num === 1 ? 'course' : 'courses'
	const counted = expr._counted
	const description = `${counted} of ${needs} ${distinct}${word} from courses where ${qualifier}`

	let contents = map(expr._matches, (course, i) => (
		<Expression
			key={i}
			expr={{$type: 'course', $course: course}}
			hideIndicator
		/>
	))

	if (!contents.length) {
		contents = null
	}

	return {description, contents}
}

function makeOccurrenceExpression({expr}) {
	const op = humanizeOperator(expr.$count.$operator)
	const word = expr.$count.$num === 1 ? 'occurrence' : 'occurrences'
	const num = expr.$count.$num
	const description = `${expr._counted} of ${op} ${num} ${word} of `

	const contents = <Expression expr={{...expr, type: 'course'}} />

	return {description, contents}
}

export default function Expression(props) {
	const {expr} = props
	const {$type} = expr

	if (!$type) {
		return null
	}

	const computationResult = expr._result
	const isFulfillment = expr._isFulfillment
	const wasUsed = has(expr, '_result') && computationResult
	const wasTaken = expr._taken
	const wasEvaluated = expr._checked

	let contents = null
	let description = null
	let result = null

	if ($type === 'boolean') {
		;({contents} = makeBooleanExpression(props))
	} else if ($type === 'course') {
		// _request is the original course that was written in the spec.
		// $course is the matched course. It's used mostly by where-expressions and the like.
		contents = (
			<CourseExpression
				{...expr._request || expr.$course}
				_taken={expr._taken}
			/>
		)
		result = <ResultIndicator result={wasTaken} />
	} else if ($type === 'reference') {
		contents = expr.$requirement
		result = <ResultIndicator result={computationResult} />
	} else if ($type === 'of') {
		;({contents, description} = makeOfExpression(props))
	} else if ($type === 'modifier') {
		;({description} = makeModifierExpression(props))
		result = <ResultIndicator result={computationResult} />
	} else if ($type === 'where') {
		;({description, contents} = makeWhereExpression(props))
	} else if ($type === 'occurrence') {
		;({description, contents} = makeOccurrenceExpression(props))
	} else {
		log(`<Expression />: type not handled: ${$type}`)
		log(props)
		contents = JSON.stringify(expr, null, 2)
	}

	const className = [
		'expression',
		`expression--${$type}`,
		wasEvaluated ? 'evaluated' : 'not-evaluated',
		isFulfillment ? 'fulfillment' : '',
		wasTaken ? 'taken' : 'not-taken',
		wasUsed ? 'used' : 'not-used',
	].join(' ')

	return (
		<span className={className}>
			{description && (
				<span className="expression--description">
					{description}
					{!props.hideIndicator && result}
				</span>
			)}
			{contents && (
				<span className="expression--contents">
					{contents}
					{props.hideIndicator || expr._isFulfillment ? null : result}
				</span>
			)}
		</span>
	)
}

Expression.propTypes = {
	ctx: PropTypes.object,
	expr: PropTypes.shape({
		_isFulfillment: PropTypes.bool,
		_checked: PropTypes.bool,
		_result: PropTypes.bool,
		$type: PropTypes.string,
	}).isRequired,
	hideIndicator: PropTypes.bool,
}
