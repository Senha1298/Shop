# Deploy no Heroku - Guia Completo

## Pré-requisitos

1. Conta no Heroku (https://heroku.com)
2. Heroku CLI instalado (https://devcenter.heroku.com/articles/heroku-cli)
3. Git instalado

## Passo a passo

### 1. Prepare o repositório Git

```bash
git init
git add .
git commit -m "Preparar para deploy no Heroku"
```

### 2. Crie a aplicação no Heroku

```bash
# Login no Heroku
heroku login

# Criar aplicação (substitua 'nome-da-sua-app' por um nome único)
heroku create nome-da-sua-app
```

### 3. Configure as variáveis de ambiente

Configure as secrets necessárias no Heroku:

```bash
# API Key da 4mpagamentos
heroku config:set FOUR_M_API_KEY=3mpag_p7czqd3yk_mfr1pvd2

# Chave secreta para sessões (gere uma aleatória)
heroku config:set SESSION_SECRET=$(openssl rand -base64 32)

# Node.js version (opcional, para garantir compatibilidade)
heroku config:set NODE_ENV=production
```

### 4. Configure o buildpack do Node.js

```bash
heroku buildpacks:set heroku/nodejs
```

### 5. Faça o deploy

```bash
git push heroku main
```

Se sua branch principal for `master`:
```bash
git push heroku master
```

### 6. Abra a aplicação

```bash
heroku open
```

## Verificar logs

Para ver os logs da aplicação em tempo real:

```bash
heroku logs --tail
```

## Comandos úteis

```bash
# Ver status da aplicação
heroku ps

# Reiniciar a aplicação
heroku restart

# Ver configurações
heroku config

# Escalar dynos (aumentar/diminuir recursos)
heroku ps:scale web=1
```

## Importante

- ✅ O projeto já está configurado para produção
- ✅ A porta é automaticamente configurada pelo Heroku via `process.env.PORT`
- ✅ Build do frontend (Vite) e backend (esbuild) acontecem automaticamente
- ✅ Arquivos estáticos são servidos corretamente em produção

## Troubleshooting

### Erro: "Application error"
- Verifique os logs: `heroku logs --tail`
- Confirme que as variáveis de ambiente estão configuradas

### Erro de build
- Confirme que todas as dependências estão no `package.json`
- Verifique se o Node.js está atualizado

### PIX não funciona
- Verifique se `FOUR_M_API_KEY` está corretamente configurada:
  ```bash
  heroku config:get FOUR_M_API_KEY
  ```
