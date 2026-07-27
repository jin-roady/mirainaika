import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

process.on("uncaughtException", (error) => {
  console.error(`UPDATE_ERROR: ${error.message}`);
  process.exitCode = 1;
});

const source = await FileBlob.load("./source.xlsx");
const workbook = await SpreadsheetFile.importXlsx(source);

const excludedRows = [
  [
    "2026-07-26",
    "修正後の修正③",
    "サーマニードルEVO同意書差し替え、ララドクター詳細・注意事項・副作用の並びと文言、施術不可条件・保護者同意書を更新、料金表削除",
    "未対応",
    "対象外",
    2.5,
    "既存施術ページの文言・構成・添付書類・価格表の修正。",
    "2026-07-26 受信",
  ],
  [
    "2026-07-26",
    "修正後の修正④",
    "美肌治療ページのスマホ表題を短縮・改行調整（サーマニードルEVO、ダーマペン4、KOライト、ララドクター、リバースピール、タトゥー除去、ピコレーザー）",
    "未対応",
    "対象外",
    1,
    "既存ページの表題文言・スマホ表示調整。",
    "2026-07-26 受信",
  ],
  [
    "2026-07-26",
    "修正後の修正⑤",
    "各施術の説明・同意書表記と保護者同意書カード文言を統一",
    "未対応",
    "対象外",
    0.5,
    "全施術の既存書類カードの文言修正。",
    "2026-07-26 受信",
  ],
  [
    "2026-07-26",
    "修正後の修正⑥",
    "マッサージピール・リバースピールのホームケア製品名と料金表示をスマホ表示へ調整",
    "未対応",
    "対象外",
    0.5,
    "既存施術ページの文言・レスポンシブ表示調整。",
    "2026-07-26 受信",
  ],
  [
    "2026-07-27",
    "修正後の修正⑦",
    "問診票PDFの不足・ウルティムガン同意書リンク・ララドクターMENU／表題を修正",
    "一部対応済み／要確認",
    "対象外",
    1,
    "既存添付書類導線・MENU・表題の修正。問診票と同意書リンクは対応済みのため、残件を要確認。",
    "2026-07-27 受信（7/26送信分の追記を含む）",
  ],
];

const mailRows = [
  ["2026-07-26", "修正後の修正③", "サーマニードルEVO同意書、ララドクター詳細・料金表・施術不可条件の修正"],
  ["2026-07-26", "修正後の修正④", "美肌治療ページのスマホ表題を短縮・改行調整"],
  ["2026-07-26", "修正後の修正⑤", "説明・同意書表記、保護者同意書カード文言の統一"],
  ["2026-07-26", "修正後の修正⑥", "マッサージピール・リバースピールのホームケア表示調整"],
  ["2026-07-27", "修正後の修正⑦", "問診票PDF、同意書リンク、ララドクターMENU／表題の修正"],
];

const excluded = workbook.worksheets.getItem("見積対象外");
// Row 38 is the existing subtotal. Reuse its styling after the five appended records.
excluded.getRange("A38:H38").copyTo(excluded.getRange("A43:H43"), "all");
excluded.getRange("A37:H37").copyTo(excluded.getRange("A38:H42"), "all");
excluded.getRange("A38:H42").values = excludedRows;
excluded.getRange("A43:H43").values = [[
  "小計",
  "見積対象外",
  "既存ページ修正、文言差し替え、価格表差し替え、MENU/FAQ削除、注意事項追加、画像・添付差し替え等",
  "-",
  "対象外",
  null,
  null,
  null,
]];
excluded.getRange("F43").formulas = [["=SUM(F2:F42)"]];
excluded.getRange("A38:H43").format.wrapText = true;
excluded.getRange("A38:H42").format.rowHeight = 56;

const overview = workbook.worksheets.getItem("概要");
overview.getRange("B6").values = [["41件（修正後の修正③〜⑦を含む）"]];
overview.getRange("B14").values = [["Notionの小計行は既存の修正依頼を反映済み。今回、最新メールの「修正後の修正③〜⑦」を追記（⑦は一部対応済み・残件要確認）。"]];
overview.getRange("B14").format.wrapText = true;

const mail = workbook.worksheets.getItem("メール一覧");
mail.getRange("A41:D41").copyTo(mail.getRange("A42:D46"), "all");
mail.getRange("A42:C46").values = mailRows;
mail.getRange("D42:D46").values = Array.from({ length: 5 }, () => ["メールを開く"]);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save("./みらい内科クリニック_美容サイト改修_見積切り分け表_更新.xlsx");

const check = await workbook.inspect({
  kind: "table",
  range: "見積対象外!A36:H43",
  maxChars: 8000,
  tableMaxRows: 12,
  tableMaxCols: 8,
  tableMaxCellChars: 160,
});
console.log(check.ndjson);
const mailCheck = await workbook.inspect({
  kind: "table",
  range: "メール一覧!A39:D46",
  maxChars: 6000,
  tableMaxRows: 10,
  tableMaxCols: 4,
  tableMaxCellChars: 120,
});
console.log(mailCheck.ndjson);

for (const sheetName of ["概要", "見積対象外", "メール一覧"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1.2, format: "png" });
  await fs.writeFile(`./preview-${sheetName}.png`, new Uint8Array(await preview.arrayBuffer()));
}
