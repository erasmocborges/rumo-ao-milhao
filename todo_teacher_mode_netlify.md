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
- [ ] Validar no domínio público o login do aluno, o salvamento sincronizado e a proteção docente.
