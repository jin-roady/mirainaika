import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const source = await FileBlob.load("./source.xlsx");
const workbook = await SpreadsheetFile.importXlsx(source);

console.log(
  (await workbook.inspect({
    kind: "workbook,sheet,table",
    maxChars: 12000,
    tableMaxRows: 80,
    tableMaxCols: 12,
    tableMaxCellChars: 180,
  })).ndjson,
);

const sheets = await workbook.inspect({ kind: "sheet", include: "id,name" });
console.log(sheets.ndjson);

const sheetName = "見積切り分け表";
const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1.25, format: "png" });
await fs.writeFile("./sheet-preview.png", new Uint8Array(await preview.arrayBuffer()));
