import * as XLSX from "xlsx";

type ExcelRow = Record<string, string>;

export function readExcelFile(
  filePath: string,
  sheetName?: string
): ExcelRow[] {
  const workbook = XLSX.readFile(filePath);

  const targetSheetName = sheetName || workbook.SheetNames[0];
  if (!workbook.SheetNames.includes(targetSheetName)) {
    throw new Error(
      `The sheet "${targetSheetName}" does not exist in the Excel file.`
    );
  }

  const sheet = workbook.Sheets[targetSheetName];
  return XLSX.utils.sheet_to_json(sheet);
}
