# ScriptMint Testing & QA Guide

## Pre-Launch Testing Checklist

### Phase 1: Authentication (30 min)

#### Clerk Sign-Up
- [ ] Load sign-up page
- [ ] Fill email field
- [ ] Fill password field (8+ chars, 1 uppercase, 1 number)
- [ ] Submit form
- [ ] Verify email is sent (check spam folder)
- [ ] Click verification link
- [ ] Redirect to dashboard
- [ ] Display username in header

#### Clerk Sign-In
- [ ] Load sign-in page
- [ ] Enter email
- [ ] Enter password
- [ ] Submit form
- [ ] Redirect to dashboard
- [ ] Session persists on refresh
- [ ] Display current user

#### Logout
- [ ] Click "SIGN OUT" button in header
- [ ] Redirect to sign-in page
- [ ] Session cleared

### Phase 2: Generate Tab (45 min)

#### Script Generation
- [ ] Select pillar (Build in Public)
- [ ] Select format (Screen Record)
- [ ] Enter topic text
- [ ] Click "Generate"
- [ ] Loading spinner appears
- [ ] Script appears within 5 seconds
- [ ] All 7 fields populated:
  - Title
  - Hook (A, B, C variants)
  - Script array
  - Captions array
  - Hashtags array
  - CTA
  - Format notes

#### Thumbnail Generation
- [ ] Thumbnail canvas appears below script
- [ ] Hook text displayed in bold
- [ ] Dark background (#07080d)
- [ ] Orange accent bar visible
- [ ] 1080×1920px dimensions correct

#### Copy Functions
- [ ] Copy hook button works
- [ ] Copy script button works
- [ ] Copy captions button works
- [ ] Copy hashtags button works
- [ ] Clipboard notification appears
- [ ] Text accurately copied

#### Error Handling
- [ ] Try without selecting pillar → Error toast
- [ ] Try without selecting format → Error toast
- [ ] Try without entering topic → Error toast
- [ ] Network error handling → Specific error message

#### Database Save
- [ ] Script saves to Supabase after generation
- [ ] Script appears in History tab
- [ ] Script date/time correct
- [ ] Series day increments

### Phase 3: History Tab (20 min)

#### Script Retrieval
- [ ] Load History tab
- [ ] All generated scripts display
- [ ] Scripts ordered by newest first
- [ ] Correct count shown
- [ ] Each script shows:
  - Title
  - Pillar
  - Format
  - Date created
  - Hook text preview

#### Search/Filter
- [ ] Search by title works
- [ ] Filter by pillar works
- [ ] Filter by format works
- [ ] Results update in real-time

#### Script Interaction
- [ ] Click script to expand
- [ ] Full script displays
- [ ] Copy hooks button works
- [ ] Delete script button works
- [ ] Script removal confirmed

### Phase 4: Calendar Tab (15 min)

#### Display
- [ ] Calendar loads
- [ ] Shows current month
- [ ] Scripts organized by day
- [ ] Series day counter visible

#### Navigation
- [ ] Previous month button works
- [ ] Next month button works
- [ ] Today button works

### Phase 5: Hook Library Tab (15 min)

#### Display
- [ ] All hooks display
- [ ] Organized by pillar
- [ ] Search functionality works
- [ ] Filter by format works

#### Copy Functionality
- [ ] Copy any hook to clipboard
- [ ] Toast notification appears
- [ ] Accurate text copied

### Phase 6: Analytics Tab (45 min)

#### Data Entry
- [ ] Select script from dropdown
- [ ] Enter views (number)
- [ ] Enter likes (number)
- [ ] Date picker works
- [ ] Click "Add Entry"
- [ ] Data saves to database
- [ ] Entry appears in history

#### Charts Display
- [ ] Time Trends chart loads
- [ ] Line chart shows data points
- [ ] Hover tooltip displays values
- [ ] Legend works

- [ ] Hook Effectiveness chart loads
- [ ] Top 5 hooks ranked
- [ ] Values correct

- [ ] Pillar Performance chart loads
- [ ] Bar chart shows each pillar
- [ ] Colors distinct

- [ ] Format Performance chart loads
- [ ] Pie chart segments correct
- [ ] Percentages add to 100%

#### Chart Interactions
- [ ] Resize window → Charts responsive
- [ ] Click chart legend → Filter data
- [ ] Hover tooltip → Shows exact values

### Phase 7: Comment Reply Tab (30 min)

#### Reply Generation
- [ ] Paste TikTok comment in textarea
- [ ] Click "Generate Reply"
- [ ] Loading spinner appears
- [ ] Reply generated within 3 seconds
- [ ] Reply is educational tone
- [ ] Reply is 1-2 sentences max

#### Copy & Save
- [ ] Copy reply button works
- [ ] Reply saves to database
- [ ] Toast confirms save

#### Error Handling
- [ ] Empty textarea → Error message
- [ ] API error → Specific error message
- [ ] Network timeout → Retry prompt

#### Reply History
- [ ] Previous replies display
- [ ] Organized by date
- [ ] Original comment shown
- [ ] Generated reply shown

### Phase 8: Dark Theme & Styling (20 min)

#### Colors
- [ ] Background: #07080d (dark)
- [ ] Accent: #f97316 (orange)
- [ ] Text: #e8e8e8 (light gray)
- [ ] Borders: #2a2635 (subtle)

#### Typography
- [ ] Logo font: Bebas Neue (bold)
- [ ] Body font: DM Sans (readable)
- [ ] Mono font: DM Mono (code blocks)

#### Responsiveness
- [ ] Mobile (375px): Layouts stack
- [ ] Tablet (768px): 2-column layouts
- [ ] Desktop (1920px): Full layouts
- [ ] No horizontal scrolling
- [ ] Touch targets: 44×44px minimum

### Phase 9: Performance (30 min)

#### Load Times
- [ ] Page load: < 1.2 seconds
- [ ] Script generation: < 5 seconds
- [ ] Comment reply: < 3 seconds
- [ ] Database query: < 50ms
- [ ] Thumbnail render: < 200ms

#### Lighthouse Scores
- [ ] Performance: > 85
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

Test with: `lighthouse https://scriptmint.vercel.app`

#### Memory Usage
- [ ] No memory leaks on tab switching
- [ ] Charts clean up on unmount
- [ ] Supabase client singleton works

### Phase 10: Security (20 min)

#### Data Isolation
- [ ] Create 2 accounts
- [ ] Generate script in account 1
- [ ] Switch to account 2
- [ ] Script NOT visible in account 2
- [ ] Analytics data isolated
- [ ] Comment replies isolated

#### Authentication
- [ ] Modify user ID in browser → Error
- [ ] Invalid token → Redirect to sign-in
- [ ] Token refresh works seamlessly

#### API Security
- [ ] POST `/api/generate` requires auth
- [ ] POST `/api/generate-reply` requires auth
- [ ] No sensitive data in responses
- [ ] Rate limiting prevents abuse

### Phase 11: Browser Compatibility (30 min)

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

Verify:
- [ ] All features work
- [ ] Styling consistent
- [ ] No console errors
- [ ] Canvas rendering works
- [ ] Forms work properly

### Phase 12: Error Recovery (20 min)

#### Network Errors
- [ ] Disconnect internet → Error message
- [ ] Reconnect → Works again
- [ ] Retry button appears

#### Database Errors
- [ ] Supabase down → Graceful error
- [ ] RLS policy denies → Specific error
- [ ] Connection timeout → Retry prompt

#### API Errors
- [ ] Anthropic rate limit → Inform user
- [ ] Invalid request → Specific error
- [ ] Server error → Retry available

## Testing Commands

### Local Testing
```bash
# Start dev server
pnpm dev

# Run tests
pnpm test

# Build production
pnpm run build

# Analyze performance
ANALYZE=true pnpm run build

# Check for security issues
npm audit

# Type checking
pnpm run type-check
```

### Production Testing
```bash
# Test live app
lighthouse https://scriptmint.vercel.app --view

# Check health endpoint
curl https://scriptmint.vercel.app/api/health

# Monitor logs
vercel logs

# Check deployment status
vercel projects list
```

## Test Accounts

**Account 1 (Build in Public):**
- Email: test.build@scriptmint.dev
- Password: [stored securely]

**Account 2 (Analytics):**
- Email: test.analytics@scriptmint.dev
- Password: [stored securely]

## Bug Report Template

```
## Bug: [Title]

### Environment
- Browser: [Chrome/Firefox/Safari]
- Device: [Desktop/Mobile/Tablet]
- OS: [Windows/Mac/Linux/iOS/Android]
- Version: [Version number]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Screenshots
[Attach screenshot/video if applicable]

### Console Errors
[Paste any error messages]

### Severity
- [ ] Critical (app broken)
- [ ] High (feature broken)
- [ ] Medium (feature degraded)
- [ ] Low (minor issue)
```

## Performance Benchmarks

| Metric | Target | Acceptable | Critical |
|--------|--------|-----------|----------|
| Page Load | <1.2s | <2s | >3s |
| Script Gen | <5s | <7s | >10s |
| Reply Gen | <3s | <5s | >8s |
| DB Query | <50ms | <100ms | >200ms |
| API Response | <150ms | <200ms | >300ms |
| LCP | <2.5s | <3s | >4s |
| FID | <100ms | <150ms | >300ms |
| CLS | <0.1 | <0.15 | >0.25 |

## Sign-Off Checklist

Before launching:
- [ ] All 12 phases tested
- [ ] No critical bugs remaining
- [ ] Performance benchmarks met
- [ ] Security verified
- [ ] Accessibility checked
- [ ] Browser compatibility confirmed
- [ ] Documentation reviewed
- [ ] Monitoring setup complete
- [ ] Team trained
- [ ] Stakeholders notified

**Tested By:** [Name]
**Date:** [Date]
**Status:** ✓ Ready for Production
