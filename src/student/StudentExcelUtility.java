package student;

import org.apache.poi.ss.usermodel.Cell;

public class StudentExcelUtility {
	static String parseCell(Cell cell) {

		String result;
		if (cell == null) {
			result = null;

		} else {
			switch (cell.getCellType()) {

			case Cell.CELL_TYPE_FORMULA:
				// value = "FORMULA value=" + cell.getCellFormula();
				result = null;
				break;
			case Cell.CELL_TYPE_NUMERIC:
				// value = "NUMERIC value=" + cell.getNumericCellValue();
				result = Integer.toString((int) cell.getNumericCellValue());
				break;
			case Cell.CELL_TYPE_STRING:
				// value = "STRING value=" + cell.getStringCellValue();
				result = cell.getStringCellValue();
				break;
			default:
				result = null;
				break;
			}
		}
		return (result == null ? "" : result);
	}
}
