---
sidebar_position: 2
---

# AI Routing & Navigation

> **Focus**: How user messages become navigation and UI updates  
> **Relevant to**: BotChat, AI Context, backend routes, frontend state

---

## 📋 Overview

The **AI routing layer** turns natural language in BotChat into navigation and UI updates. User messages are interpreted (intent, target module, filters), then the system emits **aiNavigate**-style events and returns **update_data** payloads that the frontend uses to route and render.

This document describes that flow in terms of the Delta Labs stack (React, Context API, Vite, backend APIs).

---

## 🔄 Navigation Flow

High-level flow from user message to UI update:

1. **User** sends a message in BotChat (or similar).
2. **AI / backend** interprets it (e.g. “show my courses”, “filter by level”).
3. **Backend** runs business logic and optional DB queries.
4. **Backend** returns:
   - Navigation/UI instructions (e.g. which view to show, which components to display).
   - Optional **update_data** for tables/lists.
5. **Frontend** applies:
   - Route/view changes.
   - **DataContext** updates so components re-render with new data.
   - Conditional visibility of panels/modules.

---

## 📦 Event Payload Concepts

### Navigation / UI event (conceptual)

Events that tell the frontend *where* to go and *what* to show:

- **Target module or view** (e.g. courses, labs).
- **Intent** (e.g. view list, filter, search).
- **Filters** (e.g. level, category, date range).
- **Visibility** for sections or components (e.g. show/hide sidebar, table, filters).

Payloads are typically JSON. Exact field names depend on your backend contract (e.g. `aiNavigate`, `update_ui`).

### Data payload (update_data)

When the backend returns data for tables or lists:

- **update_data** (or equivalent) carries the list of items (courses, labs, etc.).
- The frontend pushes this into **DataContext** (or equivalent state).
- Components that read from that context re-render (e.g. tables, cards).

---

## 🛠️ Implementation Hooks

### Frontend

- **AI Context** (`src/contexts/AI_Context.tsx`) — holds chat state and often calls the backend with the user message.
- **TabContext** — used to open/switch tabs (e.g. “open Course module”).
- **DataContext / module context** — holds module-specific data (e.g. course list) and is updated from backend responses.

### Backend

- **AI / chat endpoint** — receives user message, runs interpretation and business logic, returns navigation + optional **update_data**.
- **Module APIs** — return lists/details (courses, labs, etc.) used to fill **update_data** or used by the frontend in a separate request after navigation.

---

## ✅ Practices

- **Logging**: Log AI navigation and interpretation results (e.g. intent, filters) for debugging and analytics.
- **Rate limiting**: Apply rate limits on AI/chat and list endpoints to avoid abuse.
- **Validation**: Validate and sanitize all inputs before DB or business logic.
- **Pagination**: For large lists, return paginated **update_data** and document page size and cursor/offset in your API.
- **Error handling**: Define clear error responses and handle them in the frontend (e.g. fallback UI, retry, user message).

---

## 📖 See Also

- [System Layers](./system-layers.md) — where AI routing sits in the stack.
- [Data Flow & Table Population](./data-flow.md) — how **update_data** and DataContext work.
- [Project Analysis](../01-overview/project-analysis.md) — Delta Labs modules, contexts, and navigation.
