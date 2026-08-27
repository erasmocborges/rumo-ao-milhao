import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";
import { isProgressPayload, progressKeyForUser } from "../../shared/progressPayload";

const jsonHeaders = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };

function response(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: jsonHeaders });
}

export default async function progress(request: Request) {
  if (request.method !== "GET" && request.method !== "PUT") return response({ error: "Método não permitido." }, 405);

  const user = await getUser();
  if (!user) return response({ error: "É necessário entrar na conta para sincronizar." }, 401);

  const store = getStore("simulado-enem-progress");
  const key = progressKeyForUser(user.id);

  if (request.method === "GET") {
    const record = await store.get(key, { type: "json", consistency: "strong" }) as { payload?: unknown; savedAt?: unknown } | null;
    return response({ payload: typeof record?.payload === "string" ? record.payload : null, savedAt: typeof record?.savedAt === "string" ? record.savedAt : undefined });
  }

  const body = await request.json().catch(() => null) as { payload?: unknown } | null;
  if (!isProgressPayload(body?.payload)) return response({ error: "O progresso recebido é inválido ou excede o limite permitido." }, 400);

  const savedAt = new Date().toISOString();
  await store.setJSON(key, { payload: body.payload, savedAt, version: 1 });
  return response({ payload: body.payload, savedAt });
}
