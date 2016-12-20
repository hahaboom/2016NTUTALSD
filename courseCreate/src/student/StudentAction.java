package student;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

import org.apache.jasper.tagplugins.jstl.core.Out;
import org.apache.poi.util.IOUtils;
import com.google.gson.Gson;

import courseManager.CourseManagerWithDatabase;
import mailSending.SendApplySuccessfullyMail;

import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.google.gson.GsonBuilder;

@WebServlet("/StudentAction")
@MultipartConfig()
public class StudentAction extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final String OP_INSERT_INTO_STUDENT = "1";
	private static final String OP_GET_STUDENT_LIST = "2";
	private static final String OP_INSERT_STUDENT_FROM_GOOGLE_FORM = "3";
	private static final String OP_SAVE_STUDENT_EXCEL_FILE = "4";
	private static final String OP_GET_STUDENT_LIST_BY_COURSE_ID = "5";
	private static final String OP_UPDATE_STUDENT_RECEIPT_STATUS = "6";
	private static final String OP_GET_CERTIFICATION_INFO = "7";
	private static final String OP_UPDATE_STUDENT_COMPANY_INFO = "8";
	private static final String OP_DELETE_STUDENT_BY_ID = "9";
	private static final String OP_GET_STUDENT_NUM_BY_COURSE_ID = "10";
	private static final String OP_GENERATE_CERTIFICATION_ID = "11";

	private static Gson gson = new Gson();

	public StudentAction() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String op = request.getParameter("op");
		switch (op) {
		case OP_GET_STUDENT_LIST:
			getStudentList(request, response);
			break;
		case OP_GET_STUDENT_LIST_BY_COURSE_ID:
			getStudentListByCourseId(request, response);
			break;
		case OP_GET_CERTIFICATION_INFO:
			getCertificationInfo(request, response);
			break;
		case OP_GET_STUDENT_NUM_BY_COURSE_ID:
			getStudentNumByCourseId(request, response);
		default:
			break;
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		String op = request.getParameter("op");
		// PrintWriter out = response.getWriter();
		switch (op) {
		case OP_INSERT_INTO_STUDENT:
			insertIntoStudent(request, response);
			break;
		case OP_SAVE_STUDENT_EXCEL_FILE:
			saveFile(request, response);
			break;
		case OP_INSERT_STUDENT_FROM_GOOGLE_FORM:
			Map<String, Object> insertMap = getGoogleFormData(request);
			try {
				insertStudentFromGoogleForm(insertMap);
				sendInformMail(insertMap);
			} catch (SQLException e) {
				e.printStackTrace();
			}
			break;
		case OP_UPDATE_STUDENT_RECEIPT_STATUS:
			updateStudentReceiptStatus(request, response);
			break;
		case OP_GENERATE_CERTIFICATION_ID:
			generateCertificationId(request, response);
			break;
		case OP_UPDATE_STUDENT_COMPANY_INFO:
			updateStudentCompanyEINAndName(request, response);
			break;
		case OP_DELETE_STUDENT_BY_ID:
			deleteStudentByStudentId(request, response);
			break;
		default:
			break;
		}

		// Gson gson = new Gson();
		// out.println(gson.toJson(result));
	}

	private Map<String, Object> getGoogleFormData(HttpServletRequest request) throws IOException {
		request.setCharacterEncoding("UTF-8");

		// Read from request
		StringBuilder buffer = new StringBuilder();
		BufferedReader reader = request.getReader();

		String line;
		while ((line = reader.readLine()) != null) {
			buffer.append(line);
		}
		String gData = buffer.toString();
		Gson gson = new Gson();
		Map<String, Object> map = new HashMap<String, Object>();
		map = (Map<String, Object>) gson.fromJson(gData, map.getClass());
		return map;
	}

	private void getStudentList(HttpServletRequest request, HttpServletResponse response) {
		StudentDBManager studentDbManager = new StudentDBManager();
		String json = null;

		try {
			json = studentDbManager.getStudentList();

			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(json);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void getCertificationInfo(HttpServletRequest request, HttpServletResponse response) {
		StudentDBManager studentDbManager = new StudentDBManager();
		String result = null;

		try {
			result = studentDbManager.getCertificationInfo(request.getParameter("studentId"));
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(result);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void insertIntoStudent(HttpServletRequest request, HttpServletResponse response)

			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		// final String DATE_FORMAT_NOW = "yyyy-MM-dd HH:mm:ss";
		HashMap<String, String> result = new HashMap<String, String>();
		// Calendar cal = Calendar.getInstance();
		// SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_NOW);

		String courseId = request.getParameter("courseId");
		Part filePart = request.getPart("file");

		try {
			StudentModelFactory factory = new StudentModelFactory(filePart.getInputStream(), courseId);

			ArrayList<StudentModel> arr = factory.buildStudentModelArray();
			StudentDBManager studentDbManager = new StudentDBManager();
			for (StudentModel s : arr) {
				// System.out.println(s.getComment());
				studentDbManager.insertStudent(s);
			}

			result.put("status", "true");
		} catch (Exception e) {
			// e.printStackTrace();
			result.put("status", "false");
		}

		out.println(gson.toJson(result));
		// return result;
	}

	private void updateStudentReceiptStatus(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		PrintWriter out = response.getWriter();
		HashMap<String, String> result = new HashMap<String, String>();

		try {

			StudentModel studentModel;
			StudentDBManager studentDBManager = new StudentDBManager();
			String studentID = request.getParameter("studentId");
			String receiptEIN = request.getParameter("receiptEIN");
			String receiptStatus = request.getParameter("receiptStatus");
			String paymentStatus = request.getParameter("paymentStatus");

			studentModel = studentDBManager.getStudentById(studentID);
			studentModel.setReceiptEIN(receiptEIN);
			studentModel.setReceiptStatus(receiptStatus);
			studentModel.setPaymentStatus(paymentStatus);

			if (studentDBManager.updateStudent(studentModel)) {
				result.put("status", "true");
			} else {

				result.put("status", "false");
			}

		} catch (Exception e) {
			result.put("status", "false");
			e.printStackTrace();
		}

		out.println(gson.toJson(result));
	}

	private void updateStudentCompanyEINAndName(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		PrintWriter out = response.getWriter();
		HashMap<String, String> result = new HashMap<String, String>();

		try {

			StudentModel studentModel;
			StudentDBManager studentDBManager = new StudentDBManager();
			String studentID = request.getParameter("studentId");
			String companyEIN = request.getParameter("receipt_company_EIN");
			String companyName = request.getParameter("receipt_company_name");

			studentModel = studentDBManager.getStudentById(studentID);
			studentModel.setReceiptCompanyEIN(companyEIN);
			studentModel.setReceiptCompanyName(companyName);

			if (studentDBManager.updateStudent(studentModel)) {
				result.put("status", "true");
			} else {

				result.put("status", "false");
			}

		} catch (Exception e) {
			result.put("status", "false");
			e.printStackTrace();
		}

		out.println(gson.toJson(result));
	}

	private void saveFile(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {

		HashMap<String, String> result = new HashMap<String, String>();
		PrintWriter out = response.getWriter();

		Date date = new java.util.Date();
		String nowTime = Long.toString(date.getTime());
		String fileName = String.format("%s.xlsx", nowTime);

		String courseId = request.getParameter("courseId");
		// courseName = "TEST";
		String dirPath = String.format("./course_excel_file/%s/", courseId);
		Part filePart = request.getPart("file");
		try {
			File f = new File(dirPath);
			if (!f.exists()) {
				f.mkdirs();
			}
			// System.out.println(f.getAbsolutePath());
			OutputStream fileOut = new FileOutputStream(dirPath + fileName);
			IOUtils.copy(filePart.getInputStream(), fileOut);
			fileOut.close();
			result.put("status", "true");

		} catch (

		IOException ex) {
			result.put("status", "false");
		}

		out.println(gson.toJson(result));

	}

	private void getStudentListByCourseId(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		// response.setContentType("application/json");
		// response.setCharacterEncoding("UTF-8");
		String courseId = request.getParameter("courseId");
//		String page = request.getParameter("page");
//		String pageItem = request.getParameter("pageItem");

		StudentDBManager studentDbManager = new StudentDBManager();
		String json = null;

		try {
//			json = studentDbManager.getStudentListByCourseId(courseId, page, pageItem);
			json = studentDbManager.getStudentListByCourseId(courseId);

			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(json);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private Boolean insertStudentFromGoogleForm(Map<String, Object> _insertMap)
			throws IOException, ServletException, SQLException {
		Boolean insertResult = false;
		CourseManagerWithDatabase courseDB = new CourseManagerWithDatabase();

		Map<String, Object> _map = _insertMap;
		StudentModel studentModel = new StudentModel();

		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date today = Calendar.getInstance().getTime();
		String _timestamp = df.format(today);
		String name = _map.get("name").toString();
		String email = _map.get("email").toString();
		String courseName = _map.get("courseName").toString();
		String batch = _map.get("batch").toString();

		studentModel.setTimestamp(_timestamp);
		studentModel.setName(name);
		studentModel.setTicketTypeAndPrice(_map.get("ticket").toString());
		studentModel.setNickname(_map.get("nickname").toString());
		studentModel.setEmail(email);
		studentModel.setPhone(_map.get("cellphone").toString());
		studentModel.setCompany(_map.get("company").toString());
		studentModel.setApartment(_map.get("apartment").toString());
		studentModel.setTitle(_map.get("title").toString());
		studentModel.setVegeMeat(_map.get("vegeMeat").toString());
		studentModel.setReceiptType(_map.get("receipt").toString());
		studentModel.setReceiptCommpanyTitleAndEIN(_map.get("companyTitle").toString());

		String _courseID = courseDB.getCourseIdByCourseNameAndBatchAndStatus(courseName, batch, "報名中");

		if (_courseID != null) {
			studentModel.setFkCourseInfoId(_courseID);
			StudentDBManager studentDBManager = new StudentDBManager();
			insertResult = studentDBManager.insertStudent(studentModel);
		} else {
			System.out.println("\nNo course!!!");
		}
		return insertResult;
	}

	private Boolean sendInformMail(Map<String, Object> _insertMap) throws IOException, ServletException, SQLException {
		Boolean sendResult = false;
		SendApplySuccessfullyMail sendApplySuccessfullyMail = new SendApplySuccessfullyMail();
		CourseManagerWithDatabase courseManagerWithDatabase = new CourseManagerWithDatabase();
		Map<String, Object> _map = _insertMap;

		String name = _map.get("name").toString();
		String email = _map.get("email").toString();
		String courseName = _map.get("courseName").toString();
		String batch = _map.get("batch").toString();
		String courseId = courseManagerWithDatabase.getCourseIdByCourseNameAndBatchAndStatus(courseName, batch, "報名中");
		String ccAddresses = courseManagerWithDatabase.getCcAddressByCourseId(courseId);
		String hyperlink = courseManagerWithDatabase.getHyperlinkByCourseId(courseId);
		if (courseId != null) {
			sendApplySuccessfullyMail.Send(name, email, ccAddresses, courseName, hyperlink);
		} else {
			System.out.println("No Match Course!!!");
		}

		return sendResult;
	}

	private void deleteStudentByStudentId(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		// response.setContentType("application/json");
		// response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		HashMap<String, String> result = new HashMap<String, String>();
		String studentIds = request.getParameter("studentIds");

		StudentDBManager studentDbManager = new StudentDBManager();
		// String json = null;

		try {
			if (studentDbManager.deleteStudentByStudentIds(studentIds)) {
				result.put("status", "true");
			} else {
				result.put("status", "false");
			}
		} catch (SQLException e) {
			result.put("status", "false");
			e.printStackTrace();
		}

		out.println(gson.toJson(result));
	}

	private void getStudentNumByCourseId(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		// response.setContentType("application/json");
		// response.setCharacterEncoding("UTF-8");
		String courseId = request.getParameter("courseId");

		StudentDBManager studentDbManager = new StudentDBManager();
		String json = null;

		try {
			json = studentDbManager.getStudentNumByCourseId(courseId);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(json);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void generateCertificationId(HttpServletRequest request, HttpServletResponse response) {
		String courseId = request.getParameter("courseId");
		StudentDBManager studentDbManager = new StudentDBManager();
		ArrayList<Integer> studentIds = studentDbManager.getStudentsByCourseId(courseId);
		int studentSize = studentIds.size();
		HashMap<String, String> result = new HashMap<String, String>();
		try {
			PrintWriter out = response.getWriter();
			if (studentSize < 1) {
				result.put("status", "false");
				out.println(gson.toJson(result));
			} else {
				CourseManagerWithDatabase courseManagerWithDatabase = new CourseManagerWithDatabase();
				String date = "";
				String classCode = "";
				String year = "";
				String month = "";
				boolean temp = true;
				int count = 0;
				int nowCetificationId = 1;
				try {
					date = courseManagerWithDatabase.getDateByCourseId(courseId);
					classCode = courseManagerWithDatabase.getCodeByCourseId(courseId);
					String certificationId = classCode;
					if (date != "") {
						year = date.substring(2, 4);
						month = date.substring(5, 7);
						certificationId = certificationId + year + month;
						for (int i = 1; i < studentSize + 1; i++) {
							certificationId = classCode;
							if (date != "")
								certificationId = certificationId + year + month;
							if (nowCetificationId < 10)
								certificationId = certificationId + "-0" + nowCetificationId;
							else
								certificationId = certificationId + "-" + nowCetificationId;
							String studentCertificationId = studentDbManager
									.getStudentCertificationId(studentIds.get(i - 1).intValue());
							if (!(studentCertificationId.isEmpty())) {
								String[] temps = studentCertificationId.split("-");
								String tem = temps[1];
								int now = Integer.valueOf(tem);
								if(now > nowCetificationId)
									nowCetificationId = now+1;
								continue;
							} else {
								temp = studentDbManager.updateStudentCertificationId(studentIds.get(i - 1).intValue(),
										certificationId);
								if (temp == false)
									System.out.println("studentIds " + i + " is not update correct");
								count++;
								nowCetificationId++;
							}
						}
						if (count != 0) {
							result.put("status", "true");
							out.println(gson.toJson(result));
						} else {
							result.put("status", "incorrect");
							out.println(gson.toJson(result));
						}
					} else {
						result.put("status", "noDate");
						out.println(gson.toJson(result));
					}
					
				} catch (SQLException esql) {
					esql.printStackTrace();
				}
			}
		} catch (IOException eio) {
			eio.printStackTrace();
		}
	}
}
