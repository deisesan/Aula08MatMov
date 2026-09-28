# 📐 Matemática em Movimento — Aula 08: Pitágoras e Relações Métricas
> Plataforma de Apresentação de Slides Interativos para Aula Online (9º Ano)

Projeto interativo completo pronto para rodar e usar em sala de aula ou chamada de vídeo (Google Meet, Microsoft Teams, Zoom). Focado na BNCC (**EF09MA14** e **EF09MA13**), com recursos pedagógicos em tempo real para engajamento dos alunos pelo chat.

---

## 🚀 Como Iniciar a Apresentação (Muito Fácil!)

### Opção 1: Com 1 Duplo Clique (Windows)
Basta dar um duplo clique no arquivo:
* 📄 **`iniciar_aula.bat`** (Inicia o servidor e abre o navegador automaticamente em `http://localhost:5173`)

### Opção 2: Pelo Terminal
```bash
npm run dev
```
Abra o navegador em: [http://localhost:5173](http://localhost:5173)

---

## ⌨️ Atalhos de Teclado para o Professor

| Tecla | Ação |
| :--- | :--- |
| **`Espaço`** ou **`→`** | Avançar para o próximo slide |
| **`←`** | Voltar para o slide anterior |
| **`1` a `9` e `0`** | Pular instantaneamente para o Slide correspondente (1 a 10) |
| **`N`** | Abrir/fechar **Notas do Professor** (Roteiro, "O que falar", chat e dicas) |
| **`D`** | Ativar/desativar **Caneta de Lousa Virtual** (desenhar e circular na tela) |
| **`F`** | Alternar **Modo Tela Cheia** (Fullscreen) |

---

## 🛠️ Recursos Interativos Desenvolvidos Slide a Slide

1. **Slide 1 — Acolhimento e Abertura (09:30 - 09:35)**
   * Banner de abertura oficial e combinados de ouro do dia.
   * **Termômetro da Turma Interativo**: botão para registrar os "Bons dias" e cadernos abertos que chegam no chat.
   
2. **Slide 2 — Revisão Relâmpago de Ângulos (09:35 - 09:40)**
   * Leis da soma interna ($180^\circ$) e classificação (Acutângulo, Obtusângulo, Retângulo).
   * **Simulador de Ângulos Dinâmico**: barra deslizante que ajusta os ângulos do triângulo retângulo em tempo real.
   * **Pergunta Relâmpago para o Chat**: Quiz interativo de múltipla escolha ($30^\circ \to 60^\circ$) com gabarito e cálculo passo a passo.

3. **Slide 3 — Quem é Quem no Triângulo Retângulo? (09:40 - 10:05)**
   * 3 Triângulos em posições reais: **Em pé**, **Deitado na hipotenusa** (o que mais confunde os alunos) e **Girado**.
   * **Caça à Hipotenusa**: botões para destacar o ângulo reto (90°), a hipotenusa (frente ao 90°) e os catetos (quina).
   * Pergunta-desafio no chat com feedback sonoro e visual imediato.

4. **Slide 4 — O Teorema de Pitágoras (10:05 - 10:15)**
   * Apresentação da fórmula com $\LaTeX$ de alta definição via KaTeX.
   * **Demonstração Geométrica Interativa de Áreas**: visualização animada dos quadrados $3 \times 3 = 9$ e $4 \times 4 = 16$ compondo o quadrado da hipotenusa $5 \times 5 = 25$ ($9 + 16 = 25$).
   * **Gerador de Ternas Pitagóricas**: seletor de multiplicador ($k=1, 2, 3, 5, 10$) demonstrando $(3,4,5)$, $(6,8,10)$, $(9,12,15)$ e $(30,40,50)$.

5. **Slide 5 — Exemplos Resolvidos de Pitágoras (10:15 - 10:30)**
   * **Exemplo 1 (Achar Hipotenusa):** Catetos 5 e 12 cm $\to x = 13\text{ cm}$. Botão de revelação passo a passo.
   * **Exemplo 2 (Situação Real - Escada na Parede):** Escada de 10m com base a 6m da parede $\to h = 8\text{ m}$. Enquete no chat sobre quem é a hipotenusa e conexão com a terna $3-4-5 \times 2$.

6. **Slide 6 — Intervalo de Tela (10:30 - 10:40)**
   * **Cronômetro regressivo funcional de 10 minutos** com display gigante, anel de progresso, botões de Iniciar, Pausar, Resetar, +1 min e +5 min.
   * **Alarme sonoro integrado** sintetizado via Web Audio API (não depende de arquivos externos).
   * Dicas de descanso visual e água.

7. **Slide 7 — Relações Métricas no Triângulo Retângulo (10:40 - 10:55)**
   * Triângulo retângulo cortado pela altura $h$, com projeções $m$ e $n$.
   * **Explorador Interativo de Fórmulas**: ao clicar em qualquer fórmula ($h^2 = m \cdot n$, $b^2 = a \cdot m$, $c^2 = a \cdot n$, $b \cdot c = a \cdot h$, $a = m + n$), o diagrama ilumina com cores brilhantes exatamente os segmentos correspondentes!

8. **Slide 8 — Exemplos Resolvidos de Relações Métricas (10:55 - 11:05)**
   * **Exemplo 1:** $m=3$ e $n=12 \to h = 6\text{ cm}$.
   * **Exemplo 2:** $a=25$ e $m=9 \to b = 15\text{ cm}$.
   * Dica mental de simplificação de raízes de produtos.

9. **Slide 9 — Prática Guiada no Caderno (11:05 - 11:20)**
   * **Timer de 5 minutos integrado** para a prática individual no caderno.
   * **Questão 1:** Lote retangular 30m e diagonal 50m (Resposta: 40m).
   * **Questão 2:** Projeções 4cm e 16cm (Resposta: 8cm).
   * Botões de "Dica" e "Gabarito Passo a Passo" reveláveis a pedido do professor.

10. **Slide 10 — Fechamento e Lição de Casa (11:20 - 11:30)**
    * **Efeito comemorativo de confetes** na tela.
    * Cards destacados da Lição de Casa (Cap. 6), envio de foto (+20 pontos MatMov), plantão semanal Wikimática e introdução ao próximo tema (Trigonometria).
    * Checklist interativo de encerramento da aula.

---

## 🧑‍🏫 Ferramentas Exclusivas do Apresentador

* **Guia do Professor (Tecla `N`):** exibe na lateral direita o texto exato do "O que falar", as perguntas prontas para colar ou falar no chat, as respostas esperadas e alertas pedagógicos.
* **Caneta de Lousa Virtual (Tecla `D`):** desenhe, circule e aponte qualquer detalhe da tela em tempo real usando cores vivas (Amarelo, Ciano, Verde, Vermelho, Branco) e borracha.
* **Relógio do Sistema em Tempo Real:** fixado no cabeçalho para você acompanhar a pontualidade da aula em relação à grade 09:30 - 11:30.
