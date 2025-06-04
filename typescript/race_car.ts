/*
 * Crea un programa que simule la competición de dos coches en una pista.
 * - Los dos coches estarán representados por 🚙 y 🚗. Y la meta por 🏁.
 * - Cada pista tendrá entre 1 y 3 árboles 🌲 colocados de forma aleatoria.
 * - Las dos pistas tendrán una longitud configurable de guiones bajos "_".
 * - Los coches comenzarán en la parte derecha de las pistas. Ejemplo:
 *   🏁____🌲_____🚙
 *   🏁_🌲____🌲___🚗
 *
 * El juego se desarrolla por turnos de forma automática, y cada segundo
 * se realiza una acción sobre los coches (moviéndose a la vez), hasta que
 * uno de ellos (o los dos a la vez) llega a la meta.
 * - Acciones:
 *   - Avanzar entre 1 a 3 posiciones hacia la meta.
 *   - Si al avanzar, el coche finaliza en la posición de un árbol,
 *     se muestra 💥 y no avanza durante un turno.
 *   - Cada turno se imprimen las pistas y sus elementos.
 *   - Cuando la carrera finalice, se muestra el coche ganador o el empate.
 */

const raceSimulation = async (): Promise<string> => {
  const tracks: string[][] = generateRandomTracks();
  const size: number = tracks[0].length - 1;
  let pos_car1: number[] = [0, size]; // y x
  let pos_car2: number[] = [1, size];

  let sleep_car1: boolean = false;
  let sleep_car2: boolean = false;

  while (pos_car1[1] !== 0 && pos_car2[1] !== 0) {
    console.clear();
    printGame(tracks, pos_car1, pos_car2);

    if (!sleep_car1) {
      moveCar(pos_car1); // muevo el carro
      if (tracks[1][pos_car1[1]] === "🌲") {
        sleep_car1 = true;
      }
    } else {
      sleep_car1 = false;
    }

    if (!sleep_car2) {
      moveCar(pos_car2);
      if (tracks[1][pos_car2[1]] === "🌲") {
        sleep_car2 = true;
      }
    } else {
      sleep_car2 = false;
    }
    await sleep();
  }
  console.clear();
  printGame(tracks, pos_car1, pos_car2);

  if (pos_car1[1] === pos_car2[1]) {
    return "Empate";
  }
  if (pos_car1[1] === 0) {
    return "Gana 🚙";
  }
  return "Gana 🚗";
};

const moveCar = (pos_car: number[]) => {
  const steps_c = Math.round(1 + Math.random() * 3);
  if (pos_car[1] - steps_c <= 0) {
    pos_car[1] = 0;
  } else {
    pos_car[1] -= steps_c;
  }
};

const sleep = async (): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 1000);
  });
};

const generateRandomTracks = (): string[][] => {
  const size_track = Math.ceil(5 + Math.random() * 20);
  const tracks: string[][] = [["🏁"], ["🏁"]];
  for (let i = 0; i < size_track; i++) {
    tracks[0].push("_");
    tracks[1].push("_");
  }
  generateObstacle(tracks, 0);
  generateObstacle(tracks, 1);
  return tracks;
};

const generateObstacle = (tracks: string[][], track: number): void => {
  const size: number = Math.ceil(
    Math.random() * Math.ceil(tracks[0].length / 6)
  );
  for (let i = 0; i < size; i++) {
    const r: number = Math.ceil(2 + Math.random() * tracks[0].length - 3);
    tracks[track][r] = "🌲";
  }
};

const printGame = (
  tracks: string[][],
  pos_c1: number[],
  pos_c2: number[]
): void => {
  for (let i = 0; i < tracks.length; i++) {
    let row: string = "";
    for (let j = 0; j < tracks[0].length; j++) {
      if (
        ((i === pos_c1[0] && j == pos_c1[1]) ||
          (i === pos_c2[0] && j === pos_c2[1])) &&
        tracks[i][j] === "🌲"
      ) {
        row += "💥";
        continue;
      }
      if (i === pos_c1[0] && j === pos_c1[1]) {
        row += "🚙";
        continue;
      }
      if (i === pos_c2[0] && j === pos_c2[1]) {
        row += "🚗";
        continue;
      }
      row += tracks[i][j];
    }
    row += "\n";
    console.log(row);
  }
};

async function main() {
  const result: string = await raceSimulation();
  console.log(result);
}

main();
