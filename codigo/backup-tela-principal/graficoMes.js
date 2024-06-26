// Função para extrair dados do localStorage e processá-los
function obterDadosGastosPorMes() {
    let Novos_Gastos = JSON.parse(localStorage.getItem("Novos_gastos")) || [];

    // Processar dados para agrupar por mês
    let gastosPorMes = {};

    Novos_Gastos.forEach(gasto => {
        let data = gasto.data.split('/');
        let mes = parseInt(data[1], 10); // Número do mês
        let ano = data[2]; // Ano
        let valor = parseFloat(gasto.valor.replace('R$', '').replace('.', '').replace(',', '.'));

        let mesAno = `${ano}-${mes}`; // Formato YYYY-MM para facilitar ordenação

        if (!gastosPorMes[mesAno]) {
            gastosPorMes[mesAno] = 0;
        }

        gastosPorMes[mesAno] += valor;
    });

    return gastosPorMes;
}

// Função para converter número do mês para nome do mês
function obterNomeMes(numeroMes) {
    const nomesMeses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return nomesMeses[numeroMes - 1];
}

// Função para criar o gráfico
function criarGraficoMes(gastosPorMes) {
    let ctx = document.getElementById('graficoMes').getContext('2d');

    let mesesOrdenados = Object.keys(gastosPorMes).sort(); // Formato YYYY-MM
    let labels = mesesOrdenados.map(mesAno => {
        let [ano, mes] = mesAno.split('-');
        return `${obterNomeMes(parseInt(mes, 10))} ${ano}`;
    });
    let valores = mesesOrdenados.map(mesAno => gastosPorMes[mesAno]);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gastos Totais',
                data: valores,
                backgroundColor: 'rgba(240, 128, 128, 1)',
                borderColor: 'rgba(192, 75, 75, 1)', // Vermelho mais escuro

                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor gasto (R$)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Extrair e processar dados, depois criar o gráfico
document.addEventListener('DOMContentLoaded', (event) => {
    let gastosPorMes = obterDadosGastosPorMes();
    criarGraficoMes(gastosPorMes);
});
