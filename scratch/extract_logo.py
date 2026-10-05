import fitz
import os

pdf_path = r'C:\Users\deise\.gemini\antigravity\brain\83ff686c-d441-4b3d-b6f0-8229d8ea92a6\.user_uploaded\media_1791193435827.pdf'
doc = fitz.open(pdf_path)

out_dir = r'c:\Users\deise\Desktop\Aula08MatMov\public'
os.makedirs(out_dir, exist_ok=True)

# Page 1 first image is the logo
page1 = doc[0]
imgs = page1.get_images()
print("Images on page 1:", len(imgs))

for i, img in enumerate(imgs):
    xref = img[0]
    base = doc.extract_image(xref)
    ext = base['ext']
    filename = f"matmov_logo.{ext}" if i == 0 else f"page1_img_{i}.{ext}"
    dest = os.path.join(out_dir, filename)
    with open(dest, "wb") as f:
        f.write(base['image'])
    print(f"Extracted: {dest} ({base['width']}x{base['height']})")

# Also extract page 2 diagrams just in case
page2 = doc[1]
for i, img in enumerate(page2.get_images()):
    xref = img[0]
    base = doc.extract_image(xref)
    ext = base['ext']
    dest = os.path.join(out_dir, f"aula7_diagram_{i}.{ext}")
    with open(dest, "wb") as f:
        f.write(base['image'])
    print(f"Extracted page 2: {dest} ({base['width']}x{base['height']})")
