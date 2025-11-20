document.addEventListener('DOMContentLoaded', () => {

    // Adiciona classe para indicar que o JS foi carregado (para animações)
    document.body.classList.add('js-loaded');
    
    // --- LÓGICA DO SELETOR DE TEMA (DARK/LIGHT MODE) ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Aplica o tema salvo ao carregar a página
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        // Alterna entre os temas
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });


    // --- LÓGICA DO BOTÃO DE COPIAR CÓDIGO ---
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pre = button.parentElement.querySelector('pre');
            const code = pre.querySelector('code');
            const textToCopy = code.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Feedback visual para o usuário
                const originalText = button.textContent;
                button.innerHTML = 'Copiado!';
                button.classList.add('copied');

                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Falha ao copiar texto: ', err);
            });
        });
    });

    // --- LÓGICA DO CARROSSEL DE FUNCIONALIDADES ---
    const tabs = document.querySelectorAll('.carousel-tab');
    const items = document.querySelectorAll('.carousel-item');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove a classe 'active' de todas as abas e itens
            tabs.forEach(t => t.classList.remove('active'));
            items.forEach(i => i.classList.remove('active'));

            // Adiciona a classe 'active' na aba clicada
            tab.classList.add('active');

            // Encontra e ativa o item correspondente
            const targetId = tab.getAttribute('data-target');
            const targetItem = document.getElementById(targetId);
            if (targetItem) {
                targetItem.classList.add('active');
            }
        });
    });

    // Re-executa o Prism para destacar a sintaxe do novo código visível
    Prism.highlightAll();

    // --- LÓGICA DO MENU MOBILE ---
    const nav = document.getElementById('main-nav');
    const openNavBtn = document.getElementById('nav-open-btn');
    const closeNavBtn = document.getElementById('nav-close-btn');
    const navLinks = nav.querySelectorAll('a');

    const openNav = () => nav.classList.add('mobile-active');
    const closeNav = () => nav.classList.remove('mobile-active');

    if (nav && openNavBtn && closeNavBtn) {
        openNavBtn.addEventListener('click', openNav);
        closeNavBtn.addEventListener('click', closeNav);

        // Fecha o menu ao clicar em um link (útil para SPAs)
        navLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }

    // --- [NOVO] LÓGICA DA ANIMAÇÃO AO ROLAR A PÁGINA ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: para de observar o elemento depois que ele já foi animado
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% do elemento está visível
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- [NOVO] LÓGICA DE AUTENTICAÇÃO (LOGIN/CADASTRO) ---
    const authModal = document.getElementById('auth-modal');
    const loginBtn = document.getElementById('login-btn');
    const closeBtns = authModal.querySelectorAll('[data-micromodal-close]');
    const modalContainer = authModal.querySelector('.auth-modal__container');
    const authContainer = document.getElementById('auth-container');

    // Formulários e abas
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabsAuth = authModal.querySelectorAll('.auth-modal__tab');

    // Campos de mensagem
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    const USERS_KEY = 'my_app_users';
    const SESSION_KEY = 'my_app_session';

    // --- Funções do Modal ---
    const openModal = () => authModal.classList.add('is-open');
    const closeModal = () => {
        authModal.classList.remove('is-open');
        // Limpa mensagens de erro ao fechar
        loginMessage.textContent = '';
        registerMessage.textContent = '';
    };

    if (loginBtn) {
        loginBtn.addEventListener('click', openModal);
    }
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

    // Impede que cliques dentro do modal o fechem
    // Isso previne o "event bubbling" para o overlay
    modalContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // --- Lógica das Abas (Login/Cadastro) ---
    tabsAuth.forEach(tab => {
        tab.addEventListener('click', () => {
            tabsAuth.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const formToShow = tab.getAttribute('data-form');
            if (formToShow === 'login') {
                loginForm.classList.add('active');
                registerForm.classList.remove('active');
            } else {
                registerForm.classList.add('active');
                loginForm.classList.remove('active');
            }
        });
    });

    // --- Funções de UI de Autenticação ---
    const updateUIForLoggedInUser = (user) => {
        // Busca os dados completos do usuário para obter o plano
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        const fullUserData = users.find(u => u.username === user.username);
        const plan = fullUserData ? fullUserData.plan || 'Nenhum' : 'Nenhum';
        
        // Atualiza o objeto user com o plano mais recente para uso posterior
        user.plan = plan; 

        authContainer.innerHTML = `
            <span style="margin-right: 1rem; text-align: right;">
                Olá, ${user.username}!<br>
                <small style="color: var(--text-muted); font-size: 0.8rem;">Plano: ${user.plan}</small>
            </span>
            <button class="btn btn-secondary" id="logout-btn">Sair</button>
        `;
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
        // Ajusta o alinhamento do container de autenticação
        authContainer.style.alignItems = 'center';
    };

    const updateUIForLoggedOutUser = () => {
        authContainer.innerHTML = `<button class="btn btn-secondary" id="login-btn">Entrar</button>`;
        document.getElementById('login-btn').addEventListener('click', openModal);
    };

    // --- Lógica de Cadastro ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;

        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

        // Validação
        if (users.some(user => user.username === username)) {
            registerMessage.textContent = 'Nome de usuário já existe.';
            registerMessage.className = 'auth-form-message error';
            return;
        }
        if (users.some(user => user.email === email)) {
            registerMessage.textContent = 'Email já cadastrado.';
            registerMessage.className = 'auth-form-message error';
            return;
        }

        const newUser = { username, email, password, plan: 'Nenhum' }; // Adiciona o plano inicial
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        registerMessage.textContent = 'Cadastro realizado com sucesso!';
        registerMessage.className = 'auth-form-message success';
        registerForm.reset();
    });

    // --- Lógica de Login ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const identifier = document.getElementById('login-identifier').value.trim();
        const password = document.getElementById('login-password').value;

        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

        const foundUser = users.find(user => 
            (user.email === identifier || user.username === identifier) && user.password === password
        );

        if (foundUser) {
            // Login bem-sucedido
            localStorage.setItem(SESSION_KEY, JSON.stringify({ username: foundUser.username }));
            updateUIForLoggedInUser(foundUser);
            closeModal();
        } else {
            loginMessage.textContent = 'Email/usuário ou senha inválidos.';
            loginMessage.className = 'auth-form-message error';
        }
    });

    // --- Lógica de Logout ---
    const handleLogout = () => {
        localStorage.removeItem(SESSION_KEY);
        updateUIForLoggedOutUser();
    };

    // --- Verificação de Sessão ao Carregar a Página ---
    const checkSession = () => {
        const session = localStorage.getItem(SESSION_KEY);
        if (session) {
            const user = JSON.parse(session);
            updateUIForLoggedInUser(user);
        } else {
            updateUIForLoggedOutUser();
        }
    };

    checkSession(); // Verifica a sessão assim que o script é carregado

    // --- [NOVO] LÓGICA DE SELEÇÃO DE PLANOS ---
    const selectPlanBtns = document.querySelectorAll('.select-plan-btn');
    const paymentModal = document.getElementById('payment-modal');
    const paymentCloseBtn = document.getElementById('payment-close-btn');
    const paymentCancelBtn = document.getElementById('payment-cancel-btn');
    const paymentConfirmBtn = document.getElementById('payment-confirm-btn');

    const openPaymentModal = () => paymentModal.classList.add('is-open');
    const closePaymentModal = () => paymentModal.classList.remove('is-open');

    paymentCloseBtn.addEventListener('click', closePaymentModal);
    paymentCancelBtn.addEventListener('click', closePaymentModal);

    selectPlanBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const session = localStorage.getItem(SESSION_KEY);
            if (!session) {
                // Se não estiver logado, abre o modal de login
                alert('Por favor, entre ou cadastre-se para escolher um plano.');
                openModal();
                return;
            }

            const plan = btn.getAttribute('data-plan');
            const loggedInUser = JSON.parse(session);

            if (plan === 'Pro') {
                // Para o plano Pro, mostra o modal de confirmação de pagamento
                openPaymentModal();

                // Adiciona um listener para o botão de confirmação
                // Usamos .onclick para garantir que o listener seja substituído a cada clique
                paymentConfirmBtn.onclick = () => {
                    updateUserPlan(loggedInUser.username, plan);
                    closePaymentModal();
                    alert(`Parabéns! Você agora está no plano ${plan}.`);
                };
            } else {
                // Para o plano Starter (ou outros planos gratuitos), atualiza diretamente
                if (plan === 'Enterprise') {
                    // Para o plano Enterprise, abre o cliente de e-mail
                    const subject = encodeURIComponent('Interesse no Plano Enterprise do Pixelate');
                    const body = encodeURIComponent(`Olá,\n\nTenho interesse em saber mais sobre o plano Enterprise do Pixelate. Poderíamos agendar uma conversa?\n\nMeu nome de usuário é: ${loggedInUser.username}\nMeu e-mail é: ${loggedInUser.email || 'Não informado'}\n\nObrigado!`);
                    window.location.href = `mailto:contato@pixelate.com?subject=${subject}&body=${body}`;
                    
                    // Opcional: Atribuir o plano "Enterprise" ao usuário após o clique,
                    // mas geralmente isso seria feito após o contato e negociação.
                    // Por simplicidade, vamos apenas abrir o email e não atribuir o plano automaticamente aqui.
                    // updateUserPlan(loggedInUser.username, plan);
                    alert('Por favor, verifique seu cliente de e-mail para entrar em contato conosco sobre o plano Enterprise.');
                    return; // Sai da função para não mostrar o alerta de plano atualizado
                }
                updateUserPlan(loggedInUser.username, plan);
                alert(`Seu plano foi atualizado para ${plan}.`);
            }
        });
    });

    function updateUserPlan(username, newPlan) {
        let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        let userUpdated = false;

        // Encontra o usuário e atualiza seu plano
        users = users.map(user => {
            if (user.username === username) {
                user.plan = newPlan;
                userUpdated = true;
            }
            return user;
        });

        if (userUpdated) {
            // Salva a lista de usuários atualizada no localStorage
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            // Atualiza a UI para refletir a mudança
            checkSession();
        } else {
            console.error('Não foi possível encontrar o usuário para atualizar o plano.');
        }
    }

    // --- [NOVO] LÓGICA DE RESTRIÇÃO DE FUNCIONALIDADES POR PLANO ---
    const applyPlanRestrictions = () => {
        const session = localStorage.getItem(SESSION_KEY);
        const currentUser = session ? JSON.parse(session) : null;
        const userPlan = currentUser ? currentUser.plan : 'Nenhum';

        const proFeatures = document.querySelectorAll('[data-pro-feature]');

        proFeatures.forEach(featureElement => {
            if (userPlan !== 'Pro') {
                featureElement.classList.add('restricted');
                // Opcional: Desabilitar cliques ou interações se for um botão/link
                // featureElement.style.pointerEvents = 'none';
            } else {
                featureElement.classList.remove('restricted');
                // featureElement.style.pointerEvents = 'auto';
            }
        });
    };

    // Garante que as restrições sejam aplicadas após a verificação da sessão
    checkSession(); 
    applyPlanRestrictions(); // Chama a função de restrição após verificar a sessão

    // Adiciona a chamada de restrição após login/logout para atualizar a UI
    const originalUpdateUIForLoggedInUser = updateUIForLoggedInUser;
    updateUIForLoggedInUser = (user) => {
        originalUpdateUIForLoggedInUser(user);
        applyPlanRestrictions();
    };

    const originalUpdateUIForLoggedOutUser = updateUIForLoggedOutUser;
    updateUIForLoggedOutUser = () => {
        originalUpdateUIForLoggedOutUser();
        applyPlanRestrictions();
    };

});