let Novos_Gastos = [];
let novoGasto = {};

const form = document.querySelector("form");
const nomeInput = document.querySelector("#nomeid");
const InputValor = document.querySelector("#valorid");
const InputData = document.querySelector("#calendario");
const tabela = document.querySelector("tbody");
const categoria = document.querySelector("#categorySelector");


// Função para criar um novo gasto
function criar() {
  novoGasto = {
    id: criarID(),
    nome: nomeInput.value.trim(),
    valor: InputValor.value.trim(),
    data: InputData.value.trim(),
    categoria: categoria.value.trim(),
  };

  Novos_Gastos = JSON.parse(localStorage.getItem("Novos_gastos")) || [];
  Novos_Gastos.push(novoGasto);
  localStorage.setItem("Novos_gastos", JSON.stringify(Novos_Gastos));

  form.reset();
}

// Função para gerar um ID único
function criarID() {
  let id = parseInt(localStorage.getItem("id")) || 0;
  id += 1;
  localStorage.setItem("id", id);
  return id;
}

// Função para gerar a tabela de gastos
function gerarTabela() {
  Novos_Gastos = JSON.parse(localStorage.getItem("Novos_gastos")) || [];

  tabela.innerHTML = ""; // Limpar a tabela antes de gerar novamente

  Novos_Gastos.forEach(gasto => {
    let tr = document.createElement("tr");
    tr.id = `Novos_gastos-${gasto.id}`;

    Object.values(gasto).forEach(valor => {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    });

    let tdAcao = criarBotoes();
    tr.appendChild(tdAcao);

    tabela.appendChild(tr);
  });
}

// Função para criar botões de ação (editar e excluir)
function criarBotoes() {
  const td = document.createElement("td");

  const editarBotao = gerarBotao("Editar");
  const excluirBotao = gerarBotao("Excluir");

  editarBotao.addEventListener("click", () => {
    // Implemente o que deseja fazer ao clicar em editar
    const linha = event.target.parentElement.parentElement;
    const caixa = linha.childNodes;
    let id = parseInt(caixa[0].innerText);

    sessionStorage.setItem("idnovogasto", id);
  });

  excluirBotao.addEventListener("click", () => {
    // Implemente o que deseja fazer ao clicar em excluir
    const linha = event.target.parentElement.parentElement;
    excluir(linha);
  });

  td.appendChild(editarBotao);
  td.appendChild(excluirBotao);
  return td;
}

// Função para gerar botões
function gerarBotao(texto) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = texto;
  return botao;
}

// Função para excluir um gasto
function excluir(linha) {
  const idOpto = parseInt(linha.id.split("-")[1]);

  let Novos_Gastos = JSON.parse(localStorage.getItem("Novos_gastos")) || [];
  let indiceGastoExcluido = buscarGasto(idOpto, Novos_Gastos);
  let confirmar = confirm("Deseja excluir o gasto?");

  if (confirmar) {
    Novos_Gastos.splice(indiceGastoExcluido, 1);
    localStorage.setItem("Novos_gastos", JSON.stringify(Novos_Gastos));
    linha.remove();
  }
}

// Função para buscar um gasto pelo ID
function buscarGasto(id, novoGasto) {
  for (let i = 0; i < novoGasto.length; i++) {
    if (novoGasto[i].id == id)
      return i;
  }
  return -1;
}

// Carregar dados da tabela ao carregar a página
window.addEventListener("load", () => {
  gerarTabela();
});
//calendário 
// Inicialize o Flatpickr
flatpickr("#calendario", {
  // Opções adicionais, se necessário
  dateFormat: "d/m/Y", // Formato da data exibida
  // Adicione mais opções conforme necessário
});