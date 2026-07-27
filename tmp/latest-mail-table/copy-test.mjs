import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

try {
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load("./source.xlsx"));
  const sheet = workbook.worksheets.getItem("見積対象外");
  console.log("copyTo", typeof sheet.getRange("A38:H38").copyTo);
  console.log("copyFrom", typeof sheet.getRange("A38:H38").copyFrom);
  sheet.getRange("A38:H38").copyTo(sheet.getRange("A43:H43"), "all");
  console.log("done");
} catch (error) {
  console.log("ERROR", error?.message);
  console.log(error?.stack?.split("\n").slice(-4).join("\n"));
}
