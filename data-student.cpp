#include "data-student.hpp"
using namespace std;


Semester::Semester() {
	period = 0;
}
Semester::Semester(int p) {
	period = p;
}

void Student::init(string n, int s, int g, string m) {
	name = n;
	startingYear = s;
	gradutationYear = g;
	parseMajors(m);
}

Student::Student() {
	init("", 2000, 2004, "");
}
Student::Student(string n, string s, string e, string m) {
	int startYear = stringToInt(s), endYear = stringToInt(e);
	init(n, startYear, endYear, m);
}
Student::Student(string fn) {
	ifstream infile;
	infile.open(fn.c_str());
}

void Student::parseMajors(string str) {
	vector<string> record = split(str, ',');
	for (vector<string>::iterator i = record.begin(); i != record.end(); ++i) {
		string str = removeStartingText(*i, " ");
		Major m = Major(str);
		majors.push_back(m);
	}
}

bool Student::hasTakenCourse() {
	return false;
}

void Student::addCourse(const Course& c) {
	// cout << "Hi! I'm addCourse (not courses!!)!" << endl;
	courses.push_back(c);
	// cout << courses.at(courses.size()-1) << endl;
}

void Student::addCourses(string str) {
	// cout << "Hi! I'm addCourses!" << endl;
	vector<string> record = split(str, ',');
	for (vector<string>::iterator i = record.begin(); i != record.end(); ++i) {
		// cout << *i << endl;
		Course c = Course(*i);
		addCourse(c);
	}
}

ostream& Student::getData(ostream &os) {
	os << name << ", ";
	os << "you are majoring in ";
	for (vector<Major>::iterator i = majors.begin(); i != majors.end(); ++i){
		if (i!=majors.end()-1)
			os << *i << ", ";
		else 
			os << "and "<< *i;
	}
	os << ", while taking:" << endl;
	for (vector<Course>::iterator i = courses.begin(); i != courses.end(); ++i)
		os << *i << endl;
	return os;
}
void Student::display() {
	cout << *this << endl;
};
ostream& operator<<(ostream& os, Student& item) {
	os << item.getData(os);
	return os;
}
