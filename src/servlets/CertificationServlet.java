package servlets;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.rowset.CachedRowSet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sun.rowset.CachedRowSetImpl;

import certification.Certification;
import certification.CertificationManager;

@WebServlet("/CertificationServlet")
public class CertificationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private CertificationManager manager;

	public CertificationServlet() {
		super();
		manager = new CertificationManager();
	}

	public String RetriveCertificationPath(String courceId) {
		String path = getServletContext().getRealPath("images/template.png").toString();
//		SqlHelper helper = new SqlHelper();
//		CachedRowSet data = null;
//		try {
//			data = new CachedRowSetImpl();
//			if (helper.excuteSql("SELECT certificationPath from course_info where id=\"" + courceId + "\"", data)
//					.equals("Success")) {
//				data.next();
//				if (!data.getString("certificationPath").isEmpty()) {
//					path = data.getString("certificationPath");
//				}
//			}
//		} catch (Exception e) {
//		}
		return path;
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Gson son = new Gson();
		StringBuffer requestInfo = new StringBuffer();
		requestInfo.append(request.getReader().readLine());

		if (requestInfo.indexOf("courceId_", 0) > 0) {
			Certification certification = son.fromJson(requestInfo.toString(), Certification.class);
			manager.makeCertification(certification, RetriveCertificationPath(certification.getCourceId()));
			response.setContentType("image//png");
			response.setHeader("Content-Disposition", "inline; fileName=templateA.png");
			response.getWriter().write(manager.getCertificationJsonString());
		} else {
			if (requestInfo.indexOf("id", 0) > 0) {
				Certification certification = son.fromJson(requestInfo.toString(), Certification.class);

				manager.makeCertification(certification,
						getServletContext().getRealPath("images/template.png").toString());
				response.setContentType("image//png");
				response.setHeader("Content-Disposition", "inline; fileName=templateA.png");
				response.getWriter().write(manager.getCertificationJsonString());
			} else {
				manager.makeCertificationPDF();
				response.getWriter().write(manager.getCertificationPDFJsonString());
			}
		}

//		if (requestInfo.indexOf("saveDB", 0) > 0) {
//			Gson gson = new Gson();
//			StudentSendMailData studentSendMailData = gson.fromJson(requestInfo.toString(), StudentSendMailData.class);
//			HashMap<String, String> result = new HashMap<String, String>();
//
//			try {
//				StudentModel studentModel;
//				StudentDBManager studentDBManager = new StudentDBManager();
//				String studentID = studentSendMailData.studentId + "";
//				String certificationIMG = manager.getCertificationJsonString();
//				String certificationPDF = manager.getCertificationPDFJsonString();
//
//				studentModel = studentDBManager.getStudentById(studentID);
//				studentModel.setCertificationImg(certificationIMG);
//				studentModel.setCertificationPdf(certificationPDF);
//
//				if (studentDBManager.updateStudent(studentModel)) {
//					result.put("status", "true");
//				} else {
//					result.put("status", "false");
//				}
//
//			} catch (Exception e) {
//				result.put("status", "false");
//				e.printStackTrace();
//			}
//			// System.out.println(gson.toJson(result));
//		}
	}
}