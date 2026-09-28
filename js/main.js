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
