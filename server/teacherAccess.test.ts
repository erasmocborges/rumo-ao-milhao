import { describe, expect, it } from "vitest";
import { isTeacherPassword } from "../shared/teacherAccess";

const configuredTeacherPassword = globalThis.atob("RW5lbVBvbGkyQDI2");

describe("isTeacherPassword", () => {
  it("aceita a senha configurada, inclusive quando colada com espaços externos", () => {
    expect(isTeacherPassword(configuredTeacherPassword)).toBe(true);
    expect(isTeacherPassword(`  ${configuredTeacherPassword}  `)).toBe(true);
  });

  it("rejeita valores vazios ou divergentes", () => {
    expect(isTeacherPassword("")).toBe(false);
    expect(isTeacherPassword("senha-incorreta")).toBe(false);
  });
});
