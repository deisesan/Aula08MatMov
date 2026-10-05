with open(r'c:\Users\deise\Desktop\Aula08MatMov\scratch\logo_b64.txt', 'r') as f:
    logo_src = f.read().strip()

html_content = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Lição de Casa — Aula 08 — Ensino de Matemática</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: A4 portrait;
      margin: 14mm 20mm 14mm 20mm;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #000000;
      background: #ffffff;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}

    .page {{
      width: 100%;
      min-height: 265mm;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }}

    .page:last-child {{
      page-break-after: avoid;
    }}

    /* Exact Header matching user's PDF */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }}

    .header-logo {{
      height: 48px;
      object-fit: contain;
    }}

    .header-title {{
      font-family: 'Luckiest Guy', cursive, sans-serif;
      font-size: 22px;
      color: #466c9b;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }}

    /* Title Block */
    .main-title-block {{
      text-align: center;
      margin: 24px 0 26px 0;
    }}

    .main-title {{
      font-family: 'Luckiest Guy', cursive, sans-serif;
      font-size: 27px;
      color: #466c9b;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 2px;
    }}

    .main-subtitle {{
      font-family: 'Luckiest Guy', cursive, sans-serif;
      font-size: 26px;
      color: #466c9b;
      letter-spacing: 0.5px;
    }}

    /* Lesson info */
    .lesson-meta {{
      margin-bottom: 24px;
    }}

    .lesson-meta .aula-num {{
      font-family: 'Poppins', sans-serif;
      font-size: 14.5px;
      font-weight: 700;
      color: #466c9b;
      margin-bottom: 3px;
    }}

    .lesson-meta .tema {{
      font-family: 'Poppins', sans-serif;
      font-size: 14.5px;
      font-weight: 700;
      color: #466c9b;
    }}

    /* Question blocks */
    .question-block {{
      margin-bottom: 22px;
    }}

    .question-title {{
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #466c9b;
      margin-bottom: 10px;
    }}

    .question-desc {{
      font-size: 13.5px;
      color: #000000;
      font-weight: 600;
      margin-bottom: 12px;
      line-height: 1.45;
      text-align: justify;
    }}

    .guidance-box {{
      font-size: 12.5px;
      color: #000000;
      font-weight: 400;
      line-height: 1.45;
      margin-bottom: 16px;
      text-align: justify;
    }}

    .guidance-bold {{
      font-weight: 600;
    }}

    /* Bullet list */
    .items-list {{
      list-style-type: none;
      padding-left: 2px;
    }}

    .item-row {{
      font-size: 13px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 11px;
      display: flex;
      align-items: baseline;
      gap: 10px;
      line-height: 1.4;
    }}

    .bullet {{
      font-size: 14px;
    }}

    .bullet-red {{
      color: #ee0000;
    }}

    .bullet-black {{
      color: #000000;
    }}

    .example-text {{
      color: #ee0000;
    }}

    /* Diagram wrapper */
    .diagram-wrap {{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 6px 0 14px 0;
    }}

    .diagram-wrap svg {{
      max-width: 440px;
      height: auto;
    }}

    .subitems-list {{
      margin-top: 10px;
    }}

    .subitem {{
      font-size: 12.5px;
      color: #000000;
      margin-bottom: 9px;
      line-height: 1.4;
      text-align: justify;
    }}

    .subitem strong {{
      font-weight: 700;
    }}

    .formula {{
      font-family: inherit;
      font-weight: 600;
    }}
  </style>
</head>
<body>

  <!-- ==================== PÁGINA 1 ==================== -->
  <div class="page">
    <!-- Header: Exact match to user's uploaded PDF -->
    <div class="header">
      <img src="{logo_src}" alt="MAT MOV" class="header-logo" />
      <div class="header-title">ENSINO DE MATEMÁTICA</div>
    </div>

    <!-- Main Title: Exact match to user's uploaded PDF -->
    <div class="main-title-block">
      <div class="main-title">LIÇÃO DE CASA</div>
      <div class="main-subtitle">1° ano</div>
    </div>

    <!-- Lesson Info -->
    <div class="lesson-meta">
      <div class="aula-num">AULA 8</div>
      <div class="tema">TEMA DA AULA: Triângulos: Teorema de Pitágoras e Relações Métricas</div>
    </div>

    <!-- Question 1 -->
    <div class="question-block">
      <div class="question-title">Questão 1</div>
      <div class="question-desc">
        Em cada caso abaixo, use o Teorema de Pitágoras (a² = b² + c²) para calcular a medida desconhecida do triângulo retângulo sem confundir os catetos com a hipotenusa.
      </div>
      <div class="guidance-box">
        Para calcular o lado que falta, primeiro identifique a hipotenusa e os catetos. <span class="guidance-bold">A hipotenusa (a) é sempre o maior lado do triângulo retângulo e está oposta ao ângulo de 90°.</span> Se você procura a hipotenusa, some os quadrados dos dois catetos: <span class="guidance-bold">a² = b² + c²</span>. Se você já tem a hipotenusa e procura um cateto, subtraia: <span class="guidance-bold">b² = a² - c²</span>.
      </div>

      <ul class="items-list">
        <li class="item-row example-text">
          <span class="bullet bullet-red">•</span>
          <div>
            Catetos: 3 cm e 4 cm. A hipotenusa mede <span style="text-decoration: underline; font-weight:700;">5 cm</span>. Fator / Cálculo: a² = 3² + 4² = 9 + 16 = 25 ⟹ a = √25 = 5 cm -> EXEMPLO
          </div>
        </li>
        <li class="item-row">
          <span class="bullet bullet-black">•</span>
          <div>
            Catetos: 6 cm e 8 cm. A hipotenusa mede ______ cm.
          </div>
        </li>
        <li class="item-row">
          <span class="bullet bullet-black">•</span>
          <div>
            Hipotenusa: 10 cm e um cateto: 6 cm. O outro cateto mede ______ cm.
          </div>
        </li>
        <li class="item-row">
          <span class="bullet bullet-black">•</span>
          <div>
            Catetos: 5 cm e 12 cm. A hipotenusa mede ______ cm.
          </div>
        </li>
        <li class="item-row">
          <span class="bullet bullet-black">•</span>
          <div>
            Hipotenusa: 25 cm e um cateto: 7 cm. O outro cateto mede ______ cm.
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- ==================== PÁGINA 2 ==================== -->
  <div class="page">
    <!-- Header: Exact match to user's uploaded PDF Page 2 -->
    <div class="header">
      <img src="{logo_src}" alt="MAT MOV" class="header-logo" />
      <div class="header-title">ENSINO DE MATEMÁTICA</div>
    </div>

    <!-- Question 2 -->
    <div class="question-block" style="margin-bottom: 24px;">
      <div class="question-title">Questão 2</div>

      <!-- Diagram Questão 2 -->
      <div class="diagram-wrap">
        <svg viewBox="0 0 500 180" width="460" height="165" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Sun rays -->
          <circle cx="430" cy="30" r="18" fill="#fbbf24" opacity="0.9" />
          <text x="350" y="24" fill="#d97706" font-size="12" font-style="italic" text-anchor="middle">raios de sol (paralelos)</text>
          <line x1="390" y1="40" x2="260" y2="140" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="5 3" />

          <!-- Ground -->
          <line x1="60" y1="140" x2="440" y2="140" stroke="#475569" stroke-width="2.5" />

          <!-- Pole (Poste de Luz vertical) -->
          <line x1="120" y1="30" x2="120" y2="140" stroke="#0284c7" stroke-width="6" stroke-linecap="round" />
          <path d="M108 30 H132 L136 38 H104 Z" fill="#facc15" />
          <circle cx="120" cy="40" r="4" fill="#fef08a" />

          <!-- Ladder (Escada inclinada L = ?) -->
          <line x1="120" y1="30" x2="260" y2="140" stroke="#e11d48" stroke-width="4" />
          <!-- Rungs -->
          <line x1="140" y1="46" x2="148" y2="52" stroke="#be123c" stroke-width="2" />
          <line x1="162" y1="63" x2="170" y2="69" stroke="#be123c" stroke-width="2" />
          <line x1="184" y1="80" x2="192" y2="86" stroke="#be123c" stroke-width="2" />
          <line x1="206" y1="97" x2="214" y2="103" stroke="#be123c" stroke-width="2" />
          <line x1="228" y1="114" x2="236" y2="120" stroke="#be123c" stroke-width="2" />

          <!-- Right angle symbol -->
          <rect x="120" y="125" width="15" height="15" fill="none" stroke="#0ea5e9" stroke-width="2" />
          <circle cx="127" cy="132" r="2" fill="#0ea5e9" />

          <!-- Labels -->
          <text x="85" y="85" fill="#0284c7" font-size="15" font-weight="bold" text-anchor="middle">12 m</text>
          <text x="85" y="99" fill="#64748b" font-size="10" text-anchor="middle">(Poste)</text>

          <path d="M 120 146 L 120 154 L 260 154 L 260 146" stroke="#475569" stroke-width="1.5" fill="none" />
          <text x="190" y="168" fill="#1e293b" font-size="13" font-weight="bold" text-anchor="middle">sombra / distância: 5 m</text>

          <text x="210" y="78" fill="#e11d48" font-size="16" font-weight="900">L = ?</text>
          <text x="210" y="93" fill="#be123c" font-size="10" font-weight="bold">(Escada)</text>
        </svg>
      </div>

      <div class="question-desc" style="font-weight:400;">
        Para realizar a manutenção na lâmpada de um poste vertical de 12 m de altura, uma equipe de eletricistas posiciona a base de uma escada a 5 m de distância da base do poste no solo plano. Os raios de sol chegam paralelos e o poste forma com o solo um ângulo reto de 90°.
      </div>

      <div class="subitems-list">
        <div class="subitem">
          <strong>a)</strong> Escreva quem é a hipotenusa e quem são os catetos nessa situação geométrica, justificando pelo ângulo de 90°.
        </div>
        <div class="subitem">
          <strong>b)</strong> Monte a equação pelo Teorema de Pitágoras e calcule o comprimento total L que a escada deve ter para alcançar o topo do poste.
        </div>
      </div>
    </div>

    <!-- Question 3 -->
    <div class="question-block">
      <div class="question-title">Questão 3</div>

      <!-- Diagram Questão 3 -->
      <div class="diagram-wrap">
        <svg viewBox="0 0 460 160" width="420" height="150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Hypotenuse base BC: B(50, 120), C(410, 120) -->
          <!-- Vertex A(150, 25) -->
          <line x1="50" y1="120" x2="150" y2="25" stroke="#3b82f6" stroke-width="2.8" />
          <line x1="150" y1="25" x2="410" y2="120" stroke="#3b82f6" stroke-width="2.8" />
          <line x1="50" y1="120" x2="410" y2="120" stroke="#3b82f6" stroke-width="2.8" />

          <!-- Height AH perpendicular to BC -->
          <line x1="150" y1="25" x2="150" y2="120" stroke="#ea580c" stroke-width="2.4" stroke-dasharray="5 3" />

          <!-- Right angle symbol at A -->
          <g transform="translate(150, 25) rotate(48)">
            <rect x="0" y="0" width="13" height="13" fill="none" stroke="#2563eb" stroke-width="1.8" />
            <circle cx="6.5" cy="6.5" r="1.5" fill="#2563eb" />
          </g>

          <!-- Right angle symbol at H -->
          <rect x="150" y="108" width="12" height="12" fill="none" stroke="#ea580c" stroke-width="1.8" />
          <circle cx="156" cy="114" r="1.5" fill="#ea580c" />

          <!-- Vertices Labels -->
          <text x="150" y="16" fill="#1e293b" font-size="14" font-weight="bold" text-anchor="middle">A</text>
          <text x="35" y="128" fill="#1e293b" font-size="14" font-weight="bold">B</text>
          <text x="418" y="128" fill="#1e293b" font-size="14" font-weight="bold">C</text>
          <text x="150" y="136" fill="#ea580c" font-size="13" font-weight="bold" text-anchor="middle">H</text>

          <!-- Labels on sides -->
          <text x="162" y="75" fill="#ea580c" font-size="13" font-weight="bold">h = ?</text>
          <text x="290" y="65" fill="#8b5cf6" font-size="13" font-weight="bold">b = AC = ?</text>

          <!-- Projections -->
          <path d="M 50 126 L 50 132 L 150 132 L 150 126" stroke="#0284c7" stroke-width="1.5" fill="none" />
          <text x="100" y="145" fill="#0284c7" font-size="11" font-weight="bold" text-anchor="middle">m = 9 cm</text>

          <path d="M 150 126 L 150 132 L 410 132 L 410 126" stroke="#10b981" stroke-width="1.5" fill="none" />
          <text x="280" y="145" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">n = 16 cm</text>
        </svg>
      </div>

      <div class="question-desc" style="font-weight:400;">
        No triângulo retângulo ABC (reto no vértice A), traça-se a altura relativa à hipotenusa <span class="formula">AH = h</span>, dividindo a hipotenusa <span class="formula">BC = a</span> em duas projeções ortogonais: <span class="formula">BH = m = 9 cm</span> e <span class="formula">HC = n = 16 cm</span>. Lembre: <span class="formula">h² = m · n</span> e <span class="formula">b² = a · n</span>.
      </div>

      <div class="subitems-list">
        <div class="subitem">
          <strong>a)</strong> Calcule a medida total da hipotenusa <span class="formula">a = BC</span> (Lembre: <span class="formula">a = m + n</span>).
        </div>
        <div class="subitem">
          <strong>b)</strong> Use a proporção métrica <span class="formula">h² = m · n</span> para calcular a altura <span class="formula">h</span>. Em seguida, calcule a medida do cateto <span class="formula">b = AC</span> por <span class="formula">b² = a · n</span>.
        </div>
        <div class="subitem">
          <strong>c)</strong> Se o segmento AH não formasse um ângulo reto com a hipotenusa, você ainda poderia usar essas relações métricas? Explique com suas palavras.
        </div>
      </div>
    </div>
  </div>

</body>
</html>
'''

with open(r'c:\Users\deise\Desktop\Aula08MatMov\generate_pdf.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
print("Updated generate_pdf.html successfully!")
