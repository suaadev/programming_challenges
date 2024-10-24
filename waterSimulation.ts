/*
 * Crea una función que simule las condiciones climáticas (temperatura y probabilidad de lluvia)
 * de un lugar ficticio al pasar un número concreto de días según estas reglas:
 * - La temperatura inicial y el % de probabilidad de lluvia lo define el usuario.
 * - Cada día que pasa:
 *   - 10% de posibilidades de que la temperatura aumente o disminuya 2 grados.
 *   - Si la temperatura supera los 25 grados, la probabilidad de lluvia al día
 *     siguiente aumenta en un 20%.
 *   - Si la temperatura baja de 5 grados, la probabilidad de lluvia al día
 *     siguiente disminuya en un 20%.
 *   - Si llueve (100%), la temperatura del día siguiente disminuye en 1 grado.
 * - La función recibe el número de días de la predicción y muestra la temperatura
 *   y si llueve durante todos esos días.
 * - También mostrará la temperatura máxima y mínima de ese periodo y cuántos días va a llover.
 */

function climateSimulation(
  days: number,
  initTemperature: number,
  initProbabilityToRain: number
): Record<string, unknown> {
  let currentProbabilityToRain: number = initProbabilityToRain;
  let currentTemperature: number = initTemperature;
  let maxTemperature: number = -Infinity;
  let minTemperature: number = Infinity;
  let daysRain: number = 0;

  for (let i = 0; i < days; i++) {
    //aumente o dismunuya la temperatura
    if (Math.random() < 0.1) {
      currentTemperature += Math.random() < 0.5 ? 2 : -2;
    }

    //calcula la probalidad de lluvia del dia siguiente de la temperatura calculada
    if (currentTemperature > 25) {
      currentProbabilityToRain +=
        currentProbabilityToRain + 20 <= 100
          ? 20
          : 100 - currentProbabilityToRain;
    }
    if (currentTemperature < 5) {
      currentProbabilityToRain -=
        currentProbabilityToRain - 20 >= 0 ? 20 : currentProbabilityToRain;
    }
    console.log(
      currentTemperature,
      currentProbabilityToRain,
      Math.random() * 100
    );
    if (Math.random() * 100 <= currentProbabilityToRain) {
      currentTemperature -= 1;
      daysRain += 1;
    }

    //Maximos y minimos
    if (currentTemperature >= maxTemperature) {
      maxTemperature = currentTemperature;
    }
    if (currentTemperature <= minTemperature) {
      minTemperature = currentTemperature;
    }
  }

  return {
    days,
    daysRain,
    maxTemperature,
    minTemperature,
    currentTemperature,
  };
}

console.log(climateSimulation(364, 50, 100));
