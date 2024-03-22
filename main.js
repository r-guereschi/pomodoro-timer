const html = document.querySelector("html");
const botaoFoco = document.querySelector(".app__card-button--foco");
const botaoCurto = document.querySelector(".app__card-button--curto");
const botaoLongo = document.querySelector(".app__card-button--longo");
const bannerFoto = document.querySelector(".app__image");

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
}
