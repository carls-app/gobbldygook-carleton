import '6to5/polyfill'
import 'fetch'

import * as Promise from 'bluebird'
Promise.longStackTraces()

import * as Router from 'react-router'

import * as React from 'react'
React.initializeTouchEvents(true)

import * as _ from 'lodash'

import 'helpers/db'


// Just for use in the browser console, I swear.
window.lodash = _

// Stick React where I (and the Chrome devtools)
// [ok, mostly for the devtools] can see it.
window.React = React

// Handy debugging function
window.log = (...args) => console.log(args)


import Gobbldygook from 'elements/app'
import StudentList from 'elements/studentList'
import Student from 'elements/student'
import CourseTable from 'elements/courseTable'
import SemesterDetail from 'elements/semesterDetail'

let Route = React.createFactory(Router.Route)
let DefaultRoute = React.createFactory(Router.DefaultRoute)

// /
// /s/122932
// /s/122932/overview?sections=d-ba,m-csci
// /s/122932/overview?search
// /s/122932/sem/2014/fall?search=dept: AMCON

let routes = (
	Route({handler: Gobbldygook, name: 'gobbldygook', path: '/'},
		DefaultRoute({handler: StudentList}),
		Route({handler: Student, name: 'student', path: 's/:id'},
			DefaultRoute({handler: CourseTable, path: 'overview'}),
			Route({handler: SemesterDetail, name: 'Semester', path: 'sem/:year/:semester'}))
	)
)


// run it
console.log('3. 2.. 1... Blastoff!')
Router.run(routes, (Handler) => React.render(React.createElement(Handler), document.body))
