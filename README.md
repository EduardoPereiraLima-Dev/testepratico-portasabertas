# 🚪 Portas Abertas - Sistema de Autenticação

Sistema de login e cadastro desenvolvido para o teste prático da Portas Abertas, construído com Next.js 15, TypeScript e Tailwind CSS.

## 🌐 Demo Online

**🔗 Acesse a aplicação:** [https://testepratico-portasabertas-nsc18ny00.vercel.app](https://testepratico-portasabertas-nsc18ny00.vercel.app)

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte de um teste técnico para desenvolvedor frontend júnior. A aplicação implementa um sistema completo de autenticação com as seguintes funcionalidades:

### ✨ Funcionalidades

- 🔐 **Login de usuários** com validação de email e senha
- 📝 **Cadastro de novos usuários** com validação completa
- 🎯 **Validação de CPF** com formatação automática
- 📱 **Design responsivo** para desktop e mobile
- ⚡ **Feedback visual** com mensagens de erro e sucesso
- 🛡️ **Validação de formulários** usando Zod
- 🎨 **Interface moderna** com Tailwind CSS
- 🔄 **Integração com API** externa

### 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Validação:** Zod
- **Componentes:** shadcn/ui
- **Deploy:** Vercel
- **Gerenciamento de Estado:** React Hooks

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Token de acesso à API (fornecido pela Portas Abertas)

### Instalação

1. **Clone o repositório:**
   ``bash
   git clone https://github.com/EduardoPereiraLima-Dev/testepratico-portasabertas
   cd auth-test
   \`\`\`

2. **Instale as dependências:**
   \`\`\`bash
   npm install
   # ou
   yarn install
   \`\`\`

3. **Configure as variáveis de ambiente:**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edite o arquivo `.env.local` e adicione:
   \`\`\`env
   NEXT_PUBLIC_API_BASE_URL=https://sandbox.api.alianca.portasabertas.org.br
   NEXT_PUBLIC_API_TOKEN=seu_token_aqui
   \`\`\`

4. **Execute o projeto:**
   \`\`\`bash
   npm run dev
   # ou
   yarn dev
   \`\`\`

5. **Acesse no navegador:**
   \`\`\`
   http://localhost:3000
   \`\`\`

## 📁 Estrutura do Projeto

`
auth-test/
├── app/                    # App Router do Next.js
│   ├── dashboard/         # Página do dashboard
│   ├── login/            # Página de login
│   ├── register/         # Página de cadastro
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Página inicial
│   └── globals.css       # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── login-form.tsx    # Formulário de login
│   ├── register-form.tsx # Formulário de cadastro
│   └── form-input.tsx    # Input reutilizável
├── services/             # Serviços de API
│   └── api.ts           # Funções de integração
├── hooks/               # Custom hooks
└── lib/                 # Utilitários
`\``

## 🎯 Funcionalidades Detalhadas

### 🔐 Sistema de Login
- Validação de email e senha
- Feedback de erros em tempo real
- Redirecionamento após login bem-sucedido
- Armazenamento seguro de dados do usuário

### 📝 Sistema de Cadastro
- Formulário completo com validação
- Formatação automática de CPF
- Confirmação de senha
- Validação de todos os campos obrigatórios

### 🎨 Interface do Usuário
- Design moderno e limpo
- Responsivo para todos os dispositivos
- Animações suaves
- Feedback visual claro

### 🔧 Validações Implementadas
- **Email:** Formato válido
- **CPF:** Formato brasileiro (000.000.000-00)
- **Senha:** Mínimo 8 caracteres
- **Confirmação:** Senhas devem coincidir
- **Campos obrigatórios:** Todos validados

## 🌐 API Integration

O projeto integra com a API da Portas Abertas:

- **Base URL:** `https://sandbox.api.alianca.portasabertas.org.br`
- **Endpoints:**
  - `POST /auth/login` - Autenticação de usuários
  - `POST /logins` - Cadastro de novos usuários
- **Autenticação:** Bearer Token

## 📱 Responsividade

A aplicação foi desenvolvida com foco em responsividade:

- ✅ **Desktop** (1024px+)
- ✅ **Tablet** (768px - 1023px)
- ✅ **Mobile** (320px - 767px)

## 🧪 Testes e Qualidade

- ✅ Validação de formulários
- ✅ Tratamento de erros
- ✅ Feedback do usuário
- ✅ Código TypeScript tipado
- ✅ ESLint configurado
- ✅ Componentes reutilizáveis

## 🚀 Deploy

O projeto está hospedado na Vercel com deploy automático:

- **URL de Produção:** [https://testepratico-portasabertas-nsc18ny00.vercel.app](https://testepratico-portasabertas-nsc18ny00.vercel.app)
- **Deploy automático** a cada push na branch main
- **Preview deployments** para pull requests

## 📝 Scripts Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm run start

# Linting
npm run lint
\`\`\`

## 🤝 Contribuição

Este projeto foi desenvolvido como teste técnico. Para sugestões ou melhorias:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para fins de avaliação técnica.

## 👨‍💻 Desenvolvedor

Desenvolvido como parte do processo seletivo para desenvolvedor frontend júnior na Portas Abertas.

---

**🔗 Link da Aplicação:** [https://testepratico-portasabertas-nsc18ny00.vercel.app](https://testepratico-portasabertas-nsc18ny00.vercel.app)

---

### 📞 Suporte

Para dúvidas sobre o projeto ou processo seletivo, entre em contato através dos canais oficiais da Portas Abertas.
