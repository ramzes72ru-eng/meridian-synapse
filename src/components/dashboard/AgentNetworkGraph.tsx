import { agents, Agent } from "@/data/agents";
import { motion } from "framer-motion";
import { Bot, User, Briefcase } from "lucide-react";
import { useState } from "react";

const statusColors: Record<string, string> = {
  active: 'bg-emerald-400',
  idle: 'bg-muted-foreground/60',
  blocked: 'bg-red-400',
  escalated: 'bg-amber-400',
  completed: 'bg-primary',
};

const levelPositions: Record<string, { y: number }> = {
  strategic: { y: 60 },
  orchestration: { y: 160 },
  department: { y: 280 },
  specialist: { y: 420 },
};

const typeIcons: Record<string, React.ElementType> = {
  ai: Bot,
  human: User,
  freelancer: Briefcase,
};

function AgentNode({ agent, x, y, onSelect }: { agent: Agent; x: number; y: number; onSelect: (a: Agent) => void }) {
  const isStrategic = agent.level === 'strategic';
  const isOrch = agent.level === 'orchestration';
  const size = isStrategic ? 56 : isOrch ? 48 : agent.level === 'department' ? 40 : 32;
  const Icon = typeIcons[agent.participantType];

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.random() * 0.5, type: "spring" }}
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect(agent)}
    >
      {/* Glow ring */}
      {agent.status === 'active' && (
        <circle cx={x} cy={y} r={size / 2 + 8} fill="none" stroke="hsl(185, 90%, 60%)" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values={`${size/2+6};${size/2+12};${size/2+6}`} dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
      )}
      {/* Node circle */}
      <circle
        cx={x} cy={y} r={size / 2}
        fill={isStrategic ? 'hsl(185, 90%, 60%)' : isOrch ? 'hsl(270, 60%, 55%)' : 'hsl(222, 40%, 14%)'}
        stroke={agent.status === 'escalated' ? 'hsl(45, 90%, 60%)' : agent.status === 'blocked' ? 'hsl(0, 70%, 55%)' : 'hsl(185, 60%, 40%)'}
        strokeWidth={isStrategic ? 2.5 : 1.5}
        opacity={agent.status === 'idle' ? 0.6 : 1}
      />
      {/* Status dot */}
      <circle cx={x + size/2 - 4} cy={y - size/2 + 4} r={4} fill={statusColors[agent.status]?.replace('bg-', '') || '#666'}>
        {agent.status === 'active' && (
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        )}
      </circle>
      {/* Icon placeholder */}
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fill={isStrategic || isOrch ? 'hsl(222, 47%, 6%)' : 'hsl(185, 80%, 65%)'} fontSize={size * 0.35} fontFamily="Inter">
        {agent.participantType === 'ai' ? '◆' : agent.participantType === 'human' ? '●' : '▲'}
      </text>
      {/* Name label */}
      <text x={x} y={y + size/2 + 14} textAnchor="middle" fill="hsl(210, 40%, 80%)" fontSize="10" fontFamily="Inter" fontWeight="500">
        {agent.name.length > 18 ? agent.name.slice(0, 16) + '…' : agent.name}
      </text>
    </motion.g>
  );
}

export default function AgentNetworkGraph() {
  const [selected, setSelected] = useState<Agent | null>(null);
  
  const width = 1100;
  const height = 520;
  
  const strategic = agents.filter(a => a.level === 'strategic');
  const orchestration = agents.filter(a => a.level === 'orchestration');
  const deptHeads = agents.filter(a => a.level === 'department');
  const specialists = agents.filter(a => a.level === 'specialist');

  const getPos = (agent: Agent): { x: number; y: number } => {
    const yBase = levelPositions[agent.level].y;
    if (agent.level === 'strategic') return { x: width / 2, y: yBase };
    if (agent.level === 'orchestration') return { x: width / 2, y: yBase };
    if (agent.level === 'department') {
      const idx = deptHeads.indexOf(agent);
      const spacing = (width - 120) / (deptHeads.length - 1);
      return { x: 60 + idx * spacing, y: yBase };
    }
    // Specialists grouped under their department head
    const parent = deptHeads.find(d => d.id === agent.reportsTo);
    if (!parent) return { x: width / 2, y: yBase };
    const siblings = specialists.filter(s => s.reportsTo === agent.reportsTo);
    const sibIdx = siblings.indexOf(agent);
    const parentPos = getPos(parent);
    const spread = Math.min(siblings.length * 45, 120);
    const startX = parentPos.x - spread / 2;
    return { x: startX + sibIdx * (spread / (Math.max(siblings.length - 1, 1))), y: yBase + sibIdx % 2 * 25 };
  };

  // Connection lines
  const connections: { from: { x: number; y: number }; to: { x: number; y: number }; opacity: number }[] = [];
  
  orchestration.forEach(o => {
    const oPos = getPos(o);
    strategic.forEach(s => {
      connections.push({ from: getPos(s), to: oPos, opacity: 0.6 });
    });
  });
  
  deptHeads.forEach(d => {
    const dPos = getPos(d);
    connections.push({ from: getPos(orchestration[0]), to: dPos, opacity: 0.35 });
  });
  
  specialists.forEach(s => {
    const parent = deptHeads.find(d => d.id === s.reportsTo);
    if (parent) {
      connections.push({ from: getPos(parent), to: getPos(s), opacity: 0.2 });
    }
  });

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ minHeight: 400 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(185, 90%, 60%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(270, 60%, 55%)" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {connections.map((c, i) => (
          <line
            key={i}
            x1={c.from.x} y1={c.from.y}
            x2={c.to.x} y2={c.to.y}
            stroke="url(#lineGrad)"
            strokeWidth="1"
            opacity={c.opacity}
            strokeDasharray="4 4"
          >
            <animate attributeName="stroke-dashoffset" values="8;0" dur="2s" repeatCount="indefinite" />
          </line>
        ))}

        {/* Level labels */}
        {[
          { label: 'STRATEGIC', y: levelPositions.strategic.y },
          { label: 'ORCHESTRATION', y: levelPositions.orchestration.y },
          { label: 'DEPARTMENT HEADS', y: levelPositions.department.y },
          { label: 'SPECIALISTS', y: levelPositions.specialist.y },
        ].map(l => (
          <text key={l.label} x={16} y={l.y - 20} fill="hsl(215, 20%, 40%)" fontSize="9" fontFamily="JetBrains Mono" fontWeight="500" letterSpacing="0.1em">
            {l.label}
          </text>
        ))}

        {/* Agent nodes */}
        {[...strategic, ...orchestration, ...deptHeads, ...specialists].map(agent => {
          const pos = getPos(agent);
          return <AgentNode key={agent.id} agent={agent} x={pos.x} y={pos.y} onSelect={setSelected} />;
        })}
      </svg>

      {/* Selected agent detail panel */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 glass-panel-strong p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2.5 h-2.5 rounded-full ${statusColors[selected.status]}`} />
                <span className="text-sm font-semibold text-foreground">{selected.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase">
                  {selected.participantType}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{selected.role} · {selected.department}</p>
              <p className="text-xs text-foreground/70 mt-1">{selected.recentActivity}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-primary">{Math.round(selected.confidenceScore * 100)}%</div>
              <div className="text-[10px] text-muted-foreground">confidence</div>
            </div>
          </div>
          <button onClick={() => setSelected(null)} className="absolute top-2 right-3 text-muted-foreground hover:text-foreground text-xs">✕</button>
        </motion.div>
      )}
    </div>
  );
}
