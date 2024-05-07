$(document).ready(function(){
    $('.carousel').carousel();
});



var ctx = document.getElementById("myChart").getContext("2d");

var data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
    datasets: [
        {
            label: "Despesas",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            borderColor: "rgba(255, 0, 0, 0.8)",
            borderWidth: 1,
            data: [2800, 2600, 2400, 2200, 2000, 1800, 1600]
        },
        {
            label: "Renda líquida",
            backgroundColor: "rgba(0, 128, 0, 0.5)",
            borderColor: "rgba(0, 128, 0, 0.8)",
            borderWidth: 1,
            data: [24, 224, 424, 624, 824, 1024, 1224]
        }
    ]
};

var config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

var myChart = new Chart(ctx, config);


