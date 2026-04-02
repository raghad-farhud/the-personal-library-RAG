import { useState } from "react";
import { MessageSquare, MessageSquarePlus, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { ChatMessage } from "@/components/chat/ChatMessage";
import type { Chat, Message } from "@/types";

const DEMO_CHATS: Chat[] = [
  {
    id: "demo-chat-1",
    title: "Key ideas from Atomic Habits?",
    created_at: "2026-03-28T10:00:00Z",
    updated_at: "2026-03-28T10:05:00Z",
  },
  {
    id: "demo-chat-2",
    title: "Quotes about reading",
    created_at: "2026-03-25T14:00:00Z",
    updated_at: "2026-03-25T14:02:00Z",
  },
  {
    id: "demo-chat-3",
    title: "Transformer architecture explained",
    created_at: "2026-03-22T09:00:00Z",
    updated_at: "2026-03-22T09:08:00Z",
  },
  {
    id: "demo-chat-4",
    title: "Compare spaced repetition methods",
    created_at: "2026-03-18T16:30:00Z",
    updated_at: "2026-03-18T16:35:00Z",
  },
  {
    id: "demo-chat-5",
    title: "RAG project brainstorm",
    created_at: "2026-03-15T11:00:00Z",
    updated_at: "2026-03-15T11:12:00Z",
  },
  {
    id: "demo-chat-6",
    title: "ملخص كتاب العقاد",
    created_at: "2026-03-10T08:00:00Z",
    updated_at: "2026-03-10T08:06:00Z",
  },
];

const DEMO_MESSAGES: Record<string, Message[]> = {
  "demo-chat-1": [
    {
      id: "msg-1",
      chat_id: "demo-chat-1",
      role: "user",
      content: "What are the key ideas from Atomic Habits?",
      metadata: {},
      created_at: "2026-03-28T10:00:00Z",
    },
    {
      id: "msg-2",
      chat_id: "demo-chat-1",
      role: "assistant",
      content:
        "Based on your saved notes and highlights from **Atomic Habits** by James Clear, here are the key ideas:\n\n1. **The 1% Rule** — Small improvements compound over time. Getting 1% better each day leads to remarkable results.\n\n2. **Identity-Based Habits** — Focus on who you want to become, not what you want to achieve. Every action is a vote for the type of person you wish to be.\n\n3. **The Four Laws of Behavior Change:**\n   - Make it obvious\n   - Make it attractive\n   - Make it easy\n   - Make it satisfying\n\n4. **Environment Design** — Your environment shapes your behavior more than motivation does. Design your spaces to make good habits effortless.",
      metadata: {
        confidence: "high",
        sources: [
          {
            title: "Atomic Habits",
            author: "James Clear",
            source_type: "book_pdf",
            snippet: "Habits are the compound interest of self-improvement.",
          },
        ],
      },
      created_at: "2026-03-28T10:00:30Z",
    },
  ],
  "demo-chat-2": [
    {
      id: "msg-3",
      chat_id: "demo-chat-2",
      role: "user",
      content: "Show me quotes about reading from my library",
      metadata: {},
      created_at: "2026-03-25T14:00:00Z",
    },
    {
      id: "msg-4",
      chat_id: "demo-chat-2",
      role: "assistant",
      content:
        'Here are the reading-related quotes from your library:\n\n> *"I have always imagined that Paradise will be a kind of library."*\n> — Jorge Luis Borges\n\n> *"القراءة وحدها هي التي تُعطي الإنسان الواحد أكثر من حياة واحدة."*\n> — عباس محمود العقاد\n\nBoth are marked as favorites in your collection.',
      metadata: {
        confidence: "high",
        sources: [
          {
            title: "On Reading",
            author: "Jorge Luis Borges",
            source_type: "quote",
            snippet:
              "I have always imagined that Paradise will be a kind of library.",
          },
          {
            title: "في القراءة",
            author: "عباس محمود العقاد",
            source_type: "quote",
            snippet:
              "القراءة وحدها هي التي تُعطي الإنسان الواحد أكثر من حياة واحدة.",
          },
        ],
      },
      created_at: "2026-03-25T14:00:25Z",
    },
  ],
  "demo-chat-3": [
    {
      id: "msg-5",
      chat_id: "demo-chat-3",
      role: "user",
      content: "Explain how the transformer architecture works based on the paper I saved",
      metadata: {},
      created_at: "2026-03-22T09:00:00Z",
    },
    {
      id: "msg-6",
      chat_id: "demo-chat-3",
      role: "assistant",
      content:
        'From your saved article **"Attention Is All You Need"** by Vaswani et al., here\'s how the transformer works:\n\n**Self-Attention Mechanism** — Instead of processing sequences step-by-step (like RNNs), transformers look at all positions simultaneously. Each word attends to every other word, learning which ones are most relevant.\n\n**Multi-Head Attention** — The model runs several attention computations in parallel (\"heads\"), each learning different relationship patterns — one head might track syntax, another semantics.\n\n**Positional Encoding** — Since transformers have no built-in notion of order, sine/cosine functions encode each token\'s position so the model knows word order.\n\n**Encoder-Decoder Stack** — The encoder reads the full input at once; the decoder generates output one token at a time, attending to both its own previous output and the encoder\'s representation.\n\nThis architecture became the foundation for GPT, BERT, and essentially all modern language models.',
      metadata: {
        confidence: "high",
        sources: [
          {
            title: "Attention Is All You Need",
            author: "Vaswani et al.",
            source_type: "article_pdf",
            snippet: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms.",
          },
        ],
      },
      created_at: "2026-03-22T09:01:00Z",
    },
    {
      id: "msg-7",
      chat_id: "demo-chat-3",
      role: "user",
      content: "What makes it better than RNNs?",
      metadata: {},
      created_at: "2026-03-22T09:03:00Z",
    },
    {
      id: "msg-8",
      chat_id: "demo-chat-3",
      role: "assistant",
      content:
        "Based on your highlights from the paper, the main advantages are:\n\n1. **Parallelization** — RNNs must process tokens one by one; transformers process all tokens at once, making training dramatically faster on GPUs.\n\n2. **Long-range dependencies** — In RNNs, information degrades over long sequences. Self-attention connects any two positions directly, regardless of distance.\n\n3. **Scalability** — The architecture scales much better with data and compute, which is why it enabled the leap from small models to billion-parameter LLMs.\n\nYour note from March 2nd also connects this to your insight about spaced repetition — both rely on the idea that *direct connections* (whether in memory or in architecture) beat sequential chains.",
      metadata: {
        confidence: "high",
        sources: [
          {
            title: "Attention Is All You Need",
            author: "Vaswani et al.",
            source_type: "article_pdf",
            snippet: "The Transformer allows for significantly more parallelization.",
          },
          {
            title: "Spaced Repetition for Learning",
            author: "",
            source_type: "insight",
            snippet: "Reviewing material at increasing intervals dramatically improves long-term retention.",
          },
        ],
      },
      created_at: "2026-03-22T09:04:00Z",
    },
  ],
  "demo-chat-4": [
    {
      id: "msg-9",
      chat_id: "demo-chat-4",
      role: "user",
      content: "What do my notes say about spaced repetition? Compare different approaches.",
      metadata: {},
      created_at: "2026-03-18T16:30:00Z",
    },
    {
      id: "msg-10",
      chat_id: "demo-chat-4",
      role: "assistant",
      content:
        "From your insight **\"Spaced Repetition for Learning\"** and related notes, here's what you've captured:\n\n**Core Principle** — Reviewing material at exponentially increasing intervals maximizes retention while minimizing study time.\n\n**Approaches you've noted:**\n\n| Method | Interval Pattern | Best For |\n|--------|-----------------|----------|\n| Leitner System | Box-based (1d → 3d → 7d → 14d) | Flashcards, vocabulary |\n| SM-2 (Anki) | Algorithm-driven, adapts to performance | Dense factual material |\n| Free Recall | Self-tested at natural breakpoints | Conceptual understanding |\n\n**Your personal takeaway** (from your March note): the optimal schedule follows an exponential curve, and the key is consistency over perfection — reviewing *something* on schedule matters more than reviewing *everything*.\n\nThis connects well to the habit-stacking idea from Atomic Habits in your library — attaching review sessions to existing routines.",
      metadata: {
        confidence: "high",
        sources: [
          {
            title: "Spaced Repetition for Learning",
            author: "",
            source_type: "insight",
            snippet: "Reviewing material at increasing intervals dramatically improves long-term retention.",
          },
          {
            title: "Atomic Habits",
            author: "James Clear",
            source_type: "book_pdf",
            snippet: "Habits are the compound interest of self-improvement.",
          },
        ],
      },
      created_at: "2026-03-18T16:31:00Z",
    },
  ],
  "demo-chat-5": [
    {
      id: "msg-11",
      chat_id: "demo-chat-5",
      role: "user",
      content: "What project ideas do I have saved about RAG systems?",
      metadata: {},
      created_at: "2026-03-15T11:00:00Z",
    },
    {
      id: "msg-12",
      chat_id: "demo-chat-5",
      role: "assistant",
      content:
        "From your note **\"Project Ideas for RAG Systems\"**, here's what you've brainstormed:\n\n**Main idea:** Build a personal knowledge base that can answer questions across all saved documents, quotes, and notes using retrieval-augmented generation.\n\n**Features you outlined:**\n- Multi-format ingestion (PDFs, quotes, free-form notes)\n- Semantic search across your entire library\n- Source attribution with confidence scores\n- Chat-based interface with conversation history\n- Bilingual support (English & Arabic)\n\nInterestingly, this is essentially what you're using right now! Your note also mentioned exploring hybrid search (combining keyword + vector similarity) for better retrieval accuracy.",
      metadata: {
        confidence: "high",
        sources: [
          {
            title: "Project Ideas for RAG Systems",
            author: "",
            source_type: "note",
            snippet: "Build a personal knowledge base that can answer questions across all saved documents.",
          },
        ],
      },
      created_at: "2026-03-15T11:01:00Z",
    },
    {
      id: "msg-13",
      chat_id: "demo-chat-5",
      role: "user",
      content: "How does this relate to the transformer paper?",
      metadata: {},
      created_at: "2026-03-15T11:05:00Z",
    },
    {
      id: "msg-14",
      chat_id: "demo-chat-5",
      role: "assistant",
      content:
        "Great connection! The transformer architecture from **\"Attention Is All You Need\"** is the backbone of RAG systems in two ways:\n\n1. **The Retriever** — Uses transformer-based embeddings (like sentence-transformers) to convert your documents into vectors for semantic search. This is how the system finds relevant passages even when you don't use exact keywords.\n\n2. **The Generator** — An LLM (built on transformers) takes the retrieved passages and generates a coherent answer, synthesizing information across multiple sources.\n\nSo your RAG project note and the transformer paper are directly connected — one is the theory, the other is the application. Your library is essentially a living example of the architecture described in that paper being put to practical use.",
      metadata: {
        confidence: "medium",
        sources: [
          {
            title: "Attention Is All You Need",
            author: "Vaswani et al.",
            source_type: "article_pdf",
            snippet: "We propose a new simple network architecture, the Transformer.",
          },
          {
            title: "Project Ideas for RAG Systems",
            author: "",
            source_type: "note",
            snippet: "Build a personal knowledge base using retrieval-augmented generation.",
          },
        ],
      },
      created_at: "2026-03-15T11:06:00Z",
    },
  ],
  "demo-chat-6": [
    {
      id: "msg-15",
      chat_id: "demo-chat-6",
      role: "user",
      content: "أعطني ملخص لما حفظته من كتابات العقاد",
      metadata: {},
      created_at: "2026-03-10T08:00:00Z",
    },
    {
      id: "msg-16",
      chat_id: "demo-chat-6",
      role: "assistant",
      content:
        "من مكتبتك، حفظت اقتباسًا للعقاد:\n\n> *\"القراءة وحدها هي التي تُعطي الإنسان الواحد أكثر من حياة واحدة.\"*\n> — عباس محمود العقاد\n\nحفظت هذا الاقتباس تحت تصنيف **أدب** مع وسم \"قراءة\" و\"أدب\"، وأشرت إلى أنه *\"حكمة جميلة عن القراءة\"*.\n\nالعقاد يرى أن القراءة ليست مجرد نشاط ذهني، بل هي توسيع لحدود الوجود — كل كتاب تقرأه يضيف تجربة حياة جديدة إلى تجربتك الشخصية. هذا يتوافق مع اقتباس جورج آر آر مارتن المحفوظ أيضًا في مكتبتك عن أن القارئ يعيش ألف حياة.",
      metadata: {
        confidence: "high",
        sources: [
          {
            title: "في القراءة",
            author: "عباس محمود العقاد",
            source_type: "quote",
            snippet: "القراءة وحدها هي التي تُعطي الإنسان الواحد أكثر من حياة واحدة.",
          },
        ],
      },
      created_at: "2026-03-10T08:01:00Z",
    },
  ],
};

export function DemoAskPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>(
    "demo-chat-1",
  );

  const messages = activeChatId ? (DEMO_MESSAGES[activeChatId] ?? []) : [];

  return (
    <div className="space-y-6">
      <DemoBanner />

      <div className="flex flex-col md:flex-row h-[calc(90vh-4rem)] overflow-hidden rounded-2xl border border-border/50 bg-background/30 shadow-sm">
        {/* Sidebar */}
        <aside className="hidden md:flex h-full w-72 flex-col border-r border-border/90 bg-background/95">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <h2 className="text-lg text-foreground">Chats</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2">
            <ul className="space-y-0">
              {DEMO_CHATS.map((chat) => (
                <li key={chat.id}>
                  <button
                    onClick={() => setActiveChatId(chat.id)}
                    className={cn(
                      "group flex w-full items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all",
                      activeChatId === chat.id
                        ? "bg-primary/5 text-primary"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <MessageSquare
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        activeChatId === chat.id
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {chat.title || "New Chat"}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {activeChatId ? (
            <>
              <div className="flex-1 overflow-y-auto px-2 py-6 sm:px-8">
                <div className="mx-auto max-w-3xl space-y-6">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                </div>
              </div>

              <div className="border-t border-border/60 bg-card/80 px-4 py-3 backdrop-blur sm:px-8">
                <div className="mx-auto flex max-w-3xl items-end gap-3">
                  <div
                    className="flex-1 resize-none rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed opacity-60"
                  >
                    Sign in to ask your library…
                  </div>
                  <div className="shrink-0 rounded-xl p-2.5 gradient-pink-purple text-primary-foreground opacity-50 cursor-not-allowed">
                    <Send className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
              <div className="rounded-full bg-muted p-6">
                <MessageSquarePlus className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h2 className="text-xl text-foreground">Ask Your Library</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select a demo chat to preview the experience
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
