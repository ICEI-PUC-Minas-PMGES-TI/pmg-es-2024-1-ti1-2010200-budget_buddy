document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var username = document.getElementById("username").value;
            var senha = document.getElementById("senha").value;
            
            var cadastroData = localStorage.getItem("cadastroData");
            if (cadastroData) {
                cadastroData = JSON.parse(cadastroData);
                if (cadastroData.email === username) {
                    if (cadastroData.senha === senha) {
                        alert("Login bem-sucedido!");
                        window.location.href = "../backup-tela-principal/index.html";
                    } else {
                        alert("Senha incorreta. Por favor, tente novamente.");
                    }
                } else {
                    alert("E-mail não encontrado.");
                }
            } else {
                alert("Não há cadastros armazenados. Por favor, registre-se primeiro.");
            }
        });
    }
});
