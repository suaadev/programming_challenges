/**
 * RE-TO: El Dispensador Automático de Cambio (Coin Change Problem)
 *
 * DESCRIPCIÓN:
 * Estás programando el software de una máquina expendedora. El sistema debe entregar
 * una cantidad exacta de dinero utilizando la menor cantidad de monedas posible.
 *
 * REQUISITOS:
 * 1. Inicializarse con un arreglo de denominaciones de monedas disponibles (ej: [1, 5, 10, 25]).
 * 2. Método `getChange(amount)`: Devuelve un arreglo con la combinación óptima de monedas
 *    (la menor cantidad de monedas que sumen el monto) ordenadas de mayor a menor.
 * 3. Si no existe una combinación exacta posible, debe retornar `null`.
 */

class ChangeDispenser {
  private coins: number[];

  constructor(coins: number[]) {
    // Sort denominations in descending order to help with optimization
    this.coins = coins.sort((a, b) => b - a);
  }

  /**
   * Calculates the minimum number of coins needed to make the given amount.
   * Returns an array of coins ordered from largest to smallest, or null if impossible.
   */
  public getChange(amount: number): number[] | null {
    const memo: Map<number, number[] | null> = new Map([]);
    return this.resolveAmount(amount, memo);
  }

  private resolveAmount(
    amount: number,
    memo: Map<number, number[] | null>,
  ): number[] | null {
    if (memo.has(amount)) {
      return memo.get(amount) ?? null;
    }
    if (amount == 0) {
      return [];
    }
    if (amount < 0) {
      return null;
    }

    const combinations: number[][] = [];

    for (const coin of this.coins) {
      const rest = amount - coin;
      const result = this.resolveAmount(rest, memo);

      if (result) {
        combinations.push([coin, ...result]);
      }
    }

    if (combinations.length === 0) {
      return null;
    }

    const combinationSelected = this.selectBestCombination(combinations);

    memo.set(amount, combinationSelected);

    return combinationSelected;
  }

  private selectBestCombination(combinations: number[][]): number[] {
    let combinationCandidate = combinations[0];

    for (const combination of combinations) {
      if (combination.length == combinationCandidate.length) {
        for (let i = 0; i < combination.length; i++) {
          if (combination[i] !== combinationCandidate[i]) {
            if (combination[i] > combinationCandidate[i]) {
              combinationCandidate = combination;
            }
            break;
          }
        }
      } else if (combination.length < combinationCandidate.length) {
        combinationCandidate = combination;
      }
    }

    return combinationCandidate;
  }
}

// ============================================================================
// TESTS
// ============================================================================

function runTests() {
  console.log("Running ChangeDispenser test suite...\n");

  let passed = 0;
  let total = 0;

  const assertEqual = (name: string, actual: any, expected: any) => {
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

  // 1. Standard cases
  const usd = new ChangeDispenser([1, 5, 10, 25]);
  assertEqual("Standard change for 41", usd.getChange(41), [25, 10, 5, 1]);
  assertEqual("Single coin change", usd.getChange(25), [25]);

  // 2. Greedy failure cases
  const tricky = new ChangeDispenser([1, 3, 4]);
  assertEqual(
    "Optimal choice for 6 (should be [3,3])",
    tricky.getChange(6),
    [3, 3],
  );

  const complex = new ChangeDispenser([1, 5, 6]);
  assertEqual("Complex optimal choice for 10", complex.getChange(10), [5, 5]);

  // 3. Tie breakers
  const tie = new ChangeDispenser([1, 3, 5]);
  assertEqual(
    "Tie breaker for 6 (should prioritize higher value)",
    tie.getChange(6),
    [5, 1],
  );

  // 4. Edge cases & impossible amounts
  const noSmallCoins = new ChangeDispenser([5, 10]);
  assertEqual("Impossible amount", noSmallCoins.getChange(7), null);
  assertEqual("Zero amount", usd.getChange(0), []);
  assertEqual("Negative amount", usd.getChange(-5), null);

  // 5. Performance / Memoization check
  const large = new ChangeDispenser([1, 2, 5, 10, 20, 50]);
  const start = Date.now();
  const largeResult = large.getChange(137);
  const duration = Date.now() - start;

  assertEqual("Large amount optimization", largeResult, [50, 50, 20, 10, 5, 2]);

  total++;
  if (duration < 50) {
    console.log(`  ✓ Performance check (${duration}ms)`);
    passed++;
  } else {
    console.error(
      `  ✗ Performance check failed. Execution took ${duration}ms (target: <50ms)`,
    );
  }

  // Summary
  console.log(`\nResults: ${passed}/${total} passed`);
}

runTests();
