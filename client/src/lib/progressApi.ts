type ProgressResponse = { payload: string | null; savedAt?: string };

async function readResponse(response: Response): Promise<ProgressResponse> {
  const data = (await response.json().catch(() => null)) as ProgressResponse | null;
  if (!response.ok || !data) throw new Error("Não foi possível acessar o progresso sincronizado.");
  return data;
}

export async function loadRemoteProgress() {
  const response = await fetch("/api/progress", { credentials: "include" });
  return readResponse(response);
}

export async function saveRemoteProgress(payload: string) {
  const response = await fetch("/api/progress", {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload }),
  });
  return readResponse(response);
}
