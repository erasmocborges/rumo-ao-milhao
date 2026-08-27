export function passwordRecoveryError(password: string, confirmation: string) {
  if (password.length < 8) return "Use uma senha com pelo menos 8 caracteres.";
  if (password !== confirmation) return "As senhas informadas não coincidem.";
  return null;
}
