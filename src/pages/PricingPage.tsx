import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    desc: "For growing companies ready to deploy their first AI management layer.",
    features: [
      "Up to 15 AI agents",
      "5 departments",
      "Basic workflow orchestration",
      "Activity journal",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Enterprise",
    desc: "For international holdings and multi-entity organizations.",
    features: [
      "Unlimited AI agents",
      "All departments",
      "Advanced workflow orchestration",
      "Cross-department consultation",
      "Human + AI collaboration",
      "Executive command center",
      "Custom agent development",
      "Priority support & SLA",
    ],
    cta: "Request Access",
    highlighted: true,
  },
  {
    name: "Custom",
    desc: "For organizations requiring bespoke deployment, integration, and consulting.",
    features: [
      "Everything in Enterprise",
      "Dedicated infrastructure",
      "Custom integrations",
      "On-premise deployment option",
      "Strategic consulting",
      "White-label option",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Plans</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">Deploy your digital management layer at any scale.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-6 ${plan.highlighted ? 'glass-panel-strong border-primary/30 glow-cyan' : 'glass-panel'}`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-3">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
              <div className="space-y-2.5 mb-8">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className={`block text-center py-3 rounded-lg font-medium text-sm transition-all ${
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'glass-panel text-foreground hover:bg-muted/50'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
