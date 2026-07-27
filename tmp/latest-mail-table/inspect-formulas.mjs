import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const source = await FileBlob.load("./source.xlsx");
const workbook = await SpreadsheetFile.importXlsx(source);

for (const [sheetName, range] of [
  ["見積対象外", "A36:H38"],
  ["メール一覧", "A39:D41"],
]) {
  const sheet = workbook.worksheets.getItem(sheetName);
  const values = sheet.getRange(range).values;
  const formulas = sheet.getRange(range).formulas;
  console.log(JSON.stringify({ sheetName, range, values, formulas }, null, 2));
}
