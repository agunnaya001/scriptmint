# Analytics & Monitoring Setup for ScriptMint

## Overview
Production-grade monitoring, analytics, and error tracking for ScriptMint.

## 1. Vercel Analytics (Built-in)

### Web Analytics
Vercel provides free Web Analytics:

```bash
# Already included in Next.js
# Just enable in Vercel Dashboard:
# 1. Go to: https://vercel.com/dashboard/scriptmint
# 2. Settings → Analytics
# 3. Enable Web Analytics
```

**Metrics tracked:**
- Page views
- Unique visitors
- Device types (mobile/desktop)
- Browser types
- Referrer sources
- Geographic location

### Speed Insights
Monitor Core Web Vitals:
- LCP (Largest Contentful Paint) - Target: <2.5s
- FID (First Input Delay) - Target: <100ms
- CLS (Cumulative Layout Shift) - Target: <0.1

Enable in Vercel dashboard → Settings → Speed Insights

## 2. Error Tracking with Sentry (Recommended)

### Setup Sentry

```bash
npm install @sentry/nextjs
```

### Configure Sentry

Create `sentry.client.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  debug: false,
});
```

### Add to Layout

```typescript
import * as Sentry from "@sentry/nextjs";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Sentry.ErrorBoundary fallback={<div>Error</div>}>
          {children}
        </Sentry.ErrorBoundary>
      </body>
    </html>
  );
}
```

### Environment Variable

Add to `.env.local`:
```
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

Get DSN from: https://sentry.io → Projects → scriptmint

## 3. Database Monitoring

### Supabase Dashboard
Monitor in real-time:
- Query performance
- Row counts
- Storage usage
- Realtime connections

Access: https://app.supabase.com → scriptmint → Monitoring

### Database Logs
```sql
-- Monitor slow queries
SELECT 
  query,
  calls,
  mean_time,
  max_time
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat_statements%'
ORDER BY mean_time DESC
LIMIT 10;
```

## 4. Custom Analytics Integration

### Add Posthog (Optional - Advanced)

```bash
npm install posthog-js
```

In `app/layout.tsx`:
```typescript
'use client';

import PosthogProvider from './providers/posthog';

export default function RootLayout({ children }) {
  return (
    <PosthogProvider>
      <html>
        <body>{children}</body>
      </html>
    </PosthogProvider>
  );
}
```

### Track Key Events

```typescript
import { usePostHog } from 'posthog-js/react';

export function GenerateTab() {
  const posthog = usePostHog();

  const handleGenerate = () => {
    posthog.capture('script_generated', {
      pillar: selectedPillar,
      format: selectedFormat,
      timestamp: new Date(),
    });
  };
}
```

## 5. Logging & Debugging

### Structured Logging

Create `lib/logger.ts`:
```typescript
export const logger = {
  info: (msg: string, data?: any) => {
    if (process.env.NODE_ENV === 'production') {
      // Send to logging service
    }
    console.log(`[INFO] ${msg}`, data);
  },
  
  error: (msg: string, error?: Error) => {
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking
    }
    console.error(`[ERROR] ${msg}`, error);
  },
  
  warn: (msg: string, data?: any) => {
    console.warn(`[WARN] ${msg}`, data);
  },
};
```

### API Request Logging

```typescript
// app/api/generate/route.ts
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  
  try {
    logger.info('Script generation started');
    
    const data = await req.json();
    const response = await fetch('https://api.anthropic.com/...', {...});
    
    const duration = Date.now() - startTime;
    logger.info(`Script generation completed in ${duration}ms`);
    
    return NextResponse.json(response);
  } catch (error) {
    logger.error('Script generation failed', error as Error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

## 6. Alert Configuration

### Set Up Alerts in Vercel

1. **High Error Rate Alert:**
   - Vercel Dashboard → Settings → Function Logs
   - Alert if errors > 1% in 5 minutes

2. **Performance Alert:**
   - Alert if LCP > 4s
   - Alert if response time > 1s

### Email Alerts

Configure in: https://vercel.com/dashboard/settings/notifications

## 7. Monitoring Checklist

Daily:
- [ ] Check Vercel Analytics dashboard
- [ ] Review error logs in Sentry
- [ ] Check Supabase performance metrics
- [ ] Monitor database query performance

Weekly:
- [ ] Review Web Vitals trend
- [ ] Analyze user behavior patterns
- [ ] Check database storage growth
- [ ] Review API response times

Monthly:
- [ ] Performance analysis report
- [ ] User engagement summary
- [ ] Database optimization opportunities
- [ ] Plan infrastructure scaling

## 8. Performance Targets

| Metric | Target | Actual |
|--------|--------|--------|
| LCP | <2.5s | - |
| FID | <100ms | - |
| CLS | <0.1 | - |
| API Response | <200ms | - |
| DB Query | <50ms | - |
| Page Load | <1.2s | - |
| Error Rate | <0.5% | - |

## 9. Health Check Endpoint

Create `app/api/health/route.ts`:
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database
    const { data, error } = await supabase
      .from('scripts')
      .select('count')
      .single();

    if (error) throw error;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: String(error) },
      { status: 503 }
    );
  }
}
```

Monitor at: `https://scriptmint.vercel.app/api/health`

## 10. Resources

- [Vercel Analytics](https://vercel.com/docs/analytics)
- [Sentry for Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Supabase Monitoring](https://supabase.com/docs/guides/platform/monitoring)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing/performance-overview)
