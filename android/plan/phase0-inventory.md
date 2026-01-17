# Phase 0 Inventory (Editor + Data Migration Focus)

This inventory summarizes the existing desktop implementation so we can scope
the Android rewrite with minimal surprises. It focuses on editing experience
and data migration, with AI reflections deprioritized.

## Editor experience inventory

### Editing stack
- **TipTap + ProseMirror** is used as the rich text editor in the desktop app.
  The editor is configured with StarterKit, Typography, Link, Placeholder, and
  CharacterCount extensions.
- The editor updates content using HTML serialization (saved as HTML inside
  Markdown files).

### Editing behaviors
- **Autosave on explicit actions**: editor saves on Enter shortcut (custom
  extension) and on explicit button actions (post/update/reply).
- **Attachments**:
  - Paste/drop images are captured and stored as files on disk.
  - Images are stored in a year/month/media folder under the pile path.
- **Reply threads**:
  - Replies are stored as separate Markdown files, referenced in the parent
    post’s frontmatter.
- **Preview mode**:
  - Uneditable view renders HTML via `dangerouslySetInnerHTML`.

### Mobile implications
- TipTap is web-first; React Native will require:
  - A native rich-text editor or
  - A WebView-based editor for parity.
- Attachment flows must be redesigned for mobile file permissions and storage
  access.

## Data storage inventory

### Pile folder structure
- Desktop piles live under `~/Piles/`.
- Each pile is stored in its own directory; files are grouped by year and month.
- Attachments are stored under `/<year>/<month>/media/` within the pile.

### File formats
- **Posts are Markdown files** with frontmatter metadata (gray-matter).
- **Index** is stored as `index.json` per pile.
- **Piles config** is stored as `~/Piles/piles.json`.

### Key metadata fields (frontmatter)
- `title`, `createdAt`, `updatedAt`
- `attachments`, `tags`, `replies`
- `isReply`, `isAI`, `highlight`, `highlightColor`

## Migration risks to track
- Markdown + HTML payloads (editor content is HTML, not Markdown).
- Mixed path separators and absolute paths in desktop data.
- Large media files on mobile storage.
- Index regeneration time for large journals.

## Phase 0 outputs
- Finalize Android editor strategy (native vs WebView).
- Define data import/export flow.
- Document full data model (see `android/specs/data-model.md`).
