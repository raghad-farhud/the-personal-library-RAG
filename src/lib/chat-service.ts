import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import type { Chat, Message, MessageRole } from "@/types";

function getSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error("Supabase not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your deployment environment.");
  }
  return supabase;
}

export async function fetchChats(): Promise<Chat[]> {
  const db = getSupabase();
  const { data, error } = await db
    .from("chats")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data as Chat[];
}

export async function createChat(title?: string): Promise<Chat> {
  const db = getSupabase();
  const { data, error } = await db
    .from("chats")
    .insert({ title: title || null })
    .select()
    .single();

  if (error) throw error;
  return data as Chat;
}

export async function updateChatTitle(chatId: string, title: string): Promise<void> {
  const db = getSupabase();
  const { error } = await db
    .from("chats")
    .update({ title, updated_at: new Date().toISOString() })
    .eq("id", chatId);

  if (error) throw error;
}

export async function deleteChat(chatId: string): Promise<void> {
  const db = getSupabase();
  const { error } = await db
    .from("chats")
    .delete()
    .eq("id", chatId);

  if (error) throw error;
}

export async function fetchMessages(chatId: string): Promise<Message[]> {
  const db = getSupabase();
  const { data, error } = await db
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data as Message[];
}

export async function addMessage(
  chatId: string,
  role: MessageRole,
  content: string,
  metadata: Record<string, unknown> = {},
): Promise<Message> {
  const db = getSupabase();
  const { data, error } = await db
    .from("messages")
    .insert({ chat_id: chatId, role, content, metadata })
    .select()
    .single();

  if (error) throw error;

  await db
    .from("chats")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", chatId);

  return data as Message;
}
