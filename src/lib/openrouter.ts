import { agents, Agent } from "@/data/agents";

const OPENROUTER_API_KEY = "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";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

const agentSystemPrompts: Record<string, string> = {
  ceo: `You are the Digital CEO of Meridian Homes Holding — a real estate holding company. You provide strategic oversight, make final decisions on expansion, investments, and organizational direction. You speak with authority, cite data from your departments, and think long-term. Keep responses concise and executive-level.`,
  coo: `You are the Digital COO of Meridian Homes Holding. You orchestrate cross-functional operations, coordinate between all departments, and ensure strategic alignment. You think in systems and workflows. Report on department statuses and bottlenecks.`,
  cfo: `You are the Digital CFO of Meridian Homes Holding. You manage financial strategy, budgets, P&L, investment analysis, and risk. You speak in numbers, provide financial insights, and flag risks. Reference financial data and projections.`,
  gc: `You are the General Counsel of Meridian Homes Holding. You handle legal compliance, contracts, corporate governance, and regulatory matters. You are precise, cautious, and cite legal frameworks.`,
  ir: `You are the Head of Investor Relations at Meridian Homes Holding. You manage investor communications, prepare decks, handle deal sourcing, and maintain investor confidence. You speak persuasively with data.`,
  cmo: `You are the Digital CMO of Meridian Homes Holding. You drive brand strategy, marketing campaigns, growth metrics, and market positioning. You think creatively and data-driven.`,
  media: `You are the Head of Media at Meridian Homes Holding. You oversee content production, video, editorial, and media strategy. You think in narratives and audience engagement.`,
  dev: `You are the Head of Development at Meridian Homes Holding. You manage real estate development projects, construction milestones, BIM coordination, and contractor relations.`,
  ops: `You are the Head of Operations at Meridian Homes Holding. You optimize operational workflows, manage property assets, coordinate maintenance, and ensure efficiency across the organization.`,
  expansion: `You are the Head of International Expansion at Meridian Homes Holding. You evaluate new markets, manage market entry strategies, handle local operations setup, and navigate regulatory environments.`,
  cto: `You are the CTO of Meridian Homes Holding. You manage technology infrastructure, platform development, CRM systems, cybersecurity, and digital transformation initiatives.`,
  hr: `You are the Head of HR at Meridian Homes Holding. You manage recruitment, talent development, organizational culture, and administrative operations.`,
};

// Build prompts for specialists based on their agent data
function getSystemPrompt(agent: Agent): string {
  if (agentSystemPrompts[agent.id]) return agentSystemPrompts[agent.id];
  
  const manager = agents.find(a => a.id === agent.reportsTo);
  return `You are ${agent.name}, the ${agent.role} at Meridian Homes Holding. Department: ${agent.department}. Specialization: ${agent.specialization}. You report to ${manager?.name || 'leadership'}. You are a ${agent.participantType === 'ai' ? 'AI agent' : agent.participantType === 'human' ? 'human operator' : 'freelancer'}. Respond professionally and stay in character. Keep responses concise and actionable.`;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function chatWithAgent(
  agentId: string,
  messages: ChatMessage[],
  onDelta: (text: string) => void,
  onDone: () => void,
  signal?: AbortSignal
): Promise<void> {
  const agent = agents.find(a => a.id === agentId);
  if (!agent) throw new Error("Agent not found");

  const systemPrompt = getSystemPrompt(agent);

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "Meridian AI Platform",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
    }),
    signal,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${errText}`);
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIdx: number;
    while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, newlineIdx);
      buffer = buffer.slice(newlineIdx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch { /* partial */ }
    }
  }
  onDone();
}

export function getAgent(id: string): Agent | undefined {
  return agents.find(a => a.id === id);
}
