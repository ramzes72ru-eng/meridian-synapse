export type AgentStatus = 'active' | 'idle' | 'blocked' | 'escalated' | 'completed';
export type AgentLevel = 'strategic' | 'orchestration' | 'department' | 'specialist';
export type ParticipantType = 'ai' | 'human' | 'freelancer';

export interface Agent {
  id: string;
  name: string;
  role: string;
  department: string;
  level: AgentLevel;
  reportsTo: string | null;
  consultsWidth: string[];
  specialization: string;
  status: AgentStatus;
  confidenceScore: number;
  participantType: ParticipantType;
  recentActivity: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: Date;
  type: 'launch' | 'routing' | 'consultation' | 'completion' | 'escalation' | 'approval' | 'blocked';
  agentId: string;
  agentName: string;
  message: string;
  department: string;
  confidence?: number;
}

export const agents: Agent[] = [
  // Strategic
  { id: 'ceo', name: 'Digital CEO', role: 'Chief Executive Officer', department: 'Executive Office', level: 'strategic', reportsTo: null, consultsWidth: ['coo'], specialization: 'Strategic oversight & final decisions', status: 'active', confidenceScore: 0.96, participantType: 'ai', recentActivity: 'Reviewing Q2 expansion strategy' },
  // Orchestration
  { id: 'coo', name: 'Digital COO', role: 'Chief Operating Officer', department: 'Operations', level: 'orchestration', reportsTo: 'ceo', consultsWidth: ['cfo', 'cto'], specialization: 'Cross-functional orchestration', status: 'active', confidenceScore: 0.94, participantType: 'ai', recentActivity: 'Consolidating department reports' },
  // Department Heads
  { id: 'cfo', name: 'Digital CFO', role: 'Chief Financial Officer', department: 'Finance', level: 'department', reportsTo: 'coo', consultsWidth: ['gc', 'ir'], specialization: 'Financial strategy & reporting', status: 'active', confidenceScore: 0.92, participantType: 'ai', recentActivity: 'Analyzing investment portfolio' },
  { id: 'gc', name: 'General Counsel', role: 'General Counsel', department: 'Legal', level: 'department', reportsTo: 'coo', consultsWidth: ['cfo'], specialization: 'Legal & compliance', status: 'idle', confidenceScore: 0.89, participantType: 'ai', recentActivity: 'Reviewing compliance framework' },
  { id: 'ir', name: 'Head of IR', role: 'Head of Investor Relations', department: 'Investor Relations', level: 'department', reportsTo: 'coo', consultsWidth: ['cfo', 'cmo'], specialization: 'Investor engagement & reporting', status: 'active', confidenceScore: 0.91, participantType: 'ai', recentActivity: 'Preparing investor deck' },
  { id: 'cmo', name: 'Digital CMO', role: 'Chief Marketing Officer', department: 'Marketing', level: 'department', reportsTo: 'coo', consultsWidth: ['media', 'ir'], specialization: 'Brand & growth strategy', status: 'active', confidenceScore: 0.88, participantType: 'ai', recentActivity: 'Launching brand campaign' },
  { id: 'media', name: 'Head of Media', role: 'Head of Media', department: 'Media', level: 'department', reportsTo: 'coo', consultsWidth: ['cmo'], specialization: 'Content & media production', status: 'idle', confidenceScore: 0.85, participantType: 'ai', recentActivity: 'Scheduling content calendar' },
  { id: 'dev', name: 'Head of Development', role: 'Head of Development', department: 'Development', level: 'department', reportsTo: 'coo', consultsWidth: ['ops', 'cto'], specialization: 'Project & construction management', status: 'active', confidenceScore: 0.90, participantType: 'ai', recentActivity: 'Monitoring project milestones' },
  { id: 'ops', name: 'Head of Operations', role: 'Head of Operations', department: 'Operations', level: 'department', reportsTo: 'coo', consultsWidth: ['dev', 'hr'], specialization: 'Operational efficiency', status: 'active', confidenceScore: 0.87, participantType: 'ai', recentActivity: 'Optimizing workflows' },
  { id: 'expansion', name: 'Head of Expansion', role: 'Head of Expansion', department: 'International Expansion', level: 'department', reportsTo: 'coo', consultsWidth: ['gc', 'cfo'], specialization: 'Market entry & international growth', status: 'escalated', confidenceScore: 0.78, participantType: 'ai', recentActivity: 'Evaluating EU market entry' },
  { id: 'cto', name: 'CTO / Head of IT', role: 'Chief Technology Officer', department: 'IT & Digital', level: 'department', reportsTo: 'coo', consultsWidth: ['dev'], specialization: 'Technology & infrastructure', status: 'active', confidenceScore: 0.93, participantType: 'ai', recentActivity: 'Deploying platform update' },
  { id: 'hr', name: 'Head of HR', role: 'Head of HR', department: 'HR & Admin', level: 'department', reportsTo: 'coo', consultsWidth: ['ops'], specialization: 'People & administration', status: 'idle', confidenceScore: 0.86, participantType: 'ai', recentActivity: 'Processing recruitment pipeline' },
  // Specialists
  { id: 'fin-analyst', name: 'Financial Analyst', role: 'Financial Analyst', department: 'Finance', level: 'specialist', reportsTo: 'cfo', consultsWidth: [], specialization: 'Financial modeling & analysis', status: 'active', confidenceScore: 0.91, participantType: 'ai', recentActivity: 'Running P&L projections' },
  { id: 'risk-mgr', name: 'Risk Manager', role: 'Risk Manager', department: 'Finance', level: 'specialist', reportsTo: 'cfo', consultsWidth: ['gc'], specialization: 'Risk assessment', status: 'active', confidenceScore: 0.88, participantType: 'ai', recentActivity: 'Updating risk matrix' },
  { id: 'corp-admin', name: 'Corporate Administrator', role: 'Corporate Administrator', department: 'Legal', level: 'specialist', reportsTo: 'gc', consultsWidth: [], specialization: 'Corporate governance', status: 'idle', confidenceScore: 0.84, participantType: 'human', recentActivity: 'Filing quarterly reports' },
  { id: 'inv-mgr', name: 'Investment Manager', role: 'Investment Manager', department: 'Investor Relations', level: 'specialist', reportsTo: 'ir', consultsWidth: ['fin-analyst'], specialization: 'Deal sourcing & management', status: 'active', confidenceScore: 0.90, participantType: 'human', recentActivity: 'Evaluating new deal pipeline' },
  { id: 'inv-support', name: 'Investor Support', role: 'Investor Support Agent', department: 'Investor Relations', level: 'specialist', reportsTo: 'ir', consultsWidth: [], specialization: 'Investor communications', status: 'active', confidenceScore: 0.87, participantType: 'ai', recentActivity: 'Responding to investor queries' },
  { id: 'perf-mktg', name: 'Performance Marketing', role: 'Performance Marketing Agent', department: 'Marketing', level: 'specialist', reportsTo: 'cmo', consultsWidth: ['traffic'], specialization: 'Campaign optimization', status: 'active', confidenceScore: 0.85, participantType: 'ai', recentActivity: 'Optimizing ad spend' },
  { id: 'traffic', name: 'Traffic & Ads', role: 'Traffic & Ads Specialist', department: 'Marketing', level: 'specialist', reportsTo: 'cmo', consultsWidth: [], specialization: 'Paid media & traffic', status: 'active', confidenceScore: 0.83, participantType: 'freelancer', recentActivity: 'Managing Google Ads campaigns' },
  { id: 'mktg-analytics', name: 'Marketing Analytics', role: 'Marketing Analytics Agent', department: 'Marketing', level: 'specialist', reportsTo: 'cmo', consultsWidth: [], specialization: 'Marketing data analysis', status: 'idle', confidenceScore: 0.86, participantType: 'ai', recentActivity: 'Generating attribution report' },
  { id: 'content', name: 'Content Producer', role: 'Content Producer', department: 'Media', level: 'specialist', reportsTo: 'media', consultsWidth: ['video'], specialization: 'Content creation', status: 'active', confidenceScore: 0.82, participantType: 'freelancer', recentActivity: 'Producing brand content' },
  { id: 'video', name: 'Video Production', role: 'Video Production Agent', department: 'Media', level: 'specialist', reportsTo: 'media', consultsWidth: [], specialization: 'Video content', status: 'idle', confidenceScore: 0.80, participantType: 'ai', recentActivity: 'Rendering project video' },
  { id: 'editor', name: 'Editor / Scriptwriter', role: 'Editor / Scriptwriter', department: 'Media', level: 'specialist', reportsTo: 'media', consultsWidth: ['content'], specialization: 'Editorial & scripts', status: 'active', confidenceScore: 0.84, participantType: 'freelancer', recentActivity: 'Drafting campaign script' },
  { id: 'influencer', name: 'Influencer & Partnerships', role: 'Influencer & Partnerships Agent', department: 'Marketing', level: 'specialist', reportsTo: 'cmo', consultsWidth: ['content'], specialization: 'Partnerships & outreach', status: 'idle', confidenceScore: 0.79, participantType: 'ai', recentActivity: 'Outreach to partners' },
  { id: 'bim', name: 'BIM / Project Engineer', role: 'BIM / Project Engineer', department: 'Development', level: 'specialist', reportsTo: 'dev', consultsWidth: ['contractor'], specialization: 'Engineering & BIM', status: 'active', confidenceScore: 0.91, participantType: 'human', recentActivity: 'Updating BIM models' },
  { id: 'contractor', name: 'Contractor Relations', role: 'Contractor Relations Engineer', department: 'Development', level: 'specialist', reportsTo: 'dev', consultsWidth: [], specialization: 'Contractor management', status: 'active', confidenceScore: 0.85, participantType: 'human', recentActivity: 'Reviewing contractor bids' },
  { id: 'property', name: 'Property Manager', role: 'Property / Asset Manager', department: 'Operations', level: 'specialist', reportsTo: 'ops', consultsWidth: ['service'], specialization: 'Asset management', status: 'active', confidenceScore: 0.88, participantType: 'human', recentActivity: 'Managing portfolio assets' },
  { id: 'service', name: 'Service Coordinator', role: 'Service & Maintenance Coordinator', department: 'Operations', level: 'specialist', reportsTo: 'ops', consultsWidth: [], specialization: 'Maintenance coordination', status: 'idle', confidenceScore: 0.82, participantType: 'ai', recentActivity: 'Scheduling maintenance' },
  { id: 'local-ops', name: 'Local Operations', role: 'Local Operations Coordinator', department: 'International Expansion', level: 'specialist', reportsTo: 'expansion', consultsWidth: ['property'], specialization: 'Local market operations', status: 'blocked', confidenceScore: 0.72, participantType: 'human', recentActivity: 'Awaiting local permits' },
  { id: 'web-dev', name: 'Web / CRM Developer', role: 'Web / CRM Developer', department: 'IT & Digital', level: 'specialist', reportsTo: 'cto', consultsWidth: [], specialization: 'Web & CRM systems', status: 'active', confidenceScore: 0.90, participantType: 'ai', recentActivity: 'Deploying CRM update' },
  { id: 'tech-support', name: 'Tech Support', role: 'Tech Support Agent', department: 'IT & Digital', level: 'specialist', reportsTo: 'cto', consultsWidth: [], specialization: 'Technical support', status: 'idle', confidenceScore: 0.83, participantType: 'ai', recentActivity: 'Resolving support tickets' },
  { id: 'office-mgr', name: 'Admin / Office Manager', role: 'Admin / Office Manager', department: 'HR & Admin', level: 'specialist', reportsTo: 'hr', consultsWidth: [], specialization: 'Office administration', status: 'idle', confidenceScore: 0.81, participantType: 'human', recentActivity: 'Processing admin tasks' },
  { id: 'hr-mgr', name: 'HR Manager', role: 'HR Manager', department: 'HR & Admin', level: 'specialist', reportsTo: 'hr', consultsWidth: [], specialization: 'Recruitment & HR ops', status: 'active', confidenceScore: 0.87, participantType: 'human', recentActivity: 'Interviewing candidates' },
];

export const generateActivityEvents = (): ActivityEvent[] => {
  const now = new Date();
  const events: ActivityEvent[] = [
    { id: '1', timestamp: new Date(now.getTime() - 5000), type: 'launch', agentId: 'ceo', agentName: 'Digital CEO', message: 'Initiated Q2 strategic review across all departments', department: 'Executive Office', confidence: 0.96 },
    { id: '2', timestamp: new Date(now.getTime() - 12000), type: 'routing', agentId: 'coo', agentName: 'Digital COO', message: 'Distributed expansion analysis to Finance, Legal, and IR', department: 'Operations', confidence: 0.94 },
    { id: '3', timestamp: new Date(now.getTime() - 25000), type: 'completion', agentId: 'fin-analyst', agentName: 'Financial Analyst', message: 'Completed P&L projections for Dubai office launch', department: 'Finance', confidence: 0.91 },
    { id: '4', timestamp: new Date(now.getTime() - 38000), type: 'consultation', agentId: 'gc', agentName: 'General Counsel', message: 'Consulting with CFO on cross-border compliance requirements', department: 'Legal', confidence: 0.89 },
    { id: '5', timestamp: new Date(now.getTime() - 55000), type: 'escalation', agentId: 'local-ops', agentName: 'Local Operations', message: 'Permit delays in target market — escalated to Head of Expansion', department: 'International Expansion', confidence: 0.72 },
    { id: '6', timestamp: new Date(now.getTime() - 70000), type: 'approval', agentId: 'inv-mgr', agentName: 'Investment Manager', message: 'Investment memo approved for Series B review', department: 'Investor Relations', confidence: 0.90 },
    { id: '7', timestamp: new Date(now.getTime() - 90000), type: 'launch', agentId: 'perf-mktg', agentName: 'Performance Marketing', message: 'Launched retargeting campaign across EU markets', department: 'Marketing', confidence: 0.85 },
    { id: '8', timestamp: new Date(now.getTime() - 120000), type: 'completion', agentId: 'web-dev', agentName: 'Web / CRM Developer', message: 'CRM integration deployed to production', department: 'IT & Digital', confidence: 0.90 },
    { id: '9', timestamp: new Date(now.getTime() - 150000), type: 'blocked', agentId: 'expansion', agentName: 'Head of Expansion', message: 'EU entry blocked — awaiting legal clearance', department: 'International Expansion', confidence: 0.78 },
    { id: '10', timestamp: new Date(now.getTime() - 180000), type: 'routing', agentId: 'coo', agentName: 'Digital COO', message: 'Cross-department sync initiated between Dev and Ops', department: 'Operations', confidence: 0.94 },
    { id: '11', timestamp: new Date(now.getTime() - 210000), type: 'completion', agentId: 'bim', agentName: 'BIM / Project Engineer', message: 'Updated structural models for Phase 3 development', department: 'Development', confidence: 0.91 },
    { id: '12', timestamp: new Date(now.getTime() - 240000), type: 'approval', agentId: 'cfo', agentName: 'Digital CFO', message: 'Approved quarterly budget allocation', department: 'Finance', confidence: 0.92 },
  ];
  return events;
};

export const departments = [
  { name: 'Executive Office', color: 'hsl(185, 90%, 60%)', agents: agents.filter(a => a.department === 'Executive Office') },
  { name: 'Operations', color: 'hsl(185, 70%, 50%)', agents: agents.filter(a => a.department === 'Operations' && a.level !== 'orchestration') },
  { name: 'Finance', color: 'hsl(210, 80%, 60%)', agents: agents.filter(a => a.department === 'Finance') },
  { name: 'Legal', color: 'hsl(270, 60%, 60%)', agents: agents.filter(a => a.department === 'Legal') },
  { name: 'Investor Relations', color: 'hsl(240, 60%, 65%)', agents: agents.filter(a => a.department === 'Investor Relations') },
  { name: 'Marketing', color: 'hsl(320, 70%, 55%)', agents: agents.filter(a => a.department === 'Marketing') },
  { name: 'Media', color: 'hsl(340, 60%, 55%)', agents: agents.filter(a => a.department === 'Media') },
  { name: 'Development', color: 'hsl(45, 80%, 55%)', agents: agents.filter(a => a.department === 'Development') },
  { name: 'International Expansion', color: 'hsl(30, 80%, 55%)', agents: agents.filter(a => a.department === 'International Expansion') },
  { name: 'IT & Digital', color: 'hsl(160, 70%, 50%)', agents: agents.filter(a => a.department === 'IT & Digital') },
  { name: 'HR & Admin', color: 'hsl(200, 50%, 55%)', agents: agents.filter(a => a.department === 'HR & Admin') },
];
