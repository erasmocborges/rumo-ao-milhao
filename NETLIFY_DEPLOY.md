# Implantação no Netlify

## Correção aplicada

O build do projeto gera a interface do navegador em `dist/public`, enquanto o Netlify havia publicado `dist`. Por isso, o domínio retornava **Page not found** mesmo após um deploy bem-sucedido. O arquivo `netlify.toml` fixa `dist/public` como diretório de publicação e usa o build do projeto com Node 22 e pnpm 10.

## O que estará disponível

Após o próximo deploy, a interface estática do simulado — questões, cronômetro, correção local, PDF, CSV e modo docente local — será acessível em `https://prof-erasmo-simulado-enem.netlify.app`.

> O login e a sincronização entre dispositivos dependem do backend tRPC/Express e do banco de dados. A estrutura atual do Netlify não executa o arquivo `dist/index.js` como servidor contínuo. Para manter contas e nuvem fora do ambiente original, será necessária uma adaptação posterior para funções do Netlify e um banco de dados/OAuth configurados no painel do Netlify.

## Validação de acessos em 27 de agosto de 2026

O modo docente foi validado no domínio público: quando o campo recebe a senha configurada, a página troca para o estado **“Sair do modo docente”** e revela máscara, gabarito e chave. O formulário também passou a aceitar a tecla Enter e a ignorar espaços acidentais no início ou fim da senha.

O botão **“Entrar para sincronizar”** monta o início do fluxo OAuth e cria o cookie temporário de segurança. Entretanto, o callback `https://prof-erasmo-simulado-enem.netlify.app/api/oauth/callback` ainda retorna o HTML estático da página, em vez de executar a rota OAuth. Por isso, alunos não conseguem finalizar a autenticação nem sincronizar progresso/histórico neste domínio no estado atual.

Para ativar essas funções no Netlify, será necessário publicar o Express/tRPC como uma função do Netlify, reescrever `/api/*` para essa função e configurar no painel do Netlify as variáveis de ambiente de backend e o banco compatível. A documentação oficial do Netlify para essa arquitetura está em [Express on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/express/). Nenhum segredo deve ser incluído no repositório.

## Próximo deploy

Como o projeto já está ligado ao GitHub, basta enviar este arquivo à branch `main`. O Netlify deverá iniciar uma nova publicação automaticamente. Confira em **Deploys** se o campo *Publish directory* indica `dist/public` e teste a página inicial do domínio público.
