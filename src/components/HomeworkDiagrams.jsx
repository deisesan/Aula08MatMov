import React from 'react';

export default function HomeworkDiagram({ type, className = 'w-full max-w-md mx-auto' }) {
  if (type === 'tree_shadow') {
    // Exact diagram from user PDF Page 2 Questão 2
    return (
      <svg
        viewBox="0 0 520 260"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun rays label */}
        <text
          x="260"
          y="28"
          fill="#d97706"
          fontSize="13"
          fontFamily="sans-serif"
          fontStyle="italic"
          textAnchor="middle"
        >
          raios de sol (paralelos)
        </text>

        {/* Dashed orange sun ray lines */}
        <line
          x1="100"
          y1="40"
          x2="280"
          y2="200"
          stroke="#ea580c"
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />
        <line
          x1="280"
          y1="135"
          x2="355"
          y2="200"
          stroke="#ea580c"
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />

        {/* Tree */}
        {/* Tree crown */}
        <circle cx="100" cy="40" r="26" fill="#10b981" opacity="0.85" />
        <circle cx="100" cy="40" r="18" fill="#059669" />
        {/* Tree trunk */}
        <line x1="100" y1="60" x2="100" y2="200" stroke="#78350f" strokeWidth="6" />

        {/* Stick (Bastão) */}
        <line x1="280" y1="140" x2="280" y2="200" stroke="#0284c7" strokeWidth="5" />
        <circle cx="280" cy="140" r="3.5" fill="#0369a1" />

        {/* Ground horizontal line */}
        <line x1="60" y1="200" x2="420" y2="200" stroke="#475569" strokeWidth="3" />

        {/* Right angle symbol at tree */}
        <rect x="100" y="186" width="14" height="14" fill="none" stroke="#64748b" strokeWidth="2" />
        <circle cx="107" cy="193" r="2" fill="#64748b" />

        {/* Right angle symbol at stick */}
        <rect x="280" y="188" width="12" height="12" fill="none" stroke="#64748b" strokeWidth="2" />
        <circle cx="286" cy="194" r="1.5" fill="#64748b" />

        {/* Tree Height Label */}
        <text
          x="70"
          y="125"
          fill="#1e293b"
          className="dark:fill-slate-100"
          fontSize="18"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          H = ?
        </text>

        {/* Stick Height Label */}
        <text
          x="260"
          y="135"
          fill="#0284c7"
          fontSize="15"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          2 m
        </text>

        {/* Tree Shadow dimension bracket & label */}
        <path d="M 100 206 L 100 216 L 280 216 L 280 206" stroke="#334155" strokeWidth="2" fill="none" />
        <text
          x="190"
          y="232"
          fill="#1e293b"
          className="dark:fill-slate-200"
          fontSize="14"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          sombra: 15 m
        </text>

        {/* Stick Shadow dimension bracket & label */}
        <path d="M 280 206 L 280 216 L 355 216 L 355 206" stroke="#334155" strokeWidth="2" fill="none" />
        <text
          x="317"
          y="232"
          fill="#1e293b"
          className="dark:fill-slate-200"
          fontSize="14"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          sombra: 3 m
        </text>
      </svg>
    );
  }

  if (type === 'similar_triangle_de') {
    // Exact diagram from user PDF Page 2 Questão 3
    return (
      <svg
        viewBox="0 0 380 260"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Triangle ABC */}
        {/* Vertices: A(190, 30), B(60, 220), C(320, 220) */}
        {/* Side AB */}
        <line x1="190" y1="30" x2="60" y2="220" stroke="#3b82f6" strokeWidth="3" />
        {/* Side AC */}
        <line x1="190" y1="30" x2="320" y2="220" stroke="#3b82f6" strokeWidth="3" />
        {/* Side BC */}
        <line x1="60" y1="220" x2="320" y2="220" stroke="#3b82f6" strokeWidth="3" />

        {/* Points D and E (1/3 of the way down from A) */}
        {/* D on AB: (190 + (60 - 190)/3, 30 + (220 - 30)/3) = (146.6, 93.3) */}
        {/* E on AC: (190 + (320 - 190)/3, 30 + (220 - 30)/3) = (233.3, 93.3) */}
        <line x1="146.6" y1="93.3" x2="233.3" y2="93.3" stroke="#f97316" strokeWidth="3" />

        {/* Small angle arcs on DE and BC to denote parallelism */}
        <circle cx="146.6" cy="93.3" r="4.5" fill="#f97316" />
        <circle cx="233.3" cy="93.3" r="4.5" fill="#f97316" />

        {/* Vertex Labels */}
        <text x="190" y="20" fill="#1e293b" className="dark:fill-slate-100" fontSize="16" fontWeight="bold" textAnchor="middle">
          A
        </text>
        <text x="45" y="235" fill="#1e293b" className="dark:fill-slate-100" fontSize="16" fontWeight="bold">
          B
        </text>
        <text x="330" y="235" fill="#1e293b" className="dark:fill-slate-100" fontSize="16" fontWeight="bold">
          C
        </text>
        <text x="130" y="98" fill="#1e293b" className="dark:fill-slate-100" fontSize="15" fontWeight="bold">
          D
        </text>
        <text x="242" y="98" fill="#1e293b" className="dark:fill-slate-100" fontSize="15" fontWeight="bold">
          E
        </text>

        {/* Length Labels */}
        {/* AD = 3 */}
        <text x="156" y="58" fill="#475569" className="dark:fill-slate-300" fontSize="14" fontWeight="bold">
          3
        </text>
        {/* DB = 6 */}
        <text x="96" y="156" fill="#475569" className="dark:fill-slate-300" fontSize="14" fontWeight="bold">
          6
        </text>
        {/* AE = 2 */}
        <text x="220" y="58" fill="#475569" className="dark:fill-slate-300" fontSize="14" fontWeight="bold">
          2
        </text>
        {/* EC = ? */}
        <text x="282" y="156" fill="#ef4444" fontSize="15" fontWeight="bold">
          ?
        </text>
      </svg>
    );
  }

  if (type === 'ladder_pole') {
    // Lesson 8 Questão 2 (Poste, escada e sombra)
    return (
      <svg
        viewBox="0 0 520 280"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun and rays label */}
        <circle cx="430" cy="45" r="22" fill="#fbbf24" opacity="0.9" />
        <text
          x="350"
          y="35"
          fill="#d97706"
          fontSize="13"
          fontFamily="sans-serif"
          fontStyle="italic"
          textAnchor="middle"
        >
          raios de sol (paralelos)
        </text>
        <line
          x1="390"
          y1="55"
          x2="220"
          y2="220"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        {/* Ground */}
        <line x1="80" y1="220" x2="460" y2="220" stroke="#475569" strokeWidth="3" />

        {/* Pole (Poste de Luz) */}
        <line x1="140" y1="50" x2="140" y2="220" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />
        {/* Lamp on top */}
        <path d="M125 50 H155 L160 62 H120 Z" fill="#facc15" />
        <circle cx="140" cy="65" r="6" fill="#fef08a" />

        {/* Ladder (Escada inclinada) */}
        {/* From pole top (140, 50) to ground (300, 220) */}
        <line x1="140" y1="50" x2="300" y2="220" stroke="#e11d48" strokeWidth="5" />
        {/* Ladder rungs (degraus) */}
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((t, idx) => {
          const x = 140 + (300 - 140) * t;
          const y = 50 + (220 - 50) * t;
          return (
            <line
              key={idx}
              x1={x - 6}
              y1={y + 6}
              x2={x + 6}
              y2={y - 6}
              stroke="#be123c"
              strokeWidth="2.5"
            />
          );
        })}

        {/* Right angle symbol between pole and ground */}
        <rect x="140" y="202" width="18" height="18" fill="none" stroke="#0ea5e9" strokeWidth="2.5" />
        <circle cx="149" cy="211" r="2.5" fill="#0ea5e9" />

        {/* Labels */}
        {/* Pole height: 12 m */}
        <text
          x="100"
          y="135"
          fill="#0284c7"
          fontSize="18"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          12 m
        </text>
        <text
          x="100"
          y="155"
          fill="#64748b"
          fontSize="11"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          (Poste)
        </text>

        {/* Distance on ground: 5 m */}
        <path d="M 140 226 L 140 236 L 300 236 L 300 226" stroke="#475569" strokeWidth="2" fill="none" />
        <text
          x="220"
          y="254"
          fill="#1e293b"
          className="dark:fill-slate-200"
          fontSize="16"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          distância: 5 m
        </text>

        {/* Ladder Length: L = ? */}
        <text
          x="240"
          y="120"
          fill="#e11d48"
          fontSize="20"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          L = ?
        </text>
        <text
          x="240"
          y="140"
          fill="#be123c"
          fontSize="12"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          (Escada / Hipotenusa)
        </text>
      </svg>
    );
  }

  if (type === 'metric_triangle') {
    // Lesson 8 Questão 3 (Relações Métricas no Triângulo com Altura h e Projeções)
    return (
      <svg
        viewBox="0 0 520 280"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Right-angled triangle on hypotenuse base */}
        {/* Hypotenuse BC on the horizontal: B(60, 210), C(460, 210) */}
        {/* Vertex A(180, 50) */}
        {/* Side AB (cateto c) */}
        <line x1="60" y1="210" x2="180" y2="50" stroke="#3b82f6" strokeWidth="3.5" />
        {/* Side AC (cateto b) */}
        <line x1="180" y1="50" x2="460" y2="210" stroke="#3b82f6" strokeWidth="3.5" />
        {/* Hypotenuse BC */}
        <line x1="60" y1="210" x2="460" y2="210" stroke="#3b82f6" strokeWidth="3.5" />

        {/* Height AH perpendicular to BC */}
        {/* Point H is at (180, 210) */}
        <line
          x1="180"
          y1="50"
          x2="180"
          y2="210"
          stroke="#ea580c"
          strokeWidth="3"
          strokeDasharray="6 4"
        />

        {/* Right angle at A (vertex 180, 50) */}
        <g transform="translate(180, 50) rotate(53)">
          <rect x="0" y="0" width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2" />
          <circle cx="8" cy="8" r="2" fill="#2563eb" />
        </g>

        {/* Right angle at H (180, 210) */}
        <rect x="180" y="194" width="16" height="16" fill="none" stroke="#ea580c" strokeWidth="2" />
        <circle cx="188" cy="202" r="2" fill="#ea580c" />

        {/* Vertices */}
        <text x="180" y="35" fill="#1e293b" className="dark:fill-slate-100" fontSize="18" fontWeight="bold" textAnchor="middle">
          A (90°)
        </text>
        <text x="40" y="225" fill="#1e293b" className="dark:fill-slate-100" fontSize="18" fontWeight="bold">
          B
        </text>
        <text x="470" y="225" fill="#1e293b" className="dark:fill-slate-100" fontSize="18" fontWeight="bold">
          C
        </text>
        <text x="180" y="235" fill="#ea580c" fontSize="16" fontWeight="bold" textAnchor="middle">
          H
        </text>

        {/* Height label: h = ? */}
        <text x="195" y="135" fill="#ea580c" fontSize="17" fontWeight="bold">
          h = ?
        </text>

        {/* Projection m: 9 cm (BH) */}
        <path d="M 60 216 L 60 224 L 180 224 L 180 216" stroke="#0284c7" strokeWidth="2" fill="none" />
        <text x="120" y="242" fill="#0284c7" fontSize="14" fontWeight="bold" textAnchor="middle">
          m = 9 cm
        </text>

        {/* Projection n: 16 cm (HC) */}
        <path d="M 180 216 L 180 224 L 460 224 L 460 216" stroke="#10b981" strokeWidth="2" fill="none" />
        <text x="320" y="242" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">
          n = 16 cm
        </text>

        {/* Side AC: b = ? */}
        <text x="335" y="115" fill="#8b5cf6" fontSize="17" fontWeight="bold">
          b = AC = ?
        </text>

        {/* Hypotenuse total bracket */}
        <path d="M 60 252 L 60 260 L 460 260 L 460 252" stroke="#475569" strokeWidth="2" fill="none" />
        <text x="260" y="275" fill="#475569" className="dark:fill-slate-300" fontSize="14" fontWeight="bold" textAnchor="middle">
          hipotenusa a = BC = ? (a = m + n)
        </text>
      </svg>
    );
  }

  return null;
}
