import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { qaData } from "@/content/qa-data";
import { MessageCircle, X, ChevronRight, ChevronLeft, Send, Search } from "lucide-react";

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function findClosest(input: string, lang: "en" | "fa") {
  const normalized = input.toLowerCase().trim();
  let best = qaData[0];
  let bestScore = Infinity;

  for (const item of qaData) {
    const targets = lang === "fa"
      ? [item.questionFa, ...item.tags]
      : [item.question, ...item.tags];

    for (const target of targets) {
      const t = target.toLowerCase();
      if (t.includes(normalized) || normalized.includes(t)) {
        return item;
      }
      const score = levenshtein(normalized, t);
      if (score < bestScore) {
        bestScore = score;
        best = item;
      }
    }
  }
  return best;
}

export function Assistant() {
  const { locale } = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [history, setHistory] = useState<{ role: "user" | "system" | "answer"; text: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isFa = locale === "fa";

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, selected]);

  const filteredQuestions = useMemo(() => {
    if (!input.trim()) return qaData.slice(0, 6);
    const q = input.toLowerCase().trim();
    return qaData.filter((item) => {
      const targets = isFa
        ? [item.questionFa, item.answerFa, ...item.tags]
        : [item.question, item.answer, ...item.tags];
      return targets.some((t) => t.toLowerCase().includes(q));
    }).slice(0, 6);
  }, [input, isFa]);

  const handleSelect = (item: (typeof qaData)[0]) => {
    const question = isFa ? item.questionFa : item.question;
    const answer = isFa ? item.answerFa : item.answer;
    setSelected(item.id);
    setHistory((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "answer", text: answer },
    ]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const closest = findClosest(input, isFa ? "fa" : "en");
    handleSelect(closest);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(isFa ? "سوال از دستیار هوشمند" : "Question from Assistant");
    const lastQA = history.filter((h) => h.role === "answer").pop();
    const lastQ = history.filter((h) => h.role === "user").pop();
    const body = encodeURIComponent(
      `${isFa ? "سوال:" : "Question:"}\n${lastQ?.text || ""}\n\n${isFa ? "پاسخ:" : "Answer:"}\n${lastQA?.text || ""}\n\n${isFa ? "---\nپیام شما:" : "---\nYour message:"}\n`
    );
    window.open(`mailto:hi@hawid.ir?subject=${subject}&body=${body}`, "_blank");
  };

  const handleBack = () => {
    setSelected(null);
    setHistory([]);
    setInput("");
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
    setHistory([]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button — single, always visible */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-[84px] sm:bottom-20 right-5 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-brand text-white shadow-[0_4px_20px_rgba(0,51,255,0.35)] hover:shadow-[0_4px_28px_rgba(0,51,255,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 focus-ring group"
          aria-label="Open assistant"
        >
          <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" strokeWidth={1.5} />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

          {/* Terminal Window */}
          <div className="relative w-full sm:w-[420px] max-h-[calc(100dvh-100px)] sm:max-h-[600px] flex flex-col rounded-t-2xl sm:rounded-2xl border border-border bg-bg-elevated shadow-2xl overflow-hidden mb-[76px] sm:mb-0">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={handleBack}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-faint hover:text-title hover:bg-surface-hover transition-all duration-200"
                    aria-label="Back to questions"
                  >
                    {isFa ? (
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" strokeWidth={1.5} />
                    ) : (
                      <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
                    )}
                  </button>
                )}
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="text-[0.6rem] sm:text-xs text-faint font-mono ml-2">
                  assistant@hawid:~
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 flex items-center justify-center rounded-md text-faint hover:text-title hover:bg-surface-hover transition-all duration-200"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Chat area */}
            <div ref={scrollRef} className={`flex-1 overflow-y-auto p-4 space-y-3 text-xs sm:text-sm min-h-[200px] ${isFa ? "font-['Tahoma',sans-serif]" : "font-mono"}`}>
              {history.length === 0 && (
                <div className="space-y-3">
                  <p className="text-faint text-[0.65rem] sm:text-xs">
                    {isFa
                      ? "> سلام! من دستیار هوشمند حامد هستم. سوالات متداول مشتریان اینجاست یا تایپ کنید:"
                      : "> Hi! I'm Hamid's smart assistant. Here are common client questions, or type your own:"}
                  </p>
                  <div className="space-y-1.5">
                    {filteredQuestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-subtle hover:text-title hover:bg-surface transition-all duration-200 group"
                      >
                        <ChevronRight className="w-3 h-3 text-faint group-hover:text-brand shrink-0" strokeWidth={1.5} />
                        <span>
                          {isFa ? item.questionFa : item.question}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {history.map((msg, i) => (
                <div key={i} className={msg.role === "user" ? "text-right" : ""}>
                  {msg.role === "user" ? (
                    <div className="inline-block max-w-[85%] px-3 py-2 rounded-md bg-brand/10 text-title border border-brand/20">
                      <span className="text-faint mr-1">$</span> {msg.text}
                    </div>
                  ) : (
                    <div className="px-3 py-2 rounded-md bg-surface border border-border">
                      <p className="text-body leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  )}
                </div>
              ))}

              {selected && (
                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.65rem] sm:text-xs font-medium text-subtle hover:text-title hover:bg-surface border border-border transition-all duration-200"
                  >
                    {isFa ? (
                      <>
                        <ChevronRight className="w-3 h-3 rotate-180" strokeWidth={1.5} />
                        سوالات دیگر
                      </>
                    ) : (
                      <>
                        <ChevronLeft className="w-3 h-3" strokeWidth={1.5} />
                        More questions
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.65rem] sm:text-xs font-medium text-brand hover:bg-brand/10 border border-brand/20 transition-all duration-200"
                  >
                    <Send className="w-3 h-3" strokeWidth={1.5} />
                    {isFa ? "ایمیل" : "Email"}
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className={`flex items-center gap-2 px-4 py-3 border-t border-border bg-surface ${isFa ? "font-['Tahoma',sans-serif]" : "font-mono"}`}>
              <Search className="w-3.5 h-3.5 text-faint shrink-0" strokeWidth={1.5} />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isFa ? "تایپ کنید..." : "Type a question..."}
                className="flex-1 bg-transparent text-xs sm:text-sm text-title placeholder:text-faint outline-none font-mono"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-7 h-7 flex items-center justify-center rounded-md text-faint hover:text-brand disabled:opacity-30 transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
