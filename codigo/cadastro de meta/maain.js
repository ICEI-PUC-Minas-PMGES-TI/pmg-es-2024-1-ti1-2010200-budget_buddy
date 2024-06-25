let Novos_meta = [];

const form = document.querySelector("form");
const nomeInput = document.querySelector("#nomeid");
const InputValor = document.querySelector("#valorid");
const InputData = document.querySelector("#calendario");
const InputDataFinal = document.querySelector("#calendariofim");
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
  let novoGasto = {
    id: criarID(),
    nome: nomeInput.value.trim(),
    valor: InputValor.value.trim(),
    inicio: InputData.value.trim(),
    final: InputDataFinal.value.trim(),
    categoria: categoria.value.trim(),
  };

  Novos_meta = JSON.parse(localStorage.getItem("Novos_meta")) || [];
  Novos_meta.push(novoGasto);
  localStorage.setItem("Novos_meta", JSON.stringify(Novos_meta));

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
  Novos_meta = JSON.parse(localStorage.getItem("Novos_meta")) || [];

  tabela.innerHTML = ""; // Limpar a tabela antes de gerar novamente

  Novos_meta.forEach(gasto => {
    let tr = document.createElement("tr");
    tr.id = `Novos_meta-${gasto.id}`;

    Object.values(gasto).forEach(valor => {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    });

    let tdAcao = criarBotoes(gasto.id);
    tr.appendChild(tdAcao);

    tabela.appendChild(tr);
  });
}

// Função para criar botões de ação (editar e excluir)
function criarBotoes(id) {
  const td = document.createElement("td");

  const editarBotao = gerarBotao("Editar");
  const excluirBotao = gerarBotao("Excluir");

  editarBotao.addEventListener("click", () => editar(id));
  excluirBotao.addEventListener("click", () => excluir(id));

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
function editar(id) {
  let indiceGastoEditado = Novos_meta.findIndex(gasto => gasto.id === id);

  if (indiceGastoEditado !== -1) {
    // Preencher o formulário com os dados do gasto a ser editado
    const gasto = Novos_meta[indiceGastoEditado];
    nomeInput.value = gasto.nome;
    InputValor.value = gasto.valor;
    InputData.value = gasto.inicio;
    categoria.value = gasto.categoria;
    InputDataFinal.value = gasto.final;

    // Atualizar o botão de criar para salvar a edição
    const criarButton = document.querySelector("#criarButton");
    criarButton.textContent = "Salvar Edição";
    criarButton.onclick = () => salvarEdicao(indiceGastoEditado);
  }
}

// Função para salvar a edição de um gasto
function salvarEdicao(indice) {
  Novos_meta[indice] = {
    id: Novos_meta[indice].id,
    nome: nomeInput.value.trim(),
    valor: InputValor.value.trim(),
    inicio: InputData.value.trim(),
    final: InputDataFinal.value.trim(),
    categoria: categoria.value.trim(),
  };

  localStorage.setItem("Novos_meta", JSON.stringify(Novos_meta));

  form.reset();
  gerarTabela();

  // Voltar o botão de salvar para criar novo gasto
  const criarButton = document.querySelector("#criarButton");
  criarButton.textContent = "Adicionar";
  criarButton.onclick = criar;
}

// Função para excluir um gasto
function excluir(id) {
  let confirmar = confirm("Deseja excluir o gasto?");

  if (confirmar) {
    Novos_meta = Novos_meta.filter(gasto => gasto.id !== id);
    localStorage.setItem("Novos_meta", JSON.stringify(Novos_meta));
    gerarTabela();
  }
}

// Carregar dados da tabela ao carregar a página
window.addEventListener("load", () => {
  gerarTabela();
});

// Inicialize o Flatpickr
flatpickr("#calendario", {
  dateFormat: "d/m/Y", // Formato da data exibida
});
flatpickr("#calendariofim", {
  dateFormat: "d/m/Y", // Formato da data exibida
});
