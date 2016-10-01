/* globals __dirname */

import {expect} from 'chai'
import {
	extractTermList,
	extractStudentIds,
	getCoursesFromHtml,
	getGraduationInformation,
} from '../import-student'

import {parseHtml} from '../parse-html'
import fs from 'fs'
import path from 'path'
const file = filename => fs.readFileSync(path.join(__dirname, `./_support/import-student.${filename}.html`))

describe('extractTermList', () => {
	it('returns the list of terms', () => {
		const html = parseHtml(file('term-20151'))
		const actual = extractTermList(html)
		const expected = [20153, 20152, 20151, 20143, 20142, 20141, 20133, 20132, 20131, 20123, 20122, 20121, 20119]
		expect(actual).to.deep.equal(expected)
	})
})

describe('extractStudentIds', () => {
	it('returns the student id', () => {
		const html = parseHtml(file('term-20151'))
		const actual = extractStudentIds(html)
		const expected = [101010]
		expect(actual).to.deep.equal(expected)
	})

	it(`returns an empty list if no student ids were found`, () => {
		const html = parseHtml('<html />')
		const actual = extractStudentIds(html)
		const expected = []
		expect(actual).to.deep.equal(expected)
	})
})

describe('getCoursesFromHtml', () => {
	it('returns the list of courses', () => {
		const html = parseHtml(file('term-20151'))
		const actual = getCoursesFromHtml(html, 20151)
		const expected = [
			{
				term: 20151,
				clbid: 102748,
				deptnum: 'CSCI 273',
				lab: false,
				name: 'Operating Systems',
				credits: 1,
				gradetype: 'Graded',
				gereqs: [],
				times: ['T 0935-1100', 'Th 0930-1050'],
				locations: ['RNS 203', 'RNS 203'],
				instructors: ['Brown, Richard'],
			},
			{
				term: 20151,
				clbid: 100423,
				deptnum: 'CSCI 390A',
				lab: false,
				name: 'Sem: Senior Capstone',
				credits: 1,
				gradetype: 'Graded',
				gereqs: ['WRI'],
				times: ['MWF 0905-1000'],
				locations: ['RMS 201'],
				instructors: ['Advisor, Name O.'],
			},
			{
				term: 20151,
				clbid: 100346,
				deptnum: 'DANCE 115',
				lab: false,
				name: 'Power Play',
				credits: 0.25,
				gradetype: 'P/N',
				gereqs: ['SPM'],
				times: ['T 1145-0110PM', 'Th 1245-0205PM'],
				locations: ['DC Studio 3', 'DC Studio 3'],
				instructors: ['Saterstrom, Sheryl'],
			},
			{
				term: 20151,
				clbid: 103276,
				deptnum: 'HIST 237',
				lab: false,
				name: 'Women/Medieval Europe',
				credits: 1,
				gradetype: 'Graded',
				gereqs: ['HWC'],
				times: ['MWF 1045-1140'],
				locations: ['RNS 190'],
				instructors: ['Mummey, Kevin'],
			},
			{
				term: 20151,
				clbid: 99504,
				deptnum: 'JAPAN 301',
				lab: false,
				name: 'Advanced Japanese I',
				credits: 1,
				gradetype: 'Audit',
				gereqs: ['FOL-J'],
				times: ['MWF 1150-1245PM'],
				locations: ['TOH 300'],
				instructors: ['Akimoto, Hiroe'],
			},
		]
		expect(actual).to.deep.equal(expected)
	})
})

describe('getGraduationInformation', () => {
	it('extracts information about the degrees', () => {
		const html = parseHtml(file('degree-audit'))
		const actual = getGraduationInformation(html)
		const expected = [
			{
				'name': 'Student M. Name',
				'advisor': 'Advisor, Name O.',
				'academic standing': 'Good',
				'degree': 'Bachelor of Arts',
				'majors': ['Computer Science', 'Asian Studies'],
				'concentrations': ['Japan Studies'],
				'emphases': [],
				'matriculation': 2012,
				'graduation': 2016,
			},
		]
		expect(actual).to.deep.equal(expected)
	})
})
