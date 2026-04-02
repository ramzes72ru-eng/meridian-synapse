import { motion } from "framer-motion";
import { 
  AlertTriangle, TrendingUp, Shield, BarChart3, Clock, 
  CheckCircle2, XCircle, Brain, Zap
} from "lucide-react";

const metrics = [
  { label: "Active Processes", value: "147", change: "+12", icon: Zap, trend: "up" },
  { label: "System Confidence", value: "91%", change: "+2%", icon: Brain, trend: "up" },
  { label: "Open Escalations", value: "3", change: "-1", icon: AlertTriangle, trend: "down" },
  { label: "Decisions Today", value: "89", change: "+23", icon: CheckCircle2, trend: "up" },
];

const risks = [
  { level: "HIGH", title: "EU market entry permit delay", dept: "International Expansion", agent: "Local Operations", desc: "Regulatory approval pending for 14 days. Deadline risk." },
  { level: "MEDIUM", title: "Contractor pricing dispute", dept: "Development", agent: "Contractor Relations", desc: "Phase 3 contractor submitted revised pricing above budget threshold." },
  { level: "LOW", title: "CRM data migration backlog", dept: "IT & Digital", agent: "Web / CRM Developer", desc: "15% of records pending validation. No operational impact." },
];

const alerts = [
  { type: "escalation", message: "Head of Expansion escalated permit issue to General Counsel", time: "12m ago" },
  { type: "approval", message: "CFO approved Q2 budget allocation", time: "34m ago" },
  { type: "conflict", message: "Development vs Operations resource conflict — awaiting COO resolution", time: "1h ago" },
  { type: "completion", message: "Financial Analyst completed Dubai P&L projections", time: "2h ago" },
];

export default function PlatformPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Executive Command Center</h1>
          <p className="text-sm text-muted-foreground">Real-time organizational intelligence — risks, opportunities, alerts, and active processes.</p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <m.icon className="w-5 h-5 text-primary" />
                <span className={`text-xs font-mono ${m.trend === 'up' ? 'text-emerald-400' : 'text-amber-400'}`}>{m.change}</span>
              </div>
              <div className="text-2xl font-bold text-foreground font-mono">{m.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Risks & Opportunities */}
          <div className="space-y-6">
            <div className="glass-panel p-6">
              <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> Key Risks
              </h2>
              <div className="space-y-3">
                {risks.map((risk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-lg bg-muted/20 border border-border/30"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        risk.level === 'HIGH' ? 'bg-red-400/10 text-red-400' :
                        risk.level === 'MEDIUM' ? 'bg-amber-400/10 text-amber-400' :
                        'bg-muted text-muted-foreground'
                      }`}>{risk.level}</span>
                      <span className="text-sm font-medium text-foreground">{risk.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{risk.dept} · {risk.agent}</p>
                    <p className="text-xs text-foreground/60 mt-1">{risk.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="glass-panel p-6">
              <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Recommended Actions
              </h2>
              <div className="space-y-2">
                {[
                  { action: "Escalate EU permit issue to external legal counsel", confidence: 94, priority: "urgent" },
                  { action: "Approve revised contractor pricing with 5% counter-offer", confidence: 87, priority: "high" },
                  { action: "Reallocate marketing budget to Q2 performance campaigns", confidence: 82, priority: "medium" },
                  { action: "Schedule cross-department sync: Development × Operations", confidence: 91, priority: "high" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      item.priority === 'urgent' ? 'bg-red-400' : item.priority === 'high' ? 'bg-amber-400' : 'bg-primary'
                    }`} />
                    <span className="text-sm text-foreground flex-1">{item.action}</span>
                    <span className="text-xs font-mono text-primary">{item.confidence}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts feed */}
          <div className="glass-panel p-6">
            <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Recent Alerts
            </h2>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 rounded-lg bg-muted/20 border border-border/30"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-mono font-bold uppercase ${
                      alert.type === 'escalation' ? 'text-amber-400' :
                      alert.type === 'conflict' ? 'text-red-400' :
                      alert.type === 'approval' ? 'text-emerald-400' : 'text-primary'
                    }`}>{alert.type}</span>
                    <span className="text-[10px] font-mono text-muted-foreground ml-auto">{alert.time}</span>
                  </div>
                  <p className="text-xs text-foreground/80">{alert.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
