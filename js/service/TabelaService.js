/**
 * Classe responsavel por gerenciar a tabela de marcações
 */

class TabelaService {
    
    constructor(context) {
        this._charts = [];
    }


    atualiza() {
        this._charts.forEach(c => c.destroy());
        this._charts[0] = this.criaTabela($("#canvas__iri").getContext("2d"), "IRI", "rgba(0, 0, 255, 1)", 10, 5);
        this._charts[1] = this.criaTabela($("#canvas__flecha").getContext("2d"), "Flecha", "rgba(255, 0, 0, 0.7)", 25, 5);
    }


    adicionaIRI(x, y) {
        this.__adicionaDadosNaTabela(x, y, 0);
    }

    
    adicionaFlecha(x, y) {
        this.__adicionaDadosNaTabela(x, y, 1);
    }


    __adicionaDadosNaTabela(x, y, index) {
        this._charts[index].data.labels.push(x);
        this._charts[index].data.datasets[1].data.push(y);
        this._charts[index].update();
    }

    moveKmNaTabela(km) {
        this._charts.forEach(c => {
            c.data.datasets[0].data[0].x = km;
            c.data.datasets[0].data[1].x = km;
            c.update();
        })
    }


    criaTabela(context, titulo, rgba, maxValue, stepY) {
        return new Chart(context, {
            type: "scatter", // Alteração aqui
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Posição atual",
                        type: "line",
                        pointRadius: 0,
                        borderColor: "rgba(0, 0, 0, 1)",
                        borderWidth: 2,
                        data: [{ x: this.interval, y: 0 }, { x: this.interval, y: 25 }],
                    },
                    {
                        label: titulo,
                        type: "line",
                        pointRadius: 0,
                        borderColor: rgba,
                        borderWidth: 2,
                        data: [],
                    },
                ],
            },
            options: {
                plugins: {
                  legend: {
                    display: true,
                    position: 'chartArea',
                    labels: {
                      usePointStyle: false,
                      boxWidth: 18,
                      boxHeight: 0
                    }
                  }
                },
                scales: {
                  x: {
                    min: 0,
                    ticks: {
                      beginAtZero: true,
                      stepSize: this.interval/10
                    },
                  },
                  y: {
                    min: 0,
                    max: maxValue,
                    ticks: {
                      beginAtZero: true,
                      stepSize: stepY,
                    },
                  },
                },
                animation: false,
                pointStyle: 'rectRounded',
                pointRadius: 12,
              },
        });
    }
    
}
