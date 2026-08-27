# Implantação no Netlify

## Correção aplicada

O build do projeto gera a interface do navegador em `dist/public`, enquanto o Netlify havia publicado `dist`. Por isso, o domínio retornava **Page not found** mesmo após um deploy bem-sucedido. O arquivo `netlify.toml` fixa `dist/public` como diretório de publicação e usa o build do projeto com Node 22 e pnpm 10.

## O que estará disponível

Após o próximo deploy, a interface do simulado — questões, cronômetro, PDF, CSV e conta de aluno — estará acessível em `https://prof-erasmo-simulado-enem.netlify.app`. O login e o cadastro foram migrados para o **Netlify Identity**, e a sincronização de respostas, tentativas e revisões utiliza a função `/api/progress` com armazenamento persistente no Netlify Blobs.

O registro está aberto e solicita confirmação por e-mail. Não é necessário copiar segredos do ambiente Manus, configurar `DATABASE_URL` ou manter as variáveis do OAuth anterior: Identity e Blobs recebem o contexto da própria plataforma ao executar funções. [1] [2]

## Acesso docente

A senha local deixou de ser um mecanismo de produção. Materiais de correção são revelados somente para uma conta com o papel `teacher` confirmado pelo Netlify Identity. Para autorizar o professor, crie a conta na página pública e, depois, abra **Project configuration → Identity → Users**, localize a conta e atribua o papel `teacher`. A alteração passa a valer no próximo login ou renovação de sessão.

As contas de aluno recebem o papel `student` no cadastro. O progresso é armazenado sob uma chave baseada no identificador de sessão da conta, sem aceitar um identificador informado pelo navegador.

## Próximo deploy

Como o projeto já está ligado ao GitHub, basta enviar as alterações à branch `main`. O Netlify deverá iniciar uma nova publicação automaticamente. Confira em **Deploys** se o campo *Publish directory* indica `dist/public`, se a lista **Functions** mostra `progress` e teste criação de conta, confirmação por e-mail e salvamento de progresso no domínio público.

## Referências

[1]: https://docs.netlify.com/manage/security/secure-access-to-sites/identity/overview/ "Netlify Identity"
[2]: https://docs.netlify.com/build/data-and-storage/netlify-blobs/ "Netlify Blobs"
