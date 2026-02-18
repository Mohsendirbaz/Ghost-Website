-- SQL Schema for Notion Block URL Indexing

-- Create the notion_blocks table
CREATE TABLE IF NOT EXISTS notion_blocks (
    -- Primary key
    block_id VARCHAR(36) PRIMARY KEY,
    
    -- Block identification
    block_id_no_hyphens VARCHAR(32) NOT NULL UNIQUE,
    block_url TEXT NOT NULL,
    
    -- Page information
    page_id VARCHAR(36) NOT NULL,
    page_title TEXT NOT NULL,
    page_url TEXT NOT NULL,
    
    -- Block metadata
    block_type VARCHAR(50) NOT NULL,
    block_content TEXT,
    has_children BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_time TIMESTAMP,
    last_edited_time TIMESTAMP,
    indexed_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for fast lookups
CREATE INDEX idx_block_id_no_hyphens ON notion_blocks(block_id_no_hyphens);
CREATE INDEX idx_page_id ON notion_blocks(page_id);
CREATE INDEX idx_block_type ON notion_blocks(block_type);
CREATE INDEX idx_last_edited ON notion_blocks(last_edited_time DESC);

-- Create full-text search index on content
CREATE INDEX idx_block_content_fts ON notion_blocks USING gin(to_tsvector('english', block_content));

-- Optional: Create a view for easy querying
CREATE OR REPLACE VIEW notion_blocks_readable AS
SELECT 
    block_id,
    block_url,
    page_title,
    page_url,
    block_type,
    LEFT(block_content, 100) as content_preview,
    has_children,
    last_edited_time,
    indexed_at
FROM notion_blocks
ORDER BY last_edited_time DESC;

-- Function to search blocks by content
CREATE OR REPLACE FUNCTION search_notion_blocks(search_query TEXT)
RETURNS TABLE (
    block_url TEXT,
    page_title TEXT,
    block_type VARCHAR(50),
    content_snippet TEXT,
    relevance FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        nb.block_url,
        nb.page_title,
        nb.block_type,
        LEFT(nb.block_content, 200) as content_snippet,
        ts_rank(to_tsvector('english', nb.block_content), plainto_tsquery('english', search_query)) as relevance
    FROM notion_blocks nb
    WHERE to_tsvector('english', nb.block_content) @@ plainto_tsquery('english', search_query)
    ORDER BY relevance DESC
    LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- Example usage:
-- SELECT * FROM search_notion_blocks('your search term');
