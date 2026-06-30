import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "/Users/jin/Roady.net Dropbox/矢吹仁/_jp-roady/01_業務/000_みらい内科クリニック/みらい内科クリニック 美容サイト改修 見積切り分け表.xlsx";
const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const summary = await workbook.inspect({
  kind: "workbook,sheet,table,region",
  maxChars: 12000,
  tableMaxRows: 12,
  tableMaxCols: 12,
  tableMaxCellChars: 120,
});
console.log(summary.ndjson);

const sheets = await workbook.inspect({
  kind: "sheet",
  include: "id,name",
  maxChars: 4000,
});
console.log("SHEETS");
console.log(sheets.ndjson);
