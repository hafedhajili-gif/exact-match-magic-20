import { defineMcp } from "@lovable.dev/mcp-js";
import listWorlds from "./tools/list-worlds";
import getWorld from "./tools/get-world";
import searchMenu from "./tools/search-menu";
import venueInfo from "./tools/venue-info";

export default defineMcp({
  name: "yume-mcp",
  title: "YUME Café · Lounge",
  version: "0.1.0",
  instructions:
    "Tools for YUME Café · Lounge (Sousse, Tunisia). Use `venue_info` for concept, hours and reservation link, `list_worlds` / `get_world` to explore the 6 immersive LED worlds (Sakura, Tokyo Neon, Zen Forest, Aquarium, Kyoto, Galaxy), and `search_menu` to browse drinks, sushi and desserts (prices in DT).",
  tools: [venueInfo, listWorlds, getWorld, searchMenu],
});