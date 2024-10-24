/*
 * Dado un array de números enteros positivos, donde cada uno
 * representa unidades de bloques apilados, debemos calcular cuantas unidades
 * de agua quedarán atrapadas entre ellos.
 *
 * - Ejemplo: Dado el array [4, 0, 3, 6, 1, 3].
 *
 *            🟫
 *           🟫
 *     🟫💧💧🟫
 *    🟫💧🟫🟫💧🟫
 *   🟫💧🟫🟫💧🟫
 *  🟫💧🟫🟫🟫🟫
 *
 *   Representando bloque con 🟫 y agua con 💧, quedarán atrapadas 7 unidades
 *   de agua. Suponemos que existe un suelo impermeable en la parte inferior
 *   que retiene el agua.
 */

const solution = (walls: number[]) => {
  let game: string[][] = [];

  build_Wall_Matrix(walls, game);
  fill_game(game);
  print_game(game);
};

const fill_game = (game: string[][]) => {
  //analiso cuantas gotas caben y relleno los espacios
  for (let i = 0; i < game[0].length; i++) {
    //calcula los limite de agua
    let limit_inf: number = -1;
    let limit_max: number = 0;
    for (let k = 0; k < game.length; k++) {
      //rows
      if (game[k][i] !== "  ") {
        if (limit_inf === -1) limit_inf = k;
        limit_max = k;
      }
    }
    if (limit_inf === limit_max) break;
    //relleno con una gota de agua los espacios vacios
    for (let j = limit_inf; j < limit_max; j++) {
      if (game[j][i] === "  ") game[j][i] = "💧";
    }
  }
};

const build_Wall_Matrix = (walls: number[], game: string[][]) => {
  const max_wall: number = Math.max(...walls);
  for (let i = 0; i < walls.length; i++) {
    game.push([]);
    let j = 0;
    for (let k = 0; k < max_wall; k++) {
      if (j < walls[i]) {
        game[i][k] = "🟫";
      } else {
        game[i][k] = "  ";
      }
      j++;
    }
  }
};

const print_game = (game: string[][]) => {
  //imprimo el juego
  for (let i = game[0].length - 1; i >= 0; i--) {
    let row = "";
    for (let k = 0; k < game.length; k++) {
      row += game[k][i];
    }
    console.log(row + "\n");
  }
};

solution([4, 0, 3, 6, 1, 3]);
solution([4, 0, 0, 0, 0, 3]);
solution([10, 0, 2, 5, 0, 10]);
