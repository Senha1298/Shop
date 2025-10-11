# 🚀 Deploy no Heroku - Guia Completo

## ⚠️ IMPORTANTE: Leia primeiro o CORRIGIR_HEROKU.md

Antes de fazer o deploy, você **PRECISA** modificar o `package.json` conforme instruções em `CORRIGIR_HEROKU.md`.

## Pré-requisitos

1. ✅ Conta no Heroku (https://heroku.com)
2. ✅ Heroku CLI instalado (https://devcenter.heroku.com/articles/heroku-cli)
3. ✅ Git instalado
4. ✅ **Modificações no package.json feitas** (veja CORRIGIR_HEROKU.md)

## 🔧 Passo a passo

### 1. Modificar package.json (OBRIGATÓRIO)

Veja instruções detalhadas em `CORRIGIR_HEROKU.md`

**Resumo:**
- Mudar linha `build` para: `"build": "vite build && node build.js"`
- Adicionar: `"heroku-postbuild": "npm run build"`

### 2. Preparar Git

```bash
git init
git add .
git commit -m "Preparar para deploy no Heroku"
```

### 3. Criar aplicação no Heroku

```bash
# Login no Heroku
heroku login

# Criar aplicação (substitua pelo nome desejado)
heroku create nome-da-sua-app
```

### 4. Configurar variáveis de ambiente

```bash
# API Key da 4mpagamentos
heroku config:set FOUR_M_API_KEY=3mpag_p7czqd3yk_mfr1pvd2

# Chave secreta para sessões
heroku config:set SESSION_SECRET=$(openssl rand -base64 32)
```

### 5. Deploy

```bash
git push heroku main
```

### 6. Abrir aplicação

```bash
heroku open
```

## 📊 Verificar logs

```bash
heroku logs --tail
```

## 🔧 Comandos úteis

```bash
# Ver status
heroku ps

# Reiniciar
heroku restart

# Ver configurações
heroku config
```

## ✅ Checklist de deploy

- [ ] Modificou o package.json (veja CORRIGIR_HEROKU.md)
- [ ] Fez commit das mudanças
- [ ] Criou app no Heroku
- [ ] Configurou FOUR_M_API_KEY
- [ ] Configurou SESSION_SECRET
- [ ] Fez push para o Heroku
- [ ] Verificou os logs

## 🆘 Problemas?

Consulte `CORRIGIR_HEROKU.md` para troubleshooting detalhado.
