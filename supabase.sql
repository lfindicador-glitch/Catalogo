-- =====================================================================
--  Corte e Cria Decor – banco de demandas (cole tudo no SQL Editor do Supabase e clique em RUN)
-- =====================================================================
create table if not exists public.demandas (
  id            uuid primary key,
  numero        text,
  cliente       text        not null check (char_length(cliente) between 1 and 80),
  obs           text        check (obs is null or char_length(obs) <= 300),
  pecas         integer,
  itens         jsonb       not null,
  status        text        not null default 'pendente' check (status in ('pendente','aprovado','reprovado')),
  pagamento     text        check (pagamento in ('50','100')),
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  -- só pedido aprovado pode ter pagamento
  constraint pagamento_so_se_aprovado check (pagamento is null or status = 'aprovado')
);

create index if not exists demandas_criado_em_idx on public.demandas (criado_em desc);

alter table public.demandas enable row level security;

-- O catálogo (visitante sem login) só consegue CRIAR pedidos novos, sempre como "pendente".
drop policy if exists "catalogo envia pedido" on public.demandas;
create policy "catalogo envia pedido" on public.demandas
  for insert to anon
  with check (
    status = 'pendente' and pagamento is null
    and char_length(cliente) between 1 and 80
    and jsonb_typeof(itens) = 'array' and jsonb_array_length(itens) between 1 and 100
  );

-- Só quem entrou com e-mail e senha (você) vê, altera e apaga.
drop policy if exists "dona le" on public.demandas;
create policy "dona le" on public.demandas for select to authenticated using (true);
drop policy if exists "dona atualiza" on public.demandas;
create policy "dona atualiza" on public.demandas for update to authenticated using (true) with check (true);
drop policy if exists "dona apaga" on public.demandas;
create policy "dona apaga" on public.demandas for delete to authenticated using (true);

revoke all on public.demandas from anon, authenticated;
grant insert on public.demandas to anon;
grant select, update, delete on public.demandas to authenticated;
