const html = document.querySelector("html");
const botaoFoco = document.querySelector(".app__card-button--foco");
const botaoCurto = document.querySelector(".app__card-button--curto");
const botaoLongo = document.querySelector(".app__card-button--longo");
const bannerFoto = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const titleStrong = document.querySelector(".app__title-strong");
const botoes = document.querySelectorAll(".app__card-button");

botaoFoco.addEventListener("click", () => {
  alterarContexto("foco");
  botaoLongo.classList.remove("active");
  botaoCurto.classList.remove("active");
  botaoFoco.classList.add("active");
});

botaoCurto.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  botaoLongo.classList.remove("active");
  botaoCurto.classList.add("active");
  botaoFoco.classList.remove("active");
});

botaoLongo.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  botaoLongo.classList.add("active");
  botaoCurto.classList.remove("active");
  botaoFoco.classList.remove("active");
});

function alterarContexto(contexto) {
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
