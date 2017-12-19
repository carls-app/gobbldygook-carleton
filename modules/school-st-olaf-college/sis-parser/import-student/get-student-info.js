'use strict'
const props = require('p-props')
const flatten = require('lodash/flatten')
const {AuthError, NetworkError} = require('../../../lib')
const {fetchHtml} = require('./lib')
const {extractTermList} = require('./term-list')
const {collectAllCourses} = require('./courses')
const {getGraduationInformation} = require('./graduation-info')
const {COURSES_URL, DEGREE_AUDIT_URL} = require('./urls')

function loadPages(studentId) {
    return props({
        id: studentId,
        coursesDom: fetchHtml(COURSES_URL),
        auditDom: fetchHtml(DEGREE_AUDIT_URL),
    })
}

function beginDataExtraction({id, coursesDom, auditDom}) {
    let terms = extractTermList(coursesDom)

    return props({
        coursesByTerm: collectAllCourses(id, terms),
        studentInfo: getGraduationInformation(auditDom),
    })
}

function flattenData({coursesByTerm, studentInfo}) {
    return {
        courses: flatten(coursesByTerm),
        degrees: studentInfo,
    }
}

module.exports.getStudentInfo = getStudentInfo
function getStudentInfo(studentId) {
    if (!navigator.onLine) {
        return Promise.reject(new NetworkError('The network is offline.'))
    }

    return loadPages(studentId)
        .then(beginDataExtraction)
        .then(flattenData)
        .catch(err => {
            if (err instanceof AuthError) {
                throw new AuthError('Could not log in to the SIS.')
            }
            if (err instanceof NetworkError) {
                throw new NetworkError('Could not reach the SIS.')
            }
            throw err
        })
}
