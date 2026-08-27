import { useCallback } from "react";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";

/** Autenticação da infraestrutura nativa do projeto, baseada na sessão OAuth já configurada no servidor. */
export function useAuth() {
  const query = trpc.auth.me.useQuery(undefined, { retry: false, refetchOnWindowFocus: true });
  const logoutMutation = trpc.auth.logout.useMutation({ onSuccess: () => void query.refetch() });

  const login = useCallback(() => startLogin(), []);
  const logout = useCallback(async () => { await logoutMutation.mutateAsync(); }, [logoutMutation]);

  return {
    user: query.data ?? null,
    loading: query.isPending,
    error: query.error,
    isAuthenticated: Boolean(query.data),
    refresh: query.refetch,
    login,
    logout,
  };
}
