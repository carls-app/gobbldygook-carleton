import {expect} from 'chai'
import proxyquire from 'proxyquire'
import demoStudent from '../../src/models/demo-student.json'
import size from 'lodash/collection/size'
import filter from 'lodash/collection/filter'
import pluck from 'lodash/collection/pluck'
import find from 'lodash/collection/find'
import stringify from 'json-stable-stringify'

describe('Student', () => {
	const {
		default: Student,
		addFabrication,
		removeFabrication,
		setOverride,
		removeOverride,
		addArea,
		removeArea,
		moveCourse,
		addSchedule,
		destroySchedule,
	} = proxyquire('../../src/models/student', {
		'./schedule': proxyquire('../../src/models/schedule', {
			'../lib/get-courses': () => Promise.resolve([]),
		}),
		'../lib/check-student-graduatability': () => Promise.resolve({}),
	})

	it('creates a unique ID for each new student without an ID prop', () => {
		let stu1 = new Student()
		let stu2 = new Student()
		expect(stu1.id).to.not.equal(stu2.id)
	})

	it('holds a student', () => {
		const stu = new Student(demoStudent)
		const json = JSON.parse(JSON.stringify(stu))

		expect(stu).to.exist
		expect(stu.id).to.exist
		expect(stu.matriculation).to.equal(2012)
		expect(stu.graduation).to.equal(2016)
		expect(stu.creditsNeeded).to.equal(35)
		expect(json.studies).to.deep.equal(demoStudent.studies)
		expect(json.schedules).to.deep.equal(demoStudent.schedules)
		expect(json.fabrications).to.deep.equal(demoStudent.fabrications)
		expect(json.settings).to.deep.equal(demoStudent.settings)
		expect(json.overrides).to.deep.equal(demoStudent.overrides)
	})

	it('can turn into JSON', () => {
		const stu = new Student(demoStudent)
		let result = stringify(stu)
		expect(result).to.be.ok
	})

	// fabrications
	it('supports adding fabrications', () => {
		const stu = new Student(demoStudent)
		let addedFabrication = addFabrication(stu, {id: 'a'})
		expect(addedFabrication.fabrications['a']).to.deep.equal({id: 'a'})
	})
	it('supports removing fabrications', () => {
		const stu = new Student(demoStudent)
		let addedFabrication = addFabrication(stu, {id: 'a'})
		let noMoreFabrication = removeFabrication(addedFabrication, 'a')
		expect(noMoreFabrication.fabrications.hasOwnProperty('a')).to.be.false
	})

	// overrides
	it('supports adding overrides', () => {
		const stu = new Student(demoStudent)
		let addedOverride = setOverride(stu, 'nothing', 'me!')
		expect(addedOverride.overrides['nothing']).to.equal('me!')
	})
	it('supports removing overrides', () => {
		const stu = new Student(demoStudent)
		let removedOverride = removeOverride(stu, 'credits.taken')
		expect(removedOverride.overrides['credits.taken']).to.not.exist
	})

	// areas
	it('supports adding areas', () => {
		const stu = new Student(demoStudent)
		let newArea = addArea(stu, {name: 'Exercise Science', type: 'major', revision: '2014-15', path: 'majors/exercise-science/2014-15'})
		expect(find(newArea.studies, {path: 'majors/exercise-science/2014-15'})).not.to.be.undefined
	})
	it('supports removing areas', () => {
		const stu = new Student(demoStudent)
		let noCsci = removeArea(stu, 'majors/computer-science/latest')
		expect(find(noCsci.studies, {path: 'majors/computer-science/latest'})).to.be.undefined
	})

	// Courses
	xit('returns only courses from active schedules', () => {
		const stu = new Student(demoStudent)
		// disabled until we can mock getCourses
		let courseCountFromActive = size(pluck(filter(demoStudent.schedules, 'active'), 'clbids'))
		stu.courses.then(courses => expect(courses.length).to.equal(courseCountFromActive))
	})
	xit('counts all credits currently scheduled', () => {
		const stu = new Student(demoStudent)
		// disabled until we can mock getCourses
		// plus, I'm not even sure how to check the result. lodash?
		stu.courseCredits.then(credits => expect(credits).to.be.ok)
	})
	it('supports moving courses between schedules in one-ish operation', () => {
		const stu = new Student(demoStudent)
		let movedCourse = moveCourse(stu, 1, 2, 82908)
		expect(movedCourse.schedules[1].clbids).to.not.include(82908)
		expect(movedCourse.schedules[2].clbids).to.include(82908)
	})

	// schedules
	it('supports adding schedules', () => {
		const stu = new Student(demoStudent)
		let newSchedule = addSchedule(stu, {id: 10912, title: 'a', active: false, clbids: [], index: 1, semester: 0, year: 0})
		expect(newSchedule.schedules[10912]).to.deep.equal({
			id: 10912,
			active: false,
			clbids: [],
			index: 1,
			semester: 0,
			title: 'a',
			year: 0,
		})
	})
	it('supports removing schedules', () => {
		const stu = new Student(demoStudent)
		let removedSchedule = destroySchedule(stu, 1)
		expect(removedSchedule.schedules[1]).to.be.undefined
	})
})
