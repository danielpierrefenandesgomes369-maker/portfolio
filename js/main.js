// Menu mobile: abre/fecha ao clicar no botão hambúrguer e fecha
// automaticamente quando o usuário clica em algum link do menu.

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function abrirMenu() {
  navMenu.classList.add('is-open');
  // aria-expanded avisa leitores de tela que o menu agora está visível
  navToggle.setAttribute('aria-expanded', 'true');
}

function fecharMenu() {
  navMenu.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

function alternarMenu() {
  const estaAberto = navMenu.classList.contains('is-open');
  if (estaAberto) {
    fecharMenu();
  } else {
    abrirMenu();
  }
}

navToggle.addEventListener('click', alternarMenu);

// Fecha o menu ao clicar em qualquer link, para não ficar aberto
// tampando o conteúdo depois de navegar para a seção escolhida.
const navLinks = navMenu.querySelectorAll('.navbar__link');
navLinks.forEach(function (link) {
  link.addEventListener('click', fecharMenu);
});

// ==========================================================================
// MODAIS DE PROJETO (<dialog>)
// ==========================================================================

// Cada botão "Ver detalhes" tem um atributo data-modal com o id do
// <dialog> que ele deve abrir.
const botoesAbrirModal = document.querySelectorAll('[data-modal]');

function bloquearRolagemBody() {
  document.body.style.overflow = 'hidden';
}

function liberarRolagemBody() {
  document.body.style.overflow = '';
}

botoesAbrirModal.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const id = botao.getAttribute('data-modal');
    const modal = document.getElementById(id);
    if (modal) {
      // showModal() (em vez de só open) é o que faz o <dialog> aparecer
      // centralizado com o ::backdrop e travar a interação com o resto da página
      modal.showModal();
      bloquearRolagemBody();
    }
  });
});

// Trata todos os <dialog> da página do mesmo jeito: botão "Fechar",
// clique no fundo e liberação da rolagem quando fecham por qualquer motivo
const modais = document.querySelectorAll('.modal');

modais.forEach(function (modal) {
  const botaoFechar = modal.querySelector('.modal__fechar');
  if (botaoFechar) {
    botaoFechar.addEventListener('click', function () {
      modal.close();
    });
  }

  // Clique no fundo escurecido (::backdrop) também dispara o evento
  // "click" no próprio <dialog>. Se o alvo do clique for o <dialog> em si
  // (e não algo dentro de .modal__conteudo), é porque o clique foi fora da caixa.
  modal.addEventListener('click', function (evento) {
    if (evento.target === modal) {
      modal.close();
    }
  });

  // O evento "close" dispara tanto pelo botão quanto pela tecla Esc
  // (comportamento nativo do <dialog>), então liberar a rolagem aqui
  // cobre os dois casos sem precisar reimplementar o fechamento pelo Esc.
  modal.addEventListener('close', function () {
    liberarRolagemBody();
  });
});
