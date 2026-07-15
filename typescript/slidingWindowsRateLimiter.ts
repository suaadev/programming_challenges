/**
 * @file slidingWindowsLimiter.ts
 * @description RETO: Sliding Window Rate Limiter (Limitador de Tasa Deslizante)
 *
 * 📝 DESCRIPCIÓN DEL PROBLEMA:
 * Cuando diseñas APIs en el backend, es fundamental proteger tus endpoints de abusos,
 * fuerza bruta o ataques DDoS. Para ello se utilizan los Rate Limiters. El algoritmo
 * más preciso y elegante para este propósito es el Sliding Window (Ventana Deslizante).
 *
 * Tu objetivo es implementar la clase `SlidingWindowRateLimiter` para que decida si
 * una petición de un usuario debe ser permitida o rechazada basándose en una ventana
 * de tiempo flotante y un límite máximo de peticiones.
 *
 * ⚙️ REGLAS DE DISEÑO:
 * 1. Inicialización: La clase debe recibir el tamaño de la ventana de tiempo (en segundos)
 *    y el límite máximo de peticiones permitidas en esa ventana.
 * 2. Validación: El método `isAllowed(userId)` debe retornar `true` si la petición se aprueba,
 *    o `false` si se bloquea (HTTP 429).
 * 3. Ventana Deslizante Real: El intervalo de tiempo debe ser dinámico. En cualquier instante,
 *    no pueden existir más del número máximo de peticiones configuradas en el rango transcurrido
 *    hacia atrás en el tiempo.
 * 4. Eficiencia de Memoria: Debes limpiar las marcas de tiempo (timestamps) que ya hayan
 *    salido de la ventana activa en cada llamada para evitar fugas de memoria.
 *
 * 🔍 CASO DE USO (Ejemplo Práctico con límite de 2 peticiones cada 5 segundos):
 * - Segundo 0.0: Usuario "david" -> Petición 1 -> ✅ Permitido (1/2)
 * - Segundo 1.0: Usuario "david" -> Petición 2 -> ✅ Permitido (2/2)
 * - Segundo 2.0: Usuario "david" -> Petición 3 -> ❌ Bloqueado (Excede el límite en [2.0 - 5.0 = -3.0s])
 * - Segundo 5.1: Usuario "david" -> Petición 4 -> ✅ Permitido (La del seg 0.0 ya expiró)
 */

interface LimiterConfig {
  windowSizeInSeconds: number;
  maxRequests: number;
}

export class SlidingWindowRateLimiter {
  private userRequests: Map<string, number[]> = new Map([]);

  /**
   *
   * @param config - limter configs
   */
  constructor(private config: LimiterConfig) {}

  public isAllowed(userId: string): boolean {
    const userRequests = this.userRequests.get(userId) ?? [];

    const currentRequestTimestamp: number = Date.now();

    const activeRequestsIntoWindow = userRequests.filter(
      (r) =>
        currentRequestTimestamp - r <= this.config.windowSizeInSeconds * 1000,
    );

    if (activeRequestsIntoWindow.length + 1 > this.config.maxRequests) {
      this.userRequests.set(userId, activeRequestsIntoWindow);
      return false;
    }

    this.userRequests.set(userId, [
      ...activeRequestsIntoWindow,
      currentRequestTimestamp,
    ]);

    return true;
  }
}

// ============================================================================
// SUITE DE PRUEBAS ASÍNCRONAS ROBUSTA
// ============================================================================

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper para formatear logs con aserciones visuales
function assert(testName: string, actual: boolean, expected: boolean) {
  const success = actual === expected;
  console.log(`${success ? "💚 PASSED" : "💔 FAILED"} | ${testName}`);
  if (!success) {
    console.error(
      `   -> Error: Se esperaba ${expected ? "✅" : "❌"} pero se obtuvo ${actual ? "✅" : "❌"}\n`,
    );
  }
}

async function runTests() {
  console.log("🚀 Iniciando Suite de Pruebas Robustas...\n");

  // ==========================================================================
  // ESCENARIO 1: Ráfaga básica y bloqueo (Límite: 2 peticiones / 2 segundos)
  // ==========================================================================
  console.log("--- Escenario 1: Ráfaga y expiración básica ---");
  const limiter = new SlidingWindowRateLimiter({
    windowSizeInSeconds: 2,
    maxRequests: 2,
  });
  const user1 = "david";

  assert(
    "Req 1 (t=0ms) - Primera petición de David",
    limiter.isAllowed(user1),
    true,
  );

  await sleep(100);
  assert(
    "Req 2 (t=100ms) - Segunda petición de David",
    limiter.isAllowed(user1),
    true,
  );

  await sleep(100);
  assert(
    "Req 3 (t=200ms) - Tercera petición (Debe bloquearse)",
    limiter.isAllowed(user1),
    false,
  );

  console.log("⏳ Esperando 2 segundos a que expire el historial...");
  await sleep(2000);
  assert(
    "Req 4 (t=2200ms) - Petición tras reset de ventana",
    limiter.isAllowed(user1),
    true,
  );

  // ==========================================================================
  // ESCENARIO 2: Multi-usuario independiente
  // ==========================================================================
  console.log("\n--- Escenario 2: Aislamiento de Usuarios ---");
  const user2 = "maria";

  // david ya hizo 1 petición en el escenario 1 (hace menos de 2s), le queda 1.
  assert(
    "David consume su última petición disponible",
    limiter.isAllowed(user1),
    true,
  );
  assert(
    "David intenta una más y es bloqueado",
    limiter.isAllowed(user1),
    false,
  );

  // Maria está limpia, no debería verse afectada por el bloqueo de David
  assert(
    "Maria hace su Req 1 (No debe bloquearse por David)",
    limiter.isAllowed(user2),
    true,
  );
  assert("Maria hace su Req 2", limiter.isAllowed(user2), true);

  // ==========================================================================
  // ESCENARIO 3: Liberación progresiva (Ventana Deslizante Real)
  // ==========================================================================
  console.log("\n--- Escenario 3: Deslizamiento Progresivo de Ventana ---");
  // Nueva instancia: 2 peticiones máximo cada 1.5 segundos
  const slidingLimiter = new SlidingWindowRateLimiter({
    windowSizeInSeconds: 1.5,
    maxRequests: 2,
  });
  const user3 = "tester";

  assert("Req A (t=0ms)", slidingLimiter.isAllowed(user3), true);

  await sleep(800); // Esperamos poco más de la mitad de la ventana
  assert("Req B (t=800ms)", slidingLimiter.isAllowed(user3), true);
  assert(
    "Req C (t=800ms) - Bloqueo inmediato",
    slidingLimiter.isAllowed(user3),
    false,
  );

  await sleep(800); // t = 1600ms. La Req A (t=0) YA expiró, pero la Req B (t=800ms) SIGUE activa.
  // Como solo queda 1 activa (Req B), debería permitir EXACTAMENTE UNA más.
  assert(
    "Req D (t=1600ms) - Permitida porque Req A expiró",
    slidingLimiter.isAllowed(user3),
    true,
  );
  assert(
    "Req E (t=1600ms) - Bloqueada porque Req B sigue viva",
    slidingLimiter.isAllowed(user3),
    false,
  );

  // ==========================================================================
  // ESCENARIO 4: Concurrencia masiva (Ráfaga síncrona)
  // ==========================================================================
  console.log("\n--- Escenario 4: Ráfaga Concurrente Síncrona ---");
  const strictLimiter = new SlidingWindowRateLimiter({
    windowSizeInSeconds: 5,
    maxRequests: 3,
  });
  const user4 = "bot";

  // Simulamos 5 peticiones idénticas disparadas en el mismo hilo de ejecución
  const results = [
    strictLimiter.isAllowed(user4),
    strictLimiter.isAllowed(user4),
    strictLimiter.isAllowed(user4),
    strictLimiter.isAllowed(user4),
    strictLimiter.isAllowed(user4),
  ];

  assert("Concurrencia - Petición 1 síncrona", results[0], true);
  assert("Concurrencia - Petición 2 síncrona", results[1], true);
  assert("Concurrencia - Petición 3 síncrona", results[2], true);
  assert("Concurrencia - Petición 4 síncrona (Bloqueada)", results[3], false);
  assert("Concurrencia - Petición 5 síncrona (Bloqueada)", results[4], false);

  console.log("\n🏁 Fin de la Suite de Pruebas.");
}

// Ejecutar suite de pruebas
runTests().catch(console.error);
