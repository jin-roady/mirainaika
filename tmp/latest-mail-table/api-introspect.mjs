import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load("./source.xlsx"));
for (const name of ["見積対象外","メール一覧"]) { const s=wb.worksheets.getItem(name); console.log(name, Object.getOwnPropertyNames(Object.getPrototypeOf(s.tables)), s.tables.items?.length); const t=s.tables.getItemAt(0); console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(t))); }
