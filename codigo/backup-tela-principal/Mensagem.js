const motivationalMessages = [
    "Mantenha-se atualizado sobre questões financeiras e eduque-se continuamente sobre investimentos, planejamento financeiro e estratégias de economia.",
    "Evite acumular dívidas de cartão de crédito. Pague o saldo total sempre que possível para evitar juros elevados.",
    "Crie uma reserva de emergência para estar preparado para imprevistos financeiros, como despesas médicas inesperadas ou perda de emprego.",
    "Considere investir seu dinheiro de forma inteligente para fazer com que ele trabalhe para você e gere retornos no longo prazo.",
    "Compare preços antes de comprar qualquer coisa. Às vezes, pequenas diferenças podem resultar em grandes economias.",
    "Evite gastos impulsivos. Pense duas vezes antes de fazer uma compra e pergunte a si mesmo se realmente precisa daquilo.",
    "Poupe uma parte de sua renda regularmente, mesmo que seja uma pequena quantia. O hábito de economizar é fundamental.",
    "Estabeleça metas financeiras claras e trabalhe para alcançá-las, seja para economizar para uma emergência ou para uma grande compra.",
    "Priorize o pagamento de dívidas com juros mais altos para economizar no longo prazo.",
    "Faça um orçamento mensal e acompanhe seus gastos para entender para onde vai seu dinheiro.",
    "Nunca é tarde demais para começar a trabalhar na vida que você sempre sonhou. Comece hoje mesmo.",
    "Seja a mudança que você deseja ver no mundo. - Mahatma Gandhi",
    "Não importa quantas vezes você caia, o que importa é quantas vezes você se levanta.",
    "A jornada para o sucesso pode ser árdua, mas cada passo que você dá o aproxima mais de seus objetivos.",
    "Lembre-se sempre: você é mais forte do que pensa e mais capaz do que imagina.",
    "A persistência é o segredo do sucesso. Continue seguindo em frente, mesmo quando parecer difícil.",
    "O sucesso não é final, o fracasso não é fatal: é a coragem de continuar que conta. - Winston Churchill",
    "Acredite em si mesmo, pois você é capaz de superar qualquer desafio que surgir em seu caminho.",
    "Cada novo dia é uma oportunidade para recomeçar e alcançar seus sonhos.",
    "Não deixe que o medo do fracasso o impeça de tentar. Cada obstáculo é uma oportunidade de crescimento.",
    "Acredite que você pode e já estará no meio do caminho."
    ];
  
    // Função para exibir mensagens motivacionais aleatórias
    function displayMotivationalMessage() {
      const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
      const message = motivationalMessages[randomIndex];
      const messageContainer = document.getElementById("motivational-messages");
      const paragraph = document.createElement("p");
      paragraph.textContent = message;
      messageContainer.appendChild(paragraph);
    }
  
    // Exibir uma mensagem motivacional inicial
    displayMotivationalMessage();