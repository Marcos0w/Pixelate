# Pixelate - Landing Page com Sistema de Autenticação

![Captura de Tela do Projeto Pixelate](https://imgur.com/a/Edxs2zo)



Este é o repositório do **Pixelate**, uma landing page moderna e totalmente funcional para um produto SaaS fictício. O projeto foi desenvolvido com HTML, CSS e JavaScript puros, demonstrando a criação de uma interface de usuário rica e interativa sem o uso de frameworks.

O site não apenas apresenta o produto de forma elegante, mas também inclui um sistema completo de cadastro, login, gerenciamento de planos e um painel de controle para o usuário, tudo operando no lado do cliente com o uso de `localStorage`.

---

## 📜 Índice

- Principais Funcionalidades
- Tecnologias Utilizadas
- Estrutura do Projeto
- Análise do Código
  - Sistema de Autenticação
  - Gerenciamento de Planos
  - Painel de Controle do Usuário
  - UI/UX Interativa
- Como Executar
- Autor

---

## ✨ Principais Funcionalidades

- **Design Responsivo:** Interface totalmente adaptável para desktops, tablets e dispositivos móveis.
- **Tema Claro e Escuro:** Seletor de tema que salva a preferência do usuário no `localStorage`.
- **Animações de Scroll:** Elementos que surgem suavemente na tela conforme o usuário rola a página, implementado com `IntersectionObserver` para melhor performance.
- **Sistema de Autenticação Completo:**
  - Cadastro de novos usuários com validação de e-mail e nome de usuário.
  - Login com e-mail ou nome de usuário.
  - Persistência de sessão (`localStorage`), mantendo o usuário conectado ao recarregar a página.
- **Gerenciamento de Planos:**
  - Usuários podem selecionar planos (Starter, Pro, Enterprise).
  - Simulação de "pagamento" para o plano Pro através de um modal de confirmação.
  - Funcionalidade de contato via `mailto:` para o plano Enterprise.
- **Restrição de Funcionalidades:** Conteúdo exclusivo do plano "Pro" é visualmente desabilitado para usuários de outros planos.
- **Painel de Controle do Usuário:**
  - Modal acessível pelo cabeçalho que exibe informações da conta (nome, e-mail, plano).
  - Opção para "Cancelar Assinatura", revertendo o plano do usuário.
- **Componentes Interativos:** Carrossel de funcionalidades, botões de "copiar código" e menu mobile.

---

## 🚀 Tecnologias Utilizadas

- **HTML5:** Estrutura semântica e moderna.
- **CSS3:** Estilização avançada com:
  - **Variáveis CSS:** Para fácil customização e implementação do tema claro/escuro.
  - **Flexbox e Grid Layout:** Para criação de layouts complexos e responsivos.
  - **Animações e Transições:** Para uma experiência de usuário fluida.
- **JavaScript (ES6+):** Lógica do lado do cliente para todas as funcionalidades interativas, sem dependências ou frameworks.
- **Prism.js:** Biblioteca externa para o realce de sintaxe (syntax highlighting) nos exemplos de código.

---

## 📁 Estrutura do Projeto

```
/
├── index.html         # Arquivo principal com toda a estrutura da página
├── style.css          # Folha de estilos com toda a estilização
├── main.js            # Arquivo JavaScript com toda a lógica funcional
└── README.md          # Esta documentação
```

---

## 💻 Análise do Código

O projeto foi estruturado para ser modular e de fácil manutenção, mesmo utilizando apenas JavaScript puro.

### Sistema de Autenticação

A autenticação é gerenciada através do `localStorage`.

- `my_app_users`: Uma chave que armazena um array de objetos, onde cada objeto representa um usuário com `username`, `email`, `password` e `plan`.
- `my_app_session`: Uma chave que armazena o `username` do usuário logado, indicando uma sessão ativa.

**Importante:** Para uma aplicação em produção, o armazenamento de senhas e a lógica de autenticação devem ser movidos para um backend seguro, com senhas devidamente "hasheadas".

### Gerenciamento de Planos

Ao clicar em um plano, o sistema verifica se o usuário está logado.

- **Plano Gratuito:** O plano é atribuído diretamente ao objeto do usuário no `localStorage`.
- **Plano Pro:** Um modal de "pagamento" é exibido para simular uma transação. Após a confirmação, o plano é atribuído.
- **Plano Enterprise:** Um link `mailto:` é gerado para facilitar o contato comercial.

### Painel de Controle do Usuário

Um modal acessível após o login permite que o usuário visualize seus dados e gerencie sua assinatura. A função de "Cancelar Assinatura" simplesmente atualiza o campo `plan` do usuário para "Nenhum" no `localStorage`.

### UI/UX Interativa

- **`IntersectionObserver`:** Utilizado para detectar quando um elemento entra na tela, disparando animações de forma eficiente e performática, sem sobrecarregar o navegador.
- **`localStorage` para Tema:** A preferência de tema (claro ou escuro) é salva, garantindo que a escolha do usuário persista entre as visitas.
- **Modais Dinâmicos:** Todos os modais (login, pagamento, painel) são criados com HTML e CSS e controlados por JavaScript, evitando recarregamentos de página e proporcionando uma experiência de SPA (Single Page Application).

---

## 🏃 Como Executar

Como este é um projeto puramente front-end, não há necessidade de um servidor ou processo de build.

1.  Clone este repositório:
    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd nome-do-repositorio
    ```
3.  Abra o arquivo `index.html` diretamente no seu navegador de preferência (Google Chrome, Firefox, etc.).

---

## 👨‍💻 Autor

Desenvolvido por **Marcos**.

- **LinkedIn:** (https://www.linkedin.com/in/marcos-cravo-0b7b77266/)
- **GitHub:** https://github.com/Marcos0w

---

_Este projeto foi criado como parte de um portfólio de desenvolvimento e para fins de demonstração._

```

```

