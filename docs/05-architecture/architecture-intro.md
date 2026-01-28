---
sidebar_position: 1
---

# Architecture

System design, AI routing, layers, and data flow.

## Documents

### [AI Routing & Navigation](./ai-routing.md)
How the AI layer interprets user input and drives navigation via events and routing.

**Audience**: Backend and frontend developers  
**Focus**: BotChat, aiNavigate, backend routing, event payloads

### [System Layers](./system-layers.md)
Layered architecture: User → AI → Backend → Frontend → Database → Components.

**Audience**: All developers, architects  
**Focus**: Layer responsibilities, communication, scalability

### [Data Flow & Table Population](./data-flow.md)
How data moves from database through API and DataContext to components.

**Audience**: Frontend and backend developers  
**Focus**: DataContext, update_data, queries, tables

## 🏗️ Overview

Delta Labs uses a **layered architecture** so that:

- **User input** (e.g. BotChat) is processed by the **AI layer**, which emits navigation and UI events.
- The **backend** validates requests, talks to the database, and returns structured data.
- The **frontend** uses **DataContext** and conditional rendering to show the right views and data.

Understanding [AI Routing](./ai-routing.md), [System Layers](./system-layers.md), and [Data Flow](./data-flow.md) will help you work across the stack and extend the platform.
