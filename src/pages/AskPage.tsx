import { useState, useEffect, useCallback } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatView } from "@/components/chat/ChatView";
import { useWebhookConfig } from "@/hooks/useWebhookConfig";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { askLibrary } from "@/lib/api";
import {
  fetchChats,
  createChat,
  deleteChat,
  fetchMessages,
  addMessage,
  updateChatTitle,
} from "@/lib/chat-service";
import type { Chat, Message } from "@/types";
import { Menu, X } from "lucide-react";

export function AskPage() {
  const { config } = useWebhookConfig();
  const { recordQuery, setEndpointStatus } = useDashboardStats();

  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setEndpointStatus(
      config.ingestionUrl.trim().length > 0,
      config.askUrl.trim().length > 0,
    );
  }, [config, setEndpointStatus]);

  useEffect(() => {
    loadChats();
  }, []);

  async function loadChats() {
    setChatsLoading(true);
    try {
      const data = await fetchChats();
      setChats(data);
    } catch (err) {
      console.error("Failed to load chats:", err);
    } finally {
      setChatsLoading(false);
    }
  }

  const selectChat = useCallback(async (chatId: string) => {
    setActiveChatId(chatId);
    setMessagesLoading(true);
    setSidebarOpen(false);
    try {
      const data = await fetchMessages(chatId);
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  const handleNewChat = useCallback(async () => {
    try {
      const chat = await createChat();
      setChats((prev) => [chat, ...prev]);
      setActiveChatId(chat.id);
      setMessages([]);
      setSidebarOpen(false);
    } catch (err) {
      console.error("Failed to create chat:", err);
    }
  }, []);

  const handleDeleteChat = useCallback(
    async (chatId: string) => {
      try {
        await deleteChat(chatId);
        setChats((prev) => prev.filter((c) => c.id !== chatId));
        if (activeChatId === chatId) {
          setActiveChatId(null);
          setMessages([]);
        }
      } catch (err) {
        console.error("Failed to delete chat:", err);
      }
    },
    [activeChatId],
  );

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!activeChatId) return;

      setSending(true);
      try {
        const userMsg = await addMessage(activeChatId, "user", content);
        setMessages((prev) => [...prev, userMsg]);
        recordQuery(content);

        const isFirstMessage =
          messages.length === 0 ||
          (messages.length === 0 && !chats.find((c) => c.id === activeChatId)?.title);

        if (isFirstMessage) {
          const title = content.length > 60 ? content.slice(0, 57) + "…" : content;
          await updateChatTitle(activeChatId, title);
          setChats((prev) =>
            prev.map((c) =>
              c.id === activeChatId
                ? { ...c, title, updated_at: new Date().toISOString() }
                : c,
            ),
          );
        }

        const result = await askLibrary(config.askUrl, {
          question: content,
          source_type: "",
          language: "",
          author: "",
          title: "",
          favorites_only: false,
        });

        const assistantMsg = await addMessage(
          activeChatId,
          "assistant",
          result.answer,
          {
            confidence: result.confidence,
            sources: result.sources,
          },
        );
        setMessages((prev) => [...prev, assistantMsg]);

        setChats((prev) => {
          const updated = prev.map((c) =>
            c.id === activeChatId
              ? { ...c, updated_at: new Date().toISOString() }
              : c,
          );
          return updated.sort(
            (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
          );
        });
      } catch (err) {
        const errorContent =
          err instanceof Error ? err.message : "Something went wrong";
        const errMsg = await addMessage(
          activeChatId,
          "assistant",
          `Sorry, I couldn't process your question. ${errorContent}`,
        );
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setSending(false);
      }
    },
    [activeChatId, config.askUrl, messages.length, chats, recordQuery],
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden rounded-2xl border border-warm-200/50 bg-cream-50/30 shadow-sm">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen((o) => !o)}
        className="absolute left-4 top-4 z-20 rounded-lg border border-warm-200 bg-white p-1.5 text-warm-500 shadow-sm sm:hidden"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } absolute z-10 h-full transition-transform sm:relative sm:translate-x-0`}
      >
        <ChatSidebar
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={selectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          loading={chatsLoading}
        />
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        <ChatView
          messages={messages}
          onSendMessage={handleSendMessage}
          loading={messagesLoading}
          sending={sending}
          chatId={activeChatId}
          onNewChat={handleNewChat}
        />
      </div>
    </div>
  );
}
