import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Network, 
  LayoutDashboard, 
  Users, 
  GitBranch, 
  MessageSquare, 
  FileText, 
  Building2,
  Zap,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: '/', label: 'Home', icon: Building2 },
  { path: '/platform', label: 'Platform', icon: LayoutDashboard },
  { path: '/agent-network', label: 'Agent Network', icon: Network },
  { path: '/workflow', label: 'Workflow', icon: GitBranch },
  { path: '/departments', label: 'Departments', icon: Users },
  { path: '/collaboration', label: 'Collaboration', icon: MessageSquare },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/command-center', label: 'Command Center', icon: Zap },
];

const secondaryNav = [
  { path: '/about', label: 'About' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel-strong border-b border-border/30">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center node-pulse">
              <Network className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="font-semibold text-foreground tracking-tight">Meridian</span>
              <span className="font-light text-primary ml-1">AI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    active 
                      ? 'bg-primary/15 text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {secondaryNav.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/request-demo"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors glow-cyan"
            >
              Request Demo
            </Link>
          </div>

          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="lg:hidden text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden glass-panel-strong border-t border-border/30 p-4"
          >
            {[...navItems, ...secondaryNav.map(n => ({ ...n, icon: ChevronRight }))].map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50"
              >
                {'icon' in item && <item.icon className="w-4 h-4" />}
                {item.label}
              </Link>
            ))}
            <Link
              to="/request-demo"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block text-center px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
            >
              Request Demo
            </Link>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className={isLanding ? '' : 'pt-16'}>
        {children}
      </main>
    </div>
  );
}
