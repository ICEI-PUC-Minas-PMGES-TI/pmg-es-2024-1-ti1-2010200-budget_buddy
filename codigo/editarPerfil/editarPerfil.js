document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar os dados do perfil da Local Storage
    function carregarPerfil() {
        const profileData = JSON.parse(localStorage.getItem('profileData'));

        if (profileData) {
            document.getElementById('nome').value = profileData.nome;
            document.getElementById('sobrenome').value = profileData.sobrenome;
            document.getElementById('email').value = profileData.email;
            document.getElementById('telefone').value = profileData.telefone;
            document.getElementById('data').value = profileData.data;
            document.getElementById('bio').value = profileData.bio;
            if (profileData.profilePic) {
                document.getElementById('profilePic').src = profileData.profilePic;
            }
        }
    }

    // Função para salvar os dados do perfil na Local Storage
    function salvarPerfil(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const data = document.getElementById('data').value;
        const bio = document.getElementById('bio').value;
        const profilePic = document.getElementById('profilePic').src;

        const profileData = {
            nome,
            sobrenome,
            email,
            telefone,
            data,
            bio,
            profilePic
        };

        localStorage.setItem('profileData', JSON.stringify(profileData));

        console.log('Perfil salvo com sucesso:', profileData);
        alert('Perfil salvo com sucesso!');
        window.location.href = 'perfil.html';
    }


    carregarPerfil();

    document.getElementById('profileForm').addEventListener('submit', salvarPerfil);

    document.getElementById('profilePicInput').addEventListener('change', function(event) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profilePic').src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    });

    document.getElementById('data').addEventListener('input', function(event) {
        var input = event.target;
        var value = input.value.replace(/\D/g, ''); 

        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        if (value.length > 5) {
            value = value.substring(0, 5) + '/' + value.substring(5, 9);
        }

        input.value = value;
    });
});
