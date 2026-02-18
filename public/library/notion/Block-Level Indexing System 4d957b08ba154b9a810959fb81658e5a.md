# Block-Level Indexing System

> **Purpose:** External tooling to extract and index Notion block-level URLs-solving the limitation where the Notion AI API doesn't expose individual block URLs.
> 

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        NOTION WORKSPACE                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                         │
│  │  Page   │  │  Page   │  │  Page   │  ...                    │
│  │ blocks  │  │ blocks  │  │ blocks  │                         │
│  └────┬────┘  └────┬────┘  └────┬────┘                         │
└───────┼────────────┼────────────┼──────────────────────────────┘
        │            │            │
        ▼            ▼            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      n8n WORKFLOWS                              │
│  ┌──────────────────────┐  ┌──────────────────────────────┐    │
│  │  Block Extractor     │  │  Indexer + Unfurl            │    │
│  │  (on-demand webhook) │  │  (scheduled every 6 hours)   │    │
│  └──────────┬───────────┘  └──────────────┬───────────────┘    │
└─────────────┼─────────────────────────────┼────────────────────┘
              │                             │
              ▼                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      POSTGRESQL                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  notion_blocks                                           │   │
│  │  • block_id (PK)        • block_url                     │   │
│  │  • page_id              • block_type                    │   │
│  │  • page_title           • block_content                 │   │
│  │  • has_children         • timestamps                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│  + GIN full-text search index                                   │
│  + search_notion_blocks() function                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Components

### 1. PostgreSQL Schema

<aside>
🗄️

**File:** `notion-blocks-schema.sql`

</aside>

| Element | Description |
| --- | --- |
| `notion_blocks` table | Primary storage for all indexed blocks |
| `block_id` | UUID with hyphens (primary key) |
| `block_id_no_hyphens` | 32-char hex for URL anchors |
| `block_url` | Full URL: [`notion.so/{pageId}#{blockId}`](http://notion.so/{pageId}#{blockId}) |
| `block_type` | heading_1, paragraph, table, equation, etc. |
| `block_content` | Extracted text content (up to 500 chars) |
| GIN index | Full-text search on `block_content` |
| `search_notion_blocks()` | Function returning ranked results |

**Key indexes:**

- `idx_block_id_no_hyphens` - fast anchor lookups
- `idx_page_id` - filter by parent page
- `idx_block_type` - filter by type
- `idx_last_edited` - sort by recency
- `idx_block_content_fts` - full-text search

---

### 2. n8n Workflow: Block Extractor

<aside>
⚡

**File:** `notion-block-extractor.json`

**Trigger:** Webhook (on-demand)

</aside>

**Flow:**

1. **Webhook Trigger** - `POST /notion-blocks` with `{ url: "..." }`
2. **Extract Page ID** - Parse Notion URL patterns
3. **Get All Blocks** - Notion API `blocks.children.list`
4. **Format Block URLs** - Generate `pageId#blockId` URLs
5. **Respond** - Return JSON array of block data

**Use case:** Ad-hoc extraction when you need block URLs for a specific page.

---

### 3. n8n Workflow: Indexer + Unfurl

<aside>
🔄

**File:** `notion-block-indexer-unfurl.json`

**Trigger:** Schedule (every 6 hours) + Webhook

</aside>

### Indexing Flow

1. **Schedule Trigger** - Runs every 6 hours
2. **Get All Pages** - From configured database
3. **Get Page Blocks** - For each page
4. **Process Blocks** - Extract metadata + content
5. **Store in Postgres** - UPSERT with conflict handling

### Unfurl Flow

1. **Unfurl Webhook** - `POST /notion-block-unfurl`
2. **Extract Block ID** - From URL anchor `#blockId`
3. **Query Block Data** - PostgreSQL lookup
4. **Format Response** - Return block card for preview

---

## Block URL Format

```
[https://notion.so/{pageId}#{blockIdNoHyphens}](https://notion.so/{pageId}#{blockIdNoHyphens})
                    │          │
                    │          └── 32 hex chars (no hyphens)
                    └── 32 hex chars (no hyphens)
```

**Example:**

```
[https://notion.so/2b5f832e52ca810995b2c0ff34d09a56#a1b2c3d4e5f6789012345678abcdef01](https://notion.so/2b5f832e52ca810995b2c0ff34d09a56#a1b2c3d4e5f6789012345678abcdef01)
```

---

## Setup Requirements

<aside>
⚙️

**Prerequisites**

</aside>

- [ ]  PostgreSQL database
- [ ]  n8n instance (self-hosted or cloud)
- [ ]  Notion API integration with read access
- [ ]  Environment variables:
    - `NOTION_PAGES_DATABASE_ID` - Database containing pages to index
    - Notion API credentials
    - PostgreSQL credentials

---

## Content Extraction Logic

| Block Type | Extracted Content |
| --- | --- |
| `paragraph`, `bulleted_list_item`, `numbered_list_item` | Rich text → plain text |
| `heading_1`, `heading_2`, `heading_3` | Heading text |
| `table` | "Table: N columns" |
| `equation` | "Equation: {expression}" |
| `code` | "Code ({language}): {snippet}" |
| `child_page` | "Child page: {title}" |
| `child_database` | "Database: {title}" |
| `divider` | "---" |

---

## Integration with Entity Catalog

This external indexing system complements the [](notion_blocks_db%20a0f62397572e417eb1cfa09ea860b8f2.md) we created earlier:

| Catalog (Notion-native) | Block Indexer (External) |
| --- | --- |
| Page-level entities only | Block-level granularity |
| Manual/AI-assisted population | Automated every 6 hours |
| Stored in Notion database | Stored in PostgreSQL |
| No full-text search | GIN-indexed FTS |
| Scale 0-3 hierarchy | Flat block index |

**Together:** Page-level structure in Notion + block-level deep linking via external index.