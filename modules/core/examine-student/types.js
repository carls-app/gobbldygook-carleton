// @flow

export type OverridesPath = string[]
export type OverridesObject = {[key: string]: any}
export type FulfillmentsPath = OverridesPath
export type FulfillmentsObject = OverridesObject

export type AreaOfStudy = Requirement & {
	name: string,
	type: 'degree' | 'major' | 'concentration' | 'emphasis',
}

export type Fulfillment = { }

export type Filter = FilterExpression

export type Requirement = {
	$type: 'requirement',
	result: Expression,
	filter: Filter,
	computed: boolean,
	overridden?: boolean,
	'children share courses'?: boolean,
}

export type clbidT = number
export type crsidT = number

export type CourseType = 'Research' | 'FLAC'

export type Course = {
	clbid: number,
	credits: number,
	crsid: number,
	department: string[],
	gereqs: string[],
	groupid: number,
	level: number,
	name: string,
	number: number,
	pf: boolean,
	semester: number,
	type: CourseType,
	year: number,
}

export type Counter = {
	$operator: '$gte' | '$lte' | '$eq',
	$num: number,
	$was?: 'all' | 'any' | 'none',
}

type Operator = '$lte' | '$lt' | '$eq' | '$gte' | '$gt' | '$ne'

// type NotExpression = BaseExpression & {$type: 'not', $not: Expression[]}
type BaseBooleanExpression = {$type: 'boolean'}
type AndExpression = BaseBooleanExpression & {$and: Expression[]}
type OrExpression = BaseBooleanExpression & {$or: Expression[]}
type BooleanExpression = AndExpression | OrExpression

export type CourseExpression = {
	$type: 'course',
	$course: Course,
}

type QualificationFunctionValue = {
	$type: 'function',
	$name: string,
	$prop: string,
	_computed_value: any,
}
type QualificationStaticValue = number | string
export type QualificationBooleanOrValue = {$type: 'boolean', $or: QualificationStaticValue[]}
export type QualificationBooleanAndValue = {$type: 'boolean', $and: QualificationStaticValue[]}
export type QualificationBooleanValue = QualificationBooleanOrValue | QualificationBooleanAndValue

type QualificationValue = QualificationFunctionValue | QualificationBooleanValue | QualificationStaticValue

export type UntypedQualificationExpression = {
	$key: string,
	$operator: Operator,
	$value: QualificationValue,
}
export type QualificationExpression = {$type: 'qualification'} & UntypedQualificationExpression


type ModifierFilterExpression = {
	$from: 'filter',
}
type ModifierFilterWhereExpression = {
	$from: 'filter-where',
	$where: QualificationExpression,
}
type ModifierChildrenExpression = {
	$from: 'children',
	$children: '$all' | ReferenceExpression[],
}
type ModifierChildrenWhereExpression = {
	$from: 'children-where',
	$children: '$all' | ReferenceExpression[],
	$where: QualificationExpression,
}
type ModifierWhereExpression = {
	$from: 'where',
	$where: QualificationExpression,
}
type ModifiedModifierExpression =
	ModifierWhereExpression |
	ModifierFilterExpression |
	ModifierFilterWhereExpression |
	ModifierChildrenExpression |
	ModifierChildrenWhereExpression

type ModifierExpression = ModifiedModifierExpression & {
	$type: 'modifier',
	$count: Counter,
	$what: 'course' | 'credit' | 'department',
	$besides: CourseExpression,
}

type OccurrenceExpression = {
	$type: 'occurrence',
	$count: Counter,
	$course: CourseExpression,
}

type OfExpression = {
	$type: 'of',
	$count: Counter,
	$of: Expression[],
}

type ReferenceExpression = {
	$type: 'reference',
	$requirement: string,
}

type FilterWhereExpression = {
	$where: QualificationExpression,
}
type FilterOfExpression = {
	$of: Expression,
}
type FilterExpression = (FilterOfExpression | FilterWhereExpression) & {
	$type: 'filter',
	$distinct: boolean,
}

type WhereExpression = {
	$type: 'where',
	$where: QualificationExpression,
	$count: Counter,
	$distinct: boolean,
}

export type Expression = BooleanExpression
	| CourseExpression
	| ModifierExpression
	| OccurrenceExpression
	| OfExpression
	| ReferenceExpression
	| FilterExpression
	| WhereExpression

export type EvaluatedExpression = Expression & {
	_matches: Course[],
	_result: boolean,
}
