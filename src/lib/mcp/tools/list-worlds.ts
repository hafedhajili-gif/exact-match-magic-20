import { defineTool } from "@lovable.dev/mcp-js";
import { WORLDS } from "../data";

export default defineTool({
  name: "list_worlds",
  title: "List immersive worlds",
  description:
    "List every themed immersive world (LED universe) available at YUME Café · Lounge in Sousse, Tunisia. Returns slug, name, tagline and accent color for each world.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const summary = WORLDS.map((w) => ({
      slug: w.slug,
      name: w.name,
      tag: w.tag,
      tagline: w.tagline,
      color: w.color,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: { worlds: summary },
    };
  },
});