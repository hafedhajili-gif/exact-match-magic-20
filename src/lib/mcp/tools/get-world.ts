import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { WORLDS } from "../data";
import { cacheKey, memoize } from "../cache";

export default defineTool({
  name: "get_world",
  title: "Get world details",
  description:
    "Return the full description of one immersive YUME world — its atmosphere, soundtrack and recommended food & drink pairing.",
  inputSchema: {
    slug: z
      .string()
      .min(1)
      .describe("World slug. One of: sakura, tokyo-neon, zen-forest, aquarium, kyoto, galaxy."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const normalized = slug.trim().toLowerCase();
    return memoize(cacheKey("get_world", { slug: normalized }), () => {
      const world = WORLDS.find((w) => w.slug === normalized);
      if (!world) {
        return {
          content: [
            {
              type: "text",
              text: `No world with slug "${slug}". Available: ${WORLDS.map((w) => w.slug).join(", ")}.`,
            },
          ],
          isError: true,
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(world, null, 2) }],
        structuredContent: { world },
      };
    });
  },
});