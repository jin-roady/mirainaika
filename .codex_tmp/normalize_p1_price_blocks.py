from pathlib import Path
import re

ROOT = Path("/Applications/MAMP/htdocs/mirai_html")


def option(toggle_id: str, title: str, body: str, comment: str | None = None) -> str:
    lead = f"\t\t\t\t\t\t<!-- {comment} -->\n" if comment else ""
    return (
        f"{lead}"
        f"\t\t\t\t\t\t<div class=\"option\">\n"
        f"\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"{toggle_id}\" class=\"toggle\">\n"
        f"\t\t\t\t\t\t\t<label class=\"title\" for=\"{toggle_id}\">{title}</label>\n"
        f"\t\t\t\t\t\t\t<div class=\"content\">\n"
        f"\t\t\t\t\t\t\t\t<div class=\"content-wrapper\">\n"
        f"{body}\n"
        f"\t\t\t\t\t\t\t\t</div>\n"
        f"\t\t\t\t\t\t\t</div>\n"
        f"\t\t\t\t\t\t</div>\n"
    )


def rows(items, indent="\t\t\t\t\t\t\t\t\t"):
    out = []
    for item in items:
        out.append(f"{indent}<div>")
        if len(item) == 1:
            out.append(f"{indent}\t<p>{item[0]}</p>")
        else:
            out.append(f"{indent}\t<p>{item[0]}</p>")
            out.append(f"{indent}\t<p>{item[1]}</p>")
        out.append(f"{indent}</div>")
    return "\n".join(out)


EVO = option("toggle-evo", "サーマニードルEVO", rows([
    ("○全顔ニードルRFのみ",),
    ("・ノーマルコース（麻酔込み）", "38,500円"),
    ("・オーダーメイドコース（麻酔込み）", "44,000円"),
    ("・肝斑コース（麻酔なし）", "33,000円"),
    ("・上記3つのコースに首追加", "＋5,500円"),
    ("・首のみコース（麻酔込み）", "22,000円"),
    ("○追加薬剤（薬剤の併用でより高い効果を発揮します）",),
    ("・BENEV", "12,000円"),
    ("・サイトケア532", "12,000円"),
    ("・マックーム", "11,000円"),
    ("・ラコス", "11,000円"),
    ("・ピンクグロー", "11,000円"),
    ("・ダームエデンプロ", "8,800円"),
    ("・エクソソーム", "5,500円"),
    ("・上記7つの追加薬剤にエクソソームをさらに追加", "＋3,300円"),
    ("○オプション",),
    ("・KOライト", "2,200円"),
    ("・KOライト＋パック", "3,650円"),
]), "サーマニードルEVO")

ULTIMGUN = option("toggle16", "ウルティムガン（メソガン）", rows([
    ("・サイトケア532", "27,000円"),
    ("・ピンクグロー", "24,000円"),
    ("・OCカクテル", "24,000円"),
    ("・ダームエデンプロ", "24,000円"),
    ("○オプション",),
    ("・サイトケア532", "4,000円"),
    ("・ピンクグロー", "3,000円"),
    ("・ヒアルロン酸", "3,000円"),
    ("・ダームエデンプロ", "3,000円"),
]), "ウルティムガン（メソガン）")

DERMAPEN = option("toggle11", "ダーマペン4", rows([
    ("・ハイラアクティブ", "20,000円"),
    ("・CLRローション", "21,000円"),
    ("・レチナールアクティブ", "21,000円"),
    ("・ウーバーピール", "24,000円"),
    ("・ピンクグロー", "27,000円"),
    ("・ヴェルヴェットスキン", "27,000円"),
    ("・ダームエデンプロ", "27,500円"),
    ("・ヴェルヴェットビーム", "28,600円"),
    ("・サイトケア532", "30,000円"),
    ("・BENEV", "31,000円"),
]))

LIFTERA = option("toggle12", "リフテラV", rows([
    ("・全顔(6,000shot)", "39,000円"),
    ("・全顔プレミアム(9,000shot)", "55,000円"),
    ("・目元(2,500shot)", "22,000円"),
    ("・フェイスライン(2,500shot)", "22,000円"),
]))

PIAMO = option("toggle14", "PIAMOリフティング", rows([
    ("・頬＋顎下（クアトロ＋チェロ）", "49,000円"),
    ("・頬＋顎下（クアトロ）", "33,000円"),
    ("・頬＋顎下（チェロ）", "22,000円"),
    ("・目元（クアトロ＋チェロ）", "23,000円"),
    ("・目元（クアトロ）", "15,000円"),
    ("・目元（チェロ）", "13,000円"),
    ("・額（チェロ）", "7,700円"),
    ("・首＋顎下（チェロ）", "9,900円"),
    ("・首（チェロ）", "7,700円"),
    ("・ボディ１部位（10cm×15cm×2）（クアトロ）", "55,000円"),
    ("・ボディ１部位（10cm×15cm×2）（チェロ）", "33,000円"),
]), "PIAMOリフティング")

REPLACEMENTS = [
    (re.compile(r'\s*<!-- サーマニードルEVO -->[\s\S]*?(?=\s*<!-- KOライト -->)'), "\n" + EVO),
    (re.compile(r'\s*<!-- ウルティムガン（メソガン） -->[\s\S]*?(?=\s*<div class="option">\s*<input type="checkbox" id="toggle11")'), "\n" + ULTIMGUN),
    (re.compile(r'\s*<div class="option">\s*<input type="checkbox" id="toggle11"[\s\S]*?(?=\s*<div class="option">\s*<input type="checkbox" id="toggle12")'), "\n" + DERMAPEN),
    (re.compile(r'\s*<div class="option">\s*<input type="checkbox" id="toggle12"[\s\S]*?(?=\s*<!-- PIAMOリフティング -->)'), "\n" + LIFTERA),
    (re.compile(r'\s*<!-- PIAMOリフティング -->[\s\S]*?(?=\s*<div class="option">\s*<input type="checkbox" id="toggle15")'), "\n" + PIAMO),
]

updated = []
for path in sorted(ROOT.glob("*.html")):
    text = path.read_text(encoding="utf-8")
    if "beauty-price-wrapper" not in text:
        continue
    new = text
    for pattern, replacement in REPLACEMENTS:
        new, count = pattern.subn(replacement, new, count=1)
        if count != 1:
            raise RuntimeError(f"{path.name}: replacement failed for {pattern.pattern[:40]}")
    if new != text:
        path.write_text(new, encoding="utf-8")
        updated.append(path.name)

print("\n".join(updated))
print(f"normalized files: {len(updated)}")
