import AgentNetworkGraph from "@/components/dashboard/AgentNetworkGraph";
import ActivityJournal from "@/components/dashboard/ActivityJournal";
import { generateActivityEvents } from "@/data/agents";
import { motion } from "framer-motion";

const events = generateActivityEvents();

export default function AgentNetworkPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Agent Network</h1>
          <p className="text-sm text-muted-foreground">Real-time organizational constellation — AI agents, human operators, and freelancers.</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="glass-panel p-6">
            <AgentNetworkGraph />
          </div>
          <div className="h-[600px] lg:h-auto">
            <ActivityJournal events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}
