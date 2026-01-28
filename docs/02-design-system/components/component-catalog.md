---
title: Component Catalog
sidebar_position: 1
---

# Component Catalog

When you design and ship a component in the Delta Labs app, **document it here**. This is the single place for all component documentation used by designers and developers.

---

## 📋 Purpose

- **One place** for every component’s doc: props, variants, examples, when to use.
- **Aligned with** [Design System standards](../design-system.md): build in the library first, then add a doc here.
- **Discoverable** via this catalog and the Design System section.

---

## 🗂️ How to Add a New Component

1. **Build** the component in the Delta Labs codebase (in `src/components/` or `theme/` per [Design System](../design-system.md)).
2. **Create** a doc in this folder: `docs/02-design-system/components/<component-name>.md`  
   Example: `button.md`, `modal.md`, `data-table.md`.
3. **Use** the [component doc template](./component-doc-template.md) so all components are documented in the same way.
4. **Add** a row for the component in the table below so it shows up in the catalog.

---

## 📦 Catalog Index

| Component | Level | Description | Doc |
|-----------|--------|-------------|-----|
| *(Add rows as you add components)* | Atom / Molecule / Organism / Template | One-line purpose | [Link](./component-name) |

**Levels**: Atom → Molecule → Organism → Template (see [Atomic Design](../design-system.md#1-atomic-design-principles)).

---

## 📖 See Also

- [Design System & Component Library Standards](../design-system.md) — how to build and structure components.
- [Design Tokens](../design-tokens.md) — colors, typography, spacing to use in components.
- [Component doc template](./component-doc-template.md) — use this when creating a new component doc.
