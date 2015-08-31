import React, {Component, PropTypes, findDOMNode} from 'react'
import cx from 'classnames'

import groupBy from 'lodash/collection/groupBy'
import map from 'lodash/collection/map'
import pairs from 'lodash/object/pairs'
import sortBy from 'lodash/collection/sortBy'
import sortByAll from 'lodash/collection/sortByAll'
import present from 'present'
import toPrettyTerm from '../helpers/to-pretty-term'
import queryCourseDatabase from '../lib/query-course-database'

import Button from '../components/button'
import Course from '../components/course'
import Icon from '../components/icon'
import Loading from '../components/loading'

import Student from '../models/student'
import stickyfill from '../lib/init-stickyfill'

import './course-searcher.scss'

export default class CourseSearcher extends Component {
	static propTypes = {
		isHidden: PropTypes.bool,
		student: PropTypes.instanceOf(Student).isRequired,
		toggle: PropTypes.func.isRequired,
	}

	constructor() {
		super()
		this.state = {
			isQuerying: false,
			hasQueried: false,
			results: [],
			queryString: '',
			lastQuery: '',
			queryInProgress: false,
		}
	}

	componentDidMount() {
		stickyfill.add(findDOMNode(this))
		findDOMNode(this.refs.searchbox).focus()
	}

	componentWillUnmount() {
		stickyfill.remove(findDOMNode(this))
	}

	onSubmit = () => {
		if (this.state.queryString !== this.state.lastQuery) {
			if (process.env.NODE_ENV === 'production') {
				window.ga.q.push(['send', 'search_query', this.state.queryString])
			}
			this.query(this.state.queryString)
		}
	}

	onChange = evt => {
		this.setState({queryString: evt.target.value})
	}

	onKeyDown = evt => {
		if (evt.keyCode === 13) {
			this.onSubmit()
		}
	}

	processQueryResults = ([results, startQueryTime]=[]) => {
		console.log('results', results)

		// Sort the results.
		const sortedByIdentifier = sortByAll(results, ['deptnum', 'sect'])
		// Group them by term, then turn the object into an array of pairs.
		const groupedAndPaired = pairs(groupBy(sortedByIdentifier, 'term'))
		// Sort the result arrays by the first element, the term, because
		// object keys don't have an implicit sort. Also reverse it, so the
		// most recent is at the top.
		const searchResults = sortBy(groupedAndPaired, group => group[0]).reverse()

		console.log('search results', searchResults)
		let endQueryTime = present()
		console.info(`query took ${(endQueryTime - startQueryTime)}ms.`)

		this.setState({
			results: searchResults,
			hasQueried: true,
			queryInProgress: false,
		})
	}

	query = searchQuery => {
		if (searchQuery.length === 0 || this.state.queryInProgress) {
			return
		}

		this.setState({results: [], hasQueried: false})
		const startQueryTime = present()

		queryCourseDatabase(searchQuery)
			.then(results => [results, startQueryTime])
			.then(this.processQueryResults)
			.catch(err => console.error(err))

		this.setState({queryInProgress: true, lastQuery: searchQuery})
	}

	render() {
		// console.log('SearchButton#render')
		const showNoResults = this.state.results.length === 0 && this.state.hasQueried
		const showIndicator = this.state.queryInProgress

		let contents = <li className='no-results course-group'>No Results Found</li>

		if (showIndicator) {
			contents = <li className='loading course-group'><Loading>Searching…</Loading></li>
		}

		else if (!showNoResults) {
			contents = map(this.state.results, ([term, courses]) =>
				<li key={term} className='course-group'>
					<p className='course-group-title'>{toPrettyTerm(term)}</p>
					<ul className='course-list'>
						{map(courses, (course, index) =>
							<li key={index}><Course info={course} student={this.props.student} /></li>)}
					</ul>
				</li>
			)
		}

		return (
			<div className={cx('search-sidebar', this.props.isHidden && 'is-hidden')}>
				<header className='sidebar-heading'>
					<input type='search' className='search-box'
						placeholder='Search Courses'
						defaultValue={this.state.query}
						onChange={this.onChange}
						onKeyDown={this.onKeyDown}
						autoFocus={true}
						ref='searchbox'
					/>
					<Button
						className='close-sidebar'
						title='Close Sidebar'
						type='flat'
						onClick={this.props.toggle}>
						<Icon name='ionicon-close' />
					</Button>
				</header>

				<ul className='term-list'>
					{contents}
				</ul>
			</div>
		)
	}
}
