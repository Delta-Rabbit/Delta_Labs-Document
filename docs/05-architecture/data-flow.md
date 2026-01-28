---
sidebar_position: 4
---

# Data Flow & Table Population

> **Focus**: How data gets from backend to tables and lists in the UI  
> **Relevant to**: DataContext, update_data, lists, filters, pagination

---

## 📋 Overview

Data flows **from the database through the backend API to the frontend**, where it is stored in **context** (e.g. CourseContext, or a generic DataContext) and then consumed by components (tables, cards, lists). This flow is often triggered by user or AI actions (e.g. “show my courses”, “filter by level”).

---

## 🔄 Data Population Flow

1. **User or AI** triggers a need for data (navigation, filter change, search).
2. **Frontend** calls the backend API (e.g. `GET /courses`, or an AI endpoint that returns data).
3. **Backend** validates the request, optionally applies auth, runs business logic, and queries the database.
4. **Backend** returns JSON (e.g. `{ items, total, page }` or an **update_data**-style payload).
5. **Frontend** updates **context** (e.g. `dispatch({ type: 'SET_DATA', payload: response.data })`).
6. **Components** that use that context re-render and show the new data (tables, lists, cards).

---

## 📦 Context and Components (Delta Labs)

From the [Project Analysis](../01-overview/project-analysis.md):

- **CourseContext** (and similar module contexts) hold:
  - List data (e.g. enrolled courses, search results).
  - Loading and error state.
- **Tables and lists** read from context (or props fed from context) and render rows/cards.
- **Data fetch** is typically done in the context provider or in a hook used by the provider (e.g. `fetchEnrolledCourses()`).

So the “table population” path is:

```text
API response → Context state → Components (e.g. table, list) → UI
```

---

## 🗄️ Database and API Contract

- **Schema**: Collections/tables for courses, enrollments, users, labs, etc. Design indexes for filters (e.g. by level, category, date).
- **Queries**: Use filters, sort, and pagination (e.g. `limit` + `skip` or cursor) so responses stay bounded.
- **Projection**: Return only fields the frontend needs to keep payloads small.
- **Naming**: Keep naming consistent between backend and frontend (e.g. same field names in **update_data** and in context types).

---

## ⚡ Performance Practices

| Practice | Description |
|----------|-------------|
| **Indexes** | Add indexes on frequently filtered/sorted fields (e.g. level, category, createdAt). |
| **Pagination** | Use fixed page size (e.g. 20–50 items) and document it in the API. |
| **Caching** | Cache list responses where appropriate (e.g. in-memory, Redis, or SWR/React Query on the frontend). |
| **Projection** | Select only needed columns/fields in DB queries. |

---

## 📖 See Also

- [AI Routing & Navigation](./ai-routing.md) — how user/AI actions trigger data needs.
- [System Layers](./system-layers.md) — where backend and frontend sit in the architecture.
- [API Reference](../06-api-reference/api-reference-intro.md) — endpoint contracts and conventions.
- [Project Analysis](../01-overview/project-analysis.md) — contexts and module structure.
