// Lightweight in-memory cache for MCP tool responses.
// Runs inside the edge function process; entries live until the isolate is recycled
// or the TTL expires. Safe because every tool here returns deterministic public data.

type Entry<T> = { value: T; expiresAt: number };

const store = new Map<string, Entry<unknown>>();
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ENTRIES = 200;

export function memoize<T>(key: string, compute: () => T, ttlMs: number = DEFAULT_TTL_MS): T {
  const now = Date.now();
  const hit = store.get(key) as Entry<T> | undefined;
  if (hit && hit.expiresAt > now) return hit.value;

  const value = compute();

  // Simple size cap — drop oldest inserted entry when full.
  if (store.size >= MAX_ENTRIES) {
    const firstKey = store.keys().next().value;
    if (firstKey !== undefined) store.delete(firstKey);
  }
  store.set(key, { value, expiresAt: now + ttlMs });
  return value;
}

export function cacheKey(tool: string, input?: Record<string, unknown>): string {
  if (!input) return tool;
  const normalized: Record<string, unknown> = {};
  for (const k of Object.keys(input).sort()) {
    const v = input[k];
    normalized[k] = typeof v === "string" ? v.trim().toLowerCase() : v;
  }
  return `${tool}:${JSON.stringify(normalized)}`;
}