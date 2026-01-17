# Phase 1 → Phase 6 Execution Plan

This plan converts the Electron app into a dedicated Android app, using the
Phase 0 inventory as the source of truth.

## Phase 1 — Platform decision + architecture
**Goal:** Choose the Android tech stack and define the architecture.

Deliverables:
- Finalize the stack (React Native vs WebView-based).
- Define module boundaries:
  - `core/` (data parsing, indexing, search)
  - `ui/` (mobile UI)
  - `platform/` (storage, file access, permissions)
- Confirm editor solution:
  - Native editor with HTML serialization, or
  - WebView-based editor to preserve TipTap content.

Exit criteria:
- Architecture diagram + decision document.

## Phase 2 — Core data layer extraction
**Goal:** Build a reusable core layer that can parse and write Pile data.

Deliverables:
- Parser for Markdown + frontmatter.
- Index regeneration logic.
- File I/O abstraction (so desktop and Android can share logic).

Exit criteria:
- Can load a pile folder and list posts.

## Phase 3 — Android app scaffold
**Goal:** Create the Android project with navigation and basic layout.

Deliverables:
- App shell with navigation (home, pile list, editor).
- Basic settings screen (for import/export).
- Local storage setup (internal files dir).

Exit criteria:
- App builds and runs on an emulator/device.

## Phase 4 — Editor + core interactions
**Goal:** Ship a usable editor and post lifecycle.

Deliverables:
- Editor supports HTML content (consistent with desktop).
- Create/edit/delete posts.
- Reply threading (link replies to parent posts).

Exit criteria:
- Posts can be created, updated, and browsed end-to-end.

## Phase 5 — Migration + indexing
**Goal:** Enable desktop-to-Android import and maintain search.

Deliverables:
- Import flow using Android file picker.
- Index regeneration on import.
- Tag and highlight support.

Exit criteria:
- A desktop pile can be imported and browsed in Android.

## Phase 6 — Polishing + release prep
**Goal:** Prepare for alpha/beta release.

Deliverables:
- UX polish (keyboard handling, gestures, theme).
- Media handling and caching.
- Performance tests for large piles.
- Packaging/signing instructions.

Exit criteria:
- Release candidate APK/AAB.
