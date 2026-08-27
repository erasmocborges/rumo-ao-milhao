import { useState } from "react";
import { Loader2, MailCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AuthMode = "login" | "signup" | "recovery";

type StudentAuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup: (email: string, password: string, name: string) => Promise<boolean>;
  onRecover: (email: string) => Promise<void>;
};

function readableError(error: unknown) {
  const status = typeof error === "object" && error && "status" in error ? (error as { status?: number }).status : undefined;
  if (status === 401 || status === 422) return "E-mail ou senha não reconhecidos. Confira os dados e tente novamente.";
  return "Não foi possível concluir o acesso agora. Tente novamente em alguns instantes.";
}

export function StudentAuthDialog({ open, onOpenChange, onLogin, onSignup, onRecover }: StudentAuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const changeMode = (next: AuthMode) => {
    setMode(next);
    setNotice("");
    setError("");
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setNotice("");
    setError("");
    try {
      if (mode === "login") {
        await onLogin(email.trim(), password);
        onOpenChange(false);
      } else if (mode === "signup") {
        const authenticated = await onSignup(email.trim(), password, name.trim());
        setNotice(authenticated ? "Conta criada e conectada. Seu progresso poderá ser sincronizado." : "Conta criada. Confirme o e-mail enviado pelo Netlify e volte para entrar.");
        if (authenticated) onOpenChange(false);
      } else {
        await onRecover(email.trim());
        setNotice("Enviamos as instruções de redefinição de senha para seu e-mail.");
      }
    } catch (reason) {
      setError(readableError(reason));
    } finally {
      setPending(false);
    }
  };

  const title = mode === "login" ? "Entrar para sincronizar" : mode === "signup" ? "Criar conta de estudante" : "Recuperar acesso";
  const description = mode === "login"
    ? "Use sua conta para continuar o simulado em outro dispositivo."
    : mode === "signup"
      ? "Uma conta permite salvar respostas e histórico de tentativas com segurança."
      : "Informe o e-mail associado à sua conta para receber as instruções.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[#D9D0C1] bg-[#F7F3EC] p-7 text-[#1D2A44] sm:max-w-md">
        <DialogHeader>
          <div className="mb-1 flex h-9 w-9 items-center justify-center border border-[#C84D3A] text-[#C84D3A]"><UserRound size={18} /></div>
          <DialogTitle className="font-serif text-2xl text-[#1D2A44]">{title}</DialogTitle>
          <DialogDescription className="leading-6 text-[#5B6675]">{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="mt-1 grid gap-4">
          {mode === "signup" && <label className="grid gap-1.5 text-xs font-bold tracking-[0.08em] text-[#435064] uppercase">Nome para o relatório<input value={name} onChange={(event) => setName(event.target.value)} required className="border border-[#D9D0C1] bg-white px-3 py-2.5 text-sm font-normal tracking-normal text-[#1D2A44] outline-none focus:border-[#C84D3A]" placeholder="Como quer ser identificado?" /></label>}
          <label className="grid gap-1.5 text-xs font-bold tracking-[0.08em] text-[#435064] uppercase">E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" className="border border-[#D9D0C1] bg-white px-3 py-2.5 text-sm font-normal tracking-normal text-[#1D2A44] outline-none focus:border-[#C84D3A]" placeholder="voce@escola.com" /></label>
          {mode !== "recovery" && <label className="grid gap-1.5 text-xs font-bold tracking-[0.08em] text-[#435064] uppercase">Senha<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} className="border border-[#D9D0C1] bg-white px-3 py-2.5 text-sm font-normal tracking-normal text-[#1D2A44] outline-none focus:border-[#C84D3A]" placeholder="Ao menos 8 caracteres" /></label>}
          {error && <p role="alert" className="border-l-2 border-[#C84D3A] pl-3 text-sm text-[#A23C2D]">{error}</p>}
          {notice && <p role="status" className="flex gap-2 border-l-2 border-[#497464] pl-3 text-sm text-[#2C5B4A]"><MailCheck size={17} className="mt-0.5 shrink-0" />{notice}</p>}
          <Button type="submit" disabled={pending} className="bg-[#1D2A44] text-white hover:bg-[#283a5a]">{pending ? <><Loader2 size={16} className="animate-spin" /> Processando</> : mode === "login" ? "Entrar e sincronizar" : mode === "signup" ? "Criar conta" : "Enviar instruções"}</Button>
        </form>
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[#DED6CA] pt-4 text-xs font-bold text-[#435064]">
          {mode !== "login" && <button type="button" onClick={() => changeMode("login")} className="underline decoration-[#C84D3A] underline-offset-4">Já tenho conta</button>}
          {mode !== "signup" && <button type="button" onClick={() => changeMode("signup")} className="underline decoration-[#C84D3A] underline-offset-4">Criar conta</button>}
          {mode !== "recovery" && <button type="button" onClick={() => changeMode("recovery")} className="underline decoration-[#C84D3A] underline-offset-4">Esqueci a senha</button>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
