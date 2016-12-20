package servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import courseManager.Course;
import courseManager.CourseManagerWithDatabase;
import student.StudentDBManager;

@WebServlet("/CourseManagerServlet")
public class CourseManagerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String OP_GET_COURSE_SIMPLE_DATA = "1";
	private static final String OP_GET_COURSE_INFO_BY_COURSE_ID = "2";
	private static final String OP_GET_COURSE_INFO_ORDER_BY_TIME_TOP_5 = "3";
	private static final String OP_UPDATE_COURSE_STATUS = "4";
	public CourseManagerWithDatabase courseManagerWithDb_ = new CourseManagerWithDatabase();

	public CourseManagerServlet() {
		super();
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// String simpleData = request.getHeader("simpleData");
		String op = request.getParameter("op");
		if (op != null) {
			if (op.equals(OP_GET_COURSE_SIMPLE_DATA)) {
				getCourseSimpleData(request, response);
			} else if (op.equals(OP_GET_COURSE_INFO_BY_COURSE_ID)) {
				doGetGetCourseInfoByCourseId(request, response);
			} else if (op.equals(OP_GET_COURSE_INFO_ORDER_BY_TIME_TOP_5)) {
				getCourseListTop5(request, response);
			} else if (op.equals(OP_UPDATE_COURSE_STATUS)) {
				updateCourseStatus(request, response);
			}

		} else {
			List<Course> courses_ = new ArrayList<Course>();
			String result = "";
			try {
				result = courseManagerWithDb_.getCourseFromDatabase(courses_);
			} catch (SQLException e) {

			}
			String json;
			if (result != "Success") {
				json = new Gson().toJson(result);
			} else {
				json = new Gson().toJson(courses_);
			}
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(json);
		}
	}

	private void getCourseSimpleData(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		List<Course> courses_ = new ArrayList<Course>();
		String result = "";
		try {
			result = courseManagerWithDb_.getCourseSimpleDataFromDatabase(courses_);
		} catch (SQLException e) {

		}
		String json;
		if (result != "Success") {
			json = new Gson().toJson(result);
		} else {
			json = new Gson().toJson(courses_);
		}
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String requestString = request.getReader().readLine();
		String header = request.getHeader("Delete");
		if (header != null) {
			doPostDeleteCourse(request, response, requestString);
			return;
		}
		header = request.getHeader("GetId");
		if (header != null) {
			doPostGetCourseId(request, response, requestString);
			return;
		}
		doPostAddCourse(request, response, requestString);
	}

	private void doPostDeleteCourse(HttpServletRequest request, HttpServletResponse response, String requestString)
			throws ServletException, IOException {
		String id = requestString;
		String result = "";
		try {
			result = courseManagerWithDb_.deleteCourseFromDatabase(id);
			StudentDBManager studentDBManager = new StudentDBManager();
			studentDBManager.deleteStudentsByCourseId(id);
		} catch (SQLException e) {

		}
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(result);
	}

	private void doPostAddCourse(HttpServletRequest request, HttpServletResponse response, String requestString)
			throws ServletException, IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		Gson gson = new Gson();
		Course course = gson.fromJson(requestString, Course.class);
		String result = "success";
		try {
			if (courseManagerWithDb_.getCourseIdByCourseNameAndBatchAndStatus(course.getCourseName(), course.getBatch(),
					course.getStatus()) != null) {
				result = "已存在相同課程";
			} else {
				result = courseManagerWithDb_.addCourseIntoDatabase(course);
			}
		} catch (SQLException e) {

		}
		String json = new Gson().toJson(result);
		response.getWriter().write(json);
	}

	private void doGetGetCourseInfoByCourseId(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		List<Course> courses_ = new ArrayList<Course>();
		String result = "";

		String courseId = request.getParameter("courseId");
		try {
			result = courseManagerWithDb_.getCourseInfoByCourseId(courses_, courseId);
		} catch (SQLException e) {

		}
		String json;
		if (result != "Success") {
			json = new Gson().toJson(result);
		} else {
			json = new Gson().toJson(courses_);
		}
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}

	private void getCourseListTop5(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String result = "";
		try {
			result = courseManagerWithDb_.getCourseInfoTop5();
		} catch (SQLException e) {

		}
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(result);
	}

	private void updateCourseStatus(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String courseId = request.getParameter("courseId");
		String statusName = request.getParameter("statusName");
		String result = "";

		try {
			result = courseManagerWithDb_.updateCourseStatus(courseId, statusName);
		} catch (SQLException e) {

		}
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(result);
	}

	private void doPostGetCourseId(HttpServletRequest request, HttpServletResponse response, String requestString)
			throws ServletException, IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		Gson gson = new Gson();
		Course course = gson.fromJson(requestString, Course.class);
		String result = "fail";
		try {
			result = courseManagerWithDb_.getCourseIdByCourseNameAndBatchAndStatus(course.getCourseName(),
					course.getBatch(), course.getStatus());
		} catch (SQLException e) {

		}
		String json = new Gson().toJson(result);
		response.getWriter().write(json);
	}
}
