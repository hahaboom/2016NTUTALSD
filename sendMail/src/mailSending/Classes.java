package mailSending;

import java.util.ArrayList;

public class Classes {
	private ArrayList<ClassInfomation> classes_ = new ArrayList<ClassInfomation>();

	public Classes(){
		//generate fake data
		ClassInfomation firstClass=new ClassInfomation("Scurm敏捷方法實作班");
		ClassInfomation secondClass=new ClassInfomation("軟體重構入門實作班");
		ClassInfomation thirdClass=new ClassInfomation("Design Patterns這樣學就會了–入門實作班");
		
		firstClass.getStudentsInfomation().generateFakeDataOne();
		secondClass.getStudentsInfomation().generateFakeDataTwo();
		thirdClass.getStudentsInfomation().generateFakeDataThree();
		
		classes_.add(firstClass);
		classes_.add(secondClass);
		classes_.add(thirdClass);
	}
	
	public Classes clone(){
		Classes cloneObject = new Classes();
		for(int i=0;i<classes_.size();i++){
			cloneObject.addClass(classes_.get(i));
		}
		return cloneObject;
	}

	public void addClass(ClassInfomation classInfomation) {
		classes_.add(classInfomation);
	}

	public ArrayList<ClassInfomation> getClasses() {
		return classes_;
	}
}
