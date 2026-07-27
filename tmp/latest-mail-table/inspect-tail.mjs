import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const source = await FileBlob.load("./source.xlsx");
const workbook = await SpreadsheetFile.importXlsx(source);

for (const [sheetName, range] of [
  ["見積対象外", "A30:H45"],
  ["メール一覧", "A1:F80"],
]) {
  const result = await workbook.inspect({
    kind: "table",
    range: `${sheetName}!${range}`,
    maxChars: 12000,
    tableMaxRows: 80,
    tableMaxCols: 10,
    tableMaxCellChars: 180,
  });
  console.log(`--- ${sheetName} ---`);
  console.log(result.ndjson);
}
