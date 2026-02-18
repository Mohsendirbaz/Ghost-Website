# 📋 n8n Workflow Template: SL Surrogate Handler

# n8n Workflow: SL Surrogate Handler

This page provides the detailed n8n workflow configuration for the stochastic AI pipeline.

---

## Workflow Overview

**Name:** `SL-Surrogate-Handler`

**Trigger:** Webhook from Notion Automation

**Output:** Updated Notion task + Created Asana task with AI routing

---

## Node Configuration

### Node 1: Webhook Trigger

**Type:** Webhook

**Settings:**

- Method: POST
- Path: `/webhook/sl-surrogate-handler`
- Authentication: None (use secret token in production)
- Response Mode: Immediately

**Expected Payload:**

```json
{
  "task_id": "abc123-notion-page-id",
  "task_name": "Add quantitative comparison table",
  "new_status": "Needs Review",
  "old_status": "Not Started",
  "technical_core_url": "[invariant_bridge_analysis](invariant_bridge_analysis%202b1f832e52ca802f9bc4ebd1c1dc25d9.md)",
  "draft_url": "[Samsung initial draft](Samsung%20initial%20draft%202b1f832e52ca80968776f93eddaa5420.md)",
  "original_roadmap_url": "...",
  "timestamp": "2025-11-20T16:25:00Z"
}
```

---

### Node 2: Fetch Technical Core (Notion API)

**Type:** HTTP Request

**Settings:**

- Method: GET
- URL: [`https://api.notion.com/v1/blocks/https://www.notion.so/2b1f832e52ca802f9bc4ebd1c1dc25d9/children`](https://api.notion.com/v1/blocks/https://www.notion.so/2b1f832e52ca802f9bc4ebd1c1dc25d9/children)
- Authentication: Bearer Token
    - Token: `$env.NOTION_API_TOKEN`
- Headers:
    - `Notion-Version`: `2022-06-28`

**Parameters:**

```jsx
{
  page_size: 100
}
```

**Output:** Store in variable `technical_core_blocks`

---

### Node 3: Extract Technical Core Text

**Type:** Function

**Code:**

```jsx
const blocks = $input.item.json.results;
let text_content = "";

for (const block of blocks) {
  if (block.type === "paragraph" && [block.paragraph.rich](http://block.paragraph.rich)_text) {
    const paragraph_text = [block.paragraph.rich](http://block.paragraph.rich)_text
      .map(rt => rt.plain_text)
      .join("");
    text_content += paragraph_text + "\n\n";
  }
  if (block.type === "heading_2" && block.heading_[2.rich](http://2.rich)_text) {
    const heading_text = block.heading_[2.rich](http://2.rich)_text
      .map(rt => rt.plain_text)
      .join("");
    text_content += "## " + heading_text + "\n\n";
  }
  // Add other block types as needed
}

// Truncate to 4000 chars for LLM context
if (text_content.length > 4000) {
  text_content = text_content.substring(0, 4000) + "...";
}

return {
  json: {
    technical_core_text: text_content
  }
};
```

---

### Node 4: Fetch Draft Content (Notion API)

**Type:** HTTP Request

**Settings:**

- Method: GET
- URL: [`https://api.notion.com/v1/blocks/https://www.notion.so/2b1f832e52ca80968776f93eddaa5420/children`](https://api.notion.com/v1/blocks/https://www.notion.so/2b1f832e52ca80968776f93eddaa5420/children)
- Authentication: Bearer Token
- Headers: Same as Node 2

**Output:** Store in variable `draft_blocks`

---

### Node 5: Extract Draft Text

**Type:** Function

**Code:** (Same pattern as Node 3, extract text from blocks)

---

### Node 6: Build AI Evaluation Prompt

**Type:** Function

**Code:**

```jsx
const task_name = $('Webhook').item.json.body.task_name;
const technical_text = $('Extract Technical Core Text').item.json.technical_core_text;
const draft_text = $('Extract Draft Text').item.json.draft_text;

const prompt = `You are evaluating a task for the Samsung Invariant Bridge Framework pitch letter.

**Task to Evaluate:**
"${task_name}"

**Technical Foundation (from invariant_bridge_analysis):**
${technical_text}

**Current Draft State (from Samsung initial draft):**
${draft_text}

**Evaluation Criteria:**

1. **Credibility (0-100):** Does this task align with the rigorous mathematical validation and empirical claims in the technical core? Will executing this task strengthen or weaken the scientific credibility of the pitch?

2. **Coherency (0-100):** Does this task maintain consistency with the draft's current narrative structure, tone, and positioning? Will it fit seamlessly or create discontinuity?

3. **Risk Level (Low/Medium/High):** What is the potential for this task to introduce errors, overstatements, or weaken the pitch's persuasiveness?

**Required Output (JSON only, no explanation):**
{
  "credibility": <0-100>,
  "coherency": <0-100>,
  "overall_confidence": <average of credibility and coherency>,
  "risk_level": "Low" | "Medium" | "High",
  "reasoning": "<2-3 sentence explanation>",
  "routing_recommendation": "Auto-Approve" | "Manual Review" | "Flagged"
}
`;

return {
  json: {
    prompt: prompt
  }
};
```

---

### Node 7: Call AI (Claude API)

**Type:** HTTP Request

**Settings:**

- Method: POST
- URL: [`https://api.anthropic.com/v1/messages`](https://api.anthropic.com/v1/messages)
- Authentication: Header Auth
    - Name: `x-api-key`
    - Value: `$env.ANTHROPIC_API_KEY`
- Headers:
    - `anthropic-version`: `2023-06-01`
    - `Content-Type`: `application/json`

**Body:**

```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 1024,
  "temperature": 0.3,
  "messages": [
    {
      "role": "user",
      "content": "=$('Build AI Evaluation Prompt').item.json.prompt"
    }
  ]
}
```

**Output:** AI response with evaluation JSON

---

### Node 8: Parse AI Response

**Type:** Function

**Code:**

```jsx
const ai_response = $input.item.json.content[0].text;

// Extract JSON from response (may be wrapped in markdown)
const json_match = ai_response.match(/\{[\s\S]*\}/);
if (!json_match) {
  throw new Error("AI did not return valid JSON");
}

const evaluation = JSON.parse(json_match[0]);

return {
  json: {
    credibility: evaluation.credibility,
    coherency: evaluation.coherency,
    overall_confidence: evaluation.overall_confidence,
    risk_level: evaluation.risk_level,
    reasoning: evaluation.reasoning,
    routing_recommendation: evaluation.routing_recommendation,
    full_evaluation_json: JSON.stringify(evaluation, null, 2)
  }
};
```

---

### Node 9: Stochastic Routing Decision

**Type:** Function

**Code:**

```jsx
const confidence = $input.item.json.overall_confidence;
const risk = $input.item.json.risk_level;
const ai_recommendation = $input.item.json.routing_recommendation;

let final_routing;

// Deterministic thresholds
if (confidence >= 85 && risk === "Low") {
  final_routing = "Auto-Approve";
  console.log(`High confidence (${confidence}) + Low risk → Auto-Approve`);
} 
else if (confidence < 50 || risk === "High") {
  final_routing = "Flagged";
  console.log(`Low confidence (${confidence}) or High risk → Flagged`);
} 
else {
  // STOCHASTIC ZONE: 50 <= confidence < 85, Medium risk
  const random_value = Math.random() * 100;
  
  // Probability of auto-approve scales linearly with confidence
  // At confidence=50: 0% auto-approve
  // At confidence=85: 70% auto-approve
  const auto_approve_threshold = ((confidence - 50) / 35) * 70;
  
  if (random_value < auto_approve_threshold) {
    final_routing = "Auto-Approve";
    console.log(`Stochastic: confidence=${confidence}, random=${random_value.toFixed(2)}, threshold=${auto_approve_threshold.toFixed(2)} → Auto-Approve`);
  } else {
    final_routing = "Manual Review";
    console.log(`Stochastic: confidence=${confidence}, random=${random_value.toFixed(2)}, threshold=${auto_approve_threshold.toFixed(2)} → Manual Review`);
  }
}

return {
  json: {
    final_routing_decision: final_routing,
    confidence_score: confidence,
    risk_level: risk,
    stochastic_random: random_value,
    decision_rationale: `Confidence: ${confidence}, Risk: ${risk}, Route: ${final_routing}`
  }
};
```

---

### Node 10: Update Notion Surrogate

**Type:** HTTP Request

**Settings:**

- Method: PATCH
- URL: [`https://api.notion.com/v1/pages/=$('Webhook').item.json.body.task_id`](https://api.notion.com/v1/pages/=$('Webhook').item.json.body.task_id)
- Authentication: Bearer Token
- Headers: Same as Node 2

**Body:**

```json
{
  "properties": {
    "AI Feedback": {
      "rich_text": [
        {
          "text": {
            "content": "=$('Parse AI Response').item.json.full_evaluation_json"
          }
        }
      ]
    },
    "Confidence Score": {
      "number": "=$('Parse AI Response').item.json.overall_confidence"
    },
    "Routing Decision": {
      "select": {
        "name": "=$('Stochastic Routing Decision').[item.json.final](http://item.json.final)_routing_decision"
      }
    },
    "Webhook Timestamp": {
      "date": {
        "start": "=$now"
      }
    }
  }
}
```

---

### Node 11: Create Asana Task

**Type:** HTTP Request

**Settings:**

- Method: POST
- URL: [`https://app.asana.com/api/1.0/tasks`](https://app.asana.com/api/1.0/tasks)
- Authentication: Bearer Token
    - Token: `$env.ASANA_PAT`
- Headers:
    - `Content-Type`: `application/json`

**Body:**

```json
{
  "data": {
    "name": "=$('Webhook').item.json.body.task_name",
    "notes": "**AI Evaluation**\n\n• Credibility: =$('Parse AI Response').item.json.credibility/100\n• Coherency: =$('Parse AI Response').item.json.coherency/100\n• Overall Confidence: =$('Parse AI Response').item.json.overall_confidence%\n• Risk Level: =$('Parse AI Response').item.json.risk_level\n\n**Reasoning:** =$('Parse AI Response').item.json.reasoning\n\n**Notion Task:** =$('Webhook').item.json.body.notion_page_url",
    "projects": ["<YOUR_ASANA_PROJECT_GID>"],
    "custom_fields": {
      "<CONFIDENCE_SCORE_FIELD_GID>": "=$('Parse AI Response').item.json.overall_confidence",
      "<ROUTING_DECISION_FIELD_GID>": "=$('Stochastic Routing Decision').[item.json.final](http://item.json.final)_routing_decision"
    }
  }
}
```

**Output:** Asana task object with `gid` and `permalink_url`

---

### Node 12: Update Notion with Asana URL

**Type:** HTTP Request

**Settings:**

- Method: PATCH
- URL: [`https://api.notion.com/v1/pages/=$('Webhook').item.json.body.task_id`](https://api.notion.com/v1/pages/=$('Webhook').item.json.body.task_id)
- Authentication: Bearer Token

**Body:**

```json
{
  "properties": {
    "Asana Task URL": {
      "url": "=$('Create Asana Task').[item.json.data](http://item.json.data).permalink_url"
    }
  }
}
```

---

### Node 13: Error Handler (Optional)

**Type:** Function (On Error)

**Code:**

```jsx
// Send Slack notification or email on failure
const error_msg = $input.item.json.error || "Unknown error";
const task_name = $('Webhook').item.json.body.task_name || "Unknown task";

return {
  json: {
    error_summary: `SL Surrogate Handler FAILED\nTask: ${task_name}\nError: ${error_msg}\nTimestamp: ${new Date().toISOString()}`
  }
};
```

---

## Testing

### Manual Test Payload

Use this in n8n's "Execute Workflow" to test:

```json
{
  "body": {
    "task_id": "<test-notion-page-id>",
    "task_name": "Test: Add benchmark comparison table",
    "new_status": "Needs Review",
    "old_status": "Not Started",
    "technical_core_url": "[invariant_bridge_analysis](invariant_bridge_analysis%202b1f832e52ca802f9bc4ebd1c1dc25d9.md)",
    "draft_url": "[Samsung initial draft](Samsung%20initial%20draft%202b1f832e52ca80968776f93eddaa5420.md)",
    "timestamp": "2025-11-20T16:30:00Z"
  }
}
```

### Expected Behavior

1. Webhook receives payload
2. Technical Core and Draft fetched
3. AI evaluation completes in ~5-10 seconds
4. Notion Surrogate updated with AI feedback
5. Asana task created with routing decision
6. Notion updated with Asana URL

---

## Environment Variables (Required)

In n8n settings → Environment:

```bash
NOTION_API_TOKEN=secret_XXXXXXXXXX
ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXX
ASANA_PAT=YOUR_ASANA_PERSONAL_ACCESS_TOKEN
```

---

## Monitoring & Logs

- Enable n8n execution logging
- Monitor webhook delivery rate
- Track AI evaluation latency
- Alert on consecutive failures

---

**Last Updated:** 2025-11-20 by Notion AI