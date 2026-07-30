import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "/Users/jin/Roady.net Dropbox/矢吹仁/_jp-roady/01_業務/000_みらい内科クリニック/みらい内科クリニック 美容サイト改修 見積切り分け表.xlsx";
const outputDir = "/Applications/MAMP/htdocs/mirai_html/outputs/mirai-clinic-updates";

const input = await FileBlob.load(sourcePath);
const workbook = await SpreadsheetFile.importXlsx(input);
const outsideSheet = workbook.worksheets.getItem("見積対象外");

// The source currently ends with request ⑧ on row 43 and the subtotal on row 44.
outsideSheet.getRange("A48:H48").copyFrom(outsideSheet.getRange("A44:H44"), "all");
outsideSheet.getRange("A44:H44").copyFrom(outsideSheet.getRange("A43:H43"), "all");
outsideSheet.getRange("A45:H45").copyFrom(outsideSheet.getRange("A43:H43"), "all");
outsideSheet.getRange("A46:H46").copyFrom(outsideSheet.getRange("A43:H43"), "all");
outsideSheet.getRange("A47:H47").copyFrom(outsideSheet.getRange("A43:H43"), "all");
outsideSheet.getRange("A44:H44").values = [[
  "2026-07-28",
  "修正後の修正⑧ 追加対応",
  "炭酸ガスレーザー問診票リンク差し替え、美肌治療価格表の炭酸ガスレーザー表記変更・追加麻酔注射削除、ピアモリフティングのボディ表記・スマホ行頭調整、共通20ページへ反映",
  "対応済み",
  "対象外",
  "",
  "既存ページ・共通価格表のリンク、文言、レスポンシブ表示を修正。新規サービス追加は含まれない。",
  "チャット依頼（2026-07-27～2026-07-28）",
]];
outsideSheet.getRange("A44:H44").format.rowHeight = 84;
outsideSheet.getRange("A45:H45").values = [[
  "2026-07-27",
  "修正後の修正⑨",
  "ダーマペン4のセクション間隔・表示順変更、施術不可条件のPC／スマホ改行調整。ピアモリフティングの対象部位表記を「ボディー」から「ボディ」へ変更",
  "未対応",
  "対象外",
  "",
  "既存ページの構成・文言・レスポンシブ改行調整。添付画像4点による表示指示を含む。",
  "メール件名: 修正後の修正⑨（2026-07-27 23:49受信）",
]];
outsideSheet.getRange("A45:H45").format.rowHeight = 84;
outsideSheet.getRange("A46:H46").values = [[
  "2026-07-28",
  "修正後の修正⑩（タトゥー除去・レーザーフェイシャル）",
  "タトゥー除去の施術不可条件へ10項目を赤文字で追加。レーザーフェイシャルの注意事項を「メイクは施術翌日から可能」から「施術当日から可能」へ変更",
  "未対応",
  "対象外",
  "",
  "既存ページの施術不可条件・注意事項の追記および文言変更。添付画像2点を含む。",
  "メール件名: 修正後の修正⑩（2026-07-28 00:03受信）",
]];
outsideSheet.getRange("A46:H46").format.rowHeight = 84;
outsideSheet.getRange("A47:H47").values = [[
  "2026-07-28",
  "修正後の修正⑩（価格表スマホ表示）",
  "美肌治療価格表すべてについて、スマホ縦・横画面の右側余白を減らし、施術内容を左・価格を右に配置。施術内容の2段表示や文字サイズ調整も含めて見やすくする",
  "未対応",
  "対象外",
  "",
  "6/27美容修正P2の追加調整。既存の共通価格表に対するレスポンシブ表示改善。添付画像3点を含む。",
  "メール件名: 修正後の修正⑩（2026-07-28 08:48受信）",
]];
outsideSheet.getRange("A47:H47").format.rowHeight = 84;
outsideSheet.getRange("A44:H47").format.wrapText = true;
outsideSheet.getRange("F48").formulas = [["=SUM(F2:F47)"]];

const check = await workbook.inspect({
  kind: "table,formula",
  sheetId: "見積対象外",
  range: "A40:H48",
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
