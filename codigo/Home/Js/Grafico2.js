var data = {
    datasets: [{
        data: [300, 1400, 300, 400, 1700],
        backgroundColor: ["#E5E729", "#9FD52C", "#008F57", "#007561", "#2F4858"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#5AD3D1", "#5AD3D1", "#FFC870"]
    }],
    labels: ["Saúde", "Moradia", "Transporte", "Alimentação", "Estudos"]
};


var ctx = document.getElementById("Graf2").getContext("2d");


new Chart(ctx, {
    type: 'pie',
    data: data
});