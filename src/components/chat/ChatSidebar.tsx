import { useState } from "react";
import { createPortal } from "react-dom";
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
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const chat = chatToDelete ? chats.find((c) => c.id === chatToDelete) : null;

  const handleConfirmDelete = () => {
    if (chatToDelete) {
      onDeleteChat(chatToDelete);
      setChatToDelete(null);
    }
  };

  return (
    <>
      <aside className="flex h-full w-72 flex-col border-r border-border/90 rounded-lg  bg-background/95">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <h2 className="text-lg text-foreground">Chats</h2>
        <button
          onClick={onNewChat}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
          title="New chat"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
        ) : chats.length === 0 ? (
          <div className="px-3 py-12 text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No chats yet</p>
            <button
              onClick={onNewChat}
              className="mt-3 text-sm font-medium text-primary hover:text-primary"
            >
              Start a conversation
            </button>
          </div>
        ) : (
          <ul className="space-y-0">
            {chats.map((chat) => (
              <li key={chat.id} className="w-full flex flex-row">
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className={cn(
                    "group flex flex-row w-full items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all",
                    activeChatId === chat.id
                      ? "bg-primary/5 text-primary"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <MessageSquare
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      activeChatId === chat.id ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {chat.title || "New Chat"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(chat.updated_at)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setChatToDelete(chat.id);
                    }}
                    className="mt-0.5 shrink-0 rounded p-1 text-muted-foreground/50 transition-all hover:text-primary"
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

      {/* Delete confirmation modal — portaled to body so it overlays the whole app */}
      {chatToDelete &&
        createPortal(
          <div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-chat-title"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setChatToDelete(null)}
              aria-hidden="true"
            />
            <div className="relative w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-lg">
              <h2 id="delete-chat-title" className="text-lg font-semibold text-foreground">
                Delete chat?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                "{chat?.title || "New Chat"}" will be permanently deleted. This cannot be undone.
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setChatToDelete(null)}
                  className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
