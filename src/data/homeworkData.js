export const HOMEWORK_LESSON_8 = {
  id: 'aula_08',
  lessonNumber: 'AULA 8',
  grade: '1º Ano',
  topic: 'Triângulos: Teorema de Pitágoras e Relações Métricas (Capítulo 6)',
  chapter: 'Capítulo 6',
  date: 'Material Oficial da Aula 08',
  points: 20,
  deadline: 'Enviar foto legível da resolução no canal oficial até a próxima aula',

  instructions: [
    'Resolva todas as questões no seu caderno de Matemática de forma organizada.',
    'Destaque os cálculos, as fórmulas utilizadas e as unidades de medida (cm, m).',
    'Tire uma foto nítida e bem iluminada do seu caderno e envie pelo canal oficial para garantir seus +20 pontos!',
  ],

  questions: [
    {
      id: 1,
      title: 'Questão 1 — Reconhecimento e Aplicação do Teorema de Pitágoras',
      subtitle: 'Em cada caso abaixo, use o Teorema de Pitágoras (a² = b² + c²) para calcular a medida desconhecida do triângulo retângulo sem confundir os catetos com a hipotenusa.',
      guidance:
        'Para calcular o lado que falta, primeiro identifique a hipotenusa e os catetos. A hipotenusa (a) é sempre o maior lado do triângulo retângulo e está oposta ao ângulo de 90°. Se você procura a hipotenusa, some os quadrados dos dois catetos: a² = b² + c². Se você já tem a hipotenusa e procura um cateto, subtraia: b² = a² - c².',
      example: {
        text: 'Catetos: 3 cm e 4 cm. A hipotenusa mede 5 cm.',
        calc: 'a² = 3² + 4² = 9 + 16 = 25 ⟹ a = √25 = 5 cm ➔ EXEMPLO',
      },
      items: [
        {
          label: 'Item A',
          text: 'Catetos: 6 cm e 8 cm. A hipotenusa mede ______ cm.',
          hint: 'a² = 6² + 8² = 36 + 64 = 100 ⟹ a = √100',
          answer: '10 cm',
        },
        {
          label: 'Item B',
          text: 'Hipotenusa: 10 cm e um cateto: 6 cm. O outro cateto mede ______ cm.',
          hint: 'b² = 10² - 6² = 100 - 36 = 64 ⟹ b = √64',
          answer: '8 cm',
        },
        {
          label: 'Item C',
          text: 'Catetos: 5 cm e 12 cm. A hipotenusa mede ______ cm.',
          hint: 'a² = 5² + 12² = 25 + 144 = 169 ⟹ a = √169',
          answer: '13 cm',
        },
        {
          label: 'Item D',
          text: 'Hipotenusa: 25 cm e um cateto: 7 cm. O outro cateto mede ______ cm.',
          hint: 'b² = 25² - 7² = 625 - 49 = 576 ⟹ b = √576',
          answer: '24 cm',
        },
      ],
    },
    {
      id: 2,
      title: 'Questão 2 — Situação Real: Manutenção no Poste com Escada e Sombra',
      diagramType: 'ladder_pole',
      description:
        'Para realizar a manutenção na lâmpada de um poste vertical de 12 m de altura, uma equipe de eletricistas posiciona a base de uma escada a 5 m de distância da base do poste no solo plano. Os raios de sol iluminam a cena formando sombras. O poste vertical forma um ângulo reto de 90° com o chão horizontal.',
      subitems: [
        {
          id: 'a',
          question: 'a) Escreva quem é a hipotenusa e quem são os catetos nessa situação geométrica, justificando pelo ângulo reto de 90°.',
          expected:
            'A escada é a hipotenusa (oposta ao ângulo reto de 90° entre o chão e o poste). O poste (12 m) e o chão (5 m) são os dois catetos.',
        },
        {
          id: 'b',
          question: 'b) Monte a equação de Pitágoras e calcule o comprimento L da escada necessário para alcançar com exatidão o topo do poste.',
          expected:
            'L² = 12² + 5² ⟹ L² = 144 + 25 = 169 ⟹ L = √169 = 13 metros.',
        },
      ],
    },
    {
      id: 3,
      title: 'Questão 3 — Relações Métricas no Triângulo Retângulo com Altura',
      diagramType: 'metric_triangle',
      description:
        'No triângulo retângulo ABC (reto no vértice A), traça-se a altura relativa à hipotenusa AH = h, dividindo a hipotenusa BC = a em duas projeções ortogonais: BH = m = 9 cm e HC = n = 16 cm.',
      subitems: [
        {
          id: 'a',
          question: 'a) Calcule a medida total da hipotenusa a = BC (Dica: a = m + n).',
          expected: 'a = 9 + 16 = 25 cm.',
        },
        {
          id: 'b',
          question: 'b) Use a relação métrica h² = m · n para calcular a altura h. Em seguida, use a relação b² = a · n para calcular a medida do cateto b = AC.',
          expected:
            'h² = 9 · 16 = 144 ⟹ h = √144 = 12 cm. Para o cateto b: b² = 25 · 16 = 400 ⟹ b = √400 = 20 cm.',
        },
        {
          id: 'c',
          question: 'c) Se o ângulo no vértice A não fosse reto (90°), você ainda poderia usar as relações h² = m · n e b² = a · n? Explique com suas palavras com base na semelhança de triângulos.',
          expected:
            'Não! Essas fórmulas decorrem exclusivamente da semelhança entre os dois triângulos menores formados pela altura e o triângulo grande, o que só acontece quando há o ângulo reto de 90° em A e em H.',
        },
      ],
    },
  ],
};

// Réplica da lição da Aula 7 enviada no PDF para consulta ou exibição
export const HOMEWORK_LESSON_7 = {
  id: 'aula_07',
  lessonNumber: 'AULA 7',
  grade: '1º Ano',
  topic: 'Semelhança de Triângulos',
  chapter: 'Capítulo 5',
  date: 'Material Oficial da Aula 07',
  points: 20,
  deadline: 'Enviar foto legível da resolução no canal oficial',

  instructions: [
    'Resolva todas as questões no seu caderno de Matemática.',
    'Destaque os cálculos das proporções e justifique com suas palavras.',
  ],

  questions: [
    {
      id: 1,
      title: 'Questão 1',
      subtitle: 'Em cada caso abaixo, uma foto foi ampliada ou reduzida sem deformar. Calcule o fator e escreva a nova altura da foto.',
      guidance:
        'Para ampliar ou reduzir uma figura sem deformar, multiplicamos todas as medidas pelo mesmo número. Esse número é o fator: fator = medida nova ÷ medida original. Se o fator é maior que 1, a figura aumenta; se é menor que 1, a figura diminui.',
      example: {
        text: 'Largura: 4 cm vira 8 cm. Altura: 3 cm vira ____.',
        calc: 'Fator = 8 ÷ 4 = 2; altura = 3 × 2 = 6 cm ➔ EXEMPLO',
      },
      items: [
        {
          label: 'Item A',
          text: 'Largura: 5 cm vira 15 cm. Altura: 2 cm vira ______ cm.',
          hint: 'Fator = 15 ÷ 5 = 3; altura = 2 × 3',
          answer: '6 cm (Fator 3)',
        },
        {
          label: 'Item B',
          text: 'Largura: 10 cm vira 5 cm. Altura: 6 cm vira ______ cm.',
          hint: 'Fator = 5 ÷ 10 = 0,5; altura = 6 × 0,5',
          answer: '3 cm (Fator 0,5)',
        },
        {
          label: 'Item C',
          text: 'Largura: 2 cm vira 5 cm. Altura: 4 cm vira ______ cm.',
          hint: 'Fator = 5 ÷ 2 = 2,5; altura = 4 × 2,5',
          answer: '10 cm (Fator 2,5)',
        },
      ],
    },
    {
      id: 2,
      title: 'Questão 2',
      diagramType: 'tree_shadow',
      description:
        'No mesmo instante, uma árvore projeta uma sombra de 15 m e um bastão de 2 m, em pé ao lado dela, projeta uma sombra de 3 m. Os raios de sol chegam paralelos. A árvore e sua sombra formam um triângulo; o bastão e sua sombra formam outro. Lembre: dois triângulos com dois ângulos iguais são semelhantes (critério AA).',
      subitems: [
        {
          id: 'a',
          question: 'a) Escreva quais são os dois ângulos iguais nos dois triângulos.',
          expected:
            '1º: O ângulo reto de 90° formado pelo tronco/bastão com o chão horizontal. 2º: O ângulo de inclinação formado pelos raios solares paralelos com o solo.',
        },
        {
          id: 'b',
          question: 'b) Monte a proporção entre alturas e sombras e calcule a altura H da árvore.',
          expected:
            'H / 2 = 15 / 3 ⟹ H / 2 = 5 ⟹ H = 5 × 2 = 10 metros.',
        },
      ],
    },
    {
      id: 3,
      title: 'Questão 3',
      diagramType: 'similar_triangle_de',
      description:
        'No triângulo ABC, D está no lado AB, E está no lado AC, e DE é paralelo a BC. Assim, o triângulo ADE é uma "miniatura" de ABC e vale a proporção AD/AB = AE/AC. As medidas são AD = 3, DB = 6 e AE = 2.',
      subitems: [
        {
          id: 'a',
          question: 'a) Calcule a medida do lado AB.',
          expected: 'AB = AD + DB = 3 + 6 = 9.',
        },
        {
          id: 'b',
          question: 'b) Use a proporção AD/AB = AE/AC para calcular AC. Depois, calcule EC.',
          expected:
            '3 / 9 = 2 / AC ⟹ 1 / 3 = 2 / AC ⟹ AC = 6. Como AC = AE + EC ⟹ 6 = 2 + EC ⟹ EC = 4.',
        },
        {
          id: 'c',
          question: 'c) Se o segmento DE não fosse paralelo a BC, você ainda poderia usar essa proporção? Explique com suas palavras.',
          expected:
            'Não! Se DE não for paralelo a BC, os ângulos correspondentes não serão iguais e o triângulo ADE não será semelhante ao triângulo ABC, impedindo a proporcionalidade dos lados.',
        },
      ],
    },
  ],
};
