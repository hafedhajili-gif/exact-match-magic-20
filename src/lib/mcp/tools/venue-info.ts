import { defineTool } from "@lovable.dev/mcp-js";
import { VENUE, WORLDS } from "../data";
import { cacheKey, memoize } from "../cache";

export default defineTool({
  name: "venue_info",
  title: "Venue info",
  description:
    "Return general information about YUME Café · Lounge in Sousse, Tunisia: concept, opening hours, reservation link and the list of themed worlds.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    return memoize(cacheKey("venue_info"), () => {
      const payload = { ...VENUE, worlds: WORLDS.map((w) => ({ slug: w.slug, name: w.name })) };
      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
        structuredContent: payload,
      };
    });
  },
});