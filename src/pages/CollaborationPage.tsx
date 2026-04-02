import { motion } from "framer-motion";
import { Users, Bot, User, Briefcase, MessageSquare, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const tasks = [
  {
    id: 'T-0147-A',
    title: 'Dubai Office — Legal & Compliance Review',
    assignees: [
      { name: 'General Counsel', type: 'ai' as const },
      { name: 'Sarah Chen', type: 'human' as const },
      { name: 'Ahmed Al-Rashid', type: 'freelancer' as const },
    ],
    status: 'in_progress',
    comments: 8,
    deadline: 'Apr 15, 2026',
    department: 'Legal',
  },
  {
    id: 'T-0147-B',
    title: 'Financial Model — UAE Market Entry',
    assignees: [
      { name: 'Financial Analyst', type: 'ai' as const },
      { name: 'Marcus Weber', type: 'human' as const },
    ],
    status: 'review',
    comments: 12,
    deadline: 'Apr 10, 2026',
    department: 'Finance',
  },
  {
    id: 'T-0152',
    title: 'Brand Campaign — Q2 Launch Materials',
    assignees: [
      { name: 'Content Producer', type: 'freelancer' as const },
      { name: 'Performance Marketing', type: 'ai' as const },
      { name: 'Lisa Park', type: 'human' as const },
    ],
    status: 'in_progress',
    comments: 5,
    deadline: 'Apr 20, 2026',
    department: 'Marketing',
  },
  {
    id: 'T-0148',
    title: 'Contractor Bid Review — Phase 3',
    assignees: [
      { name: 'Contractor Relations', type: 'human' as const },
      { name: 'BIM / Project Engineer', type: 'human' as const },
    ],
    status: 'blocked',
    comments: 3,
    deadline: 'Apr 8, 2026',
    department: 'Development',
  },
];

const typeIcon = { ai: Bot, human: User, freelancer: Briefcase };
const statusConfig: Record<string, { label: string; color: string }> = {
  in_progress: { label: 'In Progress', color: 'text-primary' },
  review: { label: 'Under Review', color: 'text-amber-400' },
  blocked: { label: 'Blocked', color: 'text-red-400' },
  completed: { label: 'Completed', color: 'text-emerald-400' },
};

export default function CollaborationPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Human + AI Collaboration</h1>
          <p className="text-sm text-muted-foreground">Unified workspace where AI agents, team members, and freelancers work together on shared tasks.</p>
        </motion.div>

        {/* Task type legend */}
        <div className="flex gap-6 mb-6">
          {[
            { icon: Bot, label: 'AI Agent', color: 'text-primary' },
            { icon: User, label: 'Team Member', color: 'text-muted-foreground' },
            { icon: Briefcase, label: 'Freelancer', color: 'text-secondary' },
          ].map(t => (
            <div key={t.label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <t.icon className={`w-3.5 h-3.5 ${t.color}`} />
              {t.label}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {tasks.map((task, i) => {
            const config = statusConfig[task.status];
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-panel p-5 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-muted-foreground">{task.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">{task.department}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{task.title}</h3>
                  </div>
                  <span className={`text-xs font-mono ${config.color}`}>{config.label}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                      {task.assignees.map((a, j) => {
                        const Icon = typeIcon[a.type];
                        return (
                          <div key={j} className="w-7 h-7 rounded-full bg-muted border border-background flex items-center justify-center" title={`${a.name} (${a.type})`}>
                            <Icon className={`w-3.5 h-3.5 ${a.type === 'ai' ? 'text-primary' : a.type === 'freelancer' ? 'text-secondary' : 'text-muted-foreground'}`} />
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-xs text-muted-foreground">{task.assignees.length} assigned</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {task.comments}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.deadline}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
