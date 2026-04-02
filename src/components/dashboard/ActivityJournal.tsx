import { ActivityEvent } from "@/data/agents";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  ArrowRightLeft, 
  MessageCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ThumbsUp, 
  XCircle 
} from "lucide-react";

const typeConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  launch: { icon: Rocket, color: 'text-glow-cyan', label: 'LAUNCH' },
  routing: { icon: ArrowRightLeft, color: 'text-glow-violet', label: 'ROUTING' },
  consultation: { icon: MessageCircle, color: 'text-blue-400', label: 'CONSULT' },
  completion: { icon: CheckCircle2, color: 'text-emerald-400', label: 'COMPLETE' },
  escalation: { icon: AlertTriangle, color: 'text-amber-400', label: 'ESCALATION' },
  approval: { icon: ThumbsUp, color: 'text-glow-cyan', label: 'APPROVED' },
  blocked: { icon: XCircle, color: 'text-red-400', label: 'BLOCKED' },
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

export default function ActivityJournal({ events }: { events: ActivityEvent[] }) {
  return (
    <div className="glass-panel p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">Activity Journal</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span className="text-xs text-muted-foreground font-mono">LIVE</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
        <AnimatePresence>
          {events.map((event, i) => {
            const config = typeConfig[event.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-lg bg-muted/30 border border-border/30 hover:border-border/60 transition-colors group"
              >
                <div className="flex items-start gap-2.5">
                  <div className={`mt-0.5 ${config.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono font-bold ${config.color} tracking-wider`}>
                        {config.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {timeAgo(event.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/80 leading-relaxed">
                      <span className="font-medium text-foreground">{event.agentName}</span>
                      {' · '}{event.message}
                    </p>
                    {event.confidence && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary/60 rounded-full" 
                            style={{ width: `${event.confidence * 100}%` }} 
                          />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {Math.round(event.confidence * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
