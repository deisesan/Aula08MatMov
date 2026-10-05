with open(r'c:\Users\deise\Desktop\Aula08MatMov\scratch\logo_b64.txt', 'r') as f:
    logo_src = f.read().strip()

html_gabarito = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Gabarito Oficial — Lição de Casa — Aula 08 — Ensino de Matemática</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Poppins:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: A4 portrait;
      margin: 10mm 18mm 10mm 18mm;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.38;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}

    .page {{
      width: 100%;
      height: 277mm;
      max-height: 277mm;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
    }}

    .page:last-child {{
      page-break-after: avoid;
    }}

    /* Header matching official MatMov style */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1.5px solid #e2e8f0;
    }}

    .header-logo {{
      height: 40px;
      object-fit: contain;
    }}

    .header-title {{
      font-family: 'Luckiest Guy', cursive, sans-serif;
      font-size: 20px;
      color: #466c9b;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }}

    /* Title Block */
    .title-block {{
      text-align: center;
      margin-bottom: 12px;
    }}

    .badge-privado {{
      display: inline-block;
      background-color: #fee2e2;
      color: #b91c1c;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border: 1px solid #fca5a5;
      margin-bottom: 4px;
    }}

    .main-title {{
      font-family: 'Luckiest Guy', cursive, sans-serif;
      font-size: 22px;
      color: #466c9b;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 1px;
    }}

    .main-subtitle {{
      font-family: 'Poppins', sans-serif;
      font-size: 11.5px;
      font-weight: 600;
      color: #64748b;
    }}

    .lesson-meta {{
      background: #f8fafc;
      border-left: 4px solid #466c9b;
      padding: 6px 12px;
      border-radius: 0 6px 6px 0;
      margin-bottom: 12px;
      font-size: 11.5px;
      display: flex;
      justify-content: space-between;
    }}

    .lesson-meta strong {{
      color: #466c9b;
    }}

    /* Question Cards */
    .q-box {{
      background: #ffffff;
      border: 1.2px solid #cbd5e1;
      border-radius: 10px;
      padding: 10px 14px;
      margin-bottom: 12px;
    }}

    .q-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 4px;
    }}

    .q-title {{
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      font-weight: 800;
      color: #466c9b;
    }}

    .q-points {{
      background: #ecfdf5;
      color: #047857;
      font-size: 10.5px;
      font-weight: 800;
      padding: 1px 7px;
      border-radius: 5px;
      border: 1px solid #a7f3d0;
    }}

    .step-box {{
      background: #f8fafc;
      border-radius: 6px;
      padding: 8px 10px;
      margin-top: 6px;
      font-size: 11.5px;
    }}

    .calc-row {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 11.5px;
      color: #0f172a;
      margin: 3px 0;
    }}

    .answer-tag {{
      display: inline-block;
      background: #dcfce7;
      color: #15803d;
      font-weight: 800;
      padding: 1px 6px;
      border-radius: 4px;
      border: 1px solid #86efac;
    }}

    .pitfall {{
      background: #fffbeb;
      border-left: 3px solid #f59e0b;
      padding: 4px 8px;
      font-size: 10.5px;
      color: #92400e;
      margin-top: 5px;
      border-radius: 0 4px 4px 0;
    }}

    .table-res {{
      width: 100%;
      border-collapse: collapse;
      margin-top: 5px;
      font-size: 11px;
    }}

    .table-res th, .table-res td {{
      border: 1px solid #e2e8f0;
      padding: 4px 7px;
      text-align: left;
    }}

    .table-res th {{
      background: #f1f5f9;
      font-weight: 700;
      color: #334155;
    }}

    .table-res tr:nth-child(even) {{
      background: #fafafa;
    }}

    .footer-note {{
      margin-top: auto;
      padding-top: 6px;
      border-top: 1px dashed #cbd5e1;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #64748b;
    }}
  </style>
</head>
<body>

  <!-- ==================== PÁGINA 1 ==================== -->
  <div class="page">
    <div class="header">
      <img src="{logo_src}" alt="MAT MOV" class="header-logo" />
      <div class="header-title">ENSINO DE MATEMÁTICA</div>
    </div>

    <div class="title-block">
      <div class="badge-privado">🔒 Uso Exclusivo do Professor (Material Off-Screen)</div>
      <div class="main-title">GABARITO OFICIAL & GUIA DE CORREÇÃO</div>
      <div class="main-subtitle">Resoluções Passo a Passo • Critérios de Avaliação • Lição de Casa Aula 08</div>
    </div>

    <div class="lesson-meta">
      <div><strong>Turma:</strong> 1º Ano • <strong>Aula:</strong> Aula 08</div>
      <div><strong>Tema:</strong> Triângulos: Teorema de Pitágoras e Relações Métricas</div>
      <div><strong>Valor:</strong> 20 Pontos</div>
    </div>

    <!-- QUESTÃO 1 -->
    <div class="q-box">
      <div class="q-header">
        <span class="q-title">Questão 1 — Reconhecimento e Aplicação do Teorema de Pitágoras</span>
        <span class="q-points">Valor: 6,0 Pontos (1,5 pt cada)</span>
      </div>

      <div style="font-size: 11.5px; margin-bottom: 4px;">
        <strong>Conceito:</strong> Hipotenusa oposta a 90°. Fórmulas: <span class="calc-row">a² = b² + c²</span> (hipotenusa) ou <span class="calc-row">b² = a² - c²</span> (cateto).
      </div>

      <table class="table-res">
        <thead>
          <tr>
            <th>Item</th>
            <th>Dados</th>
            <th>Resolução Passo a Passo</th>
            <th>Resposta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Exemplo</strong></td>
            <td>Catetos: 3 e 4 cm</td>
            <td>a² = 3² + 4² = 9 + 16 = 25 ⟹ a = √25 = 5 cm</td>
            <td><span class="answer-tag">5 cm</span></td>
          </tr>
          <tr>
            <td><strong>Item A</strong></td>
            <td>Catetos: 6 e 8 cm</td>
            <td>a² = 6² + 8² = 36 + 64 = 100 ⟹ a = √100 = 10 cm</td>
            <td><span class="answer-tag">10 cm</span></td>
          </tr>
          <tr>
            <td><strong>Item B</strong></td>
            <td>Hip: 10 cm | Cat: 6 cm</td>
            <td>b² = 10² - 6² = 100 - 36 = 64 ⟹ b = √64 = 8 cm</td>
            <td><span class="answer-tag">8 cm</span></td>
          </tr>
          <tr>
            <td><strong>Item C</strong></td>
            <td>Catetos: 5 e 12 cm</td>
            <td>a² = 5² + 12² = 25 + 144 = 169 ⟹ a = √169 = 13 cm</td>
            <td><span class="answer-tag">13 cm</span></td>
          </tr>
          <tr>
            <td><strong>Item D</strong></td>
            <td>Hip: 25 cm | Cat: 7 cm</td>
            <td>b² = 25² - 7² = 625 - 49 = 576 ⟹ b = √576 = 24 cm</td>
            <td><span class="answer-tag">24 cm</span></td>
          </tr>
        </tbody>
      </table>

      <div class="pitfall">
        ⚠️ <strong>Atenção na correção:</strong> Nos itens B e D, atente se o aluno somou em vez de subtrair (ex: 10² + 6² = 136).
      </div>
    </div>

    <!-- QUESTÃO 2 -->
    <div class="q-box" style="margin-bottom: 0;">
      <div class="q-header">
        <span class="q-title">Questão 2 — Situação Real: Manutenção no Poste com Escada e Sombra</span>
        <span class="q-points">Valor: 7,0 Pontos (Item A: 3,0 pt | Item B: 4,0 pt)</span>
      </div>

      <!-- Item A -->
      <div class="step-box" style="margin-top: 4px;">
        <strong>Item a) Identificação e Justificativa (3,0 pontos):</strong>
        <p style="margin: 2px 0;">• <strong>Hipotenusa:</strong> O comprimento da <strong>escada (L)</strong>.</p>
        <p style="margin: 2px 0;">• <strong>Catetos:</strong> A <strong>altura do poste (12 m)</strong> e a <strong>distância no chão (5 m)</strong>.</p>
        <p style="margin: 2px 0; color: #1e3a8a;">
          • <strong>Justificativa esperada:</strong> O chão horizontal e o poste vertical formam um ângulo reto de 90°. A escada está inclinada de frente (oposta) para esse ângulo reto, sendo o maior lado do triângulo retângulo (hipotenusa).
        </p>
      </div>

      <!-- Item B -->
      <div class="step-box" style="margin-top: 5px;">
        <strong>Item b) Equação e Cálculo de L (4,0 pontos):</strong>
        <div class="calc-row">• Montagem: L² = (Poste)² + (Chão)² ⟹ L² = 12² + 5² (1,5 pt)</div>
        <div class="calc-row">• Potências: L² = 144 + 25 ⟹ L² = 169 (1,0 pt)</div>
        <div class="calc-row">• Raiz: L = √169 = 13 metros (1,5 pt com unidade)</div>
        <div style="margin-top: 3px;">
          <strong>Resposta Final:</strong> <span class="answer-tag">L = 13 metros</span>
        </div>
      </div>
    </div>

    <div class="footer-note">
      <span>Matemática em Movimento — Ficha Técnica do Professor</span>
      <span>Página 1 de 2</span>
    </div>
  </div>

  <!-- ==================== PÁGINA 2 ==================== -->
  <div class="page">
    <div class="header">
      <img src="{logo_src}" alt="MAT MOV" class="header-logo" />
      <div class="header-title">ENSINO DE MATEMÁTICA</div>
    </div>

    <!-- QUESTÃO 3 -->
    <div class="q-box">
      <div class="q-header">
        <span class="q-title">Questão 3 — Relações Métricas no Triângulo Retângulo com Altura</span>
        <span class="q-points">Valor: 7,0 Pontos (A: 2,0 pt | B: 3,0 pt | C: 2,0 pt)</span>
      </div>

      <div style="font-size: 11.5px; margin-bottom: 4px;">
        <strong>Cenário:</strong> Triângulo ABC reto em A. Altura AH = h. Projeções: m = 9 cm e n = 16 cm.
      </div>

      <!-- Item A -->
      <div class="step-box">
        <strong>Item a) Hipotenusa Total a (2,0 pontos):</strong>
        <div class="calc-row">• Relação: a = m + n ⟹ a = 9 cm + 16 cm = 25 cm</div>
        <div><strong>Resposta:</strong> <span class="answer-tag">a = 25 cm</span></div>
      </div>

      <!-- Item B -->
      <div class="step-box" style="margin-top: 6px;">
        <strong>Item b) Altura h e Cateto b = AC (3,0 pontos):</strong>
        <div style="margin: 2px 0;">
          <strong>1º) Altura h (1,5 pt):</strong>
          <div class="calc-row">h² = m · n ⟹ h² = 9 · 16 = 144 ⟹ h = √144 = 12 cm</div>
        </div>
        <div style="margin: 4px 0 1px 0;">
          <strong>2º) Cateto b = AC (1,5 pt):</strong>
          <div class="calc-row">b² = a · n ⟹ b² = 25 · 16 = 400 ⟹ b = √400 = 20 cm</div>
        </div>
        <div style="margin-top: 4px;">
          <strong>Respostas:</strong> <span class="answer-tag">h = 12 cm</span> e <span class="answer-tag">b = 20 cm</span>
        </div>
      </div>

      <!-- Item C -->
      <div class="step-box" style="margin-top: 6px;">
        <strong>Item c) Análise Conceitual (2,0 pontos):</strong>
        <p><strong>Resposta:</strong> <strong>Não.</strong></p>
        <p style="margin-top: 2px; color: #1e3a8a;">
          <strong>Justificativa esperada:</strong> As relações métricas (h² = m · n e b² = a · n) dependem estritamente da <strong>semelhança de triângulos</strong> (caso AA). Sem o ângulo reto de 90° em A e a altura perpendicular à hipotenusa, os triângulos não serão semelhantes e as relações deixam de ser válidas.
        </p>
      </div>
    </div>

    <!-- CRITÉRIOS DE CORREÇÃO E PONTUAÇÃO GERAL -->
    <div class="q-box" style="background: #f8fafc; border-color: #94a3b8; margin-bottom: 0;">
      <div class="q-header">
        <span class="q-title" style="color: #334155;">Rubrica Resumida de Pontuação (Total: 20 Pontos)</span>
        <span class="q-points" style="background:#e0e7ff; color:#3730a3; border-color:#c7d2fe;">Nota Oficial: 0 a 20</span>
      </div>

      <table class="table-res" style="background: #ffffff;">
        <thead>
          <tr>
            <th>Questão / Item</th>
            <th>Critério de Avaliação</th>
            <th>Pontuação Máxima</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Q1 (Itens A, B, C, D)</strong></td>
            <td>Aplicação correta da soma/subtração e raiz quadrada exata (1,5 pt cada)</td>
            <td><strong>6,0 pts</strong></td>
          </tr>
          <tr>
            <td><strong>Q2 (Item A)</strong></td>
            <td>Identificação da escada como hipotenusa e poste/chão como catetos + justificativa do 90°</td>
            <td><strong>3,0 pts</strong></td>
          </tr>
          <tr>
            <td><strong>Q2 (Item B)</strong></td>
            <td>Montagem da equação de Pitágoras, cálculo da potência e resposta com unidade (13 m)</td>
            <td><strong>4,0 pts</strong></td>
          </tr>
          <tr>
            <td><strong>Q3 (Item A)</strong></td>
            <td>Cálculo da hipotenusa total somando as projeções: a = 9 + 16 = 25 cm</td>
            <td><strong>2,0 pts</strong></td>
          </tr>
          <tr>
            <td><strong>Q3 (Item B)</strong></td>
            <td>Cálculo da altura h = 12 cm (1,5 pt) e do cateto b = 20 cm (1,5 pt)</td>
            <td><strong>3,0 pts</strong></td>
          </tr>
          <tr>
            <td><strong>Q3 (Item C)</strong></td>
            <td>Resposta "Não" e explicação relacionando com semelhança de triângulos e ângulos de 90°</td>
            <td><strong>2,0 pts</strong></td>
          </tr>
          <tr style="background: #f1f5f9; font-weight: bold;">
            <td colspan="2">TOTAL SOMATIVO DA LIÇÃO DE CASA</td>
            <td style="color: #047857; font-size: 12px;">20,0 PONTOS</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-note">
      <span>Matemática em Movimento — Ficha Técnica do Professor</span>
      <span>Página 2 de 2</span>
    </div>
  </div>

</body>
</html>
'''

with open(r'c:\Users\deise\Desktop\Aula08MatMov\generate_gabarito.html', 'w', encoding='utf-8') as f:
    f.write(html_gabarito)
print("Updated generate_gabarito.html successfully!")
