# ScriptMint Brand Guidelines

## Brand Identity

**Name:** ScriptMint
**Tagline:** AI-Powered TikTok Content Generator for Web3 Developers
**Mission:** Empower Web3 creators to generate professional TikTok content in seconds
**Target Audience:** Web3 developers, content creators, Solidity developers, NFT enthusiasts

## Logo & Visual Assets

### Logo Files
- **Logo Mark:** `/public/logo.jpg` - Hexagon with "SM" monogram (primary icon)
- **Logo Horizontal:** ScriptMint wordmark with hexagon
- **Logo Vertical:** Stacked version for small spaces

### Logo Usage
- **Minimum Size:** 32px × 32px
- **Clear Space:** 10% of logo height on all sides
- **Background:** Works on dark (#07080d) and light backgrounds
- **Do Not:** Rotate, skew, distort, or change colors

## Color System

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Brand Orange** | `#f97316` | 249, 115, 22 | Accent, CTAs, highlights |
| **Dark Background** | `#07080d` | 7, 8, 13 | Primary background |
| **Surface** | `#0f0d17` | 15, 13, 23 | Cards, panels |
| **Border** | `#2a2635` | 42, 38, 53 | Lines, dividers |
| **Text** | `#e8e8e8` | 232, 232, 232 | Body text |
| **Muted Text** | `#a9a1b8` | 169, 161, 184 | Secondary text |
| **White** | `#ffffff` | 255, 255, 255 | High contrast text |

### Content Pillar Colors

| Pillar | Color | Hex | Usage |
|--------|-------|-----|-------|
| Build in Public | Orange | `#f97316` | Primary accent |
| Educate Web3 | Cyan | `#22d3ee` | Secondary accent |
| Money & Career | Purple | `#a78bfa` | Tertiary accent |
| Dev Life BTS | Green | `#34d399` | Quaternary accent |

## Typography

### Font Families

| Type | Font | Weight | Usage |
|------|------|--------|-------|
| **Display** | Bebas Neue | 400 | Logo, headings, hero |
| **Body** | DM Sans | 400, 500, 600 | Body text, UI |
| **Mono** | DM Mono | 400, 500 | Code, captions, metadata |

### Font Sizes & Scales

```
Display: 24px - 32px (Bebas Neue)
Heading: 18px - 22px (DM Sans, 600)
Subheading: 14px - 16px (DM Sans, 500)
Body: 12px - 14px (DM Sans, 400)
Caption: 11px - 12px (DM Mono, 400)
```

## Banners & Social Assets

### Banner Dimensions

| Type | Dimensions | Location | File |
|------|-----------|----------|------|
| Hero Banner | 1200 × 400px | Homepage header | `banner-hero.jpg` |
| Features Banner | 1200 × 300px | Feature showcase | `banner-features.jpg` |
| Social Banner | 1200 × 628px | Twitter, LinkedIn | `banner-social.jpg` |
| OG Image | 1200 × 630px | Meta tags | `banner-social.jpg` |

### Banner Design Rules

- **Hero:** Bold typography with hexagon elements, dark background
- **Features:** Icon grid showcasing 4 main features
- **Social:** High-impact text overlay with accent color highlights

## Photography & Imagery

### Style Guidelines
- Tech-forward, dark aesthetic
- Geometric patterns and hexagon shapes
- Orange accent elements
- High contrast for readability
- Minimal, clean composition

### Do's & Don'ts
- ✅ Use dark backgrounds
- ✅ Incorporate orange (#f97316) accents
- ✅ Maintain high contrast
- ✅ Use geometric shapes (hexagons, lines)
- ❌ Don't use bright, clashing colors
- ❌ Don't use complex gradients
- ❌ Don't use generic stock photos
- ❌ Don't use pastel colors

## UI Component Colors

### Buttons

```css
/* Primary Button (CTA) */
background: #f97316;
color: #07080d;
border: none;

/* Secondary Button */
background: transparent;
border: 1px solid #2a2635;
color: #e8e8e8;

/* Hover State */
border-color: #f97316;
color: #ffffff;
```

### Input Fields

```css
/* Default */
background: #0f0d17;
border: 1.5px solid #2a2635;
color: #e8e8e8;

/* Focus */
border-color: #f97316;
outline: none;
```

### Cards & Surfaces

```css
/* Card Background */
background: #0f0d17;
border: 1px solid #2a2635;
border-radius: 4px;

/* Hover State */
border-color: #f97316;
```

## Animation & Motion

### Transition Speeds
- Fast: 150ms - 200ms (hover states, small interactions)
- Medium: 350ms - 500ms (dialog openings, page transitions)
- Slow: 700ms - 1000ms (complex animations)

### Easing Functions
```css
ease-out: cubic-bezier(0, 0, 0.58, 1);
ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
ease-linear: linear;
```

### Animation Patterns
- Fade In/Out: opacity transitions
- Slide Up: translateY with ease-out
- Spin: rotation for loading states

## Voice & Tone

### Brand Voice
- **Professional yet approachable** - Experts who explain simply
- **Developer-focused** - Technical but not jargon-heavy
- **Energetic** - Excited about Web3 opportunities
- **Action-oriented** - Encouraging and motivating

### Writing Guidelines

| Context | Tone | Example |
|---------|------|---------|
| Feature Description | Informative | "Generate TikTok scripts optimized for engagement" |
| Error Message | Helpful | "Topic required — enter a topic to continue" |
| Success Message | Celebratory | "Script generated and saved! 🎉" |
| CTA Button | Action-Driven | "Generate Script", "Log Entry", "Generate Reply" |

## Accessibility

### Color Contrast
- Text on background: minimum 4.5:1 ratio (WCAG AA)
- Large text: minimum 3:1 ratio
- All badges and accents meet AA standards

### Iconography
- All icons have fallback text labels
- Hover states clearly visible
- Color not sole differentiator

### Typography
- Minimum font size: 12px for body text
- Line height: 1.4 - 1.6 for readability
- Maximum line length: 65-70 characters

## Social Media Assets

### Twitter/X
- **Profile Picture:** Logo (400 × 400px)
- **Header Image:** Banner (1500 × 500px)
- **Card Image:** Social banner (1200 × 628px)

### LinkedIn
- **Profile Picture:** Logo (512 × 512px)
- **Banner:** 1200 × 628px
- **Company Logo:** Logo (400 × 400px)

### GitHub
- **Repository Card:** 1200 × 400px
- **Hero Image:** Banner hero
- **Badge:** Version & status badges

## Markdown Badges

Use these badges in documentation:

```markdown
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)
![Node](https://img.shields.io/badge/node-18%2B-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/react-18.0.0-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/next.js-14.0-black?style=flat-square)
![Status](https://img.shields.io/badge/status-production%20ready-brightgreen?style=flat-square)
```

## File Structure

```
public/
├── logo.jpg               # Main logo (hexagon + SM)
├── banner-hero.jpg        # Hero banner (1200×400)
├── banner-features.jpg    # Features banner (1200×300)
├── banner-social.jpg      # Social banner (1200×628)
└── favicon.ico            # Browser favicon

BRANDING.md               # This file
README.md                 # Project documentation
.env.example              # Environment variables template
```

## Asset Downloads

All brand assets are available in the `/public` directory:
- Logo: `logo.jpg`
- Banners: `banner-*.jpg`

For high-resolution versions or additional formats, contact the team.

---

**Last Updated:** January 2025
**Version:** 1.0.0
