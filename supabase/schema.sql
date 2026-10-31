-- Supabase Schema Migration: OXID CORTEX STUDIO v7.0
-- Full support for Prompts Lab (with UI/UX visual mockups), Digital Grants, AI Tools, and Daily Scraped Threads

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Prompt Library (Extended with UI/UX Mockup Image support)
CREATE TABLE IF NOT EXISTS prompt_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    prompt_body TEXT NOT NULL,
    preview_image_url TEXT,
    style_badge TEXT,
    target_tool TEXT,
    use_case TEXT,
    tags TEXT[] DEFAULT '{}',
    copy_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Digital Grants & Bansos AI
CREATE TABLE IF NOT EXISTS digital_grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    grant_type TEXT NOT NULL,
    value_usd TEXT,
    claim_url TEXT NOT NULL,
    eligibility TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. AI Tools Radar
CREATE TABLE IF NOT EXISTS ai_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    repo_url TEXT NOT NULL,
    category TEXT NOT NULL,
    pricing_model TEXT DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Scraped Threads & Daily Cron Logs
CREATE TABLE IF NOT EXISTS scraped_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id TEXT UNIQUE NOT NULL,
    author_handle TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_avatar TEXT,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'tips',
    tags TEXT[] DEFAULT '{}',
    likes INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE prompt_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraped_threads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read prompt_library" ON prompt_library FOR SELECT USING (true);
CREATE POLICY "Public read digital_grants" ON digital_grants FOR SELECT USING (true);
CREATE POLICY "Public read ai_tools" ON ai_tools FOR SELECT USING (true);
CREATE POLICY "Public read scraped_threads" ON scraped_threads FOR SELECT USING (true);
