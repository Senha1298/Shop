# ⚙️ Configuração Adicional para Heroku

## 📝 Adicionar script no package.json

Para que o Heroku faça o build automaticamente, adicione esta linha na seção `"scripts"` do arquivo `package.json`:

```json
"heroku-postbuild": "npm run build"
```

O arquivo ficará assim:

```json
"scripts": {
  "dev": "NODE_ENV=development tsx server/index.ts",
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "NODE_ENV=production node dist/index.js",
  "heroku-postbuild": "npm run build",  // ← ADICIONE ESTA LINHA
  "check": "tsc",
  "db:push": "drizzle-kit push"
}
```

## 🔐 Variáveis de Ambiente no Heroku

Configure as seguintes variáveis de ambiente no Heroku:

```bash
heroku config:set FOUR_M_API_KEY=3mpag_p7czqd3yk_mfr1pvd2
heroku config:set SESSION_SECRET=$(openssl rand -base64 32)
```

## ✅ Arquivos criados para o Heroku

- ✅ `Procfile` - Define como iniciar a aplicação
- ✅ `.env.example` - Documenta as variáveis necessárias  
- ✅ `DEPLOY_HEROKU.md` - Guia completo de deploy

## 🚀 Deploy rápido

```bash
# 1. Login
heroku login

# 2. Criar app
heroku create nome-da-sua-app

# 3. Configurar variáveis
heroku config:set FOUR_M_API_KEY=3mpag_p7czqd3yk_mfr1pvd2
heroku config:set SESSION_SECRET=$(openssl rand -base64 32)

# 4. Deploy
git add .
git commit -m "Deploy no Heroku"
git push heroku main
```

## 📊 Verificar status

```bash
heroku logs --tail
heroku open
```
