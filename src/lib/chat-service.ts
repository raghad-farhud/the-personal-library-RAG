import { supabase } from "./supabase";
import type { Chat, Message, MessageRole } from "@/types";

export async function fetchChats(): Promise<Chat[]> {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data as Chat[];
}

export async function createChat(title?: string): Promise<Chat> {
  const { data, error } = await supabase
    .from("chats")
    .insert({ title: title || null })
    .select()
    .single();

  if (error) throw error;
  return data as Chat;
}

export async function updateChatTitle(chatId: string, title: string): Promise<void> {
  const { error } = await supabase
    .from("chats")
    .update({ title, updated_at: new Date().toISOString() })
    .eq("id", chatId);

  if (error) throw error;
}

export async function deleteChat(chatId: string): Promise<void> {
  const { error } = await supabase
    .from("chats")
    .delete()
    .eq("id", chatId);

  if (error) throw error;
}

export async function fetchMessages(chatId: string): Promise<Message[]> {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
    .from("messages")
    .insert({ chat_id: chatId, role, content, metadata })
    .select()
    .single();

  if (error) throw error;

  await supabase
    .from("chats")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", chatId);

  return data as Message;
}
