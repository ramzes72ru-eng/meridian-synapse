import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Network, ArrowRight, Zap, Shield, Globe, Bot, Users, 
  BarChart3, GitBranch, Brain, Lock, Eye, Cpu, Building2,
  ChevronRight
} from "lucide-react";
import AgentNetworkGraph from "@/components/dashboard/AgentNetworkGraph";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const features = [
  { icon: Bot, title: "AI Executive Layer", desc: "Digital CEO, COO, CFO, and department heads operating 24/7 with real-time intelligence." },
  { icon: Users, title: "Human + AI Collaboration", desc: "Humans, agents, and freelancers work together in one unified operating environment." },
  { icon: GitBranch, title: "Non-Linear Workflows", desc: "Parallel execution, branching, cross-department consultation, and bottom-up reporting." },
  { icon: Brain, title: "Organizational Intelligence", desc: "Continuous signal processing — from raw data to executive-ready decisions." },
  { icon: Shield, title: "Governance & Auditability", desc: "Full audit trail, role-based access, confidence scores, and decision logs." },
  { icon: Globe, title: "Global Scale", desc: "Multi-market, multi-jurisdiction operations with localized AI specialist agents." },
];

const departments = [
  "Executive Office", "Finance", "Legal", "Investor Relations", "Marketing",
  "Media", "Development", "Operations", "International Expansion", "IT & Digital", "HR & Admin"
];

const useCases = [
  "Investment & Development Holdings",
  "Real Estate & Construction",
  "Financial Services",
  "Global Operations & Logistics",
  "Technology Companies",
  "Consulting & Professional Services",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(185, 90%, 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(185, 90%, 60%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 text-xs font-mono text-primary tracking-wider">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              OPERATIONAL · 32 AGENTS ACTIVE · REAL-TIME
            </div>
          </motion.div>

          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            <span className="text-foreground">Your Company.</span>
            <br />
            <span className="gradient-text">Powered by AI.</span>
            <br />
            <span className="text-foreground">Running in Real Time.</span>
          </motion.h1>

          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Meridian AI builds a complete digital management layer for your organization. 
            AI executives, human decisions, real-time intelligence — continuously.
          </motion.p>

          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/request-demo" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all glow-cyan flex items-center justify-center gap-2">
              Request Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/platform" className="px-8 py-4 rounded-xl glass-panel text-foreground font-medium text-base hover:bg-muted/50 transition-all flex items-center justify-center gap-2">
              Explore Platform <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Live Network Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Living Organization</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">A real-time constellation of AI agents and human team members, continuously operating across every department.</p>
            </div>
            <div className="glass-panel p-6">
              <AgentNetworkGraph />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From signal to decision — a multi-layered intelligence architecture.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Signal Input", desc: "CEO initiates a strategic directive or the system detects an operational signal." },
              { step: "02", title: "Orchestration", desc: "COO decomposes the task and routes to parallel specialist agents across departments." },
              { step: "03", title: "Parallel Execution", desc: "Specialists work simultaneously. Department heads consolidate and consult cross-functionally." },
              { step: "04", title: "Executive Summary", desc: "Bottom-up intelligence flows to the CEO as a structured, confidence-scored decision brief." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="glass-panel p-6 text-center"
              >
                <div className="text-2xl font-mono font-bold gradient-text mb-3">{item.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Platform Capabilities</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Enterprise-grade AI orchestration built for real business operations.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="glass-panel p-6 group hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:glow-cyan transition-shadow">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Digital Executives & Departments</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A complete organizational structure mirroring your real business — powered by specialized AI agents.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {departments.map((dept, i) => (
              <motion.div
                key={dept}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.5}
                className="px-5 py-3 rounded-full glass-panel text-sm text-foreground/80 font-medium hover:text-primary hover:border-primary/30 transition-colors cursor-default"
              >
                {dept}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Built for Complex Organizations</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                From international holding companies to global development firms — Meridian AI transforms 
                organizational complexity into structured, real-time operational intelligence.
              </p>
              <div className="space-y-3">
                {useCases.map(uc => (
                  <div key={uc} className="flex items-center gap-3 text-sm text-foreground/80">
                    <Zap className="w-4 h-4 text-primary flex-shrink-0" />
                    {uc}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-8">
              <div className="space-y-4">
                {[
                  { label: "Active Agents", value: "32", bar: 85 },
                  { label: "Tasks in Progress", value: "147", bar: 72 },
                  { label: "Cross-Dept Consultations", value: "23", bar: 58 },
                  { label: "Decisions Today", value: "89", bar: 94 },
                  { label: "System Confidence", value: "91%", bar: 91 },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="font-mono text-primary">{stat.value}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-primary/60 to-secondary/60 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Turn Business Chaos Into<br />
              <span className="gradient-text">Structured Action</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              From signals to decisions — continuously. Deploy your digital management layer today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-demo" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-cyan flex items-center justify-center gap-2">
                Request Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="px-8 py-4 rounded-xl glass-panel text-foreground font-medium hover:bg-muted/50 transition-all">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Network className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Meridian AI</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The AI-powered operating system for global organizations.
              </p>
            </div>
            {[
              { title: "Platform", links: [["Agent Network", "/agent-network"], ["Workflow", "/workflow"], ["Departments", "/departments"], ["Reports", "/reports"]] },
              { title: "Company", links: [["About", "/about"], ["Pricing", "/pricing"], ["Contact", "/contact"]] },
              { title: "Resources", links: [["Request Demo", "/request-demo"], ["Platform Overview", "/platform"]] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-foreground mb-3">{col.title}</h4>
                <div className="space-y-2">
                  {col.links.map(([label, path]) => (
                    <Link key={path} to={path} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© 2026 Meridian Homes Holding. All rights reserved.</p>
            <p className="text-xs text-muted-foreground font-mono">Meridian AI Multi-Agent Platform v1.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
