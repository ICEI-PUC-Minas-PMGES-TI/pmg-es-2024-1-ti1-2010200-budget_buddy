//Função para salvarr os dados no LocalStorage
function salvarDados(nome, valor, categoria, data){
    //Verifica se o LocalStorage é supotado pelo navegador
    if(typeof(Storage) !=="undefined"){
        //obtem os dados ja armazenados
        var dadosArmazenados = JSON.parse(localStorage.getItem("dados")) || [];

    //Adiciona novos dados ao array
        dadosArmazenados.push({
            nome: nome,
            valor: valor,
            categoria: categoria,
            data : data

        });

        //salvar a array atualizada no localStorage

        localStorage.setItem("dados", JSON.stringify(dadosArmazenados));
        console.log("Dados salvos com sucesso!");
    } else {
        console.log("LocalStorage não suportado pelo navegador.");
    }
}
flatpickr("#calendario", {
    enableTime: false,
    dateFormat: "d-m-Y",
  
});
document.querySelector('label[for="data"]').addEventListener('click', function() {
    document.getElementById('data').value = '12';
  });
  document.querySelector('label[for="valor"]').addEventListener('click', function() {
    document.getElementById('valor').value = '11';
  });
  document.querySelector('label[for="nome"]').addEventListener('click', function() {
    document.getElementById('nome').value = '10';
  });
  document.querySelector('label[for="data"]').addEventListener('click', function() {
    document.getElementById('data').value = 'Texto preenchido via JavaScript!';
  });

//Exemplo de uso da funçao
//var nome = prompt("Insira o nome do gasto");
//var valor = prompt("Insira o valor do gasto:");
//var data = prompt("Escolha uma data");
//var categoria = prompt("Escolha uma categoria");

