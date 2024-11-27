/*
 * Crea un generador de números pseudoaleatorios entre 0 y 100.
 * - No puedes usar ninguna función "random" (o semejante) del
 *   lenguaje de programación seleccionado.
 *
 * Es más complicado de lo que parece...
 */
const os = require("os");
const generateRandomNumber = () => {
  const currentMili = new Date().getMilliseconds() || 1;
  const freeRam = os.freemem();
  const totalRam = os.totalmem();
  const upTime = os.uptime();
  const cpus = os.cpus();
  const seed =
    freeRam * currentMili +
    Date.now() +
    totalRam +
    upTime +
    cpus.reduce((x, y) => x + y.speed, 0);

  let number = seed % upTime;

  for (let i = 0; i < 13; i++) {
    number = (number * 47 + i * 97) % 100;
  }
  return Math.ceil(number);
};

const number = generateRandomNumber();
console.log(number);
