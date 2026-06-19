document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  loadArtilheiros();
  loadEstatisticas();
  setupTeamSelector();
  setupPlayerComparison();
  setupGoalsChart();
  setupScrollButton();
  
  updateTeamProfile('flamengo');
});

function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const navPrincipal = document.getElementById('nav-principal');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('cabecalho');
  
  menuToggle.addEventListener('click', function() {
    navPrincipal.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      navLinks.forEach(l => l.classList.remove('active'));
      
      this.classList.add('active');
      
      navPrincipal.classList.remove('open');
      menuToggle.classList.remove('open');
    });
  });
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

function loadArtilheiros() {
  const container = document.querySelector('.artilheiros-container');
  
  container.innerHTML = '';
  
  artilheirosData.forEach((artilheiro, index) => {
    const card = document.createElement('div');
    card.className = 'artilheiro-card';
    card.style.position = 'relative';
    
    const rankBadge = document.createElement('div');
    rankBadge.className = 'artilheiro-rank';
    rankBadge.textContent = index + 1;
    card.appendChild(rankBadge);
    
    const img = document.createElement('img');
    img.className = 'artilheiro-img';
    img.src = artilheiro.imagem;
    img.alt = artilheiro.nome;
    card.appendChild(img);
    
    const nome = document.createElement('h3');
    nome.className = 'artilheiro-nome';
    nome.textContent = artilheiro.nome;
    card.appendChild(nome);
    
    const time = document.createElement('div');
    time.className = 'artilheiro-time';
    
    const timeImg = document.createElement('img');
    timeImg.src = artilheiro.timeImagem;
    timeImg.alt = artilheiro.time;
    time.appendChild(timeImg);
    
    const timeNome = document.createElement('span');
    timeNome.textContent = artilheiro.time;
    time.appendChild(timeNome);
    
    card.appendChild(time);
    
    const gols = document.createElement('div');
    gols.className = 'artilheiro-gols';
    gols.textContent = `${artilheiro.gols} gols`;
    card.appendChild(gols);
    
    card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    card.style.opacity = '0';
    container.appendChild(card);
  });
}

function loadEstatisticas() {
  const tableBody = document.getElementById('stats-table-body');
  
  tableBody.innerHTML = '';
  
  estatisticasData.forEach(estatistica => {
    const row = document.createElement('tr');
    
    const categoryCell = document.createElement('td');
    categoryCell.textContent = estatistica.categoria;
    row.appendChild(categoryCell);
    
    const playerCell = document.createElement('td');
    const playerWrapper = document.createElement('div');
    playerWrapper.className = 'jogador-logo';
    
    const teamLogo = document.createElement('img');
    teamLogo.src = estatistica.timeImagem;
    teamLogo.alt = estatistica.time;
    playerWrapper.appendChild(teamLogo);
    
    const playerName = document.createElement('span');
    playerName.textContent = estatistica.jogador;
    playerWrapper.appendChild(playerName);
    
    playerCell.appendChild(playerWrapper);
    row.appendChild(playerCell);
    
    const totalCell = document.createElement('td');
    totalCell.textContent = estatistica.total;
    row.appendChild(totalCell);
    
    tableBody.appendChild(row);
  });
}

function setupTeamSelector() {
  const selectTeam = document.getElementById('select-time');
  
  selectTeam.addEventListener('change', function() {
    updateTeamProfile(this.value);
  });
}

function updateTeamProfile(teamId) {
  const teamData = timesData[teamId];
  const teamProfile = document.getElementById('team-profile');
  const teamPlayers = document.getElementById('team-players');
  
  if (!teamData) return;
  
  teamProfile.innerHTML = `
    <img src="${teamData.logo}" alt="${teamData.nome}" class="team-logo">
    <h3 class="team-name">${teamData.nome}</h3>
    <p>Fundado em ${teamData.fundacao}</p>
    <p>Estádio: ${teamData.estadio} (${teamData.capacidade})</p>
    <p>Técnico: ${teamData.tecnico}</p>
    
    <div class="team-data">
      <div class="team-stat">
        <span class="team-stat-label">Posição atual:</span>
        <span>${teamData.posicao}º</span>
      </div>
      <div class="team-stat">
        <span class="team-stat-label">Pontos:</span>
        <span>${teamData.pontos}</span>
      </div>
      <div class="team-stat">
        <span class="team-stat-label">Vitórias:</span>
        <span>${teamData.vitorias}</span>
      </div>
      <div class="team-stat">
        <span class="team-stat-label">Empates:</span>
        <span>${teamData.empates}</span>
      </div>
      <div class="team-stat">
        <span class="team-stat-label">Derrotas:</span>
        <span>${teamData.derrotas}</span>
      </div>
    </div>
  `;
  
  teamPlayers.innerHTML = '<div class="team-players-grid"></div>';
  const playersGrid = teamPlayers.querySelector('.team-players-grid');
  
  teamData.jogadores.forEach(jogador => {
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';
    
    playerCard.innerHTML = `
      <img src="${jogador.imagem}" alt="${jogador.nome}" class="player-img">
      <h4 class="player-name">${jogador.nome}</h4>
      <p class="player-position">${jogador.posicao}</p>
    `;
    
    playersGrid.appendChild(playerCard);
  });
}

function setupPlayerComparison() {
  const player1Select = document.getElementById('player1');
  const player2Select = document.getElementById('player2');
  
  setupRadarChart(player1Select.value, player2Select.value);
  
  player1Select.addEventListener('change', function() {
    setupRadarChart(this.value, player2Select.value);
  });
  
  player2Select.addEventListener('change', function() {
    setupRadarChart(player1Select.value, this.value);
  });
}

function setupScrollButton() {
  const btnTopo = document.getElementById("btnTopo");
  
  window.addEventListener("scroll", function() {
    if (document.documentElement.scrollTop > 300) {
      btnTopo.style.display = "flex";
    } else {
      btnTopo.style.display = "none";
    }
  });
  
  btnTopo.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);


    window.onscroll = function () {
        const botao = document.getElementById("btnTopo");
        if (document.documentElement.scrollTop > 1500) {
            botao.style.display = "block";
        } else {
            botao.style.display = "none";
        }
    };
    document.getElementById("btnTopo").addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


// artilheiros do campeonato  
const artilheirosData = [
  {
    id: 1,
    nome: "Arrascaeta",
    time: "Flamengo",
    timeImagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Logo_Flamengo_crest_1980-2018.png/1200px-Logo_Flamengo_crest_1980-2018.png",
    imagem: "https://images.flamengo.com.br/public/images/players/6/1738348852.png",
    gols: 7
  },
  {
    id: 2,
    nome: "Kaio Jorge",
    time: "Cruzeiro",
    timeImagem: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_Cruzeiro_1996.png",
    imagem: "https://www.ogol.com.br/img/jogadores/new/92/92/609292_kaio_jorge_20240805205217.png",
    gols: 5
  },
  {
    id: 3,
    nome: "Pablo Vegetti",
    time: "Vasco",
    timeImagem: "https://logodownload.org/wp-content/uploads/2016/09/vasco-da-gama-logo-0.png",
    imagem: "https://s3p.sofifa.net/a8a7cb37234eeea57ad76fe90a5d6aecb2fb2d17.png",
    gols: 5
  },
  {
    id: 4,
    nome: "Pedro",
    time: "Flamengo",
    timeImagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Logo_Flamengo_crest_1980-2018.png/1200px-Logo_Flamengo_crest_1980-2018.png",
    imagem: "https://images.flamengo.com.br/public/images/players/7/1738355662.png",
    gols: 4
  },
  {
    id: 5,
    nome: "Pedro Raul",
    time: "Ceará",
    timeImagem: "https://upload.wikimedia.org/wikipedia/pt/b/be/Ceará_Sporting_Club_logo.png",
    imagem: "https://www.cearasc.com/media/img/jogadores/09_Pedro_Raul.png",
    gols: 4
  },
  {
    id: 6,
    nome: "Reinaldo",
    time: "Mirassol",
    timeImagem: "https://upload.wikimedia.org/wikipedia/pt/5/50/MirassolFC.png",
    imagem: "https://www.mirassolfc.com.br/assets/uploads/elenco/thumb_dce6ce703b31eed0df45629ee1fbbcae.png",
    gols: 4
  },
  {
    id: 7,
    nome: "Yuri Alberto",
    time: "Corinthians",
    timeImagem: "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png",
    imagem: "https://www.zerozero.pt/img/jogadores/new/06/61/1130661_yuri_alberto_20240513114123.png",
    gols: 4
  },
  {
    id: 8,
    nome: "Memphis Depay",
    time: "Corinthians",
    timeImagem: "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png",
    imagem: "https://www.timaoweb.com.br/wp-content/uploads/2024/08/17262299168fafa8e7fe621ebfe3bebc0f2c0cebd8-png.webp",
    gols: 3
  }
];

//estatísticas dos jogadores
const estatisticasData = [
  {
    categoria: "Gols",
    jogador: "Arrascaeta",
    time: "Flamengo",
    timeImagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Logo_Flamengo_crest_1980-2018.png/1200px-Logo_Flamengo_crest_1980-2018.png",
    total: 7
  },
  {
    categoria: "Assistências",
    jogador: "Arrascaeta",
    time: "Flamengo",
    timeImagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Logo_Flamengo_crest_1980-2018.png/1200px-Logo_Flamengo_crest_1980-2018.png",
    total: 5
  },
  {
    categoria: "Finalizações",
    jogador: "Pedro",
    time: "Flamengo",
    timeImagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Logo_Flamengo_crest_1980-2018.png/1200px-Logo_Flamengo_crest_1980-2018.png",
    total: 27
  },
  {
    categoria: "Passes certos",
    jogador: "Maycon",
    time: "Corinthians",
    timeImagem: "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png",
    total: 412
  },
  {
    categoria: "Cartões amarelos",
    jogador: "Felipe Melo",
    time: "Fluminense",
    timeImagem: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Fluminense_FC_escudo.png",
    total: 5
  },
  {
    categoria: "Cartões vermelhos",
    jogador: "Victor Cuesta",
    time: "Botafogo",
    timeImagem: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png",
    total: 2
  },
  {
    categoria: "Faltas sofridas",
    jogador: "Kaio Jorge",
    time: "Cruzeiro",
    timeImagem: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_Cruzeiro_1996.png",
    total: 18
  },
  {
    categoria: "Dribles certos",
    jogador: "Bruno Henrique",
    time: "Flamengo",
    timeImagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Logo_Flamengo_crest_1980-2018.png/1200px-Logo_Flamengo_crest_1980-2018.png",
    total: 19
  },
  {
    categoria: "Defesas",
    jogador: "Rafael",
    time: "São Paulo",
    timeImagem: "https://upload.wikimedia.org/wikipedia/commons/1/12/Escudo_do_SPFC_2006-Atualmente.png",
    total: 32
  }
];

// jogadores em destaques
const timesData = {
  flamengo: {
    nome: "Flamengo",
    logo: "https://logodetimes.com/times/flamengo/logo-flamengo-256.png",
    fundacao: "17 de novembro de 1895",
    estadio: "Maracanã",
    capacidade: "78.838 pessoas",
    tecnico: "Filipe Luís",
    posicao: 1,
    pontos: 34,
    vitorias: 11,
    empates: 1,
    derrotas: 3,
    jogadores: [
      { nome: "Arrascaeta", posicao: "Meia", imagem: "https://images.flamengo.com.br/public/images/players/6/1738348852.png" },
      { nome: "Pedro", posicao: "Atacante", imagem: "https://images.flamengo.com.br/public/images/players/7/1738355662.png" },
      { nome: "Gerson", posicao: "Meia", imagem: "https://images.flamengo.com.br/public/images/players/2/1738355636.png" },
      { nome: "Gabigol", posicao: "Atacante", imagem: "https://images.flamengo.com.br/public/images/players/8/1738355657.png" }
    ]
  },
  palmeiras: {
    nome: "Palmeiras",
    logo: "https://logodetimes.com/times/palmeiras/logo-palmeiras-256.png",
    fundacao: "26 de agosto de 1914",
    estadio: "Allianz Parque",
    capacidade: "43.713 pessoas",
    tecnico: "Abel Ferreira",
    posicao: 2,
    pontos: 31,
    vitorias: 9,
    empates: 4,
    derrotas: 2,
    jogadores: [
      { nome: "Dudu", posicao: "Atacante", imagem: "https://www.ogol.com.br/img/jogadores/new/07/48/51707_dudu_20220828145516.png" },
      { nome: "Raphael Veiga", posicao: "Meia", imagem: "https://www.ogol.com.br/img/jogadores/new/22/10/651022_raphael_veiga_20220828150249.png" },
      { nome: "Endrick", posicao: "Atacante", imagem: "https://www.ogol.com.br/img/jogadores/new/85/41/1044185_endrick_20220710004104.png" },
      { nome: "Weverton", posicao: "Goleiro", imagem: "https://www.ogol.com.br/img/jogadores/new/95/27/42795_weverton_20220828145734.png" }
    ]
  },
  corinthians: {
    nome: "Corinthians",
    logo: "https://logodetimes.com/times/corinthians/logo-corinthians-256.png",
    fundacao: "1 de setembro de 1910",
    estadio: "Neo Química Arena",
    capacidade: "49.205 pessoas",
    tecnico: "António Oliveira",
    posicao: 5,
    pontos: 27,
    vitorias: 8,
    empates: 3,
    derrotas: 4,
    jogadores: [
      { nome: "Memphis Depay", posicao: "Atacante", imagem: "https://www.timaoweb.com.br/wp-content/uploads/2024/08/17262299168fafa8e7fe621ebfe3bebc0f2c0cebd8-png.webp" },
      { nome: "Yuri Alberto", posicao: "Atacante", imagem: "https://www.zerozero.pt/img/jogadores/new/06/61/1130661_yuri_alberto_20240513114123.png" },
      { nome: "Garro", posicao: "Meia", imagem: "https://www.ogol.com.br/img/jogadores/new/08/00/831008_rodrigo_garro_20230924162752.png" },
      { nome: "Cássio", posicao: "Goleiro", imagem: "https://www.ogol.com.br/img/jogadores/new/25/58/15825_cassio_20230924160339.png" }
    ]
  },
  vasco: {
    nome: "Vasco da Gama",
    logo: "https://logodownload.org/wp-content/uploads/2016/09/vasco-da-gama-logo-0.png",
    fundacao: "21 de agosto de 1898",
    estadio: "São Januário",
    capacidade: "21.680 pessoas",
    tecnico: "Rafael Paiva",
    posicao: 4,
    pontos: 28,
    vitorias: 8,
    empates: 4,
    derrotas: 3,
    jogadores: [
      { nome: "Pablo Vegetti", posicao: "Atacante", imagem: "https://s3p.sofifa.net/a8a7cb37234eeea57ad76fe90a5d6aecb2fb2d17.png" },
      { nome: "Payet", posicao: "Meia", imagem: "https://www.ogol.com.br/img/jogadores/new/17/75/21717_dimitri_payet_20230830093232.png" },
      { nome: "Puma Rodríguez", posicao: "Lateral", imagem: "https://www.ogol.com.br/img/jogadores/new/31/22/952231_puma_rodriguez_20231027000358.png" },
      { nome: "Léo Jardim", posicao: "Goleiro", imagem: "https://www.ogol.com.br/img/jogadores/new/67/23/742367_leo_jardim_20230814210918.png" }
    ]
  },
  botafogo: {
    nome: "Botafogo",
    logo: "https://logodetimes.com/times/botafogo/logo-botafogo-256.png",
    fundacao: "1 de julho de 1894",
    estadio: "Nilton Santos",
    capacidade: "46.000 pessoas",
    tecnico: "Artur Jorge",
    posicao: 3,
    pontos: 29,
    vitorias: 9,
    empates: 2,
    derrotas: 4,
    jogadores: [
      { nome: "Luiz Henrique", posicao: "Atacante", imagem: "https://www.ogol.com.br/img/jogadores/new/73/40/1044073_luiz_henrique_20230823145838.png" },
      { nome: "Igor Jesus", posicao: "Atacante", imagem: "https://www.ogol.com.br/img/jogadores/new/45/52/1044545_igor_jesus_20230923173618.png" },
      { nome: "Marlon Freitas", posicao: "Meia", imagem: "https://www.ogol.com.br/img/jogadores/new/22/22/642222_marlon_freitas_20230916165258.png" },
      { nome: "John", posicao: "Goleiro", imagem: "https://www.ogol.com.br/img/jogadores/new/04/79/647904_john_20230916165504.png" }
    ]
  }
};
