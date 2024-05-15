document.addEventListener("DOMContentLoaded", function() {
    var dataNascimentoInput = document.getElementById("dataNascimento");
    if (dataNascimentoInput) {
        dataNascimentoInput.addEventListener("input", function() {
            var inputValue = this.value.replace(/\D/g, '');
            var newValue = '';
            if (inputValue.length > 0) {
                newValue += inputValue.substr(0, 2);
                if (inputValue.length > 2) {
                    newValue += '/' + inputValue.substr(2, 2);
                }
                if (inputValue.length > 4) {
                    newValue += '/' + inputValue.substr(4, 4);
                }
            }
            this.value = newValue;
        });
    }

    var cadastro = document.getElementById("cadastro");
    if (cadastro) {
        cadastro.addEventListener("submit", function(event) {
            event.preventDefault();
            var cadastroData = {
                nome: document.getElementById("nome").value,
                sobrenome: document.getElementById("sobrenome").value,
                dataNascimento: document.getElementById("dataNascimento").value,
                email: document.getElementById("email").value,
                senha: document.getElementById("senha").value,
                receberNotificacoes: document.getElementById("notificacoes").checked
            };
            localStorage.setItem("cadastroData", JSON.stringify(cadastroData));
            alert("Cadastro realizado com sucesso!");
            this.reset();
        });
    }
});

console.log(localStorage.getItem("cadastroData"));
