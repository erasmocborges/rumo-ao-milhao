import { describe, expect, it } from "vitest";
import { authenticationErrorMessage, credentialValidationError, summarizeAuthError } from "../shared/authFeedback";

describe("retorno de autenticação", () => {
  it("normaliza formatos diferentes de erro do Identity", () => {
    expect(summarizeAuthError({ statusCode: 422, code: "validation", message: "Email already registered" })).toEqual({ status: 422, code: "validation", message: "Email already registered" });
    expect(summarizeAuthError({ response: { status: 429, data: { msg: "rate limited" } } })).toEqual({ status: 429, code: undefined, message: "rate limited" });
  });

  it("explica os casos de cadastro e entrada sem revelar credenciais", () => {
    expect(authenticationErrorMessage({ statusCode: 422, message: "User already registered" })).toContain("Já existe uma conta");
    expect(authenticationErrorMessage({ status: 429 })).toContain("muitas tentativas");
    expect(authenticationErrorMessage({ status: 503 })).toContain("temporariamente indisponível");
  });

  it("bloqueia localmente e-mail inválido e senha muito curta", () => {
    expect(credentialValidationError("invalido", "senha-segura")).toContain("e-mail válido");
    expect(credentialValidationError("professor@escola.pr.gov.br", "curta")).toContain("8 caracteres");
    expect(credentialValidationError("professor@escola.pr.gov.br", "senha-segura")).toBeNull();
  });
});
