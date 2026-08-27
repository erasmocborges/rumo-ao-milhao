# Implantação no Netlify

## Correção aplicada

O build do projeto gera a interface do navegador em `dist/public`, enquanto o Netlify havia publicado `dist`. Por isso, o domínio retornava **Page not found** mesmo após um deploy bem-sucedido. O arquivo `netlify.toml` fixa `dist/public` como diretório de publicação e usa o build do projeto com Node 22 e pnpm 10.

## O que estará disponível

Após o próximo deploy, a interface estática do simulado — questões, cronômetro, correção local, PDF, CSV e modo docente local — será acessível em `https://prof-erasmo-simulado-enem.netlify.app`.

> O login e a sincronização entre dispositivos dependem do backend tRPC/Express e do banco de dados. A estrutura atual do Netlify não executa o arquivo `dist/index.js` como servidor contínuo. Para manter contas e nuvem fora do ambiente original, será necessária uma adaptação posterior para funções do Netlify e um banco de dados/OAuth configurados no painel do Netlify.

## Próximo deploy

Como o projeto já está ligado ao GitHub, basta enviar este arquivo à branch `main`. O Netlify deverá iniciar uma nova publicação automaticamente. Confira em **Deploys** se o campo *Publish directory* indica `dist/public` e teste a página inicial do domínio público.
