# v2.0.1-dev acceptance checklist

This checklist preserves the project owner's 21-section `prompt-words.txt` as the acceptance baseline. A feature is complete only after implementation, server-side authorization where relevant, tests, and documentation.

## Platform and architecture
- [ ] Next.js + React + TypeScript application structure
- [ ] PostgreSQL 18 + Prisma schema, migrations, seed strategy
- [ ] Redis cache and WebSocket Pub/Sub
- [ ] S3-compatible object storage (OSS/COS); local uploads only for development
- [ ] Linux deployment, Nginx reverse proxy, compression and static caching
- [ ] Environment-based secrets; no credentials committed

## 1. Authentication and account lifecycle
- [ ] Email registration with six-digit SMTP verification codes, expiry, hashing, attempt limits and rate limits
- [ ] Gmail/Google and GitHub OAuth; QQ and NetEase support through explicitly configured providers/adapters
- [ ] Username validation: lowercase letters, digits, underscores; reserved routes blocked
- [ ] Password hashing, forgot/reset password
- [ ] Link/unlink OAuth identities and safe account merge rules
- [ ] Public browsing; authenticated commenting and likes
- [ ] Logout, account switching, deletion request with reason and admin approval
- [ ] On deletion, preserve notes/moments under a deleted-user system identity; remove other personal data/assets

## 2. Home and navigation
- [ ] Mizuki-inspired responsive glass navigation and hero
- [ ] Notes, resources, moments, anime, chat, about, search, notifications, locale, theme, profile
- [ ] Editable hero title/subtitle, profile card and external links
- [ ] Mobile glass-effect degradation and responsive sidebar

## 3. Notes
- [ ] Create/edit/delete notes; Markdown headings, code highlighting/copy, images, tags
- [ ] Author/avatar/timestamps and edited timestamp
- [ ] Comments, search, pinning, password-protected notes

## 4. Resource navigation
- [ ] Responsive resource cards with cover, title and outbound link
- [ ] Admin/editor CRUD as specified

## 5. Moments
- [ ] Create/edit/delete, repost, like, threaded replies
- [ ] Up to 15 images per post; 30 MB per image with client compression
- [ ] Image zoom, original download, password protection, pinning

## 6. Anime archive
- [ ] Admin-only create/edit/delete
- [ ] Cover, gallery, title, synopsis, release date and source

## 7. Chat rooms
- [ ] Official room and user-created rooms
- [ ] Categories, room name/avatar, open or invitation-code joining
- [ ] Text and emoji, quote replies, author/avatar/time
- [ ] Socket.IO + Redis Pub/Sub, online status and @mentions
- [ ] No private messages
- [ ] Automatically purge messages older than 180 days

## 8. About and contribution wall
- [ ] Developer and contributor cards/links
- [ ] Project origin, version, technologies, license/credits
- [ ] Full disclaimer

## 9. Comments
- [ ] BBS-style replies on notes/moments only; no private messages
- [ ] Edit/delete and sent/edited timestamps
- [ ] Deleted comments disappear from normal views

## 10. Search and tags
- [ ] Global search across supported content
- [ ] Category, tag and time sorting/filtering
- [ ] PostgreSQL full-text search or equivalent
- [ ] Clickable tags open filtered search

## 11. Localization and theme
- [ ] Chinese/English UI dictionaries; user-generated content remains unchanged
- [ ] Light/dark themes

## 12. Profile and personalization
- [ ] Profile route uses @username, not UUID
- [ ] Avatar, nickname, bio, business card, color, contact methods
- [ ] Show selected notes/moments and joined/created rooms
- [ ] Homepage likes: maximum 10 per user per day, reset at 04:00 server time

## 13. Notifications
- [ ] Comment replies, @mentions, room replies, likes, announcements and updates
- [ ] Click-through to the originating content
- [ ] Read/unread state and polling or SSE/WebSocket delivery

## 14. Asset lifecycle
- [ ] Max 30 MB; MIME/signature, dimensions and count validation
- [ ] Crop/resize, optimized images, zoom viewer and original download
- [ ] Asset table, content hash/deduplication, reference tracking
- [ ] Database transaction first, then object deletion; retry orphan cleanup

## 15. Homepage widgets and admin controls
- [ ] Announcements CRUD (admin only), cover, title, body, author/time, preview
- [ ] Sakura particle effect toggle (default on), based on supplied SakuraPetals component
- [ ] Pinned notes/moments
- [ ] Statistics and calendar; deduplicated visitor counts
- [ ] Live2D companion loaded client-side with next/dynamic and ssr:false
- [ ] Background image carousel and split/comparison hero effect
- [ ] Editable site logo, profile identity, backgrounds and hero copy
- [ ] Moderation queue and removal actions across supported publishing surfaces

## 16. Views and encryption
- [ ] View counts for notes, moments and announcements
- [ ] Daily deduplication using visitor fingerprint strategy and Redis
- [ ] Password-protected notes/moments with safe verification

## 17. Registration disclaimer
- [ ] First registration requires reading disclaimer
- [ ] At least 3 seconds before acceptance can be submitted
- [ ] Same disclaimer available from About

## 18. Account management and moderation
- [ ] Personalization, profile, account management and admin-only website settings
- [ ] Account deletion request reason, approve/reject workflow
- [ ] Preserve authored notes/moments while cleaning other account data/assets
- [ ] Admin moderation for content and rooms

## 19. Technical features and operations
- [ ] KaTeX, PhotoSwipe, SEO metadata, sitemap, OpenGraph
- [ ] Lazy loading, caching and Next.js ISR where appropriate
- [ ] Redis for hot data; Nginx compression/cache
- [ ] Auth.js/JWT and middleware plus server-side resource authorization
- [ ] Backup/restore, logging, rate limiting and security tests
- [ ] Windows local and Ubuntu VM deployment verification

## 20. Credits
- [ ] Credit Bilibili creator「松坂有希」 and link https://space.bilibili.com/701864046
- [ ] Explain inspiration/implementation references in About and README

## 21. Disclaimer
- [ ] Include all nine clauses from the owner's prompt-words.txt in About and first-registration flow

## Release gate
- [ ] All applicable checklist items implemented
- [ ] Database migrations and seed run cleanly
- [ ] Unit/integration/e2e tests pass
- [ ] Windows and Ubuntu deployment verified
- [ ] No secrets or personal credentials in repository
- [ ] README and deployment docs updated
- [ ] Only then merge `v1.0.1-dev` into `master`
