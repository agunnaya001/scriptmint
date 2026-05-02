# ScriptMint Deployment Guide

## Pre-Deployment Checklist

### ✅ Environment Variables
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Set in Vercel dashboard
- [ ] `CLERK_SECRET_KEY` - Set in Vercel dashboard  
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Set in Vercel dashboard
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Set in Vercel dashboard
- [ ] `ANTHROPIC_API_KEY` - Set in Vercel dashboard

### ✅ Database Setup
- [ ] Supabase project created
- [ ] Database schema migrated (4 tables with RLS)
- [ ] RLS policies enabled on all tables
- [ ] Performance indexes created

### ✅ Authentication Setup
- [ ] Clerk project created
- [ ] Sign-in/Sign-up URLs configured
- [ ] Production domain added to Clerk allowlist

### ✅ Code Quality
- [ ] All features tested locally
- [ ] Console errors resolved
- [ ] TypeScript compilation passes
- [ ] All dependencies installed
- [ ] README and docs complete

---

## Deployment Steps

### Option 1: Vercel (Recommended)

#### Step 1: Verify Vercel Project Connection
```bash
# Check if connected to Vercel project
vercel status
# Should show: prj_hW5kerFj0q8VkzlPRKQWAPbnmaQX
```

#### Step 2: Set Environment Variables in Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **scriptmint** project
3. Go to **Settings** → **Environment Variables**
4. Add all 5 variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`

**Important:** Mark public variables with "NEXT_PUBLIC_" prefix only (Vercel handles this automatically).

#### Step 3: Configure Production URLs
In **Clerk Dashboard** → **API Keys** → **Allowed Origins**:
```
https://scriptmint.vercel.app
https://scriptmint-[team-slug].vercel.app
https://your-custom-domain.com
```

#### Step 4: Deploy
```bash
# Option A: Deploy from Git (auto-deploy on push)
git add .
git commit -m "Deploy ScriptMint v1.0"
git push origin main

# Option B: Deploy via Vercel CLI
vercel --prod
```

#### Step 5: Monitor Deployment
```bash
# View live deployment logs
vercel logs --prod

# Check deployment status
vercel status
```

---

### Option 2: Self-Hosted (Node.js Server)

#### Prerequisites
- Node.js 18+
- npm or pnpm
- Linux/macOS server with SSH

#### Step 1: Build for Production
```bash
cd /vercel/share/v0-project
pnpm run build
```

#### Step 2: Export Environment Variables
```bash
export NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_key"
export CLERK_SECRET_KEY="your_key"
export NEXT_PUBLIC_SUPABASE_URL="your_url"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="your_key"
export ANTHROPIC_API_KEY="your_key"
```

#### Step 3: Start Production Server
```bash
pnpm run start
# Server runs on http://localhost:3000
```

#### Step 4: Use PM2 for Process Management
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start "pnpm start" --name "scriptmint"
pm2 save
pm2 startup

# Monitor
pm2 logs scriptmint
pm2 status
```

#### Step 5: Configure Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name scriptmint.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Step 6: Enable HTTPS (Let's Encrypt)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d scriptmint.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

### Option 3: Docker Deployment

#### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN pnpm run build

# Expose port
EXPOSE 3000

# Start
CMD ["pnpm", "start"]
```

#### Step 2: Build & Push Image
```bash
docker build -t scriptmint:latest .
docker run -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..." -p 3000:3000 scriptmint:latest
```

#### Step 3: Deploy to Container Registry
```bash
# Docker Hub
docker tag scriptmint:latest yourusername/scriptmint:latest
docker push yourusername/scriptmint:latest

# Or AWS ECR, Google Cloud Registry, etc.
```

---

## Post-Deployment Verification

### ✅ Test Application
```bash
# Visit production URL
curl https://scriptmint.com

# Check health endpoints
curl https://scriptmint.com/api/health

# Test Clerk auth
# 1. Go to https://scriptmint.com
# 2. Sign up with test account
# 3. Verify redirect after auth
```

### ✅ Monitor Performance
```bash
# Vercel Analytics
# 1. Go to Vercel Dashboard
# 2. Check "Analytics" tab
# 3. View Core Web Vitals

# Uptime Monitoring
# Set up monitoring at:
# - UptimeRobot.com
# - Pingdom.com
# - StatusCake.com
```

### ✅ Check Database
```bash
# Verify Supabase connection
SELECT COUNT(*) FROM scripts;  -- Should return 0 initially

# Check RLS policies
SELECT * FROM pg_policies;

# Monitor query performance
-- Check slow query log in Supabase dashboard
```

### ✅ Error Tracking
1. Set up Sentry for error monitoring:
   ```bash
   npm install @sentry/nextjs
   ```
2. Add to environment variables:
   ```
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   ```
3. Monitor errors in Sentry dashboard

---

## Domain Setup

### Connect Custom Domain to Vercel
1. Go to Vercel Dashboard → Project Settings → Domains
2. Add your custom domain (e.g., scriptmint.dev)
3. Follow DNS configuration:
   ```
   CNAME: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (up to 48 hours)

### Update Clerk Allowed Origins
Add to Clerk dashboard:
```
https://scriptmint.dev
https://www.scriptmint.dev
```

### Update Supabase CORS
In Supabase dashboard → API Settings:
```
https://scriptmint.dev
https://www.scriptmint.dev
```

---

## Scaling & Performance

### Database Optimization
- Monitor query performance in Supabase dashboard
- Enable read replicas for high traffic
- Archive old analytics after 1 year

### Caching Strategy
- Enable Redis caching for frequently accessed data
- Cache user scripts for 1 hour
- Cache analytics summaries for 24 hours

### CDN Configuration
- Enable Vercel Edge Network (automatic)
- Cache static assets aggressively:
  ```
  /public/* → Cache for 1 year
  /api/* → Cache for 5 minutes
  /*.* → No cache (always fresh)
  ```

### Load Testing
```bash
# Use Apache Bench for load testing
ab -n 1000 -c 100 https://scriptmint.com

# Expected: <100ms response time
# 99th percentile: <500ms
```

---

## Monitoring & Maintenance

### Daily Checks
- [ ] Check Vercel deployment status
- [ ] Monitor Supabase query performance
- [ ] Review error logs in console
- [ ] Check uptime monitoring alerts

### Weekly Tasks
- [ ] Review analytics for performance bottlenecks
- [ ] Check database storage usage
- [ ] Review API usage quotas
- [ ] Backup database (if self-hosted)

### Monthly Tasks
- [ ] Update dependencies (`pnpm update`)
- [ ] Review security updates
- [ ] Analyze user engagement metrics
- [ ] Plan feature releases

### Quarterly Tasks
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Database maintenance and optimization
- [ ] Disaster recovery testing

---

## Rollback Procedures

### If Deployment Fails
```bash
# Vercel: Automatic rollback to previous version
# 1. Go to Vercel Dashboard → Deployments
# 2. Click "Promote to Production" on previous deployment

# Manual rollback
git revert HEAD
git push origin main
```

### Hotfix for Critical Issues
```bash
# Create hotfix branch
git checkout -b hotfix/critical-fix

# Fix issue
# ... make changes ...

# Push and create PR
git push origin hotfix/critical-fix
# Create PR on GitHub

# After merge and deployment
git tag v1.0.1-hotfix
git push origin v1.0.1-hotfix
```

---

## SSL/TLS Certificate

### Vercel (Automatic)
- Vercel automatically provisions SSL certificates via Let's Encrypt
- Certificates auto-renew (no action needed)
- Enforce HTTPS in settings

### Self-Hosted
```bash
# Using Certbot
sudo certbot certonly --standalone -d scriptmint.com

# Renew manually
sudo certbot renew

# Auto-renewal via cron
0 3 * * * /usr/bin/certbot renew --quiet
```

---

## Backup & Disaster Recovery

### Database Backups
```bash
# Supabase automated backups
# Daily backups enabled by default
# 7-day retention for free tier
# 30-day retention for Pro tier

# Manual backup
pg_dump postgresql://user:password@db.supabase.co/postgres > backup.sql
```

### Code Backup
```bash
# GitHub is your backup
# Ensure all code is pushed to main
git push origin main

# Tag releases for easy recovery
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0
```

---

## Incident Response

### If Site Goes Down
1. Check Vercel deployment status
2. Check Supabase service status
3. Check DNS propagation
4. Review recent deployments for issues
5. Rollback to previous stable version
6. Post incident report

### If Database Connection Fails
1. Verify environment variables in Vercel
2. Check Supabase project status
3. Verify network access in Supabase
4. Check RLS policies
5. Test connection locally

### If Authentication Fails
1. Verify Clerk API keys
2. Check Clerk project status
3. Verify allowed origins in Clerk
4. Test sign-up/sign-in flow
5. Check browser console for errors

---

## Support & Troubleshooting

### Deployment Issues
- **Build fails:** Check dependencies, run `pnpm install`
- **Env vars missing:** Add all 5 vars to Vercel dashboard
- **Deploy hangs:** Check GitHub push history, verify branch

### Runtime Issues
- **502 Bad Gateway:** Server crashed, check logs
- **404 Not Found:** Wrong URL or deployment not ready
- **401 Unauthorized:** Check Clerk authentication

### Database Issues
- **Connection timeout:** Check Supabase status, verify network
- **RLS policy rejection:** Verify user_id is being passed
- **Quota exceeded:** Upgrade Supabase plan

---

## Production Checklist - Final

- [ ] All env vars configured
- [ ] Database migrated and tested
- [ ] SSL/TLS certificate active
- [ ] Custom domain connected
- [ ] Monitoring and alerting set up
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] Team access granted
- [ ] Support email configured
- [ ] Analytics tracking enabled

**Ready to go live!** 🚀
