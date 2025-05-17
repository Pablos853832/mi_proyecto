// Modo oscuro y funciones comunes
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Verificar preferencia del usuario
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Cargar preferencia guardada o usar la del sistema
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled' || (savedMode === null && prefersDarkMode)) {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    }
    
    // Alternar modo oscuro
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Botón de consejos sobre energía renovable
    const energyTips = [
        "Los paneles solares pueden reducir tu factura eléctrica hasta un 70%.",
        "Un sistema solar bien dimensionado puede pagarse por sí mismo en 5-7 años.",
        "La orientación ideal para paneles solares en el hemisferio sur es hacia el norte.",
        "Mantener limpios los paneles solares puede mejorar su eficiencia hasta un 15%.",
        "Las baterías de litio tienen una vida útil de 10-15 años con mantenimiento adecuado.",
        "La energía solar puede aumentar el valor de tu propiedad.",
        "Los sistemas fotovoltaicos requieren muy poco mantenimiento.",
        "En días nublados, los paneles solares siguen generando energía, aunque en menor cantidad."
    ];
    
    const tipButton = document.getElementById('energyTipButton');
    const tipDisplay = document.getElementById('energyTipDisplay');
    let currentTipIndex = 0;
    
    tipButton.addEventListener('click', function() {
        tipDisplay.textContent = energyTips[currentTipIndex];
        currentTipIndex = (currentTipIndex + 1) % energyTips.length;
    });
    
    // Mostrar el primer consejo al cargar
    tipDisplay.textContent = energyTips[0];
    currentTipIndex = 1;
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Datos mejorados de consumo de energía renovable en Colombia
    const energiaData = {
        años: [1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2021],
        hidroelectrica: [3.54, 6.05, 9.73, 14.45, 18.44, 27.50, 31.99, 30.82, 39.22, 40.56, 44.68, 49.84, 59.86],
        biomasa: [0, 0, 0.19, 0.23, 0.27, 0.27, 0.48, 0.50, 0.50, 1.11, 1.82, 2.82, 2.82],
        solar: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.19, 0.32],
        eolica: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.05, 0.01, 0.06]
    };

    // Datos para el gráfico de participación
    const participacionData = {
        labels: ['Eólica', 'Solar', 'Hidroeléctrica', 'Otras Renovables'],
        values: [0.01, 66.45, 1.49, 1.30],
        colors: ['#FF6B6B', '#FFA500', '#5dc1b9', '#3CB371']
    };

    // Función para crear/actualizar el gráfico de evolución
    function crearGraficoEnergia() {
        const isDark = document.body.classList.contains('dark-mode');
        
        const traces = [
            {
                x: energiaData.años,
                y: energiaData.hidroelectrica,
                name: 'Hidroeléctrica',
                stackgroup: 'one',
                line: {color: isDark ? '#5dc1b9' : '#1f77b4'},
                fill: 'tonexty',
                hovertemplate: '%{y:.2f} TWh<extra>Hidroeléctrica</extra>'
            },
            {
                x: energiaData.años,
                y: energiaData.biomasa,
                name: 'Biomasa',
                stackgroup: 'one',
                line: {color: isDark ? '#3CB371' : '#2ca02c'},
                fill: 'tonexty',
                hovertemplate: '%{y:.2f} TWh<extra>Biomasa</extra>'
            },
            {
                x: energiaData.años,
                y: energiaData.solar,
                name: 'Solar',
                stackgroup: 'one',
                line: {color: isDark ? '#FFA500' : '#ff7f0e'},
                fill: 'tonexty',
                hovertemplate: '%{y:.2f} TWh<extra>Solar</extra>'
            },
            {
                x: energiaData.años,
                y: energiaData.eolica,
                name: 'Eólica',
                stackgroup: 'one',
                line: {color: isDark ? '#FF6B6B' : '#d62728'},
                fill: 'tonexty',
                hovertemplate: '%{y:.2f} TWh<extra>Eólica</extra>'
            }
        ];

        const layout = {
            title: {
                text: 'Evolución del Consumo de Energías Renovables en Colombia (TWh)',
                font: {
                    color: isDark ? '#f1f1f1' : '#333'
                }
            },
            xaxis: {
                title: 'Año',
                gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                tickfont: {color: isDark ? '#f1f1f1' : '#333'}
            },
            yaxis: {
                title: 'Consumo (TWh)',
                gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                tickfont: {color: isDark ? '#f1f1f1' : '#333'}
            },
            showlegend: true,
            hovermode: 'x unified',
            paper_bgcolor: isDark ? '#757575' : 'rgba(0,0,0,0)',
            plot_bgcolor: isDark ? '#757575' : 'rgba(0,0,0,0)',
            legend: {
                font: {color: isDark ? '#f1f1f1' : '#333'},
                orientation: 'h',
                y: -0.2
            },
            margin: {t: 40, b: 80, l: 60, r: 40},
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            }
        };

        const config = {
            responsive: true,
            displayModeBar: true,
            scrollZoom: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['toImage', 'sendDataToCloud']
        };

        // Crear o actualizar el gráfico
        const chartDiv = document.getElementById('energiaChart');
        if (chartDiv.data) {
            Plotly.react('energiaChart', traces, layout, config);
        } else {
            Plotly.newPlot('energiaChart', traces, layout, config);
        }
    }

    // Función para crear/actualizar el gráfico de participación
    function crearGraficoParticipacion() {
        const isDark = document.body.classList.contains('dark-mode');
        
        const data = [{
            type: 'pie',
            labels: participacionData.labels,
            values: participacionData.values,
            marker: {
                colors: isDark ? participacionData.colors.map(color => `${color}CC`) : participacionData.colors
            },
            textinfo: 'percent',
            insidetextorientation: 'radial',
            hovertemplate: '<b>%{label}</b><br>Porcentaje: %{percent}<br>Valor: %{value}%<extra></extra>',
            hole: 0.4,
            rotation: 45
        }];

        const layout = {
            title: {
                text: 'Participación de Energías Renovables en Colombia (%)',
                font: {
                    color: isDark ? '#f1f1f1' : '#333'
                }
            },
            showlegend: true,
            legend: {
                font: {color: isDark ? '#f1f1f1' : '#333'},
                orientation: 'h',
                y: -0.2
            },
            paper_bgcolor: isDark ? '#757575' : 'rgba(0,0,0,0)',
            plot_bgcolor: isDark ? '#757575' : 'rgba(0,0,0,0)',
            margin: {t: 40, b: 80, l: 60, r: 40},
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            }
        };

        const config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false
        };

        // Crear o actualizar el gráfico
        const chartDiv = document.getElementById('participacionChart');
        if (chartDiv.data) {
            Plotly.react('participacionChart', data, layout, config);
        } else {
            Plotly.newPlot('participacionChart', data, layout, config);
        }
    }

    // Crear gráficos iniciales
    crearGraficoEnergia();
    crearGraficoParticipacion();
    
    // Actualizar gráficos cuando cambie el modo oscuro
    darkModeToggle.addEventListener('click', function() {
        setTimeout(() => {
            crearGraficoEnergia();
            crearGraficoParticipacion();
        }, 300);
    });
    
    // Redimensionar gráficos cuando cambie el tamaño de la ventana
    window.addEventListener('resize', function() {
        Plotly.Plots.resize('energiaChart');
        Plotly.Plots.resize('participacionChart');
    });
});

// Datos para el gráfico de producción
const produccionData = {
    labels: ['Eólica', 'Geotérmica', 'Hidroeléctrica', 'Biocombustibles', 'Solar'],
    valores: [0.87, 0, 1598.46, 98.77, 0.84],
    unidades: ['GWh', 'MW', 'GWh', 'Millones de litros', 'GWh'],
    colores: ['#FF6B6B', '#8A2BE2', '#5dc1b9', '#3CB371', '#FFA500']
};

// Función para crear/actualizar el gráfico de producción
function crearGraficoProduccion() {
    const isDark = document.body.classList.contains('dark-mode');
    
    // Preparar texto para las barras
    const textosBarras = produccionData.labels.map((label, i) => 
        `${label}: ${produccionData.valores[i]} ${produccionData.unidades[i]}`);
    
    const data = [{
        type: 'bar',
        x: produccionData.labels,
        y: produccionData.valores,
        text: textosBarras,
        hovertext: textosBarras,
        hovertemplate: '<b>%{x}</b><br>Producción: %{y} %{customdata}<extra></extra>',
        customdata: produccionData.unidades,
        marker: {
            color: isDark ? 
                produccionData.colores.map(color => `${color}CC`) : 
                produccionData.colores,
            line: {
                color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                width: 1
            }
        }
    }];

    const layout = {
        title: {
            text: 'Producción de Energía Renovable por Fuente en Colombia',
            font: {
                color: isDark ? '#f1f1f1' : '#333',
                size: 16
            }
        },
        xaxis: {
            title: {
                text: 'Fuente de energía',
                font: {
                    color: isDark ? '#f1f1f1' : '#333'
                }
            },
            tickfont: {
                color: isDark ? '#f1f1f1' : '#333'
            },
            gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        },
        yaxis: {
            title: {
                text: 'Cantidad producida',
                font: {
                    color: isDark ? '#f1f1f1' : '#333'
                }
            },
            tickfont: {
                color: isDark ? '#f1f1f1' : '#333'
            },
            gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        },
        paper_bgcolor: isDark ? '#757575' : 'rgba(0,0,0,0)',
        plot_bgcolor: isDark ? '#757575' : 'rgba(0,0,0,0)',
        margin: {t: 60, b: 120, l: 80, r: 40},
        hoverlabel: {
            bgcolor: isDark ? '#333' : '#fff',
            font: {
                color: isDark ? '#fff' : '#333'
            }
        },
        annotations: [{
            text: 'Nota: Las unidades de medida varían por fuente (GWh, MW, Millones de litros)',
            showarrow: false,
            x: 0.5,
            y: -0.25,
            xref: 'paper',
            yref: 'paper',
            font: {
                size: 12,
                color: isDark ? '#f1f1f1' : '#666'
            }
        }]
    };

    const config = {
        responsive: true,
        displayModeBar: true,
        scrollZoom: true,
        displaylogo: false
    };

    // Crear o actualizar el gráfico
    const chartDiv = document.getElementById('produccionChart');
    if (chartDiv.data) {
        Plotly.react('produccionChart', data, layout, config);
    } else {
        Plotly.newPlot('produccionChart', data, layout, config);
    }
}

// Actualizar las llamadas iniciales y eventos
crearGraficoProduccion();

darkModeToggle.addEventListener('click', function() {
    setTimeout(() => {
        crearGraficoEnergia();
        crearGraficoParticipacion();
        crearGraficoProduccion();
    }, 300);
});

window.addEventListener('resize', function() {
    Plotly.Plots.resize('energiaChart');
    Plotly.Plots.resize('participacionChart');
    Plotly.Plots.resize('produccionChart');
});

// Datos para el gráfico de capacidad instalada
const capacidadData = {
    años: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    eolica: [0, 0, 0, 0, 0.02, 0.02, 0.03, 0.05], // en GW
    solar: [0, 0.001, 0.003, 0.01, 0.05, 0.15, 0.35, 0.65], // en GW
    geotermica: [0, 0, 0, 0, 0, 0, 0, 0] // en GW
};

// Función para crear/actualizar el gráfico de capacidad instalada
function crearGraficoCapacidad() {
    const isDark = document.body.classList.contains('dark-mode');
    
    const traces = [
        {
            x: capacidadData.años,
            y: capacidadData.eolica,
            name: 'Energía Eólica',
            mode: 'lines+markers',
            line: {
                color: isDark ? '#FF6B6B' : '#d62728',
                width: 3,
                shape: 'spline'
            },
            marker: {
                size: 8,
                symbol: 'circle'
            },
            hovertemplate: '<b>Eólica</b><br>Año: %{x}<br>Capacidad: %{y} GW<extra></extra>'
        },
        {
            x: capacidadData.años,
            y: capacidadData.solar,
            name: 'Energía Solar',
            mode: 'lines+markers',
            line: {
                color: isDark ? '#FFA500' : '#ff7f0e',
                width: 3,
                shape: 'spline'
            },
            marker: {
                size: 8,
                symbol: 'diamond'
            },
            hovertemplate: '<b>Solar</b><br>Año: %{x}<br>Capacidad: %{y} GW<extra></extra>'
        },
        {
            x: capacidadData.años,
            y: capacidadData.geotermica,
            name: 'Energía Geotérmica',
            mode: 'lines+markers',
            line: {
                color: isDark ? '#8A2BE2' : '#9467bd',
                width: 3,
                shape: 'spline'
            },
            marker: {
                size: 8,
                symbol: 'square'
            },
            hovertemplate: '<b>Geotérmica</b><br>Año: %{x}<br>Capacidad: %{y} GW<extra></extra>',
            visible: 'legendonly' // Ocultar inicialmente (opcional)
        }
    ];

    const layout = {
        title: {
            text: 'Evolución de la Capacidad Instalada (GW)',
            font: {
                color: isDark ? '#f1f1f1' : '#333',
                size: 16
            }
        },
        xaxis: {
            title: {
                text: 'Año',
                font: {
                    color: isDark ? '#f1f1f1' : '#333'
                }
            },
            tickmode: 'array',
            tickvals: capacidadData.años,
            tickfont: {
                color: isDark ? '#f1f1f1' : '#333'
            },
            gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            showgrid: true,
            fixedrange: true
        },
        yaxis: {
            title: {
                text: 'Capacidad Instalada (GW)',
                font: {
                    color: isDark ? '#f1f1f1' : '#333'
                }
            },
            tickfont: {
                color: isDark ? '#f1f1f1' : '#333'
            },
            gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            showgrid: true,
            rangemode: 'tozero'
        },
        paper_bgcolor: isDark ? '#757575' : 'rgba(0,0,0,0)',
        plot_bgcolor: isDark ? '#757575' : 'rgba(0,0,0,0)',
        margin: {t: 60, b: 80, l: 80, r: 40},
        hovermode: 'x unified',
        legend: {
            orientation: 'h',
            y: -0.2,
            font: {
                color: isDark ? '#f1f1f1' : '#333'
            }
        },
        transition: {
            duration: 500,
            easing: 'cubic-in-out'
        },
        annotations: [{
            text: 'Fuente: Datos históricos de capacidad instalada en Colombia',
            showarrow: false,
            x: 1,
            y: -0.15,
            xref: 'paper',
            yref: 'paper',
            font: {
                size: 12,
                color: isDark ? '#f1f1f1' : '#666'
            }
        }]
    };

    const config = {
        responsive: true,
        displayModeBar: true,
        scrollZoom: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['toImage', 'sendDataToCloud']
    };

    // Crear o actualizar el gráfico
    const chartDiv = document.getElementById('capacidadChart');
    if (chartDiv.data) {
        Plotly.react('capacidadChart', traces, layout, config);
    } else {
        Plotly.newPlot('capacidadChart', traces, layout, config);
    }
}

// Actualizar las llamadas iniciales y eventos
crearGraficoCapacidad();

darkModeToggle.addEventListener('click', function() {
    setTimeout(() => {
        crearGraficoEnergia();
        crearGraficoParticipacion();
        crearGraficoProduccion();
        crearGraficoCapacidad();
    }, 300);
});

window.addEventListener('resize', function() {
    Plotly.Plots.resize('energiaChart');
    Plotly.Plots.resize('participacionChart');
    Plotly.Plots.resize('produccionChart');
    Plotly.Plots.resize('capacidadChart');
});