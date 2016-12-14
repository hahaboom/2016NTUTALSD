package servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mailSending.Classes;
import mailSending.GmailSender;
import mailSending.StudentInfomation;
import mailSending.StudentSelectedIndex;
//import student.StudentDBManager;
import student.StudentModel;
import student.StudentSendMailData;

@WebServlet("/SendGmailServlet")
public class SendGmailServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Classes classes_ = new Classes();
	private List<String> hyperlinks_ = new ArrayList<String>();

	public SendGmailServlet() {
		super();
		hyperlinks_.add("http://teddysoft.tw/courses/scrum/");
		hyperlinks_.add("http://teddysoft.tw/courses/refactoring/");
		hyperlinks_.add("http://teddysoft.tw/courses/design-patterns-1/");
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String json = new Gson().toJson(classes_);
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String requestString = request.getReader().readLine();
		String header = request.getHeader("isSend");
		String headerCertification = request.getHeader("isSendCertification");
		if (header != null) {
			doPostClassIndex(request, response, requestString);
			return;
		}
		if(headerCertification != null) {
			doPostSendMailAttachment(request, response, requestString);
			return;
		}
		doPostSendMail(request, response, requestString);
	}

	private void doPostClassIndex(HttpServletRequest request, HttpServletResponse response, String requestString)
			throws ServletException, IOException {
		int index = Integer.valueOf(requestString);
		String json = new Gson().toJson(classes_.getClasses().get(index));
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}

	private void doPostSendMail(HttpServletRequest request, HttpServletResponse response, String requestString)
			throws ServletException, IOException {
		Gson gson = new Gson();
		StudentSelectedIndex sendStudentIndex = gson.fromJson(requestString, StudentSelectedIndex.class);
		int index = sendStudentIndex.getClassIndex();
		String ccAddresses = sendStudentIndex.getCCAddresses();
		List<Integer> studentIndex = sendStudentIndex.getIndexes();
		List<String> studentName = new ArrayList<String>();
		List<String> addresses = new ArrayList<String>();
		StudentInfomation studentInfomation = classes_.getClasses().get(index).getStudentsInfomation();
		for (int i = 0; i < studentIndex.size(); i++) {
			for (int j = 0; j < studentInfomation.getStudents().size(); j++) {
				if (j == studentIndex.get(i).intValue()) {
					studentName.add(studentInfomation.getStudents().get(j));
					addresses.add(studentInfomation.getMailAddress().get(j));
				}
			}
		}

		String username = "news.teddysoft.tw@gmail.com";
		String password = "clfddzifoyfvvxqa";
		GmailSender gmailSender = new GmailSender(username, password);
		String subject = classes_.getClasses().get(index).getClassName() + " - 已收到您的報名資料";
		String result = "";
		for (int i = 0; i < studentName.size(); i++) {
			String text = "Hi " + studentName.get(i) + "，<br><br>您好，歡迎報名<a href=\"" + hyperlinks_.get(index) + "\">"
					+ classes_.getClasses().get(index).getClassName()
					+ "</a>，我們已收到您填寫的相關資料。<br><br>本梯次課程目前招生中，若達開課人數，我們會再通知您後續繳費的相關事宜，最遲於開課前十天通知。如果有任何問題，歡迎和我們聯絡 : ) <br><br><br>泰迪軟體 Erica<br><br>-- <br>泰迪軟體科技有限公司 <br>Teddysoft Technology<br>02-2311-6230<br> <a href=\"http://teddysoft.tw\">http://teddysoft.tw </a>";
			result = gmailSender.send(addresses.get(i), ccAddresses, subject, text, null);
		}
		String json = new Gson().toJson(result);
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}
	
	private void doPostSendMailAttachment(HttpServletRequest request, HttpServletResponse response, String requestString)
			throws ServletException, IOException {
		//StudentDBManager studentDbManager = new StudentDBManager();
		Base64.Decoder base64Decoder = Base64.getDecoder();
		
		Gson gson = new Gson();
		StudentSelectedIndex sendStudentIndex = gson.fromJson(requestString, StudentSelectedIndex.class);

		StudentModel studentInformation = null;
		String addresses = sendStudentIndex.getAddresses();
		String ccAddresses = "erica@teddysoft.tw";
		String text = sendStudentIndex.getText();
		String courseName = sendStudentIndex.getCourseName();
		byte[] attachment = null;
		
		System.out.println(addresses);
		/*try {
			studentInformation = studentDbManager.getStudentById(sendStudentIndex.getStudentId());
			attachment = base64Decoder.decode(studentInformation.getCertificationPdf());
		} catch (SQLException e) {
			e.printStackTrace();
		}*/
		
		String username = "news.teddysoft.tw@gmail.com";
		String password = "clfddzifoyfvvxqa";
		GmailSender gmailSender = new GmailSender(username, password);
		String subject = courseName + " - 課程證書";
		String result = "";
		result = gmailSender.send(addresses, ccAddresses, subject, text, attachment);
		
		StudentSendMailData studentSendMailData = new StudentSendMailData();
		studentSendMailData.studentId = Integer.parseInt(sendStudentIndex.getStudentId());
		studentSendMailData.studentName = studentInformation.getName();
		studentSendMailData.address = sendStudentIndex.getAddresses();
		studentSendMailData.result = result;
		
		String json = new Gson().toJson(studentSendMailData);
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}
}
