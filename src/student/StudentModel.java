package student;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StudentModel {

	private String id = "";
	private String name = "";
	private String nickname = "";
	private String email = "";
	private String phone = "";
	private String company = "";
	private String apartment = "";
	private String title = "";
	private String ticketType = "";
	private String ticketPrice = "";
	private String receiptType = "";
	private String receiptCompanyName = "";
	private String fkCourseInfoId = "";
	private String receiptCompanyEIN = "";
	private String receiptEIN = "";
	private String teamMembers = "";
	private String comment = "";
	private String vegeMeat = "";
	private String timestamp = "";
	private String studentStatus = "";
	private String paymentStatus = "";
	private String receiptStatus = "";
	private String certificationImg = "";
	private String certificationPdf = "";
	private String certificationId = "";

	public String getCertificationImg() {
		return certificationImg;
	}

	public void setCertificationImg(String certificationImg) {
		this.certificationImg = certificationImg;
	}

	public String getCertificationPdf() {
		return certificationPdf;
	}

	public void setCertificationPdf(String certificationPdf) {
		this.certificationPdf = certificationPdf;
	}

	public String getCertificationId() {
		return certificationId;
	}

	public void setCertificationId(String certificationId) {
		this.certificationId = certificationId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getReceiptEIN() {
		return receiptEIN;
	}

	public void setReceiptEIN(String receiptEIN) {
		this.receiptEIN = receiptEIN;
	}

	public String getFkCourseInfoId() {
		return fkCourseInfoId;
	}

	public void setFkCourseInfoId(String fkCourseInfoId) {
		this.fkCourseInfoId = fkCourseInfoId;
	}

	public String getStudentStatus() {
		if (studentStatus.equals("")) {
			return "已報名";
		} else {
			return studentStatus;
		}

	}

	public void setStudentStatus(String studentStatus) {
		this.studentStatus = studentStatus;
	}

	public String getPaymentStatus() {
		if (paymentStatus.equals("")) {
			return "未繳費";
		} else {
			return paymentStatus;
		}

	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public String getReceiptStatus() {
		if (receiptStatus.equals("")) {
			return "未開立";
		} else {
			return receiptStatus;
		}

	}

	public void setReceiptStatus(String receiptStatus) {
		this.receiptStatus = receiptStatus;
	}

	public StudentModel() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {

		String phoneNumber = "";
		String phoneTemp = phone.replaceAll("-", "");

		if (phoneTemp.charAt(0) != '0') {
			phoneTemp = "0" + phoneTemp;
		}

		if (phoneTemp.length() == 9 || phoneTemp.length() == 10) {
			if (phoneTemp.substring(0, 2).equals("09") && phoneTemp.length() == 10) {
				phoneNumber = phoneTemp.substring(0, 4) + "-" + phoneTemp.substring(4, 7) + "-"
						+ phoneTemp.substring(7, 10);
			} else if (phoneTemp.substring(0, 2).equals("09")) {
				phoneNumber = phoneTemp;
			} else {
				int homeLength = phoneTemp.length();
				phoneNumber = String.format("(%s)%s-%s", phoneTemp.substring(0, 2),
						phoneTemp.substring(2, homeLength - 4), phoneTemp.substring(homeLength - 4, homeLength));
			}
		} else {
			phoneNumber = phoneTemp;
		}

		this.phone = phoneNumber;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getApartment() {
		return apartment;
	}

	public void setApartment(String apartment) {
		this.apartment = apartment;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTicketType() {
		return ticketType;
	}

	public void setTicketType(String ticketType) {
		this.ticketType = ticketType;
	}

	public String getReceiptType() {
		return receiptType;
	}

	public void setReceiptType(String receiptType) {
		this.receiptType = receiptType;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getVegeMeat() {
		return vegeMeat;
	}

	public void setVegeMeat(String vegeMeat) {
		this.vegeMeat = vegeMeat;
	}

	public String getReceiptCompanyName() {
		return receiptCompanyName;
	}

	public void setReceiptCompanyName(String receiptCompanyName) {
		this.receiptCompanyName = receiptCompanyName;
	}

	public String getReceiptCompanyEIN() {
		return receiptCompanyEIN;
	}

	public void setReceiptCompanyEIN(String receiptCompanyEIN) {
		this.receiptCompanyEIN = receiptCompanyEIN;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getTeamMembers() {
		return teamMembers;
	}

	public void setTeamMembers(String teamMembers) {
		this.teamMembers = teamMembers;
	}

	public String getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(String ticketPrice) {
		this.ticketPrice = ticketPrice;
	}

	public void setTicketTypeAndPrice(String ticketTypeAndPrice) {
		// String priceReg = "\\d+[,]*\\d+";
		String priceReg = "(\\d+,*)+";
		String ticketTypeReg = ".*[票|券]";

		String ticketType = "";
		String ticketPrice = "";

		Pattern pricePattern = Pattern.compile(priceReg);
		Pattern ticketPattern = Pattern.compile(ticketTypeReg);

		Matcher matcher = ticketPattern.matcher(ticketTypeAndPrice);

		if (matcher.find()) {
			ticketType = ticketTypeAndPrice.substring(matcher.start(), matcher.end());
			this.setTicketType(ticketType);
		}

		Matcher priceMatcher = pricePattern.matcher(ticketTypeAndPrice);

		if (priceMatcher.find()) {
			ticketPrice = ticketTypeAndPrice.substring(priceMatcher.start(), priceMatcher.end());
			// System.out.println(ticketPrice);
			this.setTicketPrice(ticketPrice);
		}
	}

	public void setReceiptCommpanyTitleAndEIN(String companyTitleAndEIN) {
		String companyEINReg = "(\\d+,*)+";
		String companyTitleReg = ".*[\\s]";

		String companyEIN = "";
		String companyTitle = "";

		Pattern EINPattern = Pattern.compile(companyEINReg);
		Pattern TitlePattern = Pattern.compile(companyTitleReg);

		Matcher tMatcher = TitlePattern.matcher(companyTitleAndEIN);

		if (tMatcher.find()) {
			companyTitle = companyTitleAndEIN.substring(tMatcher.start(), tMatcher.end());
			this.setReceiptCompanyName(companyTitle);
		}

		Matcher eMatcher = EINPattern.matcher(companyTitleAndEIN);

		if (eMatcher.find()) {
			companyEIN = companyTitleAndEIN.substring(eMatcher.start(), eMatcher.end());
			this.setReceiptCompanyEIN(companyEIN);
		}
	}

}
