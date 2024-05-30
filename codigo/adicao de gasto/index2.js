let Novos_Gastos = [];
let novoGasto = {};

const form = document.querySelector("form");
const nomeInput = document.querySelector("#nomeid");
const InputValor = document.querySelector("#valorid");
const InputData = document.querySelector("#calendario");
const tabela = document.querySelector("tbody");
const categoria = document.querySelector("#categorySelector");

// Função para formatar valor como moeda (Real)
function formatarValorParaMoeda(valor) {
  let valorNum = parseFloat(valor.replace(/[\D]+/g, '')) / 100;
  return valorNum.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

// Event listener para formatar o valor conforme o usuário digita
InputValor.addEventListener('input', (event) => {
  let cursorPos = event.target.selectionStart;
  let valor = event.target.value;

  // Retira todos os caracteres não-numéricos
  valor = valor.replace(/[\D]+/g, '');

  // Formata o valor como moeda
  valor = (valor / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  // Atualiza o campo de valor com o valor formatado
  event.target.value = valor;

  // Coloca o cursor de volta na posição correta
  event.target.setSelectionRange(cursorPos, cursorPos);
});

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
  gerarTabela();
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

  editarBotao.addEventListener("click", (event) => {
    const linha = event.target.parentElement.parentElement;
    editar(linha);
  });

  excluirBotao.addEventListener("click", (event) => {
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

// Função para editar um gasto
function editar(linha) {
  const idOpto = parseInt(linha.id.split("-")[1]);

  let Novos_Gastos = JSON.parse(localStorage.getItem("Novos_gastos")) || [];
  let indiceGastoEditado = buscarGasto(idOpto, Novos_Gastos);

  if (indiceGastoEditado !== -1) {
    // Preencher o formulário com os dados do gasto a ser editado
    const gasto = Novos_Gastos[indiceGastoEditado];
    nomeInput.value = gasto.nome;
    InputValor.value = gasto.valor;
    InputData.value = gasto.data;
    categoria.value = gasto.categoria;

    // Atualizar o botão de criar para salvar a edição
    const criarButton = document.querySelector("#criarButton");
    criarButton.textContent = "Salvar Edição";
    criarButton.onclick = () => salvarEdicao(indiceGastoEditado);
  }
}

// Função para salvar a edição de um gasto
function salvarEdicao(indice) {
  Novos_Gastos[indice] = {
    id: Novos_Gastos[indice].id,
    nome: nomeInput.value.trim(),
    valor: InputValor.value.trim(),
    data: InputData.value.trim(),
    categoria: categoria.value.trim(),
  };

  localStorage.setItem("Novos_gastos", JSON.stringify(Novos_Gastos));

  form.reset();
  gerarTabela();

  // Voltar o botão de salvar para criar novo gasto
  const criarButton = document.querySelector("#criarButton");
  criarButton.textContent = "Adicionar";
  criarButton.onclick = criar;
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

// Inicialize o Flatpickr
flatpickr("#calendario", {
  dateFormat: "d/m/Y", // Formato da data exibida
});
