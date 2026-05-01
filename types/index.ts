// User & Auth Types
export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

// Script Types
export interface Script {
  id: string;
  user_id: string;
  title: string;
  hook: string;
  hook_b?: string;
  hook_c?: string;
  script: ScriptBlock[];
  captions: string[];
  hashtags: string[];
  cta?: string;
  format_notes?: string;
  pillar: string;
  format: string;
  topic: string;
  series_day: number;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ScriptBlock {
  type: "voiceover" | "textcard" | "action";
  content: string;
  duration: string;
}

// Analytics Types
export interface AnalyticsEntry {
  id: string;
  user_id: string;
  script_id: string;
  views: number;
  likes: number;
  pillar?: string;
  format?: string;
  hook?: string;
  entry_date: string;
  created_at: string;
  updated_at: string;
}

// Comment Reply Types
export interface CommentReply {
  id: string;
  user_id: string;
  original_comment: string;
  generated_reply: string;
  created_at: string;
}

// Thumbnail Types
export interface Thumbnail {
  id: string;
  user_id: string;
  script_id: string;
  hook_text: string;
  image_url: string;
  created_at: string;
}

// UI Theme Types
export interface ThemeColors {
  bg: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  white: string;
}

// API Response Types
export interface GenerateResponse {
  title: string;
  hook: string;
  hook_b: string;
  hook_c: string;
  format_notes: string;
  script: ScriptBlock[];
  captions: string[];
  hashtags: string[];
  cta: string;
  capcut_tip?: string;
  repurpose_tweet?: string;
  repurpose_linkedin?: string;
}

export interface CommentReplyResponse {
  reply: string;
}

export interface ErrorResponse {
  error: string;
}
