/**
 * RE-TO: El Gestor de Reservas de Espacios (Interval Scheduling Maximization)
 *
 * DESCRIPCIÓN:
 * Estás programando el backend para una plataforma de reservas de salas de coworking.
 * Tienes una única sala de juntas y una lista de solicitudes de reservas para el día,
 * cada una con su hora de inicio y fin. Como las reuniones no pueden solaparse en
 * la sala, tu misión es aceptar la mayor cantidad posible de reuniones en un solo día.
 *
 * REQUISITOS:
 * 1. Método `getOptimalSchedule()`: Devuelve un arreglo con la combinación óptima de
 *    reuniones (que no se solapan) ordenada cronológicamente de inicio a fin.
 * 2. Si dos reuniones coinciden justo en el límite (ej. una termina a las 12 y otra
 *    empieza a las 12), NO se consideran solapadas y se pueden aceptar ambas.
 * 3. Si hay un empate en la cantidad máxima de reuniones, se debe priorizar la combinación
 *    que deje la sala libre lo antes posible (menor hora de finalización en su última reunión).
 */

interface Meeting {
  id: string;
  start: number;
  end: number;
}

class RoomScheduler {
  private meetings: Meeting[];

  constructor(meetings: Meeting[]) {
    this.meetings = meetings;
  }

  /**
   * Returns the maximum number of non-overlapping meetings possible.
   * Ordered chronologically by start time.
   */
  public getOptimalSchedule(): Meeting[] {
    return this.resolveSchedule(this.meetings);
  }

  private resolveSchedule(schedules: Meeting[]): Meeting[] {
    if (schedules.length <= 1) {
      return schedules;
    }

    const combinations: Meeting[][] = [];

    for (let i = 0; i < schedules.length; i++) {
      const currentSchedule = schedules[i];

      const rest = [...schedules.slice(0, i), ...schedules.slice(i + 1)];

      const [left, rigth] = this.sortSchedulesBySchedule(currentSchedule, rest);

      combinations.push([
        ...this.resolveSchedule(left),
        currentSchedule,
        ...this.resolveSchedule(rigth),
      ]);
    }

    return this.selectBestCombination(combinations);
  }

  private selectBestCombination(combinations: Meeting[][]): Meeting[] {
    let bestSchedule: Meeting[] = combinations[0];

    for (let i = 0; i < combinations.length; i++) {
      const element = combinations[i];
      if (element.length === bestSchedule.length) {
        const lastCurrent = element.at(-1);
        const lastBest = bestSchedule.at(-1);
        if (lastCurrent && lastBest && lastCurrent.end < lastBest.end) {
          bestSchedule = element;
        }
      } else if (element.length > bestSchedule.length) {
        bestSchedule = element;
      }
    }
    return bestSchedule;
  }

  private sortSchedulesBySchedule(
    currentSchedule: Meeting,
    schedules: Meeting[],
  ): Meeting[][] {
    const left: Meeting[] = [];
    const rigth: Meeting[] = [];
    for (let i = 0; i < schedules.length; i++) {
      const element = schedules[i];
      if (element.end <= currentSchedule.start) {
        left.push(element);
      } else if (element.start >= currentSchedule.end) {
        rigth.push(element);
      }
    }

    return [left, rigth];
  }
}

class RoomScheduler2 {
  private meetings: Meeting[];

  constructor(meetings: Meeting[]) {
    this.meetings = meetings;
  }

  public getOptimalSchedule(): Meeting[] {
    if (this.meetings.length === 0) return [];

    const sorted = [...this.meetings].sort((a, b) => {
      if (a.end !== b.end) {
        return a.end - b.end;
      }
      return b.start - a.start;
    });

    const accepted: Meeting[] = [];
    let lastEndTime = -Infinity;

    for (const meeting of sorted) {
      if (meeting.start >= lastEndTime) {
        accepted.push(meeting);
        lastEndTime = meeting.end;
      }
    }

    return accepted.sort((a, b) => a.start - b.start);
  }
}

// const test = [
//   { id: "A", start: 8, end: 10 },
//   { id: "B", start: 9, end: 17 },
//   { id: "C", start: 11, end: 13 },
//   { id: "D", start: 14, end: 16 },
// ];
// const scheduler1 = new RoomScheduler(test);
// console.log(scheduler1.getOptimalSchedule());

// ============================================================================
// TESTS
// ============================================================================

// ============================================================================
// ULTRA-ROBUST AUTOMATED TEST SUITE
// ============================================================================

function runTests() {
  console.log("Running RoomScheduler test suite...\n");

  let passed = 0;
  let total = 0;

  const assertEqual = (name: string, actual: any, expected: any) => {
    total++;
    // Convertimos a IDs ordenados para poder comparar el resultado sin importar el orden de retorno
    const actualStr = JSON.stringify(actual.map((m: Meeting) => m.id).sort());
    const expectedStr = JSON.stringify(
      expected.map((m: Meeting) => m.id).sort(),
    );

    if (actualStr === expectedStr) {
      console.log(`  ✓ ${name}`);
      passed++;
    } else {
      console.error(
        `  ✗ ${name}\n    Expected IDs: ${expectedStr}\n    Actual IDs:   ${actualStr}`,
      );
    }
  };

  // 1. Casos Básicos e Intervalos Justos
  const m1 = [
    { id: "A", start: 9, end: 10 },
    { id: "B", start: 10, end: 11 },
  ];
  assertEqual(
    "Test 1: No overlaps (sharing boundary)",
    new RoomScheduler(m1).getOptimalSchedule(),
    m1,
  );

  // 2. Maximizar cantidad (Solapamiento estándar)
  const m2 = [
    { id: "A", start: 9, end: 11 },
    { id: "B", start: 10, end: 13 },
    { id: "C", start: 12, end: 14 },
  ];
  assertEqual(
    "Test 2: Standard overlap (should maximize count to 2)",
    new RoomScheduler(m2).getOptimalSchedule(),
    [
      { id: "A", start: 9, end: 11 },
      { id: "C", start: 12, end: 14 },
    ],
  );

  // 3. Ignorar bloques gigantes (El acaparador de salas)
  const m3 = [
    { id: "A", start: 8, end: 10 },
    { id: "B", start: 9, end: 17 }, // Bloquea todo el día
    { id: "C", start: 11, end: 13 },
    { id: "D", start: 14, end: 16 },
  ];
  assertEqual(
    "Test 3: Long block bypass (prefer 3 short meetings over 1 giant)",
    new RoomScheduler(m3).getOptimalSchedule(),
    [
      { id: "A", start: 8, end: 10 },
      { id: "C", start: 11, end: 13 },
      { id: "D", start: 14, end: 16 },
    ],
  );

  // 4. Desempate simple por hora de fin
  const m4 = [
    { id: "A", start: 9, end: 11 },
    { id: "B", start: 9, end: 12 },
  ];
  assertEqual(
    "Test 4: Tie breaker (choose A because it ends earlier)",
    new RoomScheduler(m4).getOptimalSchedule(),
    [{ id: "A", start: 9, end: 11 }],
  );

  // 5. Entrada completamente desordenada cronológicamente
  // El scheduler debe ordenar internamente para resolver con éxito.
  const m5 = [
    { id: "C", start: 14, end: 16 },
    { id: "A", start: 8, end: 10 },
    { id: "B", start: 11, end: 13 },
  ];
  assertEqual(
    "Test 5: Unsorted input (must sort internally to work)",
    new RoomScheduler(m5).getOptimalSchedule(),
    [
      { id: "A", start: 8, end: 10 },
      { id: "B", start: 11, end: 13 },
      { id: "C", start: 14, end: 16 },
    ],
  );

  // 6. Efecto Matrioshka (Anidación de intervalos)
  // Si elegimos A, bloqueamos B y C. Si elegimos B, bloqueamos C.
  // Pero si elegimos la más pequeña interna (C), dejamos libre el inicio y el final para otras.
  // Aquí la mejor combinación es [A] o [B] o [C] (todas dan largo 1),
  // pero por desempate de hora de finalización óptima, C es la mejor (termina a las 12).
  const m6 = [
    { id: "A", start: 9, end: 15 },
    { id: "B", start: 10, end: 13 },
    { id: "C", start: 11, end: 12 },
  ];
  assertEqual(
    "Test 6: Nested intervals (Matrioshka effect)",
    new RoomScheduler(m6).getOptimalSchedule(),
    [{ id: "C", start: 11, end: 12 }],
  );

  // 7. Límites y Edge Cases (Vacío, un solo elemento, solapamientos idénticos)
  assertEqual(
    "Test 7: Empty schedule",
    new RoomScheduler([]).getOptimalSchedule(),
    [],
  );

  const single = [{ id: "A", start: 10, end: 12 }];
  assertEqual(
    "Test 8: Single meeting",
    new RoomScheduler(single).getOptimalSchedule(),
    single,
  );

  const duplicates = [
    { id: "A", start: 10, end: 12 },
    { id: "B", start: 10, end: 12 }, // Duplicada exacta. Solo podemos aceptar una.
  ];
  assertEqual(
    "Test 9: Exact duplicates (should only pick one)",
    new RoomScheduler(duplicates).getOptimalSchedule(),
    [{ id: "A", start: 10, end: 12 }], // Acepta cualquiera de las dos, "A" por orden alfabético/inserción
  );

  console.log(`\nResults: ${passed}/${total} passed`);
}

runTests();
