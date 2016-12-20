package mailSending;

public class ClassInfomation {
	private String className_;
	private StudentInfomation studentInfomation_;

	public ClassInfomation(String className) {
		this.className_ = className;
		studentInfomation_ = new StudentInfomation();
	}

	public ClassInfomation clone() {
		ClassInfomation cloneObject = new ClassInfomation(this.className_);
		cloneObject.studentInfomation_ = studentInfomation_.clone();
		return cloneObject;
	}

//	public void addStudent(String studentName) {
//		studentInfomation_.add(studentName);
//	}

	public String getClassName() {
		return className_;
	}

	public StudentInfomation getStudentsInfomation() {
		return studentInfomation_;
	}
}
