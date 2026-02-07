---
title: Design Tokens
sidebar_position: 2
---

# Design Tokens

> **Focus**: Colors, typography, spacing, shadows, and foundational tokens  
> **Relevant to**: Tailwind, theme context, component styling

---

## 📋 Overview

Delta Labs uses **design tokens** so colors, typography, spacing, and effects are consistent across the app. Tokens are defined in code and wired into Tailwind and the theme context. **Use tokens instead of hardcoded values** in components and styles.

For the full token catalog and file locations, see [Project Analysis → Design Tokens](../01-explanation/project-analysis#-design-system--theme).

---

## 🎨 Color System

| Category | Purpose | Example usage |
|----------|---------|---------------|
| **Primary** | Brand, main actions | Buttons, links, key UI |
| **Secondary** | Supporting brand | Backgrounds, borders |
| **Semantic** | Success, warning, error, info | Alerts, validation, status |
| **Surface** | Backgrounds | Cards, modals, sections |
| **Text** | Foreground | Primary, secondary, disabled, link |

- **Scales**: Primary and secondary use 50–900 scales (e.g. `primary-600`, `secondary-500`).
- **Surface**: `surface-primary`, `surface-secondary`, `surface-tertiary`, overlay.
- **Text**: primary, secondary, tertiary, disabled, inverse, link.

Use Tailwind classes like `bg-primary-600`, `text-text-primary`, `border-border-primary` (or your configured names).

---

## 📝 Typography

| Token type | Details |
|------------|---------|
| **Font families** | Primary (e.g. Poppins), secondary (e.g. Nunito Sans), monospace (e.g. JetBrains Mono) |
| **Font sizes** | xs (12px) up to 9xl (128px); use Tailwind scale (`text-xs`, `text-sm`, etc.) |
| **Font weights** | 100–900 |
| **Line heights** | none, tight, snug, normal, relaxed, loose |
| **Letter spacing** | tighter → widest |

Use `font-primary`, `text-*`, `font-*` (or your theme's class names) from Tailwind config.

---

## 📐 Spacing & Layout

- **Spacing scale**: 0–96 (0px–384px), typically on a 4px grid.
- **Border radius**: xs (2px) → 3xl (32px), plus `full` for circular.
- **Shadows**: Elevation levels (e.g. xs → 2xl) plus special (inner, focus, error, success).
- **Z-index**: Documented layers (e.g. tooltip, modal, overlay, dropdown) — see [Project Analysis](../01-explanation/project-analysis#-design-system--theme).

Use `p-*`, `m-*`, `rounded-*`, `shadow-*` from your Tailwind setup.

---

## 🎬 Animation

- **Duration**: e.g. instant (0ms) → slower (1000ms).
- **Easing**: linear, ease, easeIn, easeOut, easeInOut, bounce.
- **Keyframes**: fadeIn, fadeOut, slideIn, slideOut, scaleIn, scaleOut, bounceIn.

Use transition and animation utilities from Tailwind/theme (e.g. `duration-300`, `ease-in-out`).

---

## 🔧 Using Tokens in Code

### Tailwind

Prefer token-based classes over arbitrary values:

```tsx
// ✅ Prefer tokens
<button className="bg-primary-600 text-white hover:bg-primary-700 rounded-lg px-4 py-2">
  Submit
</button>

// ❌ Avoid hardcoded values when tokens exist
<button className="bg-[#174A5F] rounded-[8px]">Submit</button>
```

### Theme context

The theme context exposes hooks for tokens (e.g. `useThemeColors()`, `useThemeTypography()`). Use them when you need token values in logic (e.g. charts or dynamic styles), not for regular layout/color that can be done with Tailwind.

---

## 📖 See Also

- [Project Analysis → Design Tokens](../01-explanation/project-analysis#-design-system--theme) — full token list and file paths.
- [Design Principles](./design-principles) — components and atomic design.
- [Coding Standards → Styling](../04-development-standards/coding-standards#8-styling-standards) — Tailwind and token usage rules.
