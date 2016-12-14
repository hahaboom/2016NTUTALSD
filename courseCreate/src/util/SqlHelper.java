package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.rowset.CachedRowSet;

public class SqlHelper {
	public static String SuccessString="Success";
	public static String FailString="Fail";
//	private final String DB_URL = "jdbc:mysql://45.32.62.194:3306/SLM2016?useUnicode=true&characterEncoding=utf-8";
	private final String DB_URL = "jdbc:mysql://localhost:3306/SLM2016?useUnicode=true&characterEncoding=utf-8";
	private final String ACCOUNT = "SLM2016";
	private final String PASSWORD = "Teddysoft";

	public SqlHelper() {
	}
	
	public String excuteSql(String sqlString,CachedRowSet responseData) {
		Connection connection = null;
		Statement statement = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(DB_URL, ACCOUNT, PASSWORD);
			statement = connection.createStatement();
			statement.execute(sqlString);
			if(statement.getResultSet()!=null)
			{
				responseData.populate(statement.getResultSet());
			}
			
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
