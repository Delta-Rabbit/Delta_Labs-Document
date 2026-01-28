---
sidebar_position: 3
---

# System Layers & Architecture

> **Focus**: Layered structure and responsibilities  
> **Relevant to**: Scaling, clarity of boundaries, onboarding

---

## 📋 Overview

Delta Labs is built in **layers**: each layer has a clear responsibility and talks to neighboring layers through well-defined interfaces. This keeps the codebase understandable and easier to extend.

---

## 🏗️ Layer Diagram (Conceptual)

Data and requests flow roughly like this:

```
┌─────────────────────────────────────────────────────────────────┐
│  User Layer                                                      │
│  👤 User input, BotChat, tabs, navigation, forms                  │
└─────────────────────────────┬───────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│  AI / Interpretation Layer (when used)                           │
│  🤖 Intent, entity extraction, routing decisions                  │
└─────────────────────────────┬───────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│  Backend / API Layer                                              │
│  🚪 Validation, auth, business logic, rate limiting                │
└─────────────────────────────┬───────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│  Database Layer                                                   │
│  💾 Persistence (e.g. courses, enrollments, users)                │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Frontend (React)                                                 │
│  📱 Components, Context API, TabContext, DataContext, routing     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 Layer Responsibilities

### User layer

- Text input in BotChat, clicks, form submits.
- Tab and navigation actions (e.g. open course, switch module).
- Consumes UI rendered by the frontend.

### AI / interpretation layer

- Parses natural language (e.g. “show my courses”, “filter by level”).
- Produces structured intent and parameters (target module, filters, sort).
- Often implemented in the backend or a dedicated service that the backend calls.

### Backend / API layer

- **Auth** (e.g. JWT, sessions).
- **Validation** and sanitization of requests.
- **Business logic** (enrollment, permissions, etc.).
- **Rate limiting** and logging.
- Calls DB or external services and returns JSON (e.g. navigation hints, **update_data**).

### Database layer

- Stores courses, users, enrollments, labs, etc.
- Indexing and query design for performance.
- Backups, replication, and operational practices as the product grows.

### Frontend (React)

- **Context API**: Theme, Auth, Tab, AI, and module-specific data (e.g. CourseContext).
- **Components**: BotChat, DataTables, forms, modals, layout.
- **Conditional rendering** based on route, permissions, and context state.
- Styling via design tokens and Tailwind (see [Design System](../02-design-system/design-system.md)).

---

## 🔄 Communication Between Layers

| From       | To         | Typical mechanism   | Data format   |
|-----------|------------|----------------------|---------------|
| User      | Frontend   | UI events            | Component state |
| Frontend  | Backend    | HTTP (e.g. fetch)    | JSON          |
| Backend   | AI service | Internal HTTP / RPC  | JSON          |
| Backend   | Database   | DB client / ORM     | BSON / rows   |
| Backend   | Frontend   | HTTP response        | JSON (e.g. update_data) |
| Frontend  | Components | Context + props     | JS objects    |

---

## 📈 Scalability and Evolution

As the platform grows, you can:

- **Backend**: Add read replicas, caching (e.g. Redis), and rate limiting per user/endpoint.
- **Frontend**: Code-split by route or module, lazy-load heavy components.
- **AI**: Offload heavy interpretation to a separate service and queue if needed.
- **Database**: Index hot queries, introduce pagination and constraints, plan sharding if required.

Keeping layer boundaries clear makes it easier to add these without breaking the rest of the system.

---

## 📖 See Also

- [AI Routing & Navigation](./ai-routing.md) — how the AI layer drives navigation.
- [Data Flow & Table Population](./data-flow.md) — how data reaches the UI.
- [Project Analysis](../01-overview/project-analysis.md) — Delta Labs modules, contexts, and tech stack.
