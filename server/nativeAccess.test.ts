import { describe, expect, it } from "vitest";
import { hasInstitutionalTeacherAccess, hasTeacherRole, rolesWithDefaultStudent } from "../shared/identityRoles";
import { isProgressPayload, MAX_PROGRESS_PAYLOAD_LENGTH, progressKeyForUser } from "../shared/progressPayload";

describe("controle de acesso da infraestrutura nativa", () => {
  it("reconhece a função docente por papel dedicado ou pelo papel nativo de administrador", () => {
    expect(hasTeacherRole({ roles: ["student", "teacher"] })).toBe(true);
    expect(hasTeacherRole({ appMetadata: { roles: ["teacher"] } })).toBe(true);
    expect(hasTeacherRole({ roles: ["student"] })).toBe(false);
    expect(hasTeacherRole({ role: "admin" })).toBe(true);
  });

  it("libera o modo docente apenas para a credencial institucional autorizada e com papel permitido", () => {
    expect(hasInstitutionalTeacherAccess({ email: "erasmo.borges@escola.pr.gov.br", roles: ["teacher"] })).toBe(true);
    expect(hasInstitutionalTeacherAccess({ email: "outro.professor@escola.pr.gov.br", roles: ["teacher"] })).toBe(false);
    expect(hasInstitutionalTeacherAccess({ email: "erasmo.borges@escola.pr.gov.br", roles: ["student"] })).toBe(false);
    expect(hasInstitutionalTeacherAccess({ email: "erasmo.borges@escola.pr.gov.br", role: "admin" })).toBe(true);
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
