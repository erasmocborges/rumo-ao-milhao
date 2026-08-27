# Correção do Modo Docente no Netlify

- [x] Identificar a falha de autenticação do modo docente no domínio publicado.
- [x] Corrigir o fluxo de acesso e preservar a ocultação dos materiais de correção.
- [x] Validar o login docente no Netlify e registrar o procedimento de uso.
- [x] Verificar o redirecionamento, retorno e estado de sessão do login do aluno no Netlify — o retorno é atendido pelo fallback estático, sem OAuth/tRPC.
- [x] Substituir backend, OAuth e banco legados por Netlify Identity, Functions e Blobs para permitir sincronização entre dispositivos.
- [x] Criar função serverless do Netlify para a API de progresso sincronizado por conta.
- [x] Encaminhar `/api/progress` à função sem quebrar o fallback da aplicação de página única.
- [x] Migrar o login do aluno do OAuth legado para o Netlify Identity e proteger materiais docentes por papel de usuário.
- [x] Ativar o Netlify Identity, configurar Functions/Blobs sem segredos adicionais e documentar a arquitetura de produção.
- [ ] Validar no domínio público o salvamento sincronizado e a proteção docente após o login do aluno.
- [x] Diagnosticar a falha relatada no cadastro ou login pelo Netlify Identity no domínio publicado.
- [x] Corrigir o fluxo de sessão e validar uma autenticação real de aluno no Netlify.
- [x] Melhorar a mensagem de falha de login para orientar o cadastro e a confirmação de uma conta Netlify Identity independente.
- [ ] Corrigir o endereço de redirecionamento da confirmação de e-mail do Netlify Identity, que abriu o repositório GitHub em vez do simulado.
- [x] Processar o token de recuperação na página do simulado e permitir a definição de uma nova senha após o retorno do e-mail.
- [ ] Reconfigurar o Netlify Identity para permitir cadastro com acesso direto, eliminando a dependência dos links de confirmação com origem incorreta.
- [ ] Validar o salvamento sincronizado com uma conta autenticada pelo fluxo direto.
- [ ] Restringir a atribuição do papel docente a endereços institucionais com domínio `@escola.pr.gov.br` e documentar a política administrativa.
