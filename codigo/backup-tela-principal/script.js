document.getElementById('feedbackButton').addEventListener('click', function() {
    window.open('Formulario.html', 'FeedbackForm', 'width=600,height=400');
});



//Grafico 1


        // Função para extrair dados do localStorage e processá-los
        function obterDadosGastos() {
            let Novos_Gastos = JSON.parse(localStorage.getItem("Novos_gastos")) || [];
  
            // Processar dados para agrupar por mês e categoria
            let gastosPorMesCategoria = {};
  
            Novos_Gastos.forEach(gasto => {
                let data = gasto.data.split('/');
                let mes = `${data[1]}/${data[2]}`; // Formato MM/YYYY
                let categoria = gasto.categoria;
                let valor = parseFloat(gasto.valor.replace('R$', '').replace('.', '').replace(',', '.'));
  
                if (!gastosPorMesCategoria[mes]) {
                    gastosPorMesCategoria[mes] = {};
                }
  
                if (!gastosPorMesCategoria[mes][categoria]) {
                    gastosPorMesCategoria[mes][categoria] = 0;
                }
  
                gastosPorMesCategoria[mes][categoria] += valor;
            });
  
            return gastosPorMesCategoria;
        }
  
        // Função para criar o gráfico
        function criarGrafico(gastosPorMesCategoria) {
            let ctx = document.getElementById('graficoGastos').getContext('2d');
  
            let meses = Object.keys(gastosPorMesCategoria).sort();
            let categorias = new Set();
  
            meses.forEach(mes => {
                Object.keys(gastosPorMesCategoria[mes]).forEach(categoria => {
                    categorias.add(categoria);
                });
            });
  
            categorias = Array.from(categorias).sort();
  
            // Definir cores específicas para cada categoria
            const coresCategorias = {
                'Alimentação': '#662400',
                'Estudos': '#B33F00',
                'Lazer': '#FF6B1A',
                'Moradia': '#006663',
                'Transporte': '#00B3AD',
                'Saúde': '#105DB8'
            };
  
            let datasets = categorias.map(categoria => {
                return {
                    label: categoria,
                    data: meses.map(mes => gastosPorMesCategoria[mes][categoria] || 0),
                    backgroundColor: coresCategorias[categoria] || getRandomColor()
                };
            });
  
            new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: meses,
                  datasets: datasets
              },
                options: {
                    scales: {
                        x: {
                            stacked: true
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Valor gasto (R$)'
                            }
                        }
                    },
                    
                }
            });
        }
  
        // Função para gerar uma cor aleatória
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
  
        // Extrair e processar dados, depois criar o gráfico
        document.addEventListener('DOMContentLoaded', (event) => {
            let gastosPorMesCategoria = obterDadosGastos();
            criarGrafico(gastosPorMesCategoria);
        });

        
//Grafico 2



//mensagem motivacional

