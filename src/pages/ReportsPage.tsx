import { motion } from "framer-motion";
import { FileText, BarChart3, Shield, TrendingUp, Clock, Download } from "lucide-react";

const reports = [
  { id: 'RPT-2026-Q2-001', title: 'Q2 Executive Summary', type: 'Executive', dept: 'All Departments', date: 'Apr 1, 2026', status: 'Ready', confidence: 94 },
  { id: 'RPT-2026-FIN-012', title: 'Dubai Market Entry — Financial Analysis', type: 'Investment Memo', dept: 'Finance', date: 'Mar 30, 2026', status: 'Ready', confidence: 91 },
  { id: 'RPT-2026-LEG-008', title: 'Cross-Border Compliance Framework', type: 'Legal / Compliance', dept: 'Legal', date: 'Mar 28, 2026', status: 'Draft', confidence: 85 },
  { id: 'RPT-2026-MKT-019', title: 'Performance Marketing — Q1 Results', type: 'Department Report', dept: 'Marketing', date: 'Mar 27, 2026', status: 'Ready', confidence: 89 },
  { id: 'RPT-2026-RSK-005', title: 'Risk Assessment — EU Expansion', type: 'Risk Report', dept: 'Finance / Expansion', date: 'Mar 25, 2026', status: 'Under Review', confidence: 78 },
  { id: 'RPT-2026-OPS-011', title: 'Operations Efficiency Analysis', type: 'Department Report', dept: 'Operations', date: 'Mar 22, 2026', status: 'Ready', confidence: 87 },
];

const statusColors: Record<string, string> = {
  'Ready': 'text-emerald-400',
  'Draft': 'text-muted-foreground',
  'Under Review': 'text-amber-400',
};

export default function ReportsPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Reports & Knowledge Layer</h1>
          <p className="text-sm text-muted-foreground">Executive summaries, department reports, risk assessments, and decision logs.</p>
        </motion.div>

        <div className="space-y-3">
          {reports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-panel p-5 hover:border-primary/20 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{report.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{report.type}</span>
                      <span>·</span>
                      <span>{report.dept}</span>
                      <span>·</span>
                      <span>{report.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono ${statusColors[report.status]}`}>{report.status}</span>
                  <span className="text-xs font-mono text-primary">{report.confidence}%</span>
                  <Download className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
