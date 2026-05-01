# ScriptMint - AI-Powered TikTok Content Generator

## Overview

ScriptMint is an advanced TikTok content generation platform designed for Web3 builders and developers. It combines AI-powered script generation with comprehensive analytics, thumbnail creation, and engagement tools.

## Key Features

### 1. **AI Script Generation**
- Generate TikTok scripts tailored to 4 content pillars:
  - Build in Public
  - Educate Web3
  - Money & Career
  - Dev Life BTS
- Multiple format support: Screen Recording, Text Cards, Mixed
- 3 hook variations (A, B, C) per script
- Includes captions, hashtags, CTAs, and production tips

### 2. **User Authentication**
- Clerk-powered sign-in/sign-up
- Secure session management
- Protected routes
- One-click logout

### 3. **Database Storage**
- Supabase PostgreSQL with Row Level Security (RLS)
- User isolation - each user sees only their own data
- 4 main tables:
  - **scripts** - Generated content with metadata
  - **analytics** - Performance tracking (views, likes, pillar, format, etc.)
  - **comment_replies** - Saved AI-generated comment replies
  - **thumbnails** - Cover image references

### 4. **Automatic Thumbnail Generation**
- AI-generated 1080×1920px TikTok cover images
- Bold hook text with pillar-specific color accents
- Dark background with professional gradient
- Canvas-based rendering with watermark
- One-click download

### 5. **Analytics Dashboard (5th Tab)**
- Manual entry logging for views and likes
- 4 interactive Recharts visualizations:
  - **Time Trends** - Views and likes over time
  - **Hook Effectiveness** - Top 5 hooks ranked by engagement
  - **Pillar Performance** - Engagement by content pillar
  - **Format Performance** - Screen vs Text vs Mixed analysis
- Real-time database sync

### 6. **Comment Reply Generator**
- Paste any TikTok comment
- AI generates educational 1-2 sentence replies
- Educational tone focused on Web3/Solidity
- Auto-save to database
- One-click copy

### 7. **Script Calendar**
- Visual layout planning
- Series day tracking
- Format overview for each day

### 8. **Hook Library**
- Browse all generated hooks
- Quick-reference for content ideas
- Copyable hook text

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Authentication**: Clerk v7
- **Database**: Supabase PostgreSQL with RLS
- **Charts**: Recharts
- **Notifications**: Sonner Toast
- **AI**: Anthropic Claude (Sonnet 4)
- **Styling**: Tailwind CSS + Custom CSS-in-JS
- **Fonts**: DM Sans, DM Mono, Bebas Neue

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd scriptmint
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your Clerk, Supabase, and Anthropic API keys

4. **Set up Supabase**
   - Create a new Supabase project
   - The schema migration runs automatically on first connection
   - Enable RLS on all tables

5. **Run dev server**
   ```bash
   pnpm dev
   ```

6. **Open in browser**
   - Navigate to http://localhost:3000
   - Create account or sign in with Clerk
   - Start generating scripts!

## Project Structure

```
/app
  /api
    /generate        - Main script generation endpoint
    /generate-reply  - Comment reply generation endpoint
  /auth
    /sign-in         - Clerk sign-in page
    /sign-up         - Clerk sign-up page
  layout.tsx         - Root layout with ClerkProvider
  page.tsx           - Main dashboard

/components
  /tabs
    GenerateTab.tsx  - Script generation interface
    HistoryTab.tsx   - Script history & search
    CalendarTab.tsx  - Content planning calendar
    HookLibraryTab.tsx - Hook reference library
    AnalyticsTab.tsx - Performance analytics dashboard
    CommentReplyTab.tsx - AI comment reply generator
  ThumbnailPreview.tsx - Thumbnail canvas renderer
  CopyBtn.tsx        - Reusable copy button

/lib
  supabase-client.ts - Supabase browser client
  supabase.ts        - Server utilities

/hooks
  useSupabaseQuery.ts - Supabase query error handling

/migrations
  001_init_schema.sql - Database schema & RLS policies
```

## Features Deep Dive

### Authentication Flow
1. User lands on `/` (page.tsx)
2. Clerk middleware checks auth status
3. If not authenticated → redirects to Clerk sign-in
4. After auth → user can access dashboard
5. Logout button in header signs out via Clerk

### Script Generation
1. Select pillar, format, and topic
2. Click "Generate"
3. AI generates 7-field response (title, hooks A/B/C, script, captions, hashtags, CTA)
4. Response auto-saves to Supabase `scripts` table
5. Thumbnail auto-generates
6. Toast notification confirms save

### Analytics Workflow
1. Click "Analytics" tab
2. Select a script from dropdown
3. Enter views and likes for the date
4. Click "Log Entry"
5. Data saves to `analytics` table
6. 4 charts update in real-time showing trends

### Comment Reply Generation
1. Copy a TikTok comment
2. Paste in "Comments" tab
3. Click "Generate Reply"
4. AI returns 1-2 sentence educational response
5. Auto-saves to `comment_replies` table
6. Copy reply to clipboard

## Error Handling & UX

- **Toast notifications** for all user actions (success/error)
- **Loading states** on generation and API calls
- **Error messages** with specific context
- **Fallback UI** for empty states
- **Keyboard-friendly** forms and inputs
- **Responsive design** for mobile/tablet/desktop

## Performance Optimizations

- Database queries with proper indexing
- Client-side Supabase caching
- Image canvas rendering (no external API calls for thumbnails)
- Lazy-loaded chart components
- Optimized bundle size with tree-shaking

## Security

- Row Level Security (RLS) on all Supabase tables
- User ID validation on all inserts/updates
- Clerk-managed authentication
- Environment variables never exposed to client
- API routes validate user context

## Future Enhancements

- Video preview player
- Batch script generation
- A/B testing analytics
- Export to CapCut format
- Multi-language support
- Custom hook templates
- Team collaboration features
- Performance benchmarking

## Support & Troubleshooting

### Scripts not saving to database
- Check Supabase credentials in `.env.local`
- Verify RLS policies are enabled
- Check user ID is passing correctly in Clerk

### Thumbnails not generating
- Ensure Canvas API works in browser
- Check image download permissions
- Verify dark mode color values are set

### AI generation timing out
- Check Anthropic API quota
- Verify API key is valid
- Test with shorter topic text

### Analytics charts empty
- Ensure scripts exist in database
- Log at least one analytics entry
- Check date picker is set correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with clear commit messages
4. Submit pull request

## License

MIT

---

**Built with ❤️ for Web3 creators**
