document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar os dados do perfil da Local Storage
    function carregarPerfil() {
        const profileData = JSON.parse(localStorage.getItem('profileData'));

        if (profileData) {
            document.getElementById('nomeCompleto').textContent = profileData.nome + " " + profileData.sobrenome;
            document.getElementById('email').textContent = profileData.email;
            document.getElementById('telefone').textContent = profileData.telefone;
            document.getElementById('data').textContent = profileData.data;
            document.getElementById('bio').textContent = profileData.bio;
            if (profileData.profilePic) {
                document.getElementById('profilePic').src = profileData.profilePic;
            }
        }
    }

    // Carregar o perfil ao carregar a página
    carregarPerfil();
});