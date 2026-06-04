# 🧙‍♂️ Dungeon Desk

An interactive combat tracker designed for DM's to manage D&D combat encounters.

---

## ⚙️ Core Features (MVP)

### ⚔️ Combat System
* **Initiative sorting:** Automatically orders combatants by their initiative rolls.
* **Turn tracking:** Visual highlighting of the active turn with manual switching to the next combatant.
* **Combat wrap-up:** Resetting the combat state and generating random loot based on defeated NPCs.

### ❤️ HP & Condition Management
* Easy HP adjustments (+ / -).
* Quick conditions handling.
* NPC search directly from a database.

---

## 🏗️ Architecture & Performance

The application follows strict architectural standards to ensure clean code and avoid common performance issues:

* **Feature-Driven Development (FSD):** Code structured into standard layers (`shared`, `entities`, `features`, `pages`, etc.) with explicit Public APIs (`index.ts`) to avoid cross-imports.
* **Zustand Optimization:** Global state is kept thin. Heavy derived computations are isolated via custom selectors wrapped in `useShallow` to prevent redundant rerenders.
* **TanStack Query:** Used for server state management. It caches the NPC database, reducing network load to zero during user input.
* **Top Layer & Portals:** Custom toast notifications use a mix of **React Portals** and the **Native Popover API** so they render properly in the browser's top layer without colliding with anything else.
* **Single Source of Truth:** Debounced values are passed directly from the form state into the lookup hook, eliminating the need for cascading `useEffect` syncs.

---

## 👾 Tech Stack & Infrastructure

* **Core & Routing:** React, React Router
* **Languages & Styling:** TypeScript, SCSS Modules
* **Build Tool:** Vite
* **State Management:** Zustand, TanStack Query
* **Testing:** Vitest
* **Automation:** GitHub Actions (CI pipeline for linting and testing), Husky (pre-commit checks for branch names and staged files)

