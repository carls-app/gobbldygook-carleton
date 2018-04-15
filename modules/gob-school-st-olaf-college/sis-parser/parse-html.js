// @flow
'use strict'
import htmlparser from 'htmlparser2'

export function parseHtml(string: string) {
	return htmlparser.parseDOM(string, {
		withDomLvl1: true,
		normalizeWhitespace: false,
		xmlMode: false,
		decodeEntities: true,
	})
}
