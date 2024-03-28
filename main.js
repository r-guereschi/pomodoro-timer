const html = document.querySelector("html");
const botaoFoco = document.querySelector(".app__card-button--foco");
const botaoCurto = document.querySelector(".app__card-button--curto");
const botaoLongo = document.querySelector(".app__card-button--longo");
const bannerFoto = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const titleStrong = document.querySelector(".app__title-strong");
const botoes = document.querySelectorAll(".app__card-button");
const song = new Audio("sons/luna-rise-part-one.mp3");
const play = new Audio("sons/play.wav");
const pause = new Audio("sons/pause.mp3");
const beep = new Audio("sons/beep.mp3");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const startPauseImg = document.querySelector(".app__card-primary-butto-icon");
const timer = document.getElementById("timer");

const checkBox = document.getElementById("alternar-musica");
const startPauseBt = document.getElementById("start-pause");
song.loop = true;

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

checkBox.addEventListener("change", () => {
  if (song.paused) {
    song.play();
  } else {
    song.pause();
  }
});

botaoFoco.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 5;
  alterarContexto("foco");
  botaoFoco.classList.add("active");
});

botaoCurto.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 2;
  alterarContexto("descanso-curto");
  botaoCurto.classList.add("active");
});

botaoLongo.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 3;
  alterarContexto("descanso-longo");
  botaoLongo.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  bannerFoto.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      title.innerHTML = `Otimize sua produtividade,<br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      title.innerHTML = `Que tal dar uma respirada? <br />
      <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      title.innerHTML = `Hora de voltar à superfície. <br />
      <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    beepAudio();
    //alert("Tempo finalizado");
    const focoAtivo = html.getAttribute("data-contexto") == "foco";
    if (focoAtivo) {
      const evento = new CustomEvent("FocoFinalizado");
      document.dispatchEvent(evento)
    }
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarPausar);

function iniciarPausar() {
  if (intervaloId) {
    pauseAudio();
    zerar();
    return;
  }
  playAudio();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
  startPauseImg.src = "imagens/pause.png";
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  startPauseImg.src = "imagens/play_arrow.png";
  intervaloId = null;
}

function playAudio() {
  play.play();
}

function pauseAudio() {
  pause.play();
}

function beepAudio() {
  beep.play();
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  timer.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
