// server.js (Lógica mejorada para alta variabilidad)
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); 
app.use(express.json());

// --- LÓGICA DE PARAFRASEO CON ALTA ENTROPÍA ---
// ⚠️ NOTA CRÍTICA: Aquí es donde integrarías una API de PLN real.
// Para simular 100,000 variaciones, usaremos Múltiples Tablas de Reemplazo.

// 1. TABLAS DE SINÓNIMOS Y VARIACIONES (Para la parte central del cuerpo)
const synonymMap = {
    "te escribimos para informar": [
        "deseamos comunicarte", 
        "nos dirigimos a usted para notificar", 
        "queremos ponerle al tanto de", 
        "es nuestra obligación informarle"
    ],
    "compra exitosa": [
        "adquisición completada",
        "transacción finalizada",
        "pedido procesado",
        "orden de compra exitosa"
    ],
    "tu cuenta": [
        "su perfil", 
        "su registro", 
        "la cuenta vinculada"
    ],
    "por favor, presta atención": [
        "es crucial que revise", 
        "le solicitamos encarecidamente revisar", 
        "es vital que verifique"
    ],
    "podrás cancelar": [
        "tendrá la opción de anular", 
        "podrá rechazar",
        "le permitimos invalidar"
    ],
    "en caso de no reconocerla": [
        "si no identifica la acción", 
        "en caso de desconocer esta operación",
        "si le resulta extraña"
    ]
};

// 2. VARIACIONES DE APERTURA (Prefijos)
const openingVariations = [
    "Estimado cliente, ",
    "Queremos contarte algo importante: ",
    "Presta atención, ",
    "Saludos cordiales, ",
    "Le enviamos este mensaje para informarle: "
];

// 3. VARIACIONES DE CIERRE (Sufijos)
const closingVariations = [
    "Gracias por su comprensión. ",
    "Quedamos a la espera de su respuesta. ",
    "Cualquier duda, estamos a su disposición. ",
    "Agradecemos su preferencia y atención. "
];


function paraphraseText(originalText) {
    let paraphrased = originalText.trim();
    
    // 1. Aplicar Reemplazos Múltiples
    for (const key in synonymMap) {
        if (paraphrased.includes(key)) {
            // Seleccionar un reemplazo aleatorio del array de sinónimos
            const variations = synonymMap[key];
            const randomReplacement = variations[Math.floor(Math.random() * variations.length)];
            
            // Reemplazar todas las ocurrencias del patrón
            paraphrased = paraphrased.split(key).join(randomReplacement);
        }
    }
    
    // 2. Añadir variación de apertura (prefix)
    const prefix = openingVariations[Math.floor(Math.random() * openingVariations.length)];
    
    // 3. Añadir variación de cierre (suffix)
    const suffix = closingVariations[Math.floor(Math.random() * closingVariations.length)];

    return prefix + paraphrased + ". " + suffix;
}

// --- RUTA API PARA EL PARAFRASEO ---
app.post('/paraphrase', (req, res) => {
    // Código para manejar la solicitud
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
