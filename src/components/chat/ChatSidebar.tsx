import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Chat } from "@/types";

interface ChatSidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  loading: boolean;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  loading,
}: ChatSidebarProps) {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-warm-200/60 bg-cream-50/50">
      <div className="flex items-center justify-between border-b border-warm-200/60 px-4 py-3">
        <h2 className="font-serif text-lg text-warm-800">Chats</h2>
        <button
          onClick={onNewChat}
          className="rounded-lg p-1.5 text-warm-500 transition-colors hover:bg-cream-200 hover:text-rose-500"
          title="New chat"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-warm-300 border-t-rose-400" />
          </div>
        ) : chats.length === 0 ? (
          <div className="px-3 py-12 text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-warm-300" />
            <p className="mt-2 text-sm text-warm-400">No chats yet</p>
            <button
              onClick={onNewChat}
              className="mt-3 text-sm font-medium text-rose-500 hover:text-rose-600"
            >
              Start a conversation
            </button>
          </div>
        ) : (
          <ul className="space-y-1">
            {chats.map((chat) => (
              <li key={chat.id}>
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className={cn(
                    "group flex w-full items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all",
                    activeChatId === chat.id
                      ? "bg-rose-50 text-rose-700"
                      : "text-warm-600 hover:bg-cream-100",
                  )}
                >
                  <MessageSquare
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      activeChatId === chat.id ? "text-rose-400" : "text-warm-400",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {chat.title || "New Chat"}
                    </p>
                    <p className="text-xs text-warm-400">
                      {formatDate(chat.updated_at)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="mt-0.5 shrink-0 rounded p-1 text-warm-300 opacity-0 transition-all hover:bg-rose-100 hover:text-rose-500 group-hover:opacity-100"
                    title="Delete chat"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
