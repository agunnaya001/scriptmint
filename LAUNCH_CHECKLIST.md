# ScriptMint - Pre-Launch Checklist

## 🎯 Critical Path to Production

Complete these items in order to go live:

---

## Phase 1: Verify Environment (5 minutes)

- [ ] All 5 API keys are added to Vercel dashboard
- [ ] No API keys are in `.env.local` (only in Vercel)
- [ ] Verified keys are active and have credits
- [ ] Tested locally with `pnpm dev` - app starts without errors

### API Keys Needed:
```
1. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (from Clerk)
2. CLERK_SECRET_KEY (from Clerk)
3. NEXT_PUBLIC_SUPABASE_URL (from Supabase)
4. NEXT_PUBLIC_SUPABASE_ANON_KEY (from Supabase)
5. ANTHROPIC_API_KEY (from Anthropic)
```

### Verify in Vercel:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select **scriptmint** project
3. Click **Settings** → **Environment Variables**
4. Confirm all 5 variables are listed

---

## Phase 2: Database Verification (5 minutes)

- [ ] Supabase project is active (not paused)
- [ ] Database schema is migrated (4 tables exist)
- [ ] RLS policies are enabled on all tables
- [ ] Can connect to database from localhost
- [ ] Can perform basic CRUD operations

### Test Database Connection:
```bash
# In Supabase Dashboard:
1. Go to SQL Editor
2. Run: SELECT COUNT(*) FROM scripts;
3. Should return 0 (if fresh database)
4. Check no errors in browser console
```

---

## Phase 3: Authentication Testing (10 minutes)

- [ ] Clerk is configured correctly
- [ ] Sign-up flow works (test account created)
- [ ] Sign-in flow works (can log back in)
- [ ] Sign-out works (redirects correctly)
- [ ] User data is isolated (users only see their own data)

### Test Sign-Up:
```bash
1. Open http://localhost:3000
2. Click "Sign Up"
3. Enter email and password
4. Verify email (if required)
5. Should redirect to dashboard
6. Should be able to navigate all tabs
```

### Test Sign-In:
```bash
1. Sign out (click SIGN OUT in header)
2. Should redirect to sign-in page
3. Sign in with same email/password
4. Should be able to access dashboard
```

---

## Phase 4: Feature Testing (30 minutes)

### Generate Tab
- [ ] Can select pillar, format, and enter topic
- [ ] Generate button works
- [ ] Script appears within 5 seconds
- [ ] Thumbnail auto-generates
- [ ] Data saves to Supabase
- [ ] Toast notification shows success

### Analytics Tab
- [ ] Can select a script from dropdown
- [ ] Can enter views and likes
- [ ] "Add Entry" button saves data
- [ ] Charts update with new data
- [ ] Time trends chart displays correctly
- [ ] Pillar performance chart displays correctly
- [ ] Format performance chart displays correctly
- [ ] Hook effectiveness chart displays correctly

### Comments Tab
- [ ] Can paste a TikTok comment
- [ ] Generate Reply button works
- [ ] Reply appears within 3 seconds
- [ ] Toast notification shows success
- [ ] Can copy reply to clipboard
- [ ] Data saves to Supabase

### Calendar Tab
- [ ] Calendar displays correctly
- [ ] Can see generated scripts
- [ ] Series day increments correctly

### History Tab
- [ ] Can see list of generated scripts
- [ ] Can search scripts
- [ ] Can see script details when clicked

### Hook Library Tab
- [ ] Can see all hooks from generated scripts
- [ ] Can copy hooks
- [ ] Can filter by pillar/format

---

## Phase 5: Production Build (10 minutes)

- [ ] `pnpm run build` completes without errors
- [ ] No TypeScript errors
- [ ] Build size is reasonable (< 500KB)
- [ ] No console warnings or errors

### Run Build:
```bash
cd /vercel/share/v0-project
pnpm run build
```

Expected output:
```
✓ Compiled successfully
✓ Route (app)
✓ First Load JS
✓ Middleware
```

---

## Phase 6: Deploy to Vercel (5 minutes)

### Option A: Git Push (Automatic)
```bash
# Push to GitHub (connects to Vercel auto-deploy)
git add .
git commit -m "Launch: Ready for production"
git push origin main

# Vercel automatically deploys (wait 2-5 minutes)
# Check status: https://vercel.com/dashboard → scriptmint
```

### Option B: Vercel CLI
```bash
# Authenticate with Vercel
vercel login

# Deploy to production
vercel --prod

# Wait for deployment to complete
# Check status: vercel status
```

### Option C: Vercel Dashboard
```
1. Go to https://vercel.com/dashboard
2. Select scriptmint project
3. Click "Deployments"
4. Click "Deploy" or promote latest commit
```

---

## Phase 7: Post-Deployment Testing (10 minutes)

### Test Live URL
- [ ] App loads at https://scriptmint.vercel.app
- [ ] Can sign up with new account
- [ ] Can generate a script
- [ ] Can log analytics
- [ ] Can generate comment reply
- [ ] All features work as expected

### Verify Database Connection
- [ ] Generated script appears in Supabase
- [ ] Analytics data saves to database
- [ ] Comment replies save to database
- [ ] User can only see their own data

### Check Performance
- [ ] Page loads in < 3 seconds
- [ ] Generate script completes in < 5 seconds
- [ ] Comment reply completes in < 3 seconds
- [ ] No console errors in browser

### Verify External Services
- [ ] Clerk authentication working
- [ ] Supabase database connected
- [ ] Anthropic API responding
- [ ] All API keys are valid

---

## Phase 8: Configure External Services (10 minutes)

### Clerk Dashboard
- [ ] Production domain added to allowed origins
- [ ] Sign-in redirect URL is correct
- [ ] Sign-up redirect URL is correct
- [ ] Email confirmations are configured (if needed)

### Supabase Dashboard
- [ ] Production domain added to CORS
- [ ] RLS policies verified on all tables
- [ ] Backups are enabled
- [ ] Database is optimized

### Anthropic Account
- [ ] API key has sufficient credits
- [ ] Rate limits are appropriate
- [ ] Billing is set up correctly

---

## Phase 9: Monitoring & Alerts (10 minutes)

### Set Up Monitoring
- [ ] Vercel deployment alerts enabled
- [ ] Email alerts for deployment failures
- [ ] Uptime monitoring enabled (UptimeRobot, etc.)

### Create Monitoring URLs
- [ ] Production app: https://scriptmint.vercel.app
- [ ] Vercel dashboard: https://vercel.com/dashboard
- [ ] Supabase dashboard: https://app.supabase.com
- [ ] Clerk dashboard: https://dashboard.clerk.com

---

## Phase 10: Documentation & Handoff (5 minutes)

- [ ] README.md updated with live URL
- [ ] DEPLOYMENT.md is complete
- [ ] PUBLISH.md has been read
- [ ] Team members have access
- [ ] Credentials are stored securely (not in repo)

---

## Launch Day Script

### Morning (30 minutes before launch)
```bash
1. Final verification of all checklist items ✓
2. Verify all API keys are active
3. Test production URL one more time
4. Notify team that launch is starting
```

### Launch (Deploy)
```bash
1. Push code to GitHub (or use Vercel CLI)
2. Wait for Vercel deployment (2-5 minutes)
3. Verify deployment successful
4. Test live features
5. Check database for new data
```

### Post-Launch (30 minutes after)
```bash
1. Monitor error logs
2. Check Vercel analytics
3. Verify all features working
4. Test with real traffic (if available)
5. Share launch announcement
```

---

## Success Criteria

✅ App is live at https://scriptmint.vercel.app
✅ Users can sign up and authenticate
✅ All 6 tabs are functional
✅ Database stores data correctly
✅ AI features generate responses correctly
✅ Thumbnails generate automatically
✅ Analytics tracking works
✅ Comment replies generate correctly
✅ No errors in production
✅ Performance is good (LCP < 2.5s)

---

## Troubleshooting During Launch

### If Build Fails
1. Check Vercel build logs
2. Verify all env vars are set
3. Run `pnpm run build` locally to debug
4. Rollback to previous deployment

### If Features Don't Work
1. Check browser console for errors
2. Check API keys in Vercel
3. Verify Supabase database connection
4. Check Clerk authentication status

### If Database Isn't Saving
1. Verify Supabase connection string
2. Check RLS policies are correct
3. Verify user_id is being passed
4. Check Supabase logs for SQL errors

### If Authentication Fails
1. Verify Clerk keys in Vercel
2. Add production URL to Clerk allowed origins
3. Check Clerk dashboard for errors
4. Test sign-up flow in Clerk dashboard

---

## Post-Launch Monitoring

### First Week
- [ ] Daily check of error logs
- [ ] Monitor performance metrics
- [ ] Verify database isn't growing unexpectedly
- [ ] Gather initial user feedback
- [ ] Fix any critical bugs

### First Month
- [ ] Weekly performance review
- [ ] Monthly security audit
- [ ] User feedback analysis
- [ ] Plan V1.1 improvements
- [ ] Share user testimonials

---

## Final Verification

Run this before clicking "Deploy":

```bash
# 1. Check git status
git status  # Should be clean

# 2. Build locally
pnpm run build  # Should succeed

# 3. Start dev server
pnpm dev  # Should start without errors

# 4. Test features
# - Sign up
# - Generate script
# - Log analytics
# - Generate comment reply

# 5. Check database
# Visit Supabase → Table Editor → scripts
# Should see newly generated script

# 6. Verify env vars in Vercel
# 5 env vars should be set
```

✅ Ready to launch!

---

## Launch Announcement

Share this when you go live:

```
🚀 Excited to announce: ScriptMint is now live!

ScriptMint is an AI-powered TikTok script generator for Web3 
developers. Generate scripts with AI, track analytics, create 
thumbnails, and boost engagement all in one place.

🎯 Features:
- AI script generation with A/B/C hooks
- Auto-generated TikTok thumbnails
- Advanced analytics dashboard
- Comment reply generator
- Content calendar

🔗 Try it now: https://scriptmint.vercel.app

Built with Next.js, Supabase, Clerk, and Claude AI.
Open source on GitHub.

#Web3 #TikTok #AI #Developer #BuildInPublic
```

---

**Status: LAUNCH READY ✓**

All systems are go! Follow the checklist above and you're ready to share ScriptMint with the world. 🎉
