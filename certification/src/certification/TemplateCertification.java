package certification;

import java.awt.Point;

public class TemplateCertification {
	private int idTextSize_ = 0;
	private int ownerTextSize_ = 0;
	private int dateTextSize_=0;
	private int courceDateTextSize_ = 0;
	private int courceNameTextSize_ = 0;
	private int courceDurationSize_ = 0;
	private int participateSize_=0;
	private Point idLocation_ = new Point(0, 0);
	private Point ownerLocation_ = new Point(0, 0);
	private Point dateLocation_=new Point(0,0);
	private Point courceDateLocation_ = new Point(0, 0);
	private Point courceNameLocation1_ = new Point(0, 0);
	private Point courceNameLocation2_ = new Point(0, 0);
	private Point courceDurationLocation_ = new Point(0, 0);
	private Point participateLocation_ = new Point(0, 0);
	
	public TemplateCertification() {
	}

	@Override
	public TemplateCertification clone() {
		TemplateCertification cloneObject = new TemplateCertification();
		cloneObject.setIdLocation(this.getIdLocation());
		cloneObject.setOwnerLocation(this.getOwnerLocation());
		cloneObject.setIdTextSize(this.getIdTextSize());
		cloneObject.setOwnerTextSize(this.getOwnerTextSize());
		return cloneObject;
	}

	public void setIdTextSize(int idTextSize) {
		idTextSize_ = idTextSize;
	}

	public void setOwnerTextSize(int ownerTextSize) {
		ownerTextSize_ = ownerTextSize;
	}

	public void setDateTextSize(int dateTextSize) {
		dateTextSize_ = dateTextSize;
	}
	
	public void setCourceDateTextSize(int courceDateTextSize) {
		courceDateTextSize_ = courceDateTextSize;
	}

	public void setCourceNameTextSize(int courceNameTextSize) {
		courceNameTextSize_ = courceNameTextSize;
	}

	public void setCourceDurationSize(int courceDurationSize) {
		courceDurationSize_ = courceDurationSize;
	}
	
	public void setParticipateSize(int participateSize)
	{
		participateSize_=participateSize;
	}

	public void setIdLocation(Point location) {
		idLocation_ = (Point) location.clone();
	}

	public void setOwnerLocation(Point location) {
		ownerLocation_ = (Point) location.clone();
	}

	public void setDateLocation(Point location) {
		dateLocation_ = (Point) location.clone();
	}

	public void setCourceDateLocation(Point location) {
		courceDateLocation_ = (Point) location.clone();
	}

	public void setCourceNameLocation1(Point location) {
		courceNameLocation1_ = (Point) location.clone();
	}

	public void setCourceNameLocation2(Point location) {
		courceNameLocation2_ = (Point) location.clone();
	}

	public void setCourceDurationLocation(Point location) {
		courceDurationLocation_ = (Point) location.clone();
	}
	
	public void setParticipateLocation(Point location)
	{
		participateLocation_ = (Point) location.clone();
	}

	public Point getIdLocation() {
		return (Point) idLocation_.clone();
	}

	public Point getOwnerLocation() {
		return (Point) ownerLocation_.clone();
	}

	public Point getDateLocation() {
		return (Point) dateLocation_.clone();
	}
		
	public Point getCourceDateLocation() {
		return (Point) courceDateLocation_.clone();
	}

	public Point getCourceNameLocation1() {
		return (Point) courceNameLocation1_.clone();
	}
	
	public Point getCourceNameLocation2() {
		return (Point) courceNameLocation2_.clone();
	}

	public Point getCourceDurationLocation() {
		return (Point) courceDurationLocation_.clone();
	}
	
	public Point getParticipateLocation()
	{
		return (Point) participateLocation_.clone();
	}

	public int getIdTextSize() {
		return idTextSize_;
	}

	public int getOwnerTextSize() {
		return ownerTextSize_;
	}

	public int getDateTextSize() {
		return dateTextSize_;
	}

	public int getCourceDateTextSize() {
		return courceDateTextSize_;
	}

	public int getCourceNameTextSize() {
		return courceNameTextSize_;
	}

	public int getCourceDurationSize() {
		return courceDurationSize_;
	}

	public int getParticipateSize() {
		return participateSize_;
	}
}
