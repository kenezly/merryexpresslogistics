const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type InsertResult = { error: null | { message: string } };

function buildFromHelper(table: string) {
  return {
    insert: async (data: Record<string, unknown>): Promise<InsertResult> => {
      try {
        const res = await fetch(`${BASE}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({ message: "Request failed" }));
          return { error: { message: err.message ?? "Request failed" } };
        }
        return { error: null };
      } catch (e: unknown) {
        return { error: { message: e instanceof Error ? e.message : "Network error" } };
      }
    },
  };
}

export const supabase = {
  from: (table: string) => buildFromHelper(table),
  functions: {
    invoke: async (_name: string, _opts?: unknown) => ({ data: null, error: null }),
  },
};
