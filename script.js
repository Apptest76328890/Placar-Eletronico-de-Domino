// Classe que representa um time
class Time {
  constructor({ id, nome, corDeFundo, corTexto }) {
    this.id = id;
    this.nome = nome;
    this.corDeFundo = corDeFundo;
    this.corTexto = corTexto;
    this.pontuacao = 0;
    this.historicoPontos = [];
  }

  adicionarPontos(pontos) {
    this.pontuacao += pontos;
    this.historicoPontos.push(pontos);
  }

  desfazerPontos() {
    const ultimoPonto = this.historicoPontos.pop();
    if (ultimoPonto) {
      this.pontuacao -= ultimoPonto;
    }
  }
}

// Classe que representa o jogo
class Jogo {
  constructor(configuracaoTimes, opcoesPontos, idContainer) {
    this.times = configuracaoTimes.map(config => new Time(config));
    this.opcoesPontos = opcoesPontos;
    this.container = document.getElementById(idContainer);
  }

  // Inicia o jogo e cria os cartões
  iniciar() {
    this.container.innerHTML = ''; // Limpar o conteúdo anterior
    this.times.forEach(time => this.criarCartao(time)); // Criar o cartão de cada time
  }

  // Cria o cartão para cada time
  criarCartao(time) {
    const cartao = this.criarElementosCartao(time);
    this.container.appendChild(cartao);
    this.adicionarEventos(cartao, time); // Adicionar eventos ao cartão
  }

  // Cria os elementos do cartão de um time
  criarElementosCartao(time) {
    const cartao = document.createElement('div');
    cartao.classList.add('cartao');
    cartao.style.backgroundColor = time.corDeFundo;

    // Conteúdo do cartão com pontuação e botões de pontos
    cartao.innerHTML = ` 
      <button class="botao-desfazer" title="Desfazer último ponto">
        <img src="https://img.icons8.com/material-outlined/24/000000/undo.png" alt="Desfazer">
      </button>
      <span class="pontuacao" style="color: ${time.corTexto};">${time.pontuacao}</span>
      <div class="container-botao">
        ${this.opcoesPontos.map(pontos => this.criarBotaoPontos(pontos)).join('')}
      </div>
    `;
    return cartao;
  }

  // Cria os botões de pontos
  criarBotaoPontos(pontos) {
    return `<button class="botao botao-fazer" data-valor="${pontos}">${pontos}</button>`;
  }

  // Adiciona os eventos aos botões de cada cartão
  adicionarEventos(cartao, time) {
    const botaoDesfazer = cartao.querySelector('.botao-desfazer');
    botaoDesfazer.addEventListener('click', () => this.desfazerPontos(time, cartao));
    
    const botoes = cartao.querySelectorAll('.botao');
    botoes.forEach(botao => 
      botao.addEventListener('click', () => this.adicionarPontos(time, parseInt(botao.dataset.valor), cartao, botao))
    );
  }

  // Atualiza a pontuação exibida no cartão
  atualizarPontuacao(cartao, time) {
    const pontuacaoElemento = cartao.querySelector('.pontuacao');
    this.animarElemento(pontuacaoElemento, () => {
      pontuacaoElemento.textContent = time.pontuacao;
    });
  }

  // Adiciona pontos ao time e atualiza a pontuação
  adicionarPontos(time, pontos, cartao, botao) {
    time.adicionarPontos(pontos);
    this.atualizarPontuacao(cartao, time);
    this.animarBotao(botao);
  }

  // Desfaz os pontos e atualiza a pontuação
  desfazerPontos(time, cartao) {
    time.desfazerPontos();
    this.atualizarPontuacao(cartao, time);
    this.animarBotao(cartao.querySelector('.botao-desfazer'));
  }

  // Anima um elemento (como a pontuação ou o botão)
  animarElemento(elemento, callback) {
    elemento.style.transform = 'scale(0.95)';
    setTimeout(() => {
      callback();
      elemento.style.transform = 'scale(1)';
    }, 100);
  }

  // Anima o botão (quando é pressionado)
  animarBotao(botao) {
    this.animarElemento(botao, () => {});
  }
}

// ===============================
// Configuração dos times e pontos
// ===============================

const configuracao = {
  times: [
    { id: 'time1', nome: 'Time 1', corDeFundo: 'var(--time1-bg)', corTexto: 'var(--time1-cor)' },
    { id: 'time2', nome: 'Time 2', corDeFundo: 'var(--time2-bg)', corTexto: 'var(--time2-cor)' }
  ],
  opcoesPontos: [5, 10, 20, 50]
};

// ===============================
// Inicialização do jogo
// ===============================

// Iniciar o jogo com a configuração definida
const jogo = new Jogo(configuracao.times, configuracao.opcoesPontos, 'container-cartoes');
jogo.iniciar();





if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('https://store-app.github.io/Placar-Eletronico-de-Domino/service-worker.js')
      .then(registration => console.log('Service Worker registrado com sucesso:', registration))
      .catch(error => console.error('Erro ao registrar o Service Worker:', error));
  });
  }
