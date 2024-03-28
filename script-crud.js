const btnAddTarefa = document.querySelector(".app__button--add-task");
const formAddTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const ulTarefas = document.querySelector(".app__section-task-list");
const pDescricaoTarefa = document.querySelector(
  ".app__section-active-task-description"
);

const btnRemoverConcluidas = document.querySelector("#btn-remover-concluidas");
const btnRemoverTodas = document.querySelector("#btn-remover-todas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.classList.add("app__section-task-icon-status");
  svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
  `;

  const p = document.createElement("p");
  p.classList.add("app__section-task-list-item-description");
  p.textContent = tarefa.descricao;

  const button = document.createElement("button");
  const buttonImage = document.createElement("img");
  button.classList.add("app_button-edit");

  button.onclick = () => {
    //debugger
    const novaDescricao = prompt("Qual é o novo nome da tarefa?");
    //console.log("Nova descrição da tarefa: ", novaDescricao);
    if (novaDescricao) {
      p.textContent = novaDescricao;
      tarefa.descricao = novaDescricao;
      atualizarTarefas();
    }
  };

  buttonImage.setAttribute("src", "/imagens/edit.png");
  button.append(buttonImage);

  li.append(svg);
  li.append(p);
  li.append(button);

  if (tarefa.completa) {
    li.classList.add("app__section-task-list-item-complete");
    button.setAttribute("disabled", "disabled");
  } else {
    li.onclick = () => {
      document
        .querySelectorAll(".app__section-task-list-item-active")
        .forEach((elemento) => {
          elemento.classList.remove("app__section-task-list-item-active");
        });
      if (tarefaSelecionada == tarefa) {
        pDescricaoTarefa.textContent = "";
        tarefaSelecionada = null;
        liTarefaSelecionada = null;
        return;
      }
      tarefaSelecionada = tarefa;
      liTarefaSelecionada = li;
      pDescricaoTarefa.textContent = tarefa.descricao;
      li.classList.add("app__section-task-list-item-active");
    };
  }

  return li;
}

btnAddTarefa.addEventListener("click", () => {
  formAddTarefa.classList.toggle("hidden");
});

formAddTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const tarefa = {
    descricao: textArea.value,
  };
  tarefas.push(tarefa);
  const elementoTarefa = criarElementoTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
  atualizarTarefas();
  textArea.value = "";
  formAddTarefa.classList.add("hidden");
});

tarefas.forEach((tarefa) => {
  const elementoTarefa = criarElementoTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
});

document.addEventListener("FocoFinalizado", () => {
  if (tarefaSelecionada && liTarefaSelecionada) {
    liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
    liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    liTarefaSelecionada
      .querySelector("button")
      .setAttribute("disabled", "disabled");
    tarefaSelecionada.completa = true;
    atualizarTarefas();
  }
});

const removerTarefas = (somenteCompletas) => {
  //   const seletor = somenteCompletas
  //     ? ".app__section-task-list-item-complete"
  //     : "app__section-task-list-item";
  let seletor = ".app__section-task-list-item";
  if (somenteCompletas) {
    seletor = ".app__section-task-list-item-complete";
  }
  document.querySelectorAll(seletor).forEach((elemento) => {
    elemento.remove();
  });
  tarefas = somenteCompletas
    ? tarefas.filter((tarefa) => !tarefa.completa)
    : [];
  atualizarTarefas();
};

btnRemoverConcluidas.onclick = () => removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);
