# Arquitetura de Autenticação e Sincronização no Netlify

## Decisão técnica

A implantação no Netlify passará a usar **Netlify Identity** para contas de aluno e papéis de acesso, **Netlify Functions** para as rotas de autenticação e a API de progresso, e **Netlify Blobs** para armazenar o JSON de progresso de cada aluno. Essa combinação elimina a dependência do servidor Express contínuo, do OAuth proprietário e do banco MySQL do ambiente original.

| Camada | Serviço | Responsabilidade |
| --- | --- | --- |
| Conta do aluno | Netlify Identity | Cadastro, login por e-mail/senha, sessão por cookie e recuperação de conta. |
| API | Netlify Function | Consultar sessão, cadastrar, entrar, sair, salvar e recuperar o progresso. |
| Persistência | Netlify Blobs | Guardar um único payload JSON por usuário autenticado. |
| Acesso docente | Papel `teacher` do Identity | Liberar a interface docente apenas para contas autorizadas. |

## Regras de segurança

As rotas que alteram estado devem validar a origem da requisição. A função deve identificar o usuário exclusivamente pela sessão do Netlify Identity, jamais por um identificador enviado pelo navegador. O progresso será gravado sob uma chave derivada do identificador do usuário e jamais será retornado para outro usuário. O papel `teacher` será atribuído manualmente pelo painel do Netlify apenas a uma conta docente com e-mail `@escola.pr.gov.br`; alunos novos receberão o papel `student`.

O pacote `@netlify/identity` deve ser usado em funções modernas do Netlify, exportadas como `default`; o formato legado `export { handler }` não é compatível com sua sessão de servidor. No navegador, o login, o cadastro, a confirmação de e-mail e o encerramento de sessão usam a mesma biblioteca e o aplicativo deve processar os tokens de retorno no carregamento da página. [3] [5]

O armazenamento de progresso usará uma store global de Blobs, e não uma store específica de deploy, para que as respostas persistam entre novas publicações. A store é adequada para leituras frequentes e escritas pouco frequentes de um JSON individual; a regra “última gravação vence” será comunicada na interface para o caso de dois dispositivos salvarem ao mesmo tempo. [4]

## Confirmação e recuperação de acesso

O projeto mantém a confirmação de e-mail obrigatória. Portanto, a primeira tentativa de login só deve ocorrer depois que o usuário abrir o e-mail de confirmação enviado pelo Netlify e concluir o retorno ao domínio `prof-erasmo-simulado-enem.netlify.app`. O aplicativo chama `handleAuthCallback()` no carregamento para processar o token recebido no fragmento da URL. [6]

Se o link de confirmação abrir uma origem diferente do domínio publicado, o usuário não deve reutilizar o token nem compartilhar a URL completa. O administrador deve reenviar o fluxo de recuperação de senha no painel de Identity, que gera uma nova URL de confirmação vinculada ao domínio da instância; em seguida, deve-se inspecionar apenas a origem de destino caso a falha persista. [7]

> A senha local da interface docente deixa de ser uma proteção suficiente para produção. O controle de acesso passa a depender da autenticação, do papel `teacher` e do e-mail institucional `@escola.pr.gov.br`.

## Fontes técnicas

As funções Netlify executam código sob demanda e são versionadas junto com o site. As variáveis usadas por funções precisam ser configuradas no painel/CLI/API do Netlify, não em `netlify.toml`. [1] [2]

O Netlify Identity fornece cadastro por e-mail e senha, verificação de usuário em funções e papéis de acesso. O Netlify Blobs oferece armazenamento chave-valor persistente, com controle de acesso integrado, adequado para o payload individual de progresso. [3] [4]

## Referências

[1]: https://docs.netlify.com/build/functions/overview/ "Functions overview — Netlify"
[2]: https://docs.netlify.com/build/functions/environment-variables/ "Environment variables and serverless functions — Netlify"
[3]: https://docs.netlify.com/manage/security/secure-access-to-sites/identity/overview/ "Authenticate users with Netlify Identity"
[4]: https://docs.netlify.com/build/data-and-storage/netlify-blobs/ "Netlify Blobs"
[5]: https://docs.netlify.com/manage/security/secure-access-to-sites/identity/use-identity-in-functions/ "Use Identity in functions — Netlify"
[6]: https://docs.netlify.com/manage/security/secure-access-to-sites/identity/get-started/ "Add Identity to your project — Netlify"
[7]: https://docs.netlify.com/manage/security/secure-access-to-sites/identity/manage-existing-users/ "Manage existing Identity users — Netlify"
