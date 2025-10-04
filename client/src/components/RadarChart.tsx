interface RadarChartProps {
  scores: Record<string, number>;
  traitLabels: Record<string, string>;
  isDarkSide?: boolean;
}

export function RadarChart({ scores, traitLabels, isDarkSide = false }: RadarChartProps) {
  const traits = Object.entries(scores);
  const center = 150;
  const radius = 100;
  const maxScore = 100;

  const points = traits.map(([key, score], index) => {
    const angle = (Math.PI * 2 * index) / traits.length - Math.PI / 2;
    const distance = (score / maxScore) * radius;
    const x = center + Math.cos(angle) * distance;
    const y = center + Math.sin(angle) * distance;
    return { x, y, angle, score, label: traitLabels[key] || key };
  });

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  const gridLevels = [20, 40, 60, 80, 100];
  const gridLines = gridLevels.map(level => {
    const levelPoints = traits.map((_, index) => {
      const angle = (Math.PI * 2 * index) / traits.length - Math.PI / 2;
      const distance = (level / maxScore) * radius;
      const x = center + Math.cos(angle) * distance;
      const y = center + Math.sin(angle) * distance;
      return `${x},${y}`;
    }).join(' ');
    return levelPoints;
  });

  return (
    <svg viewBox="0 0 300 300" className="w-full h-full max-w-md">
      <defs>
        <radialGradient id={isDarkSide ? "radarGradientDark" : "radarGradient"}>
          {isDarkSide ? (
            <>
              <stop offset="0%" stopColor="rgb(220, 38, 38)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(220, 38, 38)" stopOpacity="0.1" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
            </>
          )}
        </radialGradient>
      </defs>

      {gridLines.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke={isDarkSide ? "rgb(127, 29, 29)" : "hsl(var(--border))"}
          strokeWidth="1"
          opacity={isDarkSide ? 0.4 : 0.3}
        />
      ))}

      {points.map((point, index) => {
        const endX = center + Math.cos(point.angle) * radius;
        const endY = center + Math.sin(point.angle) * radius;
        return (
          <line
            key={index}
            x1={center}
            y1={center}
            x2={endX}
            y2={endY}
            stroke={isDarkSide ? "rgb(127, 29, 29)" : "hsl(var(--border))"}
            strokeWidth="1"
            opacity={isDarkSide ? 0.4 : 0.3}
          />
        );
      })}

      <polygon
        points={polygonPoints}
        fill={`url(#${isDarkSide ? "radarGradientDark" : "radarGradient"})`}
        stroke={isDarkSide ? "rgb(239, 68, 68)" : "hsl(var(--primary))"}
        strokeWidth="2"
        className={isDarkSide ? 'drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]' : ''}
      />

      {points.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r="4"
            fill={isDarkSide ? "rgb(239, 68, 68)" : "hsl(var(--primary))"}
            className={isDarkSide ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : ''}
          />
          <text
            x={center + Math.cos(point.angle) * (radius + 30)}
            y={center + Math.sin(point.angle) * (radius + 30)}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`text-xs font-semibold ${isDarkSide ? 'fill-red-200' : 'fill-foreground'}`}
          >
            {point.label}
          </text>
          <text
            x={center + Math.cos(point.angle) * (radius + 45)}
            y={center + Math.sin(point.angle) * (radius + 45)}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`text-xs font-mono ${isDarkSide ? 'fill-red-300/80' : 'fill-muted-foreground'}`}
          >
            {point.score}
          </text>
        </g>
      ))}
    </svg>
  );
}
