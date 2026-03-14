import type { AskResponse } from "@/types";

export const MOCK_ASK_RESPONSE: AskResponse = {
  answer:
    "Based on your library, the concept of habit formation is deeply tied to identity change rather than outcome-based goals. James Clear argues that lasting change comes from focusing on who you wish to become, not what you want to achieve. This is complemented by insights from Atomic Habits where he discusses the plateau of latent potential — the idea that results are delayed, which discourages many people before they see progress.",
  confidence: "high",
  sources: [
    {
      title: "Atomic Habits",
      author: "James Clear",
      page: 112,
      source_type: "book_pdf",
      snippet:
        "You do not rise to the level of your goals. You fall to the level of your systems. Every action you take is a vote for the type of person you wish to become.",
      score: 0.94,
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      page: 54,
      source_type: "book_pdf",
      snippet:
        "The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy.",
      score: 0.82,
    },
    {
      title: "On the Shortness of Life",
      author: "Seneca",
      source_type: "article_pdf",
      snippet:
        "It is not that we have a short time to live, but that we waste a great deal of it. Life is long enough, and a sufficiently generous amount has been given to us for the highest achievements.",
      score: 0.71,
    },
  ],
};

export const MOCK_INGESTION_DELAY = 1500;
export const MOCK_ASK_DELAY = 2000;

export const USE_MOCK = false;
