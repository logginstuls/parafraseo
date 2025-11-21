// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
// Permite peticiones CORS desde cualquier origen (necesario para Render/frontend)
app.use(cors()); 
// Permite que el servidor lea los datos JSON enviados en el cuerpo de la petición
app.use(express.json());

// --- LÓGICA DE PARAFRASEO ---
//⚠️ NOTA CRÍTICA: Aquí es donde integrarías una API de PLN real.
// Ejemplos: Usar 'axios' para llamar a la API de OpenAI, Cohere, o Hugging Face.
function paraphraseText(originalText) {
    // ESTA ES UNA IMPLEMENTACIÓN SIMPLIFICADA SÓLO PARA DEMOSTRACIÓN.
    // Simula una pequeña reestructuración y añade una variación.

    let paraphrased = originalText.trim();
    
    // 1. Reemplazo simple para "Parafraseo"
    paraphrased = paraphrased.replace(/te escribimos para informar/g, 'deseamos comunicarte');
    
    // 2. Adición de una frase inicial aleatoria para variación (simulando "entropía" del texto)
    const variations = [
        "Estimado cliente, ",
        "Queremos contarte algo importante: ",
        "Presta atención, "
    ];
    const prefix = variations[Math.floor(Math.random() * variations.length)];

    return prefix + paraphrased;
}

// --- RUTA API PARA EL PARAFRASEO ---
app.post('/paraphrase', (req, res) => {
    const inputText = req.body.text;

    if (!inputText) {
        return res.status(400).json({ error: 'Falta el campo de texto en el cuerpo de la petición.' });
    }

    // Llama a la función de parafraseo
    const paraphrased = paraphraseText(inputText);

    // Envía el resultado al frontend
    res.json({ success: true, original: inputText, paraphrased: paraphrased });
});

// Ruta de prueba simple
app.get('/', (req, res) => {
    res.send('Servidor de Parafraseo Activo. Usa la ruta /paraphrase con POST.');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Node corriendo en http://localhost:${port}`);
});