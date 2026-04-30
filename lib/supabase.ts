import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definitions for database
export interface Script {
  id: string;
  user_id: string;
  title: string;
  hook: string;
  hook_b: string;
  hook_c: string;
  script: any[];
  captions: string[];
  hashtags: string[];
  cta: string;
  pillar: string;
  format: string;
  topic: string;
  series_day: number;
  thumbnail_url?: string;
  created_at: string;
}

export interface Analytics {
  id: string;
  user_id: string;
  script_id: string;
  views: number;
  likes: number;
  pillar: string;
  format: string;
  hook: string;
  date: string;
  created_at: string;
}

export interface CommentReply {
  id: string;
  user_id: string;
  original_comment: string;
  generated_reply: string;
  created_at: string;
}

export interface Thumbnail {
  id: string;
  user_id: string;
  script_id: string;
  hook_text: string;
  image_url: string;
  created_at: string;
}
