import { describe, expect, it } from "vitest";
import { hasTeacherRole, rolesWithDefaultStudent } from "../shared/identityRoles";
import { isProgressPayload, MAX_PROGRESS_PAYLOAD_LENGTH, progressKeyForUser } from "../shared/progressPayload";

describe("controle de acesso no Netlify", () => {
  it("reconhece a função docente apenas por papel atribuído pelo Identity", () => {
    expect(hasTeacherRole({ roles: ["student", "teacher"] })).toBe(true);
    expect(hasTeacherRole({ appMetadata: { roles: ["teacher"] } })).toBe(true);
    expect(hasTeacherRole({ roles: ["student"] })).toBe(false);
  });

  it("preserva papéis existentes e adiciona o papel padrão de estudante", () => {
    expect(rolesWithDefaultStudent(["teacher"])).toEqual(["teacher", "student"]);
    expect(rolesWithDefaultStudent(["student"])).toEqual(["student"]);
  });

  it("aceita somente payloads JSON de progresso dentro do limite", () => {
    expect(isProgressPayload(JSON.stringify({ answers: { 1: "A" } }))).toBe(true);
    expect(isProgressPayload("[]")).toBe(false);
    expect(isProgressPayload("invalido")).toBe(false);
    expect(isProgressPayload("x".repeat(MAX_PROGRESS_PAYLOAD_LENGTH + 1))).toBe(false);
    expect(progressKeyForUser("aluno/1")).toBe("students/aluno%2F1.json");
  });
});
