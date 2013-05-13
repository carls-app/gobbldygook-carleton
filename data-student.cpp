#include "data-student.hpp"
using namespace std;

void Student::init(string n, int s, int g, string m) {
	name = n;
	startingYear = s;
	gradutationYear = g;
	addMajors(m);
}

Student::Student() {
	init("", 2000, 2004, "");
}
Student::Student(string n, string s, string e, string m) {
	int startYear = stringToInt(s), endYear = stringToInt(e);
	init(n, startYear, endYear, m);
}

Student::Student(string fn) {
	string yearS, yearE;
	ifstream infile(fn.c_str());
	string nextLine;
	vector<string> lines;

	// load the entire file
	while (infile.peek() != -1) {
		getline(infile, nextLine);
		lines.push_back(nextLine);
	}

	string previousHeading;
	for (vector<string>::iterator i = lines.begin(); i != lines.end(); ++i) {
		string str = *i;
		if (str[0] == '#') {
			previousHeading = *i;
			continue;
		}
		else if (str != "") {
			if (previousHeading == "# NAME")
				name = str;
			else if (previousHeading == "# MAJORS")
				addMajor(Major(str));
			else if (previousHeading == "# CONCENTRATIONS")
				addConcentration(Concentration(str));
			else if (previousHeading == "# COURSES")
				addCourse(Course(str));
			else if (previousHeading == "# LABS")
				addCourse(Course(str));
		}
	}
}

void Student::addMajor(const Major& m) {
	majors.push_back(m);
}

void Student::addMajors(string str) {
	vector<string> record = split(str, ',');
	for (vector<string>::iterator i = record.begin(); i != record.end(); ++i)
		addMajor(Major(*i));
}

void Student::addConcentration(const Concentration& m) {
	concentrations.push_back(m);
}

void Student::addConcentrations(string str) {
	vector<string> record = split(str, ',');
	for (vector<string>::iterator i = record.begin(); i != record.end(); ++i)
		addConcentration(Concentration(*i));
}

void Student::addCourse(const Course& c) {
	courses.push_back(c);
}

void Student::addCourses(string str) {
	vector<string> record = split(str, ',');
	for (vector<string>::iterator i = record.begin(); i != record.end(); ++i)
		addCourse(Course(*i));
}

bool Student::hasTakenCourse(string str) {
	bool userHasTaken = false;
	Course checkAgainst = getCourse(str);
	for (std::vector<Course>::iterator i = courses.begin(); i != courses.end(); ++i)
		if (*i == checkAgainst)
			userHasTaken = true;
	return userHasTaken;
}

ostream& Student::getData(ostream &os) {
	os << name << ", you are majoring in ";
	
	for (vector<Major>::iterator i = majors.begin(); i != majors.end(); ++i){
		if (majors.size() == 2) {
			os << *i;
			if (i != majors.end()-1)
				os << " and ";
			else
				os << " ";
		}
		else {
			if (i != majors.end()-1)
				os << *i << ", ";
			else 
				os << "and " << *i << ", ";
		}
	}
	
	os << "with concentrations in ";
	
	for (vector<Concentration>::iterator i = concentrations.begin(); i != concentrations.end(); ++i) {
		if (concentrations.size() == 2) {
			os << *i;
			if (i != concentrations.end()-1)
				os << " and ";
			else
				os << " ";
		}
		else {
			if (i != concentrations.end()-1)
				os << *i << ", ";
			else
				os << "and " << *i << ", ";
		}
	}

	os << "while taking:" << endl;
	for (vector<Course>::iterator i = courses.begin(); i != courses.end(); ++i)
		os << *i << endl;

	return os;
}

void Student::display() {
	cout << *this << endl;
};

ostream& operator<<(ostream& os, Student& item) {
	return item.getData(os);
}
