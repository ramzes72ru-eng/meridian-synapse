import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, Network, Zap, ChevronDown } from "lucide-react";
import { agents, Agent } from "@/data/agents";
import { chatWithAgent, ChatMessage } from "@/lib/openrouter";

const levelOrder = { strategic: 0, orchestration: 1, department: 2, specialist: 3 };
const sortedAgents = [...agents].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);

const levelColors: Record<string, string> = {
  strategic: "border-amber-400/50 bg-amber-400/10",
  orchestration: "border-primary/50 bg-primary/10",
  department: "border-blue-400/50 bg-blue-400/10",
  specialist: "border-muted-foreground/30 bg-muted/30",
};

const statusDot: Record<string, string> = {
  active: "bg-emerald-400",
  idle: "bg-muted-foreground",
  blocked: "bg-red-400",
  escalated: "bg-amber-400",
  completed: "bg-blue-400",
};

interface UIMessage {
  role: "user" | "assistant";
  content: string;
}

export default function CommandCenterPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[0]);
  const [conversations, setConversations] = useState<Record<string, UIMessage[]>>({});
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [agentListOpen, setAgentListOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const currentMessages = conversations[selectedAgent.id] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg: UIMessage = { role: "user", content: text };
    const agentId = selectedAgent.id;

    setConversations(prev => ({
      ...prev,
      [agentId]: [...(prev[agentId] || []), userMsg],
    }));
    setInput("");
    setIsStreaming(true);

    const chatHistory: ChatMessage[] = [
      ...(conversations[agentId] || []).map(m => ({ role: m.role, content: m.content })),
      { role: "user" as const, content: text },
    ];

    let assistantText = "";
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      await chatWithAgent(
        agentId,
        chatHistory,
        (delta) => {
          assistantText += delta;
          setConversations(prev => {
            const msgs = prev[agentId] || [];
            const last = msgs[msgs.length - 1];
            if (last?.role === "assistant") {
              return { ...prev, [agentId]: [...msgs.slice(0, -1), { role: "assistant", content: assistantText }] };
            }
            return { ...prev, [agentId]: [...msgs, { role: "assistant", content: assistantText }] };
          });
        },
        () => setIsStreaming(false),
        controller.signal
      );
    } catch (e: any) {
      if (e.name !== "AbortError") {
        setConversations(prev => ({
          ...prev,
          [agentId]: [...(prev[agentId] || []), { role: "assistant", content: `⚠️ Error: ${e.message}` }],
        }));
      }
      setIsStreaming(false);
    }
  }, [input, isStreaming, selectedAgent, conversations]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Command Center
          </h1>
          <p className="text-sm text-muted-foreground">Live AI agent communication — speak directly with any agent in the organization.</p>
        </motion.div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-160px)]">
          {/* Agent Selector */}
          <div className="glass-panel p-3 overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Agents ({agents.length})</span>
              <button onClick={() => setAgentListOpen(!agentListOpen)} className="text-muted-foreground hover:text-foreground">
                <ChevronDown className={`w-4 h-4 transition-transform ${agentListOpen ? '' : '-rotate-90'}`} />
              </button>
            </div>
            <AnimatePresence>
              {agentListOpen && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="space-y-1 overflow-hidden">
                  {sortedAgents.map(agent => {
                    const isSelected = agent.id === selectedAgent.id;
                    const hasMessages = (conversations[agent.id] || []).length > 0;
                    return (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm ${
                          isSelected
                            ? "bg-primary/15 border border-primary/30"
                            : "hover:bg-muted/50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${statusDot[agent.status]}`} />
                          <span className={`font-medium truncate ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                            {agent.name}
                          </span>
                          {hasMessages && <div className="w-1.5 h-1.5 rounded-full bg-primary ml-auto flex-shrink-0" />}
                        </div>
                        <div className="text-[10px] text-muted-foreground ml-4 mt-0.5 truncate">{agent.role}</div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chat Area */}
          <div className="glass-panel flex flex-col">
            {/* Header */}
            <div className={`p-4 border-b border-border/30 ${levelColors[selectedAgent.level]} rounded-t-xl`}>
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${statusDot[selectedAgent.status]}`} />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{selectedAgent.name}</h3>
                  <p className="text-[11px] text-muted-foreground">{selectedAgent.role} · {selectedAgent.department} · {selectedAgent.participantType.toUpperCase()}</p>
                </div>
                <div className="ml-auto text-[10px] font-mono text-muted-foreground">
                  Confidence: {Math.round(selectedAgent.confidenceScore * 100)}%
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {currentMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <Network className="w-12 h-12 text-primary/40 mb-3" />
                  <p className="text-sm text-muted-foreground">Start a conversation with <span className="text-primary">{selectedAgent.name}</span></p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedAgent.specialization}</p>
                </div>
              )}
              {currentMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary/20 text-foreground border border-primary/20"
                      : "bg-muted/40 text-foreground border border-border/30"
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-muted border border-border/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isStreaming && currentMessages[currentMessages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                  </div>
                  <div className="bg-muted/40 border border-border/30 rounded-xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/30">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message ${selectedAgent.name}...`}
                  rows={1}
                  className="flex-1 bg-muted/30 border border-border/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isStreaming}
                  className="px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all flex items-center gap-2"
                >
                  {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
