from pathlib import Path
import re

ROOT = Path("/Applications/MAMP/htdocs/mirai_html")


def option_pattern(toggle_id: str, title: str) -> re.Pattern:
    return re.compile(
        rf'(?P<prefix>\s*<div class="option">\s*'
        rf'<input type="checkbox" id="{re.escape(toggle_id)}" class="toggle">\s*'
        rf'<label class="title" for="{re.escape(toggle_id)}">{re.escape(title)}</label>\s*'
        rf'<div class="content">\s*'
        rf'<div class="content-wrapper">)'
        rf'(?P<body>.*?)'
        rf'(?P<suffix>\s*</div>\s*</div>\s*</div>)',
        re.S,
    )


def replace_option(html: str, toggle_id: str, title: str, body: str) -> tuple[str, int]:
    pattern = option_pattern(toggle_id, title)
    return pattern.subn(lambda m: f"{m.group('prefix')}\n{body}\n{m.group('suffix')}", html)


EVO_BODY = """\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>○全顔ニードルRFのみ</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・ノーマルコース（麻酔込み）</p>
\t\t\t\t\t\t\t\t\t\t\t<p>38,500円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・オーダーメイドコース（麻酔込み）</p>
\t\t\t\t\t\t\t\t\t\t\t<p>44,000円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・肝斑コース（麻酔なし）</p>
\t\t\t\t\t\t\t\t\t\t\t<p>33,000円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・上記3つのコースに首追加</p>
\t\t\t\t\t\t\t\t\t\t\t<p>＋5,500円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・首のみコース（麻酔込み）</p>
\t\t\t\t\t\t\t\t\t\t\t<p>22,000円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>○追加薬剤（薬剤の併用でより高い効果を発揮します）</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・BENEV</p>
\t\t\t\t\t\t\t\t\t\t\t<p>12,000円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・サイトケア532</p>
\t\t\t\t\t\t\t\t\t\t\t<p>12,000円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・マックーム</p>
\t\t\t\t\t\t\t\t\t\t\t<p>11,000円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・ラコス</p>
\t\t\t\t\t\t\t\t\t\t\t<p>11,000円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・ピンクグロー</p>
\t\t\t\t\t\t\t\t\t\t\t<p>11,000円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・ダームエデンプロ</p>
\t\t\t\t\t\t\t\t\t\t\t<p>8,800円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・エクソソーム</p>
\t\t\t\t\t\t\t\t\t\t\t<p>5,500円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・上記7つの追加薬剤にエクソソームをさらに追加</p>
\t\t\t\t\t\t\t\t\t\t\t<p>＋3,300円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>○オプション</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・KOライト</p>
\t\t\t\t\t\t\t\t\t\t\t<p>2,200円</p>
\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t\t\t<p>・KOライト＋パック</p>
\t\t\t\t\t\t\t\t\t\t\t<p>3,650円</p>
\t\t\t\t\t\t\t\t\t\t</div>"""

ULTIMGUN_BODY = """\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・サイトケア532</p>
\t\t\t\t\t\t\t\t\t<p>27,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ピンクグロー</p>
\t\t\t\t\t\t\t\t\t<p>24,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・OCカクテル</p>
\t\t\t\t\t\t\t\t\t<p>24,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ダームエデンプロ</p>
\t\t\t\t\t\t\t\t\t<p>24,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>○オプション</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・サイトケア532</p>
\t\t\t\t\t\t\t\t\t<p>4,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ピンクグロー</p>
\t\t\t\t\t\t\t\t\t<p>3,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ヒアルロン酸</p>
\t\t\t\t\t\t\t\t\t<p>3,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ダームエデンプロ</p>
\t\t\t\t\t\t\t\t\t<p>3,000円</p>
\t\t\t\t\t\t\t\t</div>"""

DERMAPEN_BODY = """\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ハイラアクティブ</p>
\t\t\t\t\t\t\t\t\t<p>20,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・CLRローション</p>
\t\t\t\t\t\t\t\t\t<p>21,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・レチナールアクティブ</p>
\t\t\t\t\t\t\t\t\t<p>21,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ウーバーピール</p>
\t\t\t\t\t\t\t\t\t<p>24,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ピンクグロー</p>
\t\t\t\t\t\t\t\t\t<p>27,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ヴェルヴェットスキン</p>
\t\t\t\t\t\t\t\t\t<p>27,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ダームエデンプロ</p>
\t\t\t\t\t\t\t\t\t<p>27,500円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ヴェルヴェットビーム</p>
\t\t\t\t\t\t\t\t\t<p>28,600円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・サイトケア532</p>
\t\t\t\t\t\t\t\t\t<p>30,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・BENEV</p>
\t\t\t\t\t\t\t\t\t<p>31,000円</p>
\t\t\t\t\t\t\t\t</div>"""

LIFTERA_BODY = """\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・全顔(6,000shot)</p>
\t\t\t\t\t\t\t\t\t<p>39,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・全顔プレミアム(9,000shot)</p>
\t\t\t\t\t\t\t\t\t<p>55,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・目元(2,500shot)</p>
\t\t\t\t\t\t\t\t\t<p>22,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・フェイスライン(2,500shot)</p>
\t\t\t\t\t\t\t\t\t<p>22,000円</p>
\t\t\t\t\t\t\t\t</div>"""

PIAMO_BODY = """\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・頬＋顎下（クアトロ＋チェロ）</p>
\t\t\t\t\t\t\t\t\t<p>49,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・頬＋顎下（クアトロ）</p>
\t\t\t\t\t\t\t\t\t<p>33,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・頬＋顎下（チェロ）</p>
\t\t\t\t\t\t\t\t\t<p>22,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・目元（クアトロ＋チェロ）</p>
\t\t\t\t\t\t\t\t\t<p>23,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・目元（クアトロ）</p>
\t\t\t\t\t\t\t\t\t<p>15,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・目元（チェロ）</p>
\t\t\t\t\t\t\t\t\t<p>13,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・額（チェロ）</p>
\t\t\t\t\t\t\t\t\t<p>7,700円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・首＋顎下（チェロ）</p>
\t\t\t\t\t\t\t\t\t<p>9,900円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・首（チェロ）</p>
\t\t\t\t\t\t\t\t\t<p>7,700円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ボディ１部位（10cm×15cm×2）（クアトロ）</p>
\t\t\t\t\t\t\t\t\t<p>55,000円</p>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t\t\t<p>・ボディ１部位（10cm×15cm×2）（チェロ）</p>
\t\t\t\t\t\t\t\t\t<p>33,000円</p>
\t\t\t\t\t\t\t\t</div>"""


def update_html(html: str) -> tuple[str, int]:
    changed = 0
    for toggle_id, title, body in [
        ("toggle-evo", "サーマニードルEVO", EVO_BODY),
        ("toggle16", "ウルティムガン（メソガン）", ULTIMGUN_BODY),
        ("toggle11", "ダーマペン4", DERMAPEN_BODY),
        ("toggle12", "リフテラV", LIFTERA_BODY),
        ("toggle14", "PIAMOリフティング", PIAMO_BODY),
    ]:
        html, count = replace_option(html, toggle_id, title, body)
        changed += count

    for toggle_id, title, edits in [
        ("toggle-ko", "KOライト", [("+2,200円", "2,200円")]),
        ("toggle4", "エレクトロポレーション", [("・エイジングコース", "・エイジングケアコース")]),
        ("toggle5", "ハイドラシャワー", [("1回 ", ""), ("1回", "")]),
    ]:
        pattern = option_pattern(toggle_id, title)
        def repl(m):
            body = m.group("body")
            for before, after in edits:
                body = body.replace(before, after)
            return f"{m.group('prefix')}{body}{m.group('suffix')}"
        html, count = pattern.subn(repl, html)
        changed += count

    return html, changed


updated = []
for path in sorted(ROOT.glob("*.html")):
    text = path.read_text(encoding="utf-8")
    if "beauty-price-wrapper" not in text:
        continue
    new_text, count = update_html(text)
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        updated.append((path.name, count))

print("\n".join(f"{name}: {count}" for name, count in updated))
print(f"updated files: {len(updated)}")
