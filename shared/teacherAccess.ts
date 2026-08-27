const TEACHER_PASSWORD_TOKEN = "RW5lbVBvbGkyQDI2";

/**
 * Confere a senha do modo docente sem guardar o texto digitado em sessão.
 * Espaços acidentais antes ou depois do valor não impedem o acesso.
 */
export function isTeacherPassword(password: string): boolean {
  const normalizedPassword = password.trim();
  return Boolean(normalizedPassword) && globalThis.btoa(normalizedPassword) === TEACHER_PASSWORD_TOKEN;
}
