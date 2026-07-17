/**
 * RE-TO: El Historial de Navegación Inteligente (Caché LRU)
 *
 * DESCRIPCIÓN:
 * Cuando navegas por internet, el navegador guarda las páginas en una memoria rápida
 * llamada Caché LRU (Least Recently Used). Tu misión es programar una clase que
 * simule este comportamiento. La caché tiene un tamaño máximo limitado. Si la caché
 * se llena y quieres guardar una página nueva, debes eliminar la página que lleve
 * más tiempo sin ser visitada (la menos recientemente usada).
 *
 * REQUISITOS:
 * 1. Inicializarse con un `tamanoMaximo`.
 * 2. Método `visitar(url)`: Añade o actualiza una URL. Si ya existía, se mueve al
 *    inicio por ser la más reciente. Si se excede el tamaño máximo, se elimina la más vieja.
 * 3. Método `obtenerHistorial()`: Devuelve el historial ordenado de más reciente a más antiguo.
 */

class LRUBrowserHistory {
  private cache: Map<string, boolean>;
  private maxCapacity: number;

  constructor(maxCapacity: number) {
    this.maxCapacity = maxCapacity;
    this.cache = new Map<string, boolean>();
  }

  public visit(url: string): void {
    if (this.cache.has(url)) {
      this.cache.delete(url);
    } else if (this.cache.size >= this.maxCapacity) {
      const siteToDelete = this.cache.keys().next().value;
      if (siteToDelete) {
        this.cache.delete(siteToDelete);
      }
    }
    this.cache.set(url, true);
  }

  public getHistory(): string[] {
    const history: string[] = [];
    const cacheKeys = this.cache.keys();
    for (let i = 0; i < this.maxCapacity; i++) {
      const value = cacheKeys.next().value;
      if (value) {
        history.push(value);
      }
    }
    return history.reverse();
  }
}

function runTests() {
  console.log("🚀 Starting LRU Browser History tests...\n");

  const history = new LRUBrowserHistory(3);

  // Test 1: Add normal elements
  history.visit("google.com");
  history.visit("github.com");
  history.visit("youtube.com");

  let result = history.getHistory();
  console.log("Test 1 (Initial filling):", result);
  console.assert(
    JSON.stringify(result) ===
      JSON.stringify(["youtube.com", "github.com", "google.com"]),
    "❌ Test 1 Failed",
  );

  // Test 2: Update an existing element (Google moves to the front)
  history.visit("google.com");
  result = history.getHistory();
  console.log("Test 2 (Re-visiting google.com):", result);
  console.assert(
    JSON.stringify(result) ===
      JSON.stringify(["google.com", "youtube.com", "github.com"]),
    "❌ Test 2 Failed",
  );

  // Test 3: Overflow (openai.com enters, github.com is evicted for being the oldest)
  history.visit("openai.com");
  result = history.getHistory();
  console.log("Test 3 (openai.com enters / github.com evicted):", result);
  console.assert(
    JSON.stringify(result) ===
      JSON.stringify(["openai.com", "google.com", "youtube.com"]),
    "❌ Test 3 Failed",
  );

  // Test 4: Verify that github.com no longer exists in history
  console.log(
    "Test 4 (Verify eviction):",
    !result.includes("github.com")
      ? "✅ Correct"
      : "❌ Error: github.com is still alive",
  );
  console.assert(!result.includes("github.com"), "❌ Test 4 Failed");

  console.log(
    "\n🎉 Tests execution finished! (If you didn't see any 'Failed' messages, everything is perfect).",
  );
}

// Run the automated test suite
runTests();
