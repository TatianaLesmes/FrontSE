document.getElementById('obtenerSeleccion').addEventListener('click', function() {
    const seleccion = {
        'Región': document.getElementById('region').value,
        'Piso térmico': document.getElementById('piso').value,
        'Tipo de suelo': document.getElementById('suelo').value,
        'Precipitación anual': document.getElementById('precipitacion').value,
        'Temperatura promedio': document.getElementById('temperatura').value,
        'Propósito del cultivo': document.getElementById('proposito').value
    };

    // Mostrar la selección en el área de resultados
    const resultado = document.getElementById('seleccion');
    resultado.textContent = JSON.stringify(seleccion, null, 4);
});
