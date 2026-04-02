import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function RequestDemoPage() {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Request a Demo</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            See Meridian AI in action — a live demonstration of the multi-agent operating system tailored to your organization.
          </p>
        </motion.div>

        <div className="glass-panel-strong p-8 mb-8">
          <form className="space-y-5" onSubmit={e => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">First Name</label>
                <input className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Last Name</label>
                <input className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Company</label>
              <input className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Work Email</label>
              <input type="email" className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Role / Title</label>
              <input className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">What are you looking to achieve?</label>
              <textarea rows={3} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 resize-none" />
            </div>
            <button className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all glow-cyan flex items-center justify-center gap-2">
              Schedule Demo <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            "Live multi-agent demonstration",
            "Customized to your industry",
            "30-minute executive walkthrough",
          ].map(item => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
