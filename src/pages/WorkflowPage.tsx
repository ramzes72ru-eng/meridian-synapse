import { motion } from "framer-motion";
import { GitBranch, ArrowRight, CheckCircle2, AlertTriangle, Clock, Zap } from "lucide-react";

const workflowStages = [
  {
    id: 'initiation',
    title: 'Task Initiation',
    desc: 'CEO or owner creates a strategic directive',
    status: 'completed' as const,
    agents: ['Digital CEO'],
  },
  {
    id: 'decomposition',
    title: 'Orchestration & Decomposition',
    desc: 'COO breaks down the task and routes to departments',
    status: 'completed' as const,
    agents: ['Digital COO'],
  },
  {
    id: 'parallel',
    title: 'Parallel Specialist Execution',
    desc: 'Multiple specialists work simultaneously across departments',
    status: 'active' as const,
    agents: ['Financial Analyst', 'Risk Manager', 'General Counsel', 'BIM Engineer', 'Local Operations'],
    branches: [
      { dept: 'Finance', tasks: ['P&L Projections', 'Risk Assessment'], status: 'completed' },
      { dept: 'Legal', tasks: ['Compliance Review', 'Jurisdiction Analysis'], status: 'active' },
      { dept: 'Development', tasks: ['Site Assessment', 'Contractor Review'], status: 'active' },
      { dept: 'Expansion', tasks: ['Market Analysis', 'Local Permits'], status: 'blocked' },
    ],
  },
  {
    id: 'consolidation',
    title: 'Department Consolidation',
    desc: 'Department heads consolidate specialist outputs and consult cross-functionally',
    status: 'pending' as const,
    agents: ['CFO', 'General Counsel', 'Head of Dev', 'Head of Expansion'],
  },
  {
    id: 'cross-dept',
    title: 'Cross-Department Consultation',
    desc: 'Department heads resolve dependencies and conflicts',
    status: 'pending' as const,
    agents: ['CFO ↔ General Counsel', 'Head of Dev ↔ Head of Ops'],
  },
  {
    id: 'ops-consolidation',
    title: 'Operational Consolidation',
    desc: 'COO builds the consolidated operational view',
    status: 'pending' as const,
    agents: ['Digital COO'],
  },
  {
    id: 'summary',
    title: 'CEO Executive Summary',
    desc: 'Final cleaned and confidence-scored decision brief',
    status: 'pending' as const,
    agents: ['Digital CEO'],
  },
];

const statusConfig = {
  completed: { color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20', icon: CheckCircle2 },
  active: { color: 'text-primary', bg: 'bg-primary/10 border-primary/20', icon: Zap },
  blocked: { color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', icon: AlertTriangle },
  pending: { color: 'text-muted-foreground', bg: 'bg-muted/30 border-border/30', icon: Clock },
};

export default function WorkflowPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Workflow Orchestration</h1>
          <p className="text-sm text-muted-foreground">Non-linear task execution with parallel branching, cross-department consultation, and bottom-up reporting.</p>
        </motion.div>

        {/* Active workflow example */}
        <div className="glass-panel p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GitBranch className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-base font-semibold text-foreground">Dubai Office Launch — Market Entry Analysis</h2>
              <p className="text-xs text-muted-foreground font-mono">WF-2026-0147 · Initiated 3h ago · 7 stages</p>
            </div>
          </div>

          <div className="space-y-4">
            {workflowStages.map((stage, i) => {
              const config = statusConfig[stage.status];
              const Icon = config.icon;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className={`p-4 rounded-xl border ${config.bg}`}>
                    <div className="flex items-start gap-3">
                      <Icon className={`w-4 h-4 mt-0.5 ${config.color}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-foreground">{stage.title}</h3>
                          <span className={`text-[10px] font-mono uppercase ${config.color}`}>{stage.status}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{stage.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {stage.agents.map(a => (
                            <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-foreground/70 font-mono">{a}</span>
                          ))}
                        </div>

                        {/* Branches for parallel execution */}
                        {stage.branches && (
                          <div className="grid sm:grid-cols-2 gap-2 mt-3">
                            {stage.branches.map(branch => {
                              const bConfig = statusConfig[branch.status as keyof typeof statusConfig];
                              return (
                                <div key={branch.dept} className={`p-3 rounded-lg border ${bConfig.bg}`}>
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${bConfig.color.replace('text-', 'bg-')}`} />
                                    <span className="text-xs font-semibold text-foreground">{branch.dept}</span>
                                    <span className={`text-[9px] font-mono uppercase ml-auto ${bConfig.color}`}>{branch.status}</span>
                                  </div>
                                  <div className="space-y-1">
                                    {branch.tasks.map(t => (
                                      <p key={t} className="text-[11px] text-muted-foreground pl-3">• {t}</p>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {i < workflowStages.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className="w-px h-4 bg-border/50" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
