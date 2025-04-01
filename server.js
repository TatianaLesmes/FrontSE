const express = require('express');
const cors = require('cors');
const path = require('path'); // Importar el módulo path

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Servir el archivo HTML
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
