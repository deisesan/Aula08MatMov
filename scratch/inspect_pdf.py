import fitz

doc = fitz.open(r'C:\Users\deise\.gemini\antigravity\brain\83ff686c-d441-4b3d-b6f0-8229d8ea92a6\.user_uploaded\media_1791193435827.pdf')
for i, page in enumerate(doc):
    print(f"=== PAGE {i+1} ===")
    blocks = page.get_text('dict')['blocks']
    for b in blocks:
        if 'lines' in b:
            for l in b['lines']:
                line_text = "".join(s['text'] for s in l['spans'])
                s0 = l['spans'][0]
                print(f"TEXT: {line_text!r} | font={s0['font']} | size={s0['size']:.1f} | color=#{s0['color']:06x} | flags={s0['flags']}")
        elif 'image' in b:
            print("IMAGE block:", b.get('width'), b.get('height'), b.get('bbox'))
