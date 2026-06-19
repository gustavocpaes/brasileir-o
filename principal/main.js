// Carrossel de imagens - escopo global
const imagens = [
  {
    src: "../imagens/VoltaBrasileiro.webp",
    frase: "Campeonato Brasileiro 2025: Emoção do início ao fim!"
  },
  {
    src: "../imagens/Imagem-do-WhatsApp-de-2025-01-02-as-06.07.30_5538155e.jpg",
    frase: "Torcida vibrando: a paixão que move o futebol brasileiro."
  },
  {
    src: "../imagens/torcida.jpg",
    frase: "Estádios lotados e muita festa nas arquibancadas!"
  },
  {
    src: "../imagens/flamengo-x-palmeiras.jpg.1200x0_q70_crop-top.webp",
    frase: "Grandes clássicos: Flamengo x Palmeiras agitam a rodada."
  }
];
let indice = 0;

function mostrarImagem() {
  const track = document.getElementById('carrosselTrack');
  const legenda = document.getElementById('carrosselLegenda');
  const carrossel = document.querySelector('.carrossel');
  if (track && carrossel) {
    const largura = carrossel.offsetWidth;
    track.style.transform = `translateX(-${indice * largura}px)`;
  }
  if (legenda) {
    legenda.textContent = imagens[indice].frase;
  }
}

function proxima() {
  indice = (indice + 1) % imagens.length;
  mostrarImagem();
}

function anterior() {
  indice = (indice - 1 + imagens.length) % imagens.length;
  mostrarImagem();
}

// Mostra a imagem inicial ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  mostrarImagem(); // Mostra a imagem inicial
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-list');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});

window.addEventListener('resize', mostrarImagem);