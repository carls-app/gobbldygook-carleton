// apply global overrides stuff here
global.Promise = require('bluebird')
require('babel-runtime/core-js/promise').default = require('bluebird')

// handle promise errors
const throwError = e => {
	e.preventDefault()
	console.warn(e)
}

if (typeof window !== 'undefined') {
	window.addEventListener('unhandledrejection', throwError)
}
