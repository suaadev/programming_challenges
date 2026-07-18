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

  constructor(
    value: string,
    private frequency: number,
    childs: PrefixNode[],
  ) {
    this.value = value.toLowerCase();
    this.setChild(childs);
    this.prefix = null;
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

      const node = currentNode.childs[c.charCodeAt(0) - 97];

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
      }

      currentNode.setPrefix(word);

      currentNode.setFrecuency(item.frequency);
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
}

// const a = new AutocompleteSystem(dataset);
// console.log(a.suggest("ap", 10));

// ============================================================================
// ULTRA-ROBUST AUTOMATED TEST SUITE
// ============================================================================

function runTests() {
  console.log("Running AutocompleteSystem test suite...\n");

  let passed = 0;
  let total = 0;

  const assertEqual = (name: string, actual: string[], expected: string[]) => {
    total++;
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);

    if (actualStr === expectedStr) {
      console.log(`  ✓ ${name}`);
      passed++;
    } else {
      console.error(
        `  ✗ ${name}\n    Expected: ${expectedStr}\n    Actual:   ${actualStr}`,
      );
    }
  };

  const dataset = [
    { word: "apple", frequency: 15 },
    { word: "app", frequency: 25 },
    { word: "apricot", frequency: 10 },
    { word: "banana", frequency: 30 },
    { word: "band", frequency: 10 },
    { word: "bat", frequency: 10 },
    { word: "application", frequency: 25 },
  ];

  const system = new AutocompleteSystem(dataset);

  // Test 1: Búsqueda básica por prefijo
  assertEqual("Test 1: Basic prefix match ('ban')", system.suggest("ban", 5), [
    "banana",
    "band",
  ]);

  // Test 2: Respetar el límite de resultados
  assertEqual(
    "Test 2: Respect limit ('ap', limit 2)",
    system.suggest("ap", 2),
    ["app", "application"], // "app" y "application" tienen frecuencia 25, "apple" tiene 15
  );

  // Test 3: Desempate por orden alfabético (Frecuencias idénticas)
  // "app" y "application" tienen ambos frecuencia 25.
  // "app" debe ir antes que "application" porque va primero alfabéticamente.
  // "band" y "bat" tienen ambos frecuencia 10. "band" va antes que "bat" alfabéticamente.
  assertEqual(
    "Test 3: Tie breaker alphabetically ('ap', limit 3)",
    system.suggest("ap", 3),
    ["app", "application", "apple"],
  );

  assertEqual(
    "Test 4: Tie breaker alphabetically ('ba', limit 3)",
    system.suggest("ba", 3),
    ["banana", "band", "bat"],
  );

  // Test 5: Prefijo vacío (debe dar vacío)
  assertEqual("Test 5: Empty prefix", system.suggest("", 3), []);

  // Test 6: Sin coincidencias
  assertEqual("Test 6: No matches ('xyz')", system.suggest("xyz", 3), []);

  console.log(`\nResults: ${passed}/${total} passed`);
}

runTests();
