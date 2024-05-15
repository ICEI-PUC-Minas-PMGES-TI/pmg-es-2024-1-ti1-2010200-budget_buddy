document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var username = document.getElementById("username").value;
            var senha = document.getElementById("senha").value;

            // Recuperar dados de cadastro armazenados no localStorage
            var cadastroData = localStorage.getItem("cadastroData");
            if (cadastroData) {
                cadastroData = JSON.parse(cadastroData);
                if (cadastroData.email === username || cadastroData.nomeUsuario === username) {
                    if (cadastroData.senha === senha) {
                        alert("Login bem-sucedido!");
                        // Aqui você pode redirecionar o usuário para a página inicial, por exemplo
                        window.location.href = "pagina_inicial.html";
                    } else {
                        alert("Senha incorreta. Por favor, tente novamente.");
                    }
                } else {
                    alert("Nome de usuário/e-mail não encontrado. Por favor, registre-se primeiro.");
                }
            } else {
                alert("Não há cadastros armazenados. Por favor, registre-se primeiro.");
            }
        });
    }
});
