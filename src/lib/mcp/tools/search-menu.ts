import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { MENU } from "../data";

const CATEGORIES = Array.from(new Set(MENU.map((m) => m.category)));

export default defineTool({
  name: "search_menu",
  title: "Search the menu",
  description:
    "Search the YUME menu (drinks, sushi, desserts). Optionally filter by category or a free-text query matched against name and description. Prices are in Tunisian Dinar (DT).",
  inputSchema: {
    query: z.string().trim().optional().describe("Free-text keyword, e.g. \"matcha\" or \"vegan\"."),
    category: z
      .string()
      .trim()
      .optional()
      .describe(`Optional category filter. One of: ${CATEGORIES.join(", ")}.`),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, category }) => {
    const q = query?.toLowerCase();
    const cat = category?.toLowerCase();
    const items = MENU.filter((m) => {
      if (cat && m.category.toLowerCase() !== cat) return false;
      if (q && !(`${m.name} ${m.description}`.toLowerCase().includes(q))) return false;
      return true;
    });
    return {
      content: [
        {
          type: "text",
          text: items.length
            ? JSON.stringify(items, null, 2)
            : "No menu items match those filters.",
        },
      ],
      structuredContent: { count: items.length, categories: CATEGORIES, items },
    };
  },
});