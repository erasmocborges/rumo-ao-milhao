export const MAX_PROGRESS_PAYLOAD_LENGTH = 200_000;

export function isProgressPayload(value: unknown): value is string {
  if (typeof value !== "string" || value.length === 0 || value.length > MAX_PROGRESS_PAYLOAD_LENGTH) return false;
  try {
    const parsed: unknown = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

export function progressKeyForUser(userId: string) {
  return `students/${encodeURIComponent(userId)}.json`;
}
