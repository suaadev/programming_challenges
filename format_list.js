/*
 * Crea una función que reciba un texto y muestre cada palabra en una línea,
 * formando un marco rectangular de asteriscos.
 * - ¿Qué te parece el reto? Se vería así:
 *   **********
 *   * ¿Qué   *
 *   * te     *
 *   * parece *
 *   * el     *
 *   * reto?  *
 *   **********
 */


const list_format = (text) => {
  const text_separated = text.split(' ')
  //obtengo el tamaño de la palabra con mas letras para calcular el ancho del rectangulo
  const max_width = Math.max(...text_separated.map(w => w.length)) + 5
  let output = ""

  //agrega el top de la lista 
  for (let n = 0; n < max_width; n++) output += '*'

  //agrega el contenido de la lista
  output += "\n"
  for (const i in text_separated) {
    output += "* " + text_separated[i]
    //agrega los espacios en blanco restantes
    for (let j = 0; j < max_width - text_separated[i].length - 3; j++) {
      output += " "
    }
    output += "*\n"
  }
  //agrega el piso de la lista 
  for (let n = 0; n < max_width; n++) output += '*'
  return output
}

console.log(list_format('arroz pan tomate aguacate aceite zanahoriamolida con aracachablanditadelcampo'))
console.log(list_format('¿Que te parece el reto?'))