import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "/Users/jin/Roady.net Dropbox/矢吹仁/_jp-roady/01_業務/000_みらい内科クリニック/みらい内科クリニック 美容サイト改修 見積切り分け表.xlsx";
const outputDir = "/Applications/MAMP/htdocs/mirai_html/outputs/mirai-clinic-updates";

const input = await FileBlob.load(sourcePath);
const workbook = await SpreadsheetFile.importXlsx(input);
const outsideSheet = workbook.worksheets.getItem("見積対象外");

// The source currently ends with request ⑦ on row 42 and the subtotal on row 43.
outsideSheet.getRange("A44:H44").copyFrom(outsideSheet.getRange("A43:H43"), "all");
outsideSheet.getRange("A43:H43").copyFrom(outsideSheet.getRange("A42:H42"), "all");
outsideSheet.getRange("A43:H43").values = [[
  "2026-07-27",
  "修正後の修正⑧",
  "ウルティムガン説明・同意書の差し替え、炭酸ガスレーザー問診票の名称変更、価格表の表示順変更・追加麻酔注射削除、ピアモリフティングの修正依頼",
  "未対応",
  "対象外",
  "",
  "添付: ウルティムガン説明・同意書、CO2レーザー問診票。メール本文はピアモリフティングの項目名までで、具体的な修正内容の記載なし。",
  "メール件名: 修正後の修正⑧（2026-07-27 15:59受信）",
]];
outsideSheet.getRange("A43:H43").format.rowHeight = 48;
outsideSheet.getRange("F44").formulas = [["=SUM(F2:F43)"]];

const check = await workbook.inspect({
  kind: "table,formula",
  sheetId: "見積対象外",
  range: "A38:H44",
  maxChars: 6000,
  tableMaxRows: 10,
  tableMaxCols: 8,
  tableMaxCellChars: 180,
});
console.log(check.ndjson);

const formulaErrors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(formulaErrors.ndjson);

await fs.mkdir(outputDir, { recursive: true });
for (const sheet of workbook.worksheets.items) {
  const preview = await workbook.render({
    sheetName: sheet.name,
    autoCrop: "all",
    scale: 1,
    format: "png",
  });
  await fs.writeFile(
    `${outputDir}/${sheet.name}-final.png`,
    new Uint8Array(await preview.arrayBuffer()),
  );
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/みらい内科クリニック 美容サイト改修 見積切り分け表.xlsx`);
