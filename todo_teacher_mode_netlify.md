# Correção do Modo Docente no Netlify

- [x] Identificar a falha de autenticação do modo docente no domínio publicado.
- [x] Corrigir o fluxo de acesso e preservar a ocultação dos materiais de correção.
- [x] Validar o login docente no Netlify e registrar o procedimento de uso.
- [x] Verificar o redirecionamento, retorno e estado de sessão do login do aluno no Netlify — o retorno é atendido pelo fallback estático, sem OAuth/tRPC.
- [ ] Adaptar a API e configurar backend, OAuth e banco compatíveis com funções do Netlify para permitir sincronização entre dispositivos.
- [x] Criar função serverless do Netlify para a API de progresso sincronizado por conta.
- [x] Encaminhar `/api/progress` à função sem quebrar o fallback da aplicação de página única.
- [x] Migrar o login do aluno do OAuth legado para o Netlify Identity e proteger materiais docentes por papel de usuário.
- [ ] Documentar e configurar as variáveis seguras e o banco de produção no Netlify.
- [ ] Validar no domínio público o login do aluno, o salvamento sincronizado e a proteção docente.
