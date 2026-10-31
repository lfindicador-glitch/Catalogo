# Sistema de demandas – passo a passo (≈ 15 minutos, grátis)

O catálogo continua igual para o cliente. A diferença é que, ao solicitar o orçamento, o pedido
também vai para o seu sistema, em `demandas.html`, onde você marca Aprovado / Reprovado / Pendente
e informa se o pagamento foi 50% ou 100%.

## 1. Criar a conta e o projeto no Supabase
1. Entre em https://supabase.com e faça login (você já está logada).
2. Em **Your organizations**, clique em **New organization**. Nome: `Corte e Cria`. Tipo: Personal. Plano: **Free**. Clique em **Create organization**.
3. Clique em **New project**:
   - Name: `demandas`
   - Database password: clique em **Generate a password** e guarde essa senha num lugar seguro (você quase não vai usar).
   - Region: **South America (São Paulo)**
   - Plano: Free. Clique em **Create new project** e espere uns 2 minutos.

## 2. Criar a tabela de demandas
1. No menu da esquerda, abra **SQL Editor** → **New query**.
2. Abra o arquivo `supabase.sql` (Bloco de Notas), copie TUDO e cole no editor.
3. Clique em **Run**. Deve aparecer "Success. No rows returned".

## 3. Criar o seu acesso (e-mail e senha do painel)
1. Menu **Authentication** → **Users** → **Add user** → **Create new user**.
2. Digite o seu e-mail e uma senha. Marque **Auto Confirm User**. Clique em **Create user**.
3. Ainda em **Authentication**, abra **Sign In / Providers** (ou **Providers**) e **desligue** a opção
   **Allow new users to sign up**. Assim ninguém mais consegue criar acesso.

## 4. Copiar as duas informações do projeto
1. Menu **Project Settings** (engrenagem) → **API** (ou **Data API / API Keys**).
2. Copie a **Project URL** (algo como `https://abcdefgh.supabase.co`).
3. Copie a chave pública: **anon public** (começa com `eyJ...`) ou **Publishable key** (começa com `sb_publishable_`).
   **Nunca use** a `service_role` nem a "secret key".

## 5. Colocar no config.js
Abra o `config.js` no Bloco de Notas e preencha:

```
SUPABASE: {
  URL: "https://abcdefgh.supabase.co",
  CHAVE_PUBLICA: "eyJ..."
},
```
Salve.

## 6. Subir no GitHub
Envie os arquivos do pacote como das outras vezes (raiz: `choose your files` em
`https://github.com/lfindicador-glitch/Catalogo/upload/main`; fotos: em `.../upload/main/fotos`).
Espere o visto verde e aperte Ctrl+F5.

## 7. Testar
1. Abra `https://lfindicador-glitch.github.io/Catalogo/demandas.html`, entre com o e-mail e a senha do passo 3.
2. No catálogo, faça um pedido de teste (com nome). Volte ao painel e toque em **Atualizar**: o pedido deve aparecer em **Pendentes**.
3. Teste **Aprovar** → **50% pago** → **100% pago**. Depois use **Excluir esta demanda** para apagar o teste.

## Como usar no dia a dia
- **Pendentes**: pedidos novos. **Aprovar** ou **Reprovar** quando decidir.
- Depois de aprovado, apareça a escolha de pagamento: **Ainda não pago / 50% pago / 100% pago**.
- **Voltar para pendente** desfaz a decisão (e limpa o pagamento).
- Use a busca por nome do cliente, número do orçamento ou produto.
- Guarde o endereço `demandas.html` nos favoritos. Ele não aparece no catálogo.

## Cuidados
- No plano gratuito, o Supabase **pausa o projeto depois de cerca de 7 dias sem nenhum uso**. Se isso acontecer,
  entre em supabase.com e clique em **Restore project**. Abrir o painel de demandas pelo menos uma vez por semana evita isso.
- Se o sistema estiver fora do ar na hora de um pedido, o catálogo guarda o pedido no aparelho do cliente e tenta de novo
  na próxima visita dele. A mensagem para o seu WhatsApp sai normalmente de qualquer forma.
- A chave pública no `config.js` pode ficar visível: ela só permite **criar** pedidos novos (como pendentes).
  Ler, aprovar e apagar exigem o seu e-mail e senha.
