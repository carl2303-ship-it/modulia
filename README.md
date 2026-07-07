# Modulia

Website da **Modulia** — empresa de casas modulares sustentáveis.

Stack: **Next.js 15** · **TypeScript** · **Tailwind CSS** · **Supabase** · **Netlify**

## Pré-requisitos

- Node.js 20+
- Conta [GitHub](https://github.com/carl2303-ship-it/modulia)
- Conta [Netlify](https://www.netlify.com/)
- Projeto [Supabase](https://yjnkhwgfxycbdmhfdtlp.supabase.co)

## Configuração local

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
cp .env.example .env.local

# 3. Preencher .env.local com as chaves do Supabase
# Dashboard → Settings → API → Project URL + anon/publishable key

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Ligação ao GitHub

```bash
git init
git remote add origin https://github.com/carl2303-ship-it/modulia.git
git add .
git commit -m "feat: estrutura inicial do website Modulia"
git branch -M main
git push -u origin main
```

## Deploy na Netlify

1. Entrar em [app.netlify.com](https://app.netlify.com/)
2. **Add new site** → **Import an existing project**
3. Escolher **GitHub** e autorizar o repositório `carl2303-ship-it/modulia`
4. A Netlify deteta automaticamente as definições do `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Plugin:** `@netlify/plugin-nextjs`
5. Em **Site settings → Environment variables**, adicionar:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://yjnkhwgfxycbdmhfdtlp.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = *(chave anon/publishable do Supabase)*
6. Clicar **Deploy site**

Cada push para `main` faz deploy automático.

## Supabase

### Variáveis de ambiente

| Variável | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://yjnkhwgfxycbdmhfdtlp.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública do dashboard Supabase |

### Tabela de contactos (opcional)

Para o formulário de contacto guardar pedidos na base de dados, executar no **SQL Editor** do Supabase:

```sql
-- Ver ficheiro: supabase/migrations/20250707120000_create_contact_requests.sql
```

## Estrutura do projeto

```
modulia/
├── src/
│   ├── app/              # Páginas (App Router)
│   ├── components/       # Componentes React
│   └── lib/supabase/     # Cliente Supabase (browser + server)
├── public/               # Ficheiros estáticos
├── supabase/migrations/  # Migrações SQL
├── netlify.toml          # Configuração Netlify
└── .env.example          # Template de variáveis
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Verificar código |

## Licença

Privado — © Modulia
