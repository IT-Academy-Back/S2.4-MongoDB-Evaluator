const { MongoClient } = require("mongodb");
const chalk = require("chalk");

// Configuración de conexión
const MONGO_URI = "mongodb://localhost:27017";
const DATABASE = "nyc";
const COLLECTION = "restaurants";

const fs = require('fs');


// Lista de campos que se recomienda indexar
const recommendedIndexes = ["borough", "cuisine", "name"];

/**
 * Conecta a MongoDB y devuelve la colección
 */
async function getMongoCollection() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DATABASE);
  const collection = db.collection(COLLECTION);
  return { client, collection };
}

/**
 * Analiza el rendimiento de una consulta usando explain
 */
async function analyzeQuery(collection, query) {
  const start = Date.now(); // Tiempo inicial
  const explain = await collection.find(query).explain("executionStats"); // Obtener plan de ejecución
  const end = Date.now(); // Tiempo final

  const execStats = explain.executionStats;
  const planner = explain.queryPlanner.winningPlan;

  const executionTime = end - start;
  const documentsReturned = execStats.nReturned;
  const documentsExamined = execStats.totalDocsExamined;
  const stage = planner.stage || (planner.inputStage && planner.inputStage.stage);

  const issues = [];

  // 🚨 Detectar escaneo completo de colección
  if (stage === "COLLSCAN") {
    issues.push("🚨 La consulta hizo un 'COLLSCAN'. Considera crear un índice.");
  }

  // ⚠️ Evaluar si la consulta es ineficiente
  if (documentsExamined > 5 * documentsReturned && documentsReturned > 0) {
    issues.push(`⚠️ Se examinaron ${documentsExamined} documentos para retornar solo ${documentsReturned}.`);
  }

  // ⚠️ Sugerir índices si se usan campos que deberían estar indexados
  const queriedFields = Object.keys(query);
  queriedFields.forEach(field => {
    if (recommendedIndexes.includes(field) && stage === "COLLSCAN") {
      issues.push(`⚠️ El campo '${field}' debería estar indexado para mejorar el rendimiento.`);
    }

  });

  return {
    executionTime,
    documentsReturned,
    documentsExamined,
    stage,
    issues
  };
}

/**
 * Genera un informe legible a partir del análisis
 */
function generateReport({ executionTime, documentsReturned, documentsExamined, stage, issues }) {
  let report = chalk.bold("\n📊 Informe de análisis\n");
  report += `- ⏱ Tiempo de ejecución: ${chalk.green(executionTime + " ms")}\n`;
  report += `- 📄 Documentos retornados: ${chalk.green(documentsReturned)}\n`;
  report += `- 🔍 Documentos examinados: ${chalk.yellow(documentsExamined)}\n`;
  report += `- 🛠 Etapa de ejecución: ${chalk.cyan(stage)}\n`;

  if (issues.length > 0) {
    report += chalk.red("\n🚨 Problemas detectados:\n");
    issues.forEach(issue => {
      report += `- ${issue}\n`;
    });
  } else {
    report += chalk.green("\n✅ No se detectaron problemas importantes.\n");
  }

  return report;
}

/**
 * Función principal de prueba con una consulta
 */
async function main() {
  const query = { borough: "Bronx" }; // Consulta de ejemplo
  const { client, collection } = await getMongoCollection(); // Conectar y obtener colección

  const analysis = await analyzeQuery(collection, query); // Analizar consulta
  const report = generateReport(analysis); // Generar informe

  console.log(report); // Mostrar en consola
  await client.close(); // Cerrar conexión
}

main();