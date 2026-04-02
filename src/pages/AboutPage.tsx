import { motion } from "framer-motion";
import { Network, Globe, Brain, Eye, Target, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="gradient-text">Meridian AI</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl">
            We build the digital management layer for global organizations. A complete AI-powered 
            operating system that mirrors your company structure and runs continuously.
          </p>
        </motion.div>

        <div className="space-y-12">
          {[
            { icon: Target, title: "Mission", text: "To transform how organizations operate by creating intelligent digital twins of corporate structures — where AI executives and human decision-makers work together in real time." },
            { icon: Eye, title: "Philosophy", text: "Business intelligence should be continuous, not quarterly. Every signal should be processed, routed, analyzed, and consolidated — automatically. Humans make decisions. AI does the work." },
            { icon: Brain, title: "Product Vision", text: "Meridian AI is not a dashboard. It's a living digital organization. A multi-agent operating system where AI department heads manage specialist agents, consult across functions, and deliver structured intelligence to human executives." },
            { icon: Globe, title: "Why It Matters", text: "Global holding companies, investment firms, and development organizations operate across markets, jurisdictions, and time zones. Meridian AI ensures nothing falls through the cracks — continuously orchestrating across every department and geography." },
            { icon: Cpu, title: "Technology", text: "Built on a scalable multi-agent architecture with non-linear workflow execution, bottom-up intelligence gathering, cross-department consultation protocols, and full audit trail governance." },
          ].map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
