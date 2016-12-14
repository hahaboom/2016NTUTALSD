package mailSending;

import java.util.ArrayList;
import java.util.List;

public class StudentInfomation {
	private ArrayList<String> studentsName_;
	private ArrayList<String> mailAddresses_;

	public StudentInfomation() {
		studentsName_ = new ArrayList<String>();
		mailAddresses_ = new ArrayList<String>();
	}

	public StudentInfomation clone() {
		StudentInfomation cloneObject = new StudentInfomation();
		cloneObject.studentsName_ = new ArrayList<String>();
		cloneObject.mailAddresses_ = new ArrayList<String>();
		for (int i = 0; i < this.studentsName_.size(); i++)
			cloneObject.studentsName_.add(this.studentsName_.get(i));
		for (int i = 0; i < this.mailAddresses_.size(); i++)
			cloneObject.mailAddresses_.add(this.mailAddresses_.get(i));

		return cloneObject;
	}

	public void setStudents() {
		// set data form DB
	}

	public void setMailAddress() {
		// set data form DB
	}

	public List<String> getStudents() {
		return studentsName_;
	}

	public List<String> getMailAddress() {
		return mailAddresses_;
	}

	public void generateFakeDataOne() {
		studentsName_.add("Alice");
		studentsName_.add("Bob");
		studentsName_.add("Chris");
		studentsName_.add("David");
		studentsName_.add("Edison");
		studentsName_.add("Frank");
		studentsName_.add("George");
		studentsName_.add("Harry");
		studentsName_.add("Ivan");
		studentsName_.add("Jack");

		studentsName_.add("Kevin");
		studentsName_.add("Lee");
		studentsName_.add("Mark");
		studentsName_.add("Nick");
		studentsName_.add("Oliver");
		studentsName_.add("Pandora");
		studentsName_.add("Queena");
		studentsName_.add("Ray");
		studentsName_.add("Sam");
		studentsName_.add("Ted");

		studentsName_.add("Ultraman");
		studentsName_.add("Victor");
		studentsName_.add("William");
		studentsName_.add("Xenia");
		studentsName_.add("Yolanda");
		studentsName_.add("Zack");
		studentsName_.add("Alicia");
		studentsName_.add("Betty");
		studentsName_.add("Charlotte");
		studentsName_.add("Doris");

		mailAddresses_.add("Alice@gmail.com");
		mailAddresses_.add("Bob@clarence.party");
		mailAddresses_.add("Chris@clarence.party");
		mailAddresses_.add("David@clarence.party");
		mailAddresses_.add("Edison@clarence.party");
		mailAddresses_.add("Frank@clarence.party");
		mailAddresses_.add("George@clarence.party");
		mailAddresses_.add("Harry@clarence.party");
		mailAddresses_.add("Ivan@clarence.party");
		mailAddresses_.add("Jack@clarence.party");

		mailAddresses_.add("Kevin@clarence.party");
		mailAddresses_.add("Lee@clarence.party");
		mailAddresses_.add("Mark@clarence.party");
		mailAddresses_.add("Nick@clarence.party");
		mailAddresses_.add("Oliver@clarence.party");
		mailAddresses_.add("Pandora@clarence.party");
		mailAddresses_.add("Queena@clarence.party");
		mailAddresses_.add("Ray@clarence.party");
		mailAddresses_.add("Sam@clarence.party");
		mailAddresses_.add("Ted@clarence.party");

		mailAddresses_.add("Ultraman@clarence.party ");
		mailAddresses_.add("Victor@clarence.party");
		mailAddresses_.add("William@clarence.party");
		mailAddresses_.add("Xenia@clarence.party");
		mailAddresses_.add("Yolanda@clarence.party");
		mailAddresses_.add("Zack@clarence.party");
		mailAddresses_.add("Alicia@clarence.party");
		mailAddresses_.add("Betty@clarence.party");
		mailAddresses_.add("Charlotte@clarence.party");
		mailAddresses_.add("Doris@clarence.party");
	}

	public void generateFakeDataTwo() {
		studentsName_.add("Alice");
		studentsName_.add("Bob");
		studentsName_.add("Chris");
		studentsName_.add("David");
		studentsName_.add("Edison");
		studentsName_.add("Frank");
		studentsName_.add("George");
		studentsName_.add("Harry");
		studentsName_.add("Ivan");
		studentsName_.add("Jack");

		studentsName_.add("Kevin");
		studentsName_.add("Lee");
		studentsName_.add("Mark");
		studentsName_.add("Nick");
		studentsName_.add("Oliver");
		studentsName_.add("Pandora");
		studentsName_.add("Queena");
		studentsName_.add("Ray");
		studentsName_.add("Sam");
		studentsName_.add("Ted");

		mailAddresses_.add("Alice@clarence.party");
		mailAddresses_.add("Bob@clarence.party");
		mailAddresses_.add("Chris@clarence.party");
		mailAddresses_.add("David@clarence.party");
		mailAddresses_.add("Edison@clarence.party");
		mailAddresses_.add("Frank@clarence.party");
		mailAddresses_.add("George@clarence.party");
		mailAddresses_.add("Harry@clarence.party");
		mailAddresses_.add("Ivan@clarence.party");
		mailAddresses_.add("Jack@clarence.party");

		mailAddresses_.add("Kevin@clarence.party");
		mailAddresses_.add("Lee@clarence.party");
		mailAddresses_.add("Mark@clarence.party");
		mailAddresses_.add("Nick@clarence.party");
		mailAddresses_.add("Oliver@clarence.party");
		mailAddresses_.add("Pandora@clarence.party");
		mailAddresses_.add("Queena@clarence.party");
		mailAddresses_.add("Ray@clarence.party");
		mailAddresses_.add("Sam@clarence.party");
		mailAddresses_.add("Ted@clarence.party");
	}

	public void generateFakeDataThree() {
		studentsName_.add("Alice");
		studentsName_.add("Bob");
		studentsName_.add("Chris");
		studentsName_.add("David");
		studentsName_.add("Edison");
		studentsName_.add("Frank");
		studentsName_.add("George");
		studentsName_.add("Harry");
		studentsName_.add("Ivan");
		studentsName_.add("Jack");

		mailAddresses_.add("Alice@clarence.party");
		mailAddresses_.add("Bob@clarence.party");
		mailAddresses_.add("Chris@clarence.party");
		mailAddresses_.add("David@clarence.party");
		mailAddresses_.add("Edison@clarence.party");
		mailAddresses_.add("Frank@clarence.party");
		mailAddresses_.add("George@clarence.party");
		mailAddresses_.add("Harry@clarence.party");
		mailAddresses_.add("Ivan@clarence.party");
		mailAddresses_.add("Jack@clarence.party");
	}
}
