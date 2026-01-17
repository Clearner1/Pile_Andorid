# Editor Experience Reference

This document captures the editor behaviors and UX that should be preserved on
Android as much as possible.

## Core behaviors
- **Rich text entry** with HTML serialization.
- **Character count** limit (10,000 chars).
- **Placeholder text**: “What are you thinking?”
- **Enter to submit** for new posts/replies (custom extension).
- **Editable vs preview mode**: preview renders saved HTML.

## Attachments
- Paste/drop images attach to the current post.
- Attachments are stored as files on disk and referenced in frontmatter.
- Editor provides a media strip with horizontal drag-to-scroll.

## Replies
- Replies are separate posts stored as files.
- Parent post stores reply paths in `replies`.

## Mobile-specific considerations
- Attachment picking should use Android photo picker.
- Drag-to-scroll media strip should map to touch scroll.
- Enter-to-submit should be adapted to mobile keyboard action.
