import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "/Users/jin/Roady.net Dropbox/矢吹仁/_jp-roady/01_業務/000_みらい内科クリニック/みらい内科クリニック 美容サイト改修 見積切り分け表.xlsx";
const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

for (const [sheetId, range] of [
  ["見積対象外", "A1:H20"],
  ["メール一覧", "A1:D45"],
  ["概要", "A1:B15"],
]) {
  const values = await workbook.inspect({
    kind: "region",
    sheetId,
    range,
    maxChars: 20000,
    tableMaxRows: 60,
    tableMaxCols: 12,
    tableMaxCellChars: 180,
  });
  console.log(`--- ${sheetId} ${range} ---`);
  console.log(values.ndjson);
  const styles = await workbook.inspect({
    kind: "computedStyle",
    sheetId,
    range,
    maxChars: 8000,
  });
  console.log(`--- STYLE ${sheetId} ${range} ---`);
  console.log(styles.ndjson);
}
