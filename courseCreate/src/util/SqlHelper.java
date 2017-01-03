package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.rowset.CachedRowSet;

public class SqlHelper {
	public static String SuccessString="Success";
	public static String FailString="Fail";
	private final String DB_URL = "jdbc:sqlite:E:\\新增資料夾\\courseCreate\\slm2016.db";

	public SqlHelper() {
	}
	
	public String excuteSql(String sqlString,CachedRowSet responseData) {
		Connection connection = null;
		Statement statement = null;
		try {
			Class.forName("org.sqlite.JDBC");
			connection = DriverManager.getConnection(DB_URL);
			statement = connection.createStatement();
			ResultSet resultSet= statement.executeQuery(sqlString);
			responseData.populate(resultSet);
		} catch (ClassNotFoundException e) {
			return "JDBC Driver Exception! " + e.toString();
		} catch (SQLException e) {
			return "Excute SqlCommand Error! " + e.toString();
		} finally {
			try {if (statement != null) statement.close(); } catch (Exception e) {return "Statement Close Fail!" + e.toString();}
			try {if (connection != null)connection.close();} catch (Exception e) {return "Connection Close Fail!" + e.toString();}
		}
		return SuccessString;	
	}
}
