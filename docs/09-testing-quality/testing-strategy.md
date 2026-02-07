---
title: Testing Strategy
sidebar_position: 0
---

# Testing Strategy

How we test: unit, integration, e2e, and quality gates. Quality doesn't depend on people.

---

## What to Test

- **Critical paths** — auth, enrollment, payment-related flows, and any logic that affects data correctness.
- **Utilities** — validators, formatters, and shared business logic are good candidates for unit tests.
- **Components** — focus on behavior (user actions, conditional rendering) rather than implementation details.

---

## Practices

- **Deterministic tests** — avoid flakiness from timers, randomness, or global state.
- **Descriptive names** — test names should describe scenario and expected outcome.
- **Setup/teardown** — keep test data and mocks isolated so tests can run in any order.

---

## Example (conceptual)

```typescript
// Example: testing a validation utility
import { validateEmail } from './validation';

describe('validateEmail', () => {
  it('returns true for valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });
  it('returns false for empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});
```

Use your project's test runner and conventions (e.g. Jest, Vitest) and align with [Coding Standards](../04-development-standards/coding-standards).

---

## 📖 See Also

- [Unit Testing](./unit-testing) — standards and patterns for unit tests.
- [Integration Testing](./integration-testing) — API and service integration tests.
- [E2E Testing](./e2e-testing) — end-to-end tests.
- [Quality Gates](./quality-gates) — what must pass before merge or deploy.
