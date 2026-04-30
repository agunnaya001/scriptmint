-- Create scripts table
CREATE TABLE IF NOT EXISTS scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  hook TEXT NOT NULL,
  hook_b TEXT,
  hook_c TEXT,
  script JSONB NOT NULL,
  captions TEXT[] NOT NULL,
  hashtags TEXT[] NOT NULL,
  cta TEXT,
  format_notes TEXT,
  pillar TEXT NOT NULL,
  format TEXT NOT NULL,
  topic TEXT NOT NULL,
  series_day INTEGER,
  thumbnail_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  script_id UUID REFERENCES scripts(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  pillar TEXT,
  format TEXT,
  hook TEXT,
  entry_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create comment_replies table
CREATE TABLE IF NOT EXISTS comment_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  original_comment TEXT NOT NULL,
  generated_reply TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create thumbnails table
CREATE TABLE IF NOT EXISTS thumbnails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  script_id UUID REFERENCES scripts(id) ON DELETE CASCADE,
  hook_text TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE thumbnails ENABLE ROW LEVEL SECURITY;

-- Create policies for scripts
CREATE POLICY "Users can view their own scripts"
  ON scripts FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own scripts"
  ON scripts FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own scripts"
  ON scripts FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own scripts"
  ON scripts FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create policies for analytics
CREATE POLICY "Users can view their own analytics"
  ON analytics FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own analytics"
  ON analytics FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own analytics"
  ON analytics FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- Create policies for comment_replies
CREATE POLICY "Users can view their own comment replies"
  ON comment_replies FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own comment replies"
  ON comment_replies FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own comment replies"
  ON comment_replies FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create policies for thumbnails
CREATE POLICY "Users can view their own thumbnails"
  ON thumbnails FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own thumbnails"
  ON thumbnails FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Create indexes for performance
CREATE INDEX idx_scripts_user_id ON scripts(user_id);
CREATE INDEX idx_analytics_user_id ON analytics(user_id);
CREATE INDEX idx_analytics_script_id ON analytics(script_id);
CREATE INDEX idx_analytics_entry_date ON analytics(entry_date);
CREATE INDEX idx_comment_replies_user_id ON comment_replies(user_id);
CREATE INDEX idx_thumbnails_user_id ON thumbnails(user_id);
CREATE INDEX idx_thumbnails_script_id ON thumbnails(script_id);
