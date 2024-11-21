// Solicitar Wake Lock para manter a tela ativa
if ('wakeLock' in navigator) {
  let wakeLock = null;

  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Wake Lock ativo!');
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
  };

  requestWakeLock();

  // Atualizar Wake Lock em caso de visibilidade mudar
  document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      requestWakeLock();
    }
  });
}

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
    if (ultimoPonto !== undefined) {
      this.pontuacao -= ultimoPonto;
    }
  }
}

class Jogo {
  constructor(configuracaoTimes, opcoesPontos, idContainer) {
    this.times = configuracaoTimes.map(config => new Time(config));
    this.opcoesPontos = opcoesPontos;
    this.container = document.getElementById(idContainer);
  }

  iniciar() {
    this.container.innerHTML = '';
    this.times.forEach(time => this.criarCartao(time));
  }

  criarCartao(time) {
    const cartao = this.criarElementosCartao(time);
    this.container.appendChild(cartao);
    this.adicionarEventos(cartao, time);
  }

  criarElementosCartao(time) {
    const cartao = document.createElement('div');
    cartao.classList.add('cartao');
    cartao.style.backgroundColor = time.corDeFundo;

    cartao.innerHTML = `
      <button class="botao-desfazer">
        <img src="https://img.icons8.com/material-outlined/24/000000/undo.png" alt="Desfazer">
      </button>
      <span class="pontuacao" style="color: ${time.corTexto};">${time.pontuacao}</span>
      <div class="container-botao">
        ${this.opcoesPontos.map(pontos => this.criarBotaoPontos(pontos)).join('')}
      </div>
    `;
    return cartao;
  }

  criarBotaoPontos(pontos) {
    return `<button class="botao" data-valor="${pontos}">${pontos}</button>`;
  }

  adicionarEventos(cartao, time) {
    cartao.querySelector('.botao-desfazer').addEventListener('click', () => this.desfazerPontos(time, cartao));
    cartao.querySelectorAll('.botao').forEach(botao => {
      botao.addEventListener('click', () => this.adicionarPontos(time, parseInt(botao.getAttribute('data-valor')), cartao));
    });
  }

  atualizarPontuacao(cartao, time) {
    cartao.querySelector('.pontuacao').textContent = time.pontuacao;
  }

  adicionarPontos(time, pontos, cartao) {
    time.adicionarPontos(pontos);
    this.atualizarPontuacao(cartao, time);
  }

  desfazerPontos(time, cartao) {
    time.desfazerPontos();
    this.atualizarPontuacao(cartao, time);
  }
}

const configuracao = {
  times: [
    { id: 'time1', nome: 'Time 1', corDeFundo: 'var(--time1-bg)', corTexto: 'var(--time1-cor)' },
    { id: 'time2', nome: 'Time 2', corDeFundo: 'var(--time2-bg)', corTexto: 'var(--time2-cor)' }
  ],
  opcoesPontos: [5, 10, 20, 50]
};

const jogo = new Jogo(configuracao.times, configuracao.opcoesPontos, 'container-cartoes');
jogo.iniciar();


// Verifica se o navegador suporta Service Workers e registra o Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}
