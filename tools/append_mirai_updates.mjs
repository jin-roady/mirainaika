import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "/Users/jin/Roady.net Dropbox/矢吹仁/_jp-roady/01_業務/000_みらい内科クリニック/みらい内科クリニック 美容サイト改修 見積切り分け表.xlsx";
const outputDir = "/Applications/MAMP/htdocs/mirai_html/outputs/mirai-clinic-updates";

const input = await FileBlob.load(sourcePath);
const workbook = await SpreadsheetFile.importXlsx(input);

const outsideSheet = workbook.worksheets.getItem("見積対象外");
const p3Row = outsideSheet.getRange("C18:G18");
p3Row.values = [[
  "美容問診票PDF差し替え、マッサージピール・リバースピール同意書追加、全ページの書類カード配色統一・下線削除",
  "対応済み",
  "対象外",
  2,
  "添付PDF差し替え、同意書配置、全ページの問診票・同意書カードの配色統一を反映。",
]];

outsideSheet.getRange("A36:H36").copyFrom(outsideSheet.getRange("A31:H31"), "all");
outsideSheet.getRange("A27:H27").copyFrom(outsideSheet.getRange("A18:H18"), "all");
outsideSheet.getRange("A27:H27").values = [[
  "2026-07-10",
  "ウルティムガン追加修正",
  "施術詳細・料金表・ラインナップ・同意書カードの修正",
  "対応済み",
  "対象外",
  2.5,
  "既存ページの文言・構成・書類導線・カード配色を修正。",
  "添付画像（2026-07-10）",
]];
outsideSheet.getRange("A27:H27").format.rowHeight = 30;

const latestRequests = [
  [
    "2026-07-10",
    "美容サイト ②（リフテラV）",
    "表題変更、施術詳細・副作用・注意点・施術不可条件の更新、新同意書への差し替え",
    "未対応",
    "対象外",
    "",
    "メール件名: 美容サイト ②。TDTテクノロジー後の詳細セクション追加を含む。",
    "2026-07-10 受信",
  ],
  [
    "2026-07-10",
    "美容サイト ③（ピアモリフティング）",
    "表題・MENU表記・詳細・施術不可条件の更新、料金表削除、新同意書差し替え、価格表表記修正",
    "未対応",
    "対象外",
    "",
    "メール件名: 美容サイト ③。美肌治療価格表内のボディ表記修正を含む。",
    "2026-07-10 受信",
  ],
  [
    "2026-07-10",
    "美容サイト ④（ダーマペン4）",
    "施術詳細の並び・文言更新、ラインナップ見出し変更・並び替え、施術不可条件更新、注意項目削除、新同意書差し替え",
    "未対応",
    "対象外",
    "",
    "メール件名: 美容サイト ④。施術時に注意が必要な方セクションの削除を含む。",
    "2026-07-10 受信",
  ],
];

for (const [index, request] of latestRequests.entries()) {
  const row = 28 + index;
  outsideSheet.getRange(`A${row}:H${row}`).copyFrom(outsideSheet.getRange("A27:H27"), "all");
  outsideSheet.getRange(`A${row}:H${row}`).values = [request];
  outsideSheet.getRange(`A${row}:H${row}`).format.rowHeight = 42;
}

const additionalRequests = [
  [
    "2026-07-10",
    "美肌サイト ⑤（炭酸ガスレーザー）",
    "表題・施術不可見出しの変更、料金削除、アフターケア文言更新、美肌治療価格表の表示内容更新",
    "未対応",
    "対象外",
    "",
    "メール件名: 美容サイト ⑤。ほくろ・首イボの価格表を含む。",
    "2026-07-10 受信",
  ],
  [
    "2026-07-10",
    "美肌サイト ⑥（タトゥー除去）",
    "日焼け注意文の修正、説明文修正、注意事項・副作用・リスクの再構成、施術不可条件の追加",
    "未対応",
    "対象外",
    "",
    "メール件名: 美肌サイト ⑥。タトゥー除去レーザーのリスクセクション削除を含む。",
    "2026-07-10 受信",
  ],
  [
    "2026-07-10",
    "美肌サイト ⑦（レーザーフェイシャル）",
    "表題デザイン・説明文の更新、施術詳細・注意事項・副作用・リスクなどの追加",
    "未対応",
    "対象外",
    "",
    "メール件名: 美肌サイト ⑦。対象症状、施術時間、注意事項の追加を含む。",
    "2026-07-10 受信",
  ],
  [
    "2026-07-10",
    "美肌サイト ⑧（YAGレーザーシャワー）",
    "表題デザイン・説明文の更新、施術詳細・注意事項・副作用・リスクなどの追加",
    "未対応",
    "対象外",
    "",
    "メール件名: 美肌サイト ⑧。対象症状、施術時間、注意事項の追加を含む。",
    "2026-07-10 受信",
  ],
  [
    "2026-07-10",
    "美肌サイト ⑨（YAGリフトアップレーザー）",
    "表題デザイン・説明文の更新、施術詳細・注意事項・副作用・リスクなどの追加",
    "未対応",
    "対象外",
    "",
    "メール件名: 美肌サイト ⑨。対象症状、施術時間、注意事項の追加を含む。",
    "2026-07-10 受信",
  ],
];

for (const [index, request] of additionalRequests.entries()) {
  const row = 31 + index;
  outsideSheet.getRange(`A${row}:H${row}`).copyFrom(outsideSheet.getRange("A30:H30"), "all");
  outsideSheet.getRange(`A${row}:H${row}`).values = [request];
  outsideSheet.getRange(`A${row}:H${row}`).format.rowHeight = 42;
}

outsideSheet.getRange("F36").formulas = [["=SUM(F2:F35)"]];

const check = await workbook.inspect({
  kind: "table,formula",
  sheetId: "見積対象外",
  range: "A18:H36",
  maxChars: 8000,
  tableMaxRows: 20,
  tableMaxCols: 8,
  tableMaxCellChars: 160,
});
console.log(check.ndjson);

await fs.mkdir(outputDir, { recursive: true });
for (const sheet of workbook.worksheets.items) {
  const preview = await workbook.render({ sheetName: sheet.name, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(`${outputDir}/${sheet.name}-final.png`, new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/みらい内科クリニック 美容サイト改修 見積切り分け表.xlsx`);

await fs.mkdir(outputDir, { recursive: true });
for (const sheet of workbook.worksheets.items) {
  const preview = await workbook.render({ sheetName: sheet.name, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(`${outputDir}/${sheet.name}.png`, new Uint8Array(await preview.arrayBuffer()));
}
