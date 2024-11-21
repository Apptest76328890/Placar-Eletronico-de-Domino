# Placar Eletrônico de Dominó

Um aplicativo web simples e funcional para gerenciar o placar de partidas de dominó. Com suporte offline, este aplicativo pode ser instalado como um PWA (Aplicativo Web Progressivo) e utilizado sem conexão com a internet.

---

## 🔥 Funcionalidades

- **Gerenciamento de placar**: Adicione e desfaça pontos de forma intuitiva.
- **Design responsivo**: Funciona perfeitamente em smartphones, tablets e desktops.
- **Modo offline**: O aplicativo funciona mesmo sem internet, garantindo acessibilidade.
- **PWA**: Instale o aplicativo no dispositivo e utilize-o como um app nativo.

---

## 🚀 Instalação

### 1. Acesse o aplicativo
Abra o link do aplicativo no navegador:  
[Placar Eletrônico de Dominó](https://store-app.github.io/Placar-Eletronico-de-Domino/)

### 2. Instale o aplicativo
1. No navegador, clique no menu (três pontos no canto superior direito).
2. Selecione a opção **Adicionar à tela inicial**.
3. Confirme e o aplicativo será instalado no seu dispositivo.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura do aplicativo.
- **CSS3**: Estilização e layout responsivo.
- **JavaScript**: Lógica de gerenciamento do placar e Service Worker.
- **PWA**: Transformação do site em um aplicativo progressivo.

---

## 📁 Estrutura do Projeto

Todos os arquivos estão na raiz do projeto. Aqui está uma visão geral:

- **index.html**: Página principal do aplicativo.
- **style.css**: Estilos do aplicativo.
- **script.js**: Lógica do placar e registro do Service Worker.
- **service-worker.js**: Cache dos arquivos para uso offline.
- **manifest.json**: Configurações do PWA.
- **Ícones**: Imagens utilizadas para representar o aplicativo em dispositivos.

---

## 🌐 Funcionalidade Offline

O aplicativo utiliza um Service Worker para armazenar os seguintes arquivos no cache:

- `index.html`
- `style.css`
- `script.js`
- `icon-192x192.png`
- `icon-512x512.png`

> **Nota:** O placar e o histórico de pontuação **não** são salvos offline. Eles são resetados ao atualizar ou recarregar a página.

---

## 🖼️ Ícones do Aplicativo

- **192x192**: Ícone para dispositivos móveis.  
- **512x512**: Ícone de alta resolução para telas maiores.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Se você encontrar um problema ou tiver uma ideia para melhorar o projeto, abra uma _issue_ ou envie um _pull request_.

---

## 📄 Licença

Este projeto está sob a licença GNU General Public License v3.0. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---
