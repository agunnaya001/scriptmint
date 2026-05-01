# ScriptMint - Quick Start Guide

## 60-Second Setup

### 1. Install
```bash
git clone <repo-url>
cd scriptmint
pnpm install
```

### 2. Configure
```bash
cp .env.example .env.local
```

Add your keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Run
```bash
pnpm dev
```

Open `http://localhost:3000` and sign up!

## Getting Your API Keys

### Clerk
1. Go to [clerk.com](https://clerk.com)
2. Create free account
3. Create new app
4. Copy `Publishable Key` and `Secret Key`

### Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create new project (free tier)
3. Go to Settings → API
4. Copy `URL` and `anon public key`
5. Schema auto-creates on first connection

### Anthropic
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create account
3. Go to API keys
4. Generate and copy API key

## First Script Generation

1. **Sign up** with email/password (Clerk handles it)
2. Click **Generate** tab
3. Select a **pillar** (e.g., "Build in Public")
4. Select a **format** (e.g., "Screen Record")
5. Enter a **topic** (e.g., "Deploy NFT on Base")
6. Click **Generate** and wait 3-5 seconds
7. Copy the hook, captions, or hashtags
8. Script auto-saves to database!

## Features Tour

### Generate Scripts
- 4 content pillars organized by topic
- 3 video formats with production tips
- Multiple hook variations (A/B/C)
- Auto-generated thumbnails

### Track Analytics
- Log views and likes per video
- See 4 interactive charts:
  - Performance over time
  - Top-performing hooks
  - Engagement by content type
  - Format effectiveness

### Generate Replies
- Paste TikTok comments
- AI suggests educational 1-2 line replies
- Save to database for reference
- Copy and post immediately

### Browse History
- View all scripts you've generated
- Filter by pillar or format
- Copy any previous script data

### Check Calendar
- Visual content planning
- Series day tracking
- Format overview

### Library
- Browse all hooks you've generated
- Quick-reference for ideas
- Click to copy any hook

## Common Tasks

### Add More Scripts
```
1. Click "Generate"
2. Pick topic & pillar
3. Click "Generate"
4. (repeat!)
```

### Export Analytics
```
1. Click "Analytics"
2. Log views & likes for each video
3. Charts update automatically
4. Take screenshot or export data
```

### Generate Comment Replies
```
1. Copy comment from TikTok
2. Click "Comments" tab
3. Paste comment
4. Click "Generate"
5. Copy reply → paste on TikTok
```

### Sign Out
```
Click "SIGN OUT" button in top-right header
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Can't sign in | Verify Clerk keys in `.env.local` |
| Scripts not saving | Check Supabase URL/keys, ensure RLS is enabled |
| Generation fails | Verify Anthropic API key, check quota |
| Thumbnails blank | Clear browser cache, check Canvas support |
| Charts empty | Log at least one analytics entry |

## Next Steps

1. **Generate 5+ scripts** to understand flow
2. **Log analytics** from your actual TikTok videos
3. **Review charts** to find your best-performing hooks
4. **Use Comment tab** to boost engagement
5. **Deploy to Vercel** (see README for details)

## Need Help?

- **Docs:** [README.md](./README.md)
- **Branding:** [BRANDING.md](./BRANDING.md)
- **Issues:** [GitHub Issues](https://github.com/scriptmint/scriptmint/issues)
- **Email:** support@scriptmint.dev

## What's Included

✅ AI script generation  
✅ Thumbnail generator  
✅ Analytics dashboard  
✅ Comment reply AI  
✅ Content calendar  
✅ Hook library  
✅ User authentication  
✅ Database storage  
✅ Toast notifications  
✅ Error handling  

## Production Checklist

Before deploying:

- [ ] All env vars configured
- [ ] Supabase project created
- [ ] Clerk app created
- [ ] Anthropic API key active
- [ ] Local testing complete
- [ ] Built successfully (`pnpm build`)
- [ ] No console errors
- [ ] Database RLS enabled

Deploy to Vercel:
```bash
git push origin main
# Auto-deploys via Vercel webhook
# Add env vars to Vercel dashboard
```

## Performance

| Metric | Expected |
|--------|----------|
| Script generation | 3-5 sec |
| Comment reply | 2-3 sec |
| Thumbnail gen | <200ms |
| Page load | ~1.2 sec |
| Database query | <50ms |

---

**You're all set! Start generating TikTok scripts now.** 🚀

Built with ❤️ for Web3 creators
