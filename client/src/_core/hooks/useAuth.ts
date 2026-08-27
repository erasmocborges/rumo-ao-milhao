import { getUser, handleAuthCallback, login, logout as identityLogout, onAuthChange, requestPasswordRecovery, signup, type User } from "@netlify/identity";
import { useCallback, useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const refresh = useCallback(async () => {
    const current = await getUser();
    setUser(current);
    return current;
  }, []);

  useEffect(() => {
    let active = true;
    const loadIdentity = async () => {
      try {
        await handleAuthCallback();
        const current = await getUser();
        if (active) setUser(current);
      } catch (reason) {
        if (active) setError(reason);
      } finally {
        if (active) setLoading(false);
      }
    };
    const unsubscribe = onAuthChange((_event, current) => { if (active) setUser(current); });
    void loadIdentity();
    return () => { active = false; unsubscribe(); };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    const current = await login(email, password);
    setUser(current);
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    setError(null);
    await signup(email, password, name ? { full_name: name } : undefined);
    const current = await refresh();
    return Boolean(current);
  }, [refresh]);

  const recover = useCallback(async (email: string) => {
    setError(null);
    await requestPasswordRecovery(email);
  }, []);

  const logout = useCallback(async () => {
    try {
      await identityLogout();
    } finally {
      setUser(null);
    }
  }, []);

  return { user, loading, error, isAuthenticated: Boolean(user), refresh, login: signIn, signup: signUp, recover, logout };
}
