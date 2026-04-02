# 🍪 Gestão de Cookies e Biscoitos - Doce Mordida

Este é um sistema de gestão simples, moderno e mobile-first para o seu negócio de cookies. Ele permite registrar vendas, controlar estoque, visualizar lucros e gerenciar despesas, tudo diretamente do seu celular ou computador.

## 🚀 Como usar no GitHub (Gratuitamente)

Como você quer usar o sistema para fins pessoais e no GitHub, a melhor forma é através do **GitHub Pages**.

### Passo 1: Criar o Repositório
1. Vá para o seu [GitHub](https://github.com/) e crie um novo repositório chamado `cookie-mgr`.
2. Siga as instruções para subir este código para o GitHub:
   ```bash
   git init
   git add .
   git commit -m "Primeira versão do Gestor de Cookies"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/cookie-mgr.git
   git push -u origin main
   ```

### Passo 2: Configurar o Deploy Automático
O projeto já está configurado para funcionar com caminhos relativos. Para publicar:
1. Vá em **Settings** (Configurações) do seu repositório no GitHub.
2. No menu lateral, clique em **Pages**.
3. Em "Build and deployment" > "Source", escolha **GitHub Actions**.
4. O GitHub irá sugerir ou você pode procurar por um workflow de "Static HTML" ou "Vite". Como este é um projeto Vite, você pode adicionar um arquivo `.github/workflows/deploy.yml` com as configurações de build.

*(Dica: Se preferir algo mais simples, você pode apenas rodar `npm run build` na sua máquina e subir o conteúdo da pasta `dist` para um branch chamado `gh-pages`).*

## 🗄️ Configuração do Banco de Dados (Supabase)

Para persistir seus dados de forma segura e acessá-los de qualquer lugar (Celular e PC), utilizamos o **Supabase**.

### Passo 1: Criar conta no Supabase
1. Vá em [supabase.com](https://supabase.com/) e crie um projeto gratuito.
2. No menu lateral, clique em **SQL Editor** e crie uma "New Query".
3. Copie e cole o conteúdo do arquivo `supabase_setup.sql` (que eu gerei para você) e clique em **Run**. Isso criará suas tabelas.

### Passo 2: Conectar o App
1. No Supabase, vá em **Project Settings** -> **API**.
2. Copie a `Project URL` e a `anon public` key.
3. No seu computador, abra o arquivo `.env` na pasta do projeto e cole os valores:
   ```env
   VITE_SUPABASE_URL=cole_aqui_sua_url
   VITE_SUPABASE_ANON_KEY=cole_aqui_sua_chave
   ```

### Passo 3: Deploy no GitHub com o Banco
Ao subir para o GitHub, você precisará adicionar essas duas chaves (URL e ANON_KEY) nos **Secrets** do seu repositório:
1. Vá em **Settings** -> **Secrets and variables** -> **Actions**.
2. Adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

---
## 📱 Funcionalidades Principais

## 🛠️ Tecnologias
- React + Vite
- Recharts (Gráficos)
- Lucide React (Ícones)
- Vanilla CSS (Estilização Moderna)

---
Desenvolvido com ❤️ para a sua Biscoitaria!
