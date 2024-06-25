// Função para criar os cards com base nos dados do localStorage
function criarCards() {
    const Novos_meta = JSON.parse(localStorage.getItem("Novos_meta")) || [];
  
    // Seleciona o container onde os cards serão inseridos
    const cardsContainer = document.getElementById("cardsContainer");
  
    // Limpa o container antes de gerar os novos cards
    cardsContainer.innerHTML = "";
  
    Novos_meta.forEach(meta => {
        // Cria um card Bootstrap
        const card = document.createElement("div");
        card.classList.add("card", "text-center", "m-3", "p-4");
  
        // Cria um círculo para exibir a quantidade de parcelas
        const circle = document.createElement("div");
        circle.classList.add("rounded-circle", "#006663", "text-white", "p-3", "mb-3", "d-flex", "justify-content-center", "align-items-center");
        circle.style.width = "100px";
        circle.style.height = "100px";
        circle.style.fontSize = "24px";
        circle.style.lineHeight = "1.6";
        circle.style.backgroundColor = "#006663"; // Define a cor de fundo do círculo
        
        // Adiciona o texto dentro do círculo
        const circleText = document.createElement("span");
        circleText.textContent = meta.categoria; // Define o texto do círculo como a categoria
        circle.appendChild(circleText); // Adiciona o texto ao círculo
  
        // Adiciona o círculo ao card
        card.appendChild(circle);
  
        // Adiciona o nome da meta abaixo do círculo
        const nomeMeta = document.createElement("h5");
        nomeMeta.classList.add("card-title", "mt-3");
        nomeMeta.textContent = meta.nome;
        card.appendChild(nomeMeta);
  
        // Adiciona o card ao container de cards
        cardsContainer.appendChild(card);
    });
}

// Evento para gerar os cards ao carregar a página
window.addEventListener("load", () => {
    criarCards();
});
