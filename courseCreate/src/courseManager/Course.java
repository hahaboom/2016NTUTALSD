package courseManager;

import java.util.ArrayList;
import java.util.List;

public class Course {
	private String courseId_;
	private String courseName_;
	private String courseCode_;
	private String type_;
	private String batch_;
	private List<String> dates_ = new ArrayList<String>();
	private int duration_;
	private List<String> ticketTypes_ = new ArrayList<String>();
	private List<Integer> prices_ = new ArrayList<Integer>();
	private String location_;
	private String lecturer_;
	private String status_;
	private List<String> ccAddresses_ = new ArrayList<String>();
	private String hyperlink_;
	private int studentNum_ = 0;

	public Course(String id) {
		courseId_ = id;
	};

	public Course clone() {
		Course cloneObject = new Course(courseId_);
		cloneObject.courseName_ = courseName_;
		cloneObject.courseCode_ = courseCode_;
		cloneObject.type_ = type_;
		cloneObject.batch_ = batch_;
		cloneObject.dates_.addAll(dates_);
		cloneObject.duration_ = duration_;
		cloneObject.ticketTypes_.addAll(ticketTypes_);
		cloneObject.prices_.addAll(prices_);
		cloneObject.location_ = location_;
		cloneObject.lecturer_ = lecturer_;
		cloneObject.status_ = status_;
		cloneObject.ccAddresses_.addAll(ccAddresses_);
		cloneObject.hyperlink_ = hyperlink_;
		return cloneObject;
	}

	public void setCourseName(String courseName) {
		courseName_ = courseName;
	}

	public void setCourseCode(String courseCode) {
		courseCode_ = courseCode;
	}

	public void setType(String type) {
		type_ = type;
	}

	public void setBatch(String batch) {
		batch_ = batch;
	}

	public void addDate(String date) {
		dates_.add(date);
	}

	public void deleteDate(int index) {
		dates_.remove(index);
	}

	public void setDuration(int duration) {
		duration_ = duration;
	}

	public void addTicketType(String ticketType) {
		ticketTypes_.add(ticketType);
	}

	public void deleteTicketType(int index) {
		ticketTypes_.remove(index);
	}

	public void addPrice(int price) {
		prices_.add(price);
	}

	public void deletePrice(int index) {
		prices_.remove(index);
	}

	public void setLocation(String location) {
		location_ = location;
	}

	public void setLecturer(String lecturer) {
		lecturer_ = lecturer;
	}

	public void setStatus(String status) {
		status_ = status;
	}

	public void addCcAddresses(String ccAddress) {
		ccAddresses_.add(ccAddress);
	}

	public void deleteCcAddresses(int index) {
		ccAddresses_.remove(index);
	}

	public void setHyperlink(String hyperlink) {
		hyperlink_ = hyperlink;
	}

	public void setStudentNum(int studentNum) {
		this.studentNum_ = studentNum;
	}

	public String getCourseId() {
		return courseId_;
	}

	public String getCourseName() {
		return courseName_;
	}

	public int getStudentNum() {
		return studentNum_;
	}

	public String getCourseCode() {
		return courseCode_;
	}

	public String getType() {
		return type_;
	}

	public String getBatch() {
		return batch_;
	}

	public List<String> getDates() {
		return dates_;
	}

	public int getDuration() {
		return duration_;
	}

	public List<String> getTicketTypes() {
		return ticketTypes_;
	}

	public List<Integer> getPrices() {
		return prices_;
	}

	public String getLocation() {
		return location_;
	}

	public String getLecturer() {
		return lecturer_;
	}

	public String getStatus() {
		return status_;
	}

	public List<String> getCcAddresses() {
		return ccAddresses_;
	}

	public String getHyperlink() {
		return hyperlink_;
	}
}