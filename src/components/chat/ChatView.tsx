import { useState, useRef, useEffect } from "react";
import { Send, Loader2, MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/cn";
import { ChatMessage } from "./ChatMessage";
import type { Message } from "@/types";

interface ChatViewProps {
  messages: Message[];
  onSendMessage: (content: string) => Promise<void>;
  loading: boolean;
  sending: boolean;
  chatId: string | null;
  onNewChat: () => void;
}

export function ChatView({
  messages,
  onSendMessage,
  loading,
  sending,
  chatId,
  onNewChat,
}: ChatViewProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  useEffect(() => {
    if (chatId) inputRef.current?.focus();
  }, [chatId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    setInput("");
    await onSendMessage(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  if (!chatId) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <div className="rounded-full bg-cream-100 p-6">
          <MessageSquarePlus className="h-10 w-10 text-warm-400" />
        </div>
        <div className="text-center">
          <h2 className="font-serif text-xl text-warm-800">
            Ask Your Library
          </h2>
          <p className="mt-1 text-sm text-warm-500">
            Select a chat or start a new conversation
          </p>
        </div>
        <button
          onClick={onNewChat}
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-400 to-rose-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-rose-300/30 transition-all hover:from-rose-500 hover:to-rose-500"
        >
          <MessageSquarePlus className="h-4 w-4" />
          New Chat
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-warm-400" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-cream-100 p-4">
              <MessageSquarePlus className="h-8 w-8 text-warm-300" />
            </div>
            <p className="mt-3 text-sm text-warm-400">
              Ask anything about your library
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {sending && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-200 text-warm-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-warm-100 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-warm-300 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-warm-300 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-warm-300 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="border-t border-warm-200/60 bg-white/80 px-4 py-3 backdrop-blur sm:px-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl items-end gap-3"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your library something…"
            rows={1}
            className={cn(
              "flex-1 resize-none rounded-xl border border-warm-200 bg-white px-4 py-2.5 text-sm text-warm-900 font-sans",
              "placeholder:text-warm-400",
              "transition-all",
              "focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "max-h-32",
            )}
            disabled={sending}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = Math.min(el.scrollHeight, 128) + "px";
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className={cn(
              "shrink-0 rounded-xl p-2.5 transition-all",
              "bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-sm shadow-rose-300/30",
              "hover:from-rose-500 hover:to-rose-500",
              "disabled:opacity-50 disabled:pointer-events-none",
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
