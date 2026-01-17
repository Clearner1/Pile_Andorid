# Data Migration Strategy (Desktop ➜ Android)

This plan focuses on importing existing desktop piles into the Android app with
minimal friction.

## Import entry points
1. **Manual import**
   - User selects a folder (exported `Piles` directory or a single pile folder).
   - Android copies the files into app storage.
2. **Cloud-based transfer (future)**
   - Sync via a cloud provider or a dedicated backend (not required in Phase 1).

## Import flow (manual)
1. User chooses a folder from Android’s file picker.
2. App validates structure:
   - `piles.json` present, or
   - a pile folder with `index.json` and year/month subfolders.
3. App copies the selected folder into app storage:
   - `/data/data/<app>/files/piles/<PileName>/...`
4. App normalizes paths:
   - Convert absolute desktop paths in `piles.json` to internal app paths.
5. App validates data integrity:
   - Rebuild `index.json` if missing or invalid.
   - Verify attachments and remove broken references.

## Export flow (Android ➜ desktop)
1. Bundle a selected pile directory.
2. Provide a share/export action to zip and export.

## Migration constraints
- HTML content is embedded inside Markdown; preserve as-is.
- Attachments are stored relative to the pile folder.
- Replies use relative paths to other Markdown files.

## Validation checklist
- Can parse all Markdown files using gray-matter compatible parser.
- Can open posts with replies (reply paths resolve).
- Can display attachments using internal storage URI mapping.

## Android storage recommendations
- Store piles under app-specific storage to simplify permissions.
- Keep a local database table to map pile names to internal paths.
