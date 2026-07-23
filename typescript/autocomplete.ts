/**
 * RE-TO: El Sistema de Autocompletado de Búsquedas (Search Autocomplete System)
 *
 * DESCRIPCIÓN:
 * Estás programando el motor de sugerencias en tiempo real para un buscador.
 * El sistema debe almacenar palabras con su popularidad (frecuencia de búsqueda)
 * y retornar de forma ultra rápida las mejores sugerencias basadas en lo que
 * el usuario va escribiendo.
 *
 * REQUISITOS:
 * 1. Método `suggest(prefix, limit)`: Devuelve hasta `limit` sugerencias que
 *    comiencen con el `prefix`.
 * 2. Orden de prioridad:
 *    - Primero: Mayor frecuencia (popularidad).
 *    - Segundo (en caso de empate): Orden alfabético de la palabra (A-Z).
 * 3. Si el prefijo está vacío, devuelve un array vacío.
 */

interface SearchItem {
  word: string;
  frequency: number;
}

class PrefixNode {
  private value: string;
  private childs: PrefixNode[] = [];
  private prefix: string | null;
  private searchItemsTopCache: SearchItem[] = [];

  constructor(
    value: string,
    private frequency: number,
    childs: PrefixNode[],
  ) {
    this.value = value.toLowerCase();
    this.setChild(childs);
    this.prefix = null;
  }

  public setCacheWordTop(finalWord: SearchItem) {
    this.searchItemsTopCache = [...this.searchItemsTopCache, finalWord].sort(
      (a, b) => {
        if (b.frequency !== a.frequency) {
          return b.frequency - a.frequency;
        }
        return a.word!.localeCompare(b.word!);
      },
    );
  }

  public getChilds(): readonly PrefixNode[] {
    return this.childs;
  }

  public getSearchItemsTopCache(): readonly SearchItem[] {
    return this.searchItemsTopCache;
  }

  public getFrecuency(): number {
    return this.frequency;
  }

  public getValue(): string {
    return this.value;
  }

  public getPrefix() {
    return this.prefix;
  }

  public setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  public setFrecuency(frecuency: number) {
    this.frequency = frecuency;
  }

  public setChild(childs: PrefixNode[]) {
    for (const c of childs) {
      const toIndex = c.getValue().charCodeAt(0) - 97;
      this.childs[toIndex] = c;
    }
  }

  public expandAllWords(node: PrefixNode = this): PrefixNode[] {
    if (node.value === "") {
      return [];
    }

    if (node.childs.length === 0) {
      return [node];
    }

    const wordNodes: PrefixNode[] = [];

    if (node.frequency > 0) {
      wordNodes.push(node);
    }

    for (const child of node.childs) {
      if (child) {
        const childWords = this.expandAllWords(child);
        wordNodes.push(...childWords);
      }
    }

    return wordNodes;
  }

  public search(text: string): PrefixNode | null {
    if (this.childs.length === 0) {
      return null;
    }

    let currentNode: PrefixNode = this;

    for (const caracter of text) {
      const c = caracter.toLowerCase();

      const node = currentNode.childs[c.charCodeAt(0) - 32];

      if (!node) {
        return null;
      }

      currentNode = node;
    }
    return currentNode;
  }
}

class AutocompleteSystem {
  private items: SearchItem[];
  private tree: PrefixNode;

  constructor(items: SearchItem[]) {
    this.items = items;
    const root = new PrefixNode("", 0, []);
    this.tree = this.hidrateTree(this.items, root);
  }

  private hidrateTree(dataset: SearchItem[], tree: PrefixNode): PrefixNode {
    for (const item of dataset) {
      const word = item.word;

      let currentNode: PrefixNode = tree;

      let i = 0;

      while (i < word.length) {
        const character = word[i];
        const node = currentNode.search(character);

        if (node) {
          currentNode = node;
        } else {
          const node = new PrefixNode(character, 0, []);
          currentNode.setChild([node]);
          currentNode = node;
        }

        i++;

        if (i == word.length) {
          currentNode.setPrefix(word);
          currentNode.setFrecuency(item.frequency);
        }
        currentNode.setCacheWordTop(item);
      }
    }

    return tree;
  }

  public suggest(prefix: string, limit: number): string[] {
    const prefixNodeFound = this.tree.search(prefix);
    if (!prefixNodeFound) {
      return [];
    }
    const allNodeWord = prefixNodeFound.expandAllWords();

    allNodeWord.sort((a, b) => {
      if (b.getFrecuency() !== a.getFrecuency()) {
        return b.getFrecuency() - a.getFrecuency();
      }
      return a.getPrefix()!.localeCompare(b.getPrefix()!);
    });

    const res = allNodeWord.map((n) => n.getPrefix() ?? "");

    return res.slice(0, limit);
  }

  public suggestV2(prefix: string, limit: number): string[] {
    const prefixNodeFound = this.tree.search(prefix);
    if (!prefixNodeFound) {
      return [];
    }
    const allNodeWord = prefixNodeFound.getSearchItemsTopCache();

    const res = allNodeWord.map((n) => n.word ?? "");

    return res.slice(0, limit);
  }
}

// ============================================================================
// GENERADOR DE DATASET MASIVO (1,000 Palabras)
// ============================================================================

function generateLargeDataset(count: number): SearchItem[] {
  const prefixes = [
    "app",
    "apple",
    "applet",
    "application",
    "applicant",
    "applause",
    "appreciate",
    "ban",
    "banana",
    "bandit",
    "bandage",
    "bank",
    "banner",
    "banquet",
    "cat",
    "catalog",
    "category",
    "caterpillar",
    "cathedral",
    "cattle",
    "code",
    "coder",
    "coding",
    "codex",
    "codependency",
    "data",
    "database",
    "dataframe",
    "datapath",
    "dating",
    "test",
    "testing",
    "tester",
    "testament",
    "testimony",
  ];

  const dataset: SearchItem[] = [];
  const usedWords = new Set<string>();

  let i = 0;
  while (dataset.length < count) {
    const base = prefixes[i % prefixes.length];
    const suffix = Math.floor(i / prefixes.length).toString(36);
    const word = `${base}_${suffix}`;

    if (!usedWords.has(word)) {
      usedWords.add(word);
      // Frecuencias variadas entre 1 y 10,000
      const frequency = Math.floor(Math.random() * 10000) + 1;
      dataset.push({ word, frequency });
    }
    i++;
  }

  // Añadimos manualmente palabras específicas con frecuencias controladas para verificar precisión
  dataset.push(
    { word: "superapp", frequency: 99999 },
    { word: "superapplication", frequency: 99999 },
    { word: "superapple", frequency: 50000 },
  );

  return dataset;
}

function runComparativeTests() {
  console.log("GENERANDO DATASET MASIVO DE 1,000 PALABRAS...");

  const largeDataset = generateLargeDataset(1000);

  console.log(largeDataset);

  // 1. Medir tiempo de construcción del árbol
  const t0Construct = performance.now();
  const system = new AutocompleteSystem(largeDataset);
  const t1Construct = performance.now();

  console.log(
    `✓ Árbol construido e hidratado en: ${(t1Construct - t0Construct).toFixed(2)} ms\n`,
  );

  let passed = 0;
  let total = 0;

  const assertEqual = (
    testName: string,
    actualV1: string[],
    actualV2: string[],
    expected: string[],
  ) => {
    total++;
    const v1Str = JSON.stringify(actualV1);
    const v2Str = JSON.stringify(actualV2);
    const expStr = JSON.stringify(expected);

    const v1Correct = v1Str === expStr;
    const v2Correct = v2Str === expStr;

    if (v1Correct && v2Correct) {
      console.log(`  ✓ [PASSED] ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ [FAILED] ${testName}`);
      if (!v1Correct)
        console.error(
          `    -> Error en V1. Esperado: ${expStr} | Obtenido: ${v1Str}`,
        );
      if (!v2Correct)
        console.error(
          `    -> Error en V2. Esperado: ${expStr} | Obtenido: ${v2Str}`,
        );
    }
  };

  console.log("--- 1. VERIFICACIÓN DE EXACTITUD (V1 vs V2) ---");

  // Test 1: Búsqueda exacta de las palabras con máxima frecuencia en el dataset masivo
  const topSuperWords = system.suggest("super", 2);

  assertEqual(
    "Test 1: Coincidencia en prefijo 'super' (limit 2)",
    topSuperWords,
    system.suggestV2("super", 2),
    topSuperWords,
  );

  // Test 2: Prefijo 'app' con un límite alto (limit 5)
  const expectedApp5 = system.suggest("app", 5); // Usamos V1 como referencia matemática
  assertEqual(
    "Test 2: Coincidencia en prefijos populares ('app', limit 5)",
    system.suggest("app", 5),
    system.suggestV2("app", 5),
    expectedApp5,
  );

  // Test 3: Prefijo 'code' (limit 3)
  const expectedCode3 = system.suggest("code", 3);
  assertEqual(
    "Test 3: Coincidencia en sub-ramas ('code', limit 3)",
    system.suggest("code", 3),
    system.suggestV2("code", 3),
    expectedCode3,
  );

  // Test 4: Sin coincidencias
  assertEqual(
    "Test 4: Sin coincidencias ('xyz_not_exist')",
    system.suggest("xyz_not_exist", 5),
    system.suggestV2("xyz_not_exist", 5),
    [],
  );

  // Test 5: Prefijo vacío
  assertEqual(
    "Test 5: Prefijo vacío",
    system.suggest("", 5),
    system.suggestV2("", 5),
    [],
  );

  console.log(`\nExactitud: ${passed}/${total} pruebas pasadas con éxito.\n`);

  // 2. PRUEBA DE ESTRÉS Y RENDIMIENTO (10,000 CONSULTAS EN RÁFAGA)

  console.log("--- 2. BENCHMARK DE VELOCIDAD (10,000 Consultas en ráfaga) ---");
  const searchQueries = ["app", "ban", "cat", "code", "data", "test", "super"];
  const ITERATIONS = 10000;

  // Test V1
  const startV1 = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    const q = searchQueries[i % searchQueries.length];
    system.suggest(q, 5);
  }
  const endV1 = performance.now();
  const timeV1 = endV1 - startV1;

  // Test V2
  const startV2 = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    const q = searchQueries[i % searchQueries.length];
    system.suggestV2(q, 5);
  }
  const endV2 = performance.now();
  const timeV2 = endV2 - startV2;

  console.log(`V1 (Búsqueda en caliente + Sort): ${timeV1.toFixed(2)} ms`);
  console.log(`V2 (Lectura directa de Caché):     ${timeV2.toFixed(2)} ms`);

  const speedup = (timeV1 / timeV2).toFixed(1);
  console.log(
    `\nRESULTADO: La versión V2 es aproximadamente ${speedup}x MÁS RÁPIDA que la V1.`,
  );
  console.log("==========================================================");
}

runComparativeTests();
