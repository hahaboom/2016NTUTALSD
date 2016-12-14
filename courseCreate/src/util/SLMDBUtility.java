package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.sql.ResultSetMetaData;

public class SLMDBUtility {
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
//	static final String DB_URL = "jdbc:mysql://45.32.62.194:3306/SLM2016?useUnicode=true&characterEncoding=utf-8";
	static final String DB_URL = "jdbc:mysql://localhost:3306/SLM2016?useUnicode=true&characterEncoding=utf-8";
	static final String USER = "SLM2016";
	static final String PASS = "Teddysoft";
	Connection connection = null;

	public SLMDBUtility() {
		super();
	}

	public void createConnection() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(DB_URL, USER, PASS);
		} catch (SQLException se) {
			se.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	public ArrayList<HashMap<String, String>> selectSQL(String sql) {
		Statement stmt = null;
		ResultSet rs = null;
		ArrayList<HashMap<String, String>> result = new ArrayList<HashMap<String, String>>();
		// if (connection == null) {
		// this.createConnection();
		// }
		checkConnection();
		try {
			stmt = connection.createStatement();
			rs = stmt.executeQuery(sql);
			ResultSetMetaData rsmd = rs.getMetaData();

			rsmd = rs.getMetaData();
			while (rs.next()) {
				// element = new JsonObject();
				String columnName, columnValue = null;

				HashMap<String, String> map = new HashMap<String, String>();
				for (int i = 0; i < rsmd.getColumnCount(); i++) {
					columnName = rsmd.getColumnName(i + 1);
					columnValue = rs.getString(columnName);
					map.put(columnName, columnValue);
				}
				result.add(map);
			}
			// System.out.println(gson.toJson(array));

			rs.close();
			stmt.close();
			connection.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
		// System.out.println(gson.toJson(array));
		return result;
	}

	public boolean insertSQL(String sql) {
		Statement stmt = null;
		boolean result = false;
		// if (connection == null) {
		// this.createConnection();
		// }
		checkConnection();
		try {
			stmt = connection.createStatement();
			stmt.executeUpdate(sql);
			result = true;
			stmt.close();
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public boolean updateSQL(String sql) {
		Statement stmt = null;
		boolean result = false;
		// if (connection == null) {
		// this.createConnection();
		// }
		checkConnection();
		try {
			stmt = connection.createStatement();
			stmt.executeUpdate(sql);
			result = true;
			stmt.close();
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public boolean deleteSQL(String sql) {
		Statement stmt = null;
		boolean result = false;
		// if (connection == null) {
		// this.createConnection();
		// }
		checkConnection();
		try {
			stmt = connection.createStatement();
			stmt.executeUpdate(sql);
			result = true;
			stmt.close();
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public void checkConnection() {
		try {
			if (connection == null || connection.isClosed()) {
				this.createConnection();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
