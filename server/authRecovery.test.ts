import { describe, expect, it } from "vitest";
import { passwordRecoveryError } from "../shared/authRecovery";

describe("passwordRecoveryError", () => {
  it("rejeita senhas curtas", () => {
    expect(passwordRecoveryError("curta", "curta")).toBe("Use uma senha com pelo menos 8 caracteres.");
  });

  it("rejeita confirmações diferentes", () => {
    expect(passwordRecoveryError("senha-segura", "outra-senha")).toBe("As senhas informadas não coincidem.");
  });

  it("aceita uma nova senha confirmada", () => {
    expect(passwordRecoveryError("senha-segura", "senha-segura")).toBeNull();
  });
});
