/**
 * Validador de Questões — Simulador de Provas Angola 2026
 *
 * Uso: node validator.js                          # valida todos os ficheiros
 *      node validator.js dados/base-minint.js     # valida um ficheiro específico
 *
 * Verifica se o índice da resposta correta (r) é coerente com a explicação (e)
 * usando correspondência de palavras-chave.
 */
const fs = require('fs');
const path = require('path');

const STOPWORDS = new Set([
  'o','a','os','as','um','uma','uns','umas','de','da','do','das','dos',
  'no','na','nos','nas','ao','aos','à','às','pelo','pela','pelos','pelas',
  'com','sem','em','por','para','que','é','são','se','não','mas','mais',
  'menos','já','também','ser','está','estão','foi','era','tem','têm','há',
  'entre','após','até','como','ou','e','uma','num','numa','dum','duma',
  'pela','pelos','das','este','esta','isto','esse','essa','isso','aquele',
  'aquela','aquilo','seu','sua','seus','suas','meu','minha','teu','tua',
  'nosso','nossa','se','si','consigo','etc','ex','ex:','s','1.','2.','3.','4.'
]);

function tokenize(text) {
  return new Set(
    text.toLowerCase()
      .replace(/[^\w\sáéíóúâêôãõçàèìòùäëïöü]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 1 && !STOPWORDS.has(t))
  );
}

function findCorrectIndex(q) {
  const expTokens = tokenize(q.e);
  if (expTokens.size === 0) return null;

  const scores = [];
  for (let i = 0; i < q.o.length; i++) {
    const optTokens = tokenize(q.o[i]);
    if (optTokens.size === 0) { scores.push([i, 0]); continue; }

    const overlap = [...optTokens].filter(t => expTokens.has(t)).length;
    const direct = q.e.toLowerCase().includes(q.o[i].toLowerCase().substring(0, 20)) ? 3 : 0;

    const yearsInExp = q.e.match(/\b(19\d\d|20\d\d)\b/g) || [];
    const yearsInOpt = q.o[i].match(/\b(19\d\d|20\d\d)\b/g) || [];
    const yearMatch = yearsInOpt.filter(y => yearsInExp.includes(y)).length * 5;

    scores.push([i, overlap + direct + yearMatch]);
  }

  scores.sort((a, b) => b[1] - a[1]);
  if (scores[0][1] >= 2 && (scores.length < 2 || scores[0][1] > scores[1][1])) {
    return scores[0][0];
  }
  return null;
}

function validateFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const varMatch = content.match(/(?:var|let|const)\s+(\w+)\s*=\s*/);
  const varName = varMatch ? varMatch[1] : path.basename(filepath);

  const start = content.indexOf('[');
  const end = content.lastIndexOf(']');
  if (start === -1 || end === -1) {
    console.log(`  ⚠  Formato não reconhecido (sem array JSON)`);
    return { total: 0, ok: 0, errors: 0, warnings: 0 };
  }

  let data;
  try {
    data = JSON.parse(content.substring(start, end + 1));
  } catch (e) {
    console.log(`  ❌ Erro de parsing JSON: ${e.message}`);
    return { total: 0, ok: 0, errors: 0, warnings: 0 };
  }

  if (!Array.isArray(data)) {
    console.log(`  ⚠  Array JSON não encontrado`);
    return { total: 0, ok: 0, errors: 0, warnings: 0 };
  }

  let ok = 0, errors = 0, warnings = 0;

  data.forEach((q, i) => {
    if (!q.hasOwnProperty('r') || !q.o || !q.e) {
      warnings++;
      return;
    }
    if (q.r < 0 || q.r >= q.o.length) {
      console.log(`  ❌ Q${i}: r=${q.r} FORA DO INTERVALO (0-${q.o.length-1})`);
      errors++;
      return;
    }

    const isExceto = q.p.toUpperCase().includes('EXCETO') || q.p.endsWith(':');
    const expected = findCorrectIndex(q);

    if (expected === null && !isExceto) {
      // Can't determine - explain why
      warnings++;
    } else if (expected !== null && expected !== q.r && !isExceto) {
      console.log(`  ❌ Q${i}: r=${q.r} "${q.o[q.r].substring(0, 30)}" -> devia ser ${expected} "${q.o[expected].substring(0, 30)}"`);
      errors++;
    }
  });

  return { total: data.length, ok, errors, warnings };
}

function main() {
  const args = process.argv.slice(2);
  const dadosDir = path.join(__dirname, 'dados');

  let files;
  if (args.length > 0) {
    files = args.map(f => path.resolve(f));
  } else {
    files = fs.readdirSync(dadosDir)
      .filter(f => f.endsWith('.js') && f !== 'index.js')
      .map(f => path.join(dadosDir, f));
  }

  let totalErrors = 0, totalFiles = 0;

  files.forEach(filepath => {
    const name = path.relative(__dirname, filepath);
    console.log(`\n📄 ${name}`);
    const stats = validateFile(filepath);
    totalFiles++;
    totalErrors += stats.errors;
  });

  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 Total: ${totalFiles} ficheiros, ${totalErrors} erro(s) encontrado(s)`);
  process.exit(totalErrors > 0 ? 1 : 0);
}

main();
