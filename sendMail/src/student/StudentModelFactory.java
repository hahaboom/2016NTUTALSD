package student;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class StudentModelFactory {
	private final String INDEX_NAME = "name";
	private final String INDEX_EMAIL = "email";
	private final String INDEX_PHONE = "phone";
	private final String INDEX_COMPANY = "company";
	private final String INDEX_APARTMENT = "apartment";
	private final String INDEX_TITLE = "title";
	private final String INDEX_NICKNAME = "nickname";
	private final String INDEX_VEGE_MEAT = "vegeMeat";
	private final String INDEX_RECEIPT_TYPE = "receiptType";
	private final String INDEX_RECEIPT_COMPANY_NAME_AND_EIN = "receiptCompanyNameAndEIN";
	private final String INDEX_TICKET_TYPE = "ticketType";
	private final String INDEX_TEAM_MEMBERS = "teamMembers";
	private final String INDEX_COMMENT = "comment";
	private final String INDEX_TIMESTAMP = "timestamp";
	private final String INDEX_PAYMENT_STATUS = "paymentStatus";

	private String courseId = "";
	private Map<String, String> fieldChange;
	private Map<String, Integer> nameIndexMap = new HashMap<String, Integer>();
	private ArrayList<StudentModel> studentArray;
	private Workbook workbook;
	private Sheet firstSheet;

	public StudentModelFactory(InputStream studentExcelFileInputStream, String courseId) throws Exception {
		// final String DATE_FORMAT_NOW = "yyyy-MM-dd HH:mm:ss";
		// Calendar cal = Calendar.getInstance();
		// SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_NOW);
		this.courseId = courseId;
		setFieldMap();
		workbook = new XSSFWorkbook(studentExcelFileInputStream);
		firstSheet = workbook.getSheetAt(0);

		Row row = firstSheet.getRow(0);
		for (int i = 0; i < row.getPhysicalNumberOfCells(); i++) {
			Cell cell = row.getCell(i);
			if (fieldChange.get(StudentExcelUtility.parseCell(cell)) != null) {
				String indexName = fieldChange.get(cell.getStringCellValue());
				nameIndexMap.put(indexName, i);
			} else {
				if (StudentExcelUtility.parseCell(cell).contains("稱呼")) {
					nameIndexMap.put(INDEX_NICKNAME, i);
				}
			}
		}
	}

	public ArrayList<StudentModel> buildStudentModelArray() {
		Row row;
		StudentModel studentModel;
		studentArray = new ArrayList<StudentModel>();
		for (int i = 1; i < firstSheet.getPhysicalNumberOfRows(); i++) {
			row = firstSheet.getRow(i);
			if (row == null) {
				continue;
			}
			// studentModel = new StudentModel(row, nameIndexMap);
			studentModel = buildStudentModel(i);
			studentArray.add(studentModel);
		}

		return studentArray;
	}

	public StudentModel buildStudentModel(int rowIndex) {
		StudentModel studentModel = new StudentModel();

		Row row = firstSheet.getRow(rowIndex);

		int timestampIndex = checkIndexExist(nameIndexMap, INDEX_TIMESTAMP);
		if (timestampIndex != -1) {
			Cell cell = row.getCell(timestampIndex);
			String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
					.format(new Date(cell.getDateCellValue().getTime()));
			studentModel.setTimestamp(timestamp);
		}

		int nameIndex = checkIndexExist(nameIndexMap, INDEX_NAME);
		if (nameIndex != -1) {
			Cell cell = row.getCell(nameIndex);
			String name = StudentExcelUtility.parseCell(cell);
			studentModel.setName(name);

		}

		int nicknameIndex = checkIndexExist(nameIndexMap, INDEX_NICKNAME);
		if (nicknameIndex != -1) {
			Cell cell = row.getCell(nicknameIndex);
			String nickname = StudentExcelUtility.parseCell(cell);
			studentModel.setNickname(nickname);
		}

		int emailIndex = checkIndexExist(nameIndexMap, INDEX_EMAIL);
		if (emailIndex != -1) {
			Cell cell = row.getCell(emailIndex);
			String email = StudentExcelUtility.parseCell(cell);
			studentModel.setEmail(email);
		}

		int phoneIndex = checkIndexExist(nameIndexMap, INDEX_PHONE);
		if (phoneIndex != -1) {
			Cell cell = row.getCell(phoneIndex);

			String phoneContent = StudentExcelUtility.parseCell(cell);
			// String phoneNumber = "";
			//
			// String phonePattern1 = "^09\\d{2}-\\d{3}-\\d{3}";
			// String phonePattern2 = "^09\\d{2}-\\d{6}";
			// String phonePattern3 = "^9\\d{8}";
			//
			// Pattern pattern1 = Pattern.compile(phonePattern1);
			// Pattern pattern2 = Pattern.compile(phonePattern2);
			// Pattern pattern3 = Pattern.compile(phonePattern3);
			//
			// if (pattern1.matcher(phoneContent).find()) {
			// phoneNumber = phoneContent.substring(0, 4) + "-" +
			// phoneContent.substring(5, 8)
			// + phoneContent.substring(9, 12);
			//
			// } else if (pattern2.matcher(phoneContent).find()) {
			// phoneNumber = phoneContent;
			// } else if (pattern3.matcher(phoneContent).find()) {
			// phoneNumber = "0" + phoneContent.substring(0, 3) + "-" +
			// phoneContent.substring(3, 9);
			// }

			studentModel.setPhone(phoneContent);
		}

		int companyIndex = checkIndexExist(nameIndexMap, INDEX_COMPANY);
		if (companyIndex != -1) {
			Cell cell = row.getCell(companyIndex);
			String company = StudentExcelUtility.parseCell(cell);
			studentModel.setCompany(company);
		}

		int apartmentIndex = checkIndexExist(nameIndexMap, INDEX_APARTMENT);
		if (apartmentIndex != -1) {
			Cell cell = row.getCell(apartmentIndex);
			String apartment = StudentExcelUtility.parseCell(cell);
			studentModel.setApartment(apartment);

		}

		int titleIndex = checkIndexExist(nameIndexMap, INDEX_TITLE);
		if (titleIndex != -1) {
			Cell cell = row.getCell(titleIndex);
			String title = StudentExcelUtility.parseCell(cell);
			studentModel.setTitle(title);
		}

		int vegeMeatIndex = checkIndexExist(nameIndexMap, INDEX_VEGE_MEAT);
		if (vegeMeatIndex != -1) {
			Cell cell = row.getCell(vegeMeatIndex);
			String vegeMeat = StudentExcelUtility.parseCell(cell);
			studentModel.setVegeMeat(vegeMeat);
		}

		int receiptTypeIndex = checkIndexExist(nameIndexMap, INDEX_RECEIPT_TYPE);
		if (receiptTypeIndex != -1) {
			Cell cell = row.getCell(receiptTypeIndex);
			String receiptType = StudentExcelUtility.parseCell(cell);
			// System.out.println(receiptType);
			studentModel.setReceiptType(receiptType);
		}

		int companyNameAndEINIndex = checkIndexExist(nameIndexMap, INDEX_RECEIPT_COMPANY_NAME_AND_EIN);
		if (companyNameAndEINIndex != -1) {
			Cell cell = row.getCell(companyNameAndEINIndex);
			String companyNameAndEIN = StudentExcelUtility.parseCell(cell);

			if (!companyNameAndEIN.equals("")) {
				String einPattern = "\\d{6,}";

				Pattern pattern = Pattern.compile(einPattern);
				Matcher matcher = pattern.matcher(companyNameAndEIN);
				if (matcher.find()) {
					String receiptCompanyEIN = companyNameAndEIN.substring(matcher.start(), matcher.end());
					studentModel.setReceiptCompanyEIN(receiptCompanyEIN);

				}
				String receiptCompanyName = companyNameAndEIN.replaceAll(einPattern, "")
						.replaceAll("[^\\u4e00-\\u9fa5]", "");
				studentModel.setReceiptCompanyName(receiptCompanyName);
			}
		}

		int ticketTypeIndex = checkIndexExist(nameIndexMap, INDEX_TICKET_TYPE);
		if (ticketTypeIndex != -1) {
			Cell cell = row.getCell(ticketTypeIndex);
			String ticketTypeContent = StudentExcelUtility.parseCell(cell);

			if (ticketTypeContent != "") {
				// // String priceReg = "\\d+[,]*\\d+";
				// String priceReg = "(\\d+,*)+";
				// String ticketTypeReg = ".*[票|券]";
				//
				// String ticketType = "";
				// String ticketPrice = "";
				//
				// Pattern pricePattern = Pattern.compile(priceReg);
				// Pattern ticketPattern = Pattern.compile(ticketTypeReg);
				//
				// Matcher matcher = ticketPattern.matcher(ticketTypeContent);
				//
				// if (matcher.find()) {
				// ticketType = ticketTypeContent.substring(matcher.start(),
				// matcher.end());
				// studentModel.setTicketType(ticketType);
				// }
				//
				// Matcher priceMatcher =
				// pricePattern.matcher(ticketTypeContent);
				//
				// if (priceMatcher.find()) {
				// ticketPrice =
				// ticketTypeContent.substring(priceMatcher.start(),
				// priceMatcher.end());
				// // System.out.println(ticketPrice);
				// studentModel.setTicketPrice(ticketPrice);
				// }
				studentModel.setTicketTypeAndPrice(ticketTypeContent);
			}

		}

		int teamMembersIndex = checkIndexExist(nameIndexMap, INDEX_TEAM_MEMBERS);
		if (teamMembersIndex != -1) {
			Cell cell = row.getCell(teamMembersIndex);
			String teamMembers = StudentExcelUtility.parseCell(cell);
			studentModel.setTeamMembers(teamMembers);
		}

		int commentIndex = checkIndexExist(nameIndexMap, INDEX_COMMENT);
		if (commentIndex != -1) {
			Cell cell = row.getCell(commentIndex);
			String comment = StudentExcelUtility.parseCell(cell);
			studentModel.setComment(comment);
		}

		int paymentStatusIndex = checkIndexExist(nameIndexMap, INDEX_PAYMENT_STATUS);
		if (paymentStatusIndex != -1) {
			Cell cell = row.getCell(paymentStatusIndex);
			String paymentStatus = StudentExcelUtility.parseCell(cell);
			studentModel.setPaymentStatus(paymentStatus);
		}

		studentModel.setFkCourseInfoId(courseId);

		return studentModel;
	}

	private static int checkIndexExist(Map<String, Integer> nameIndexMap, String Index) {
		return nameIndexMap.containsKey(Index) ? nameIndexMap.get(Index) : -1;
	}

	private void setFieldMap() {
		fieldChange = new HashMap<String, String>();

		fieldChange.put("姓名", INDEX_NAME);
		fieldChange.put("中文姓名", INDEX_NAME);
		fieldChange.put("Email", INDEX_EMAIL);
		fieldChange.put("手機", INDEX_PHONE);
		fieldChange.put("公司", INDEX_COMPANY);
		fieldChange.put("部門", INDEX_APARTMENT);
		fieldChange.put("職稱", INDEX_TITLE);
		fieldChange.put("您希望我們怎麼稱呼您？", INDEX_NICKNAME);
		fieldChange.put("時間戳記", INDEX_TIMESTAMP);
		fieldChange.put("用餐需求", INDEX_VEGE_MEAT);
		fieldChange.put("發票格式", INDEX_RECEIPT_TYPE);
		fieldChange.put("若選擇三聯式發票，請務必同時提供「公司抬頭」與「統編」", INDEX_RECEIPT_COMPANY_NAME_AND_EIN);
		fieldChange.put("票種", INDEX_TICKET_TYPE);
		fieldChange.put("若您報名四人以上團報票，請填寫所有團報人員姓名，以供辨識。", INDEX_TEAM_MEMBERS);
		fieldChange.put("有話想對主辦單位說嗎？歡迎留言！", INDEX_COMMENT);
		fieldChange.put("已繳費", INDEX_PAYMENT_STATUS);
	}
}
