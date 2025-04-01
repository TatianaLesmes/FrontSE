document.addEventListener('DOMContentLoaded', function () {
    // Mapeo de valores del formulario a los códigos del backend
    const regionMap = {
        'Caribe': 'R1',
        'Insular': 'R2',
        'Pacífica': 'R3',
        'Andina': 'R4',
        'Orinoquía': 'R5',
        'Amazonía': 'R6'
    };

    const pisoTermicoMap = {
        'Cálido': 'Pt1',
        'Templado': 'Pt2',
        'Frío': 'Pt3',
        'Páramo': 'Pt4'
    };

    const tipoSueloMap = {
        'Arcilloso': 'Ts1',
        'Arenoso': 'Ts2',
        'Limoso': 'Ts3',
        'Franco': 'Ts4',
        'Orgánico': 'Ts5',
        'Pedregoso-rocoso': 'Ts6',
        'Salino-sódico': 'Ts7'
    };

    const propositoMap = {
        'Consumo personal': 'Pc1',
        'Venta local': 'Pc2',
        'Exportación': 'Pc3'
    };

    const temperaturaMap = {
        'Cálido: > 24°C': 'Tp1',
        'Templado: > 18°C': 'Tp2',
        'Frío: < 18°C': 'Tp3',
        'Páramo: < 10°C': 'Tp4'
    };

    // Evento para el botón
    document.getElementById('obtenerSeleccion').addEventListener('click', function () {
        const region = document.getElementById('region').value;
        const pisoTermico = document.getElementById('piso').value;
        const tipoSuelo = document.getElementById('suelo').value;
        const precipitacionAnual = parseInt(document.getElementById('precipitacion').value);
        const proposito = document.getElementById('proposito').value;
        const temperatura = document.getElementById('temperatura').value;
    
        // Validar que el valor de precipitación sea un número válido
        if (isNaN(precipitacionAnual) || precipitacionAnual < 0) {
            alert("Por favor, ingrese un valor válido para la precipitación anual.");
            return;
        }
    
        // Crear objeto para enviar al backend
        const datos = {
            region: regionMap[region],
            piso_termico: pisoTermicoMap[pisoTermico],
            tipo_suelo: tipoSueloMap[tipoSuelo],
            precipitacion_anual: precipitacionAnual,
            proposito_cultivo: propositoMap[proposito],
            temperatura_prom: temperaturaMap[temperatura]
        };
    
        // Mostrar en pantalla
        const seleccionElement = document.getElementById('seleccion');
        if (seleccionElement) {
            seleccionElement.textContent = JSON.stringify(datos, null, 2);
        } else {
            console.error("El elemento 'seleccion' no existe en el DOM.");
        }
    
        // Enviar al backend
        enviarAlBackend(datos);
    });

    // Función para enviar datos al backend
    function enviarAlBackend(datos) {
        fetch('http://localhost:5000/api/recomendacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                // Aquí puedes mostrar las recomendaciones en la interfaz
                if (data.success) {
                    let html = `<h3>Cultivos recomendados:</h3><ul>`;
                    data.cultivos_recomendados.forEach(cultivo => {
                        html += `<li>${cultivo}</li>`;
                    });
                    html += `</ul>`;
                    document.getElementById('resultado').innerHTML = html;
                } else {
                    document.getElementById('resultado').innerHTML =
                        `<h3>No se encontraron recomendaciones</h3><p>${data.mensaje}</p>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('resultado').innerHTML =
                    `<h3>Error al obtener recomendaciones</h3><p>${error}</p>`;
            });
    }
});