import { motion } from "framer-motion";
import { departments, agents } from "@/data/agents";
import { Bot, User, Briefcase } from "lucide-react";

const statusColors: Record<string, string> = {
  active: 'bg-emerald-400',
  idle: 'bg-muted-foreground/40',
  blocked: 'bg-red-400',
  escalated: 'bg-amber-400',
  completed: 'bg-primary',
};

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Departments & Agent Registry</h1>
          <p className="text-sm text-muted-foreground">Complete organizational architecture with {agents.length} registered agents across {departments.length} departments.</p>
        </motion.div>

        <div className="space-y-6">
          {departments.map((dept, di) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: di * 0.05 }}
              className="glass-panel overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-border/30 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                <h2 className="text-base font-semibold text-foreground">{dept.name}</h2>
                <span className="text-xs font-mono text-muted-foreground ml-auto">{dept.agents.length} agents</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/20">
                {dept.agents.map(agent => (
                  <div key={agent.id} className="p-4 bg-background/50 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-2 h-2 rounded-full ${statusColors[agent.status]}`} />
                      <span className="text-sm font-medium text-foreground">{agent.name}</span>
                      {agent.participantType === 'ai' && <Bot className="w-3 h-3 text-primary" />}
                      {agent.participantType === 'human' && <User className="w-3 h-3 text-muted-foreground" />}
                      {agent.participantType === 'freelancer' && <Briefcase className="w-3 h-3 text-secondary" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{agent.role}</p>
                    <p className="text-xs text-foreground/60">{agent.recentActivity}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary/50 rounded-full" style={{ width: `${agent.confidenceScore * 100}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">{Math.round(agent.confidenceScore * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
