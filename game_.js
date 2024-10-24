/*
 * Crea un programa que calcule quien gana más partidas al piedra,
 * papel, tijera.
 * - El resultado puede ser: "Player 1", "Player 2", "Tie" (empate)
 * - La función recibe un listado que contiene pares, representando cada jugada.
 * - El par puede contener combinaciones de "R" (piedra), "P" (papel)
 *   o "S" (tijera).
 * - Ejemplo. Entrada: [("R","S"), ("S","R"), ("P","S")]. Resultado: "Player 2".
 */

const check_game = (game) => {
    const RULES = {
        "S": "P",
        "R": "S",
        "P": "R"
    }

    let player_1 = 0
    let player_2 = 0
    for (const pair of game) {
        if (RULES[pair[0]] === pair[1]) {
            player_1++
            continue
        }
        if (RULES[pair[1]] === pair[0]) {
            player_2++
            continue
        }
    }
    if (player_1 === player_2) return 'tie'
    return player_1 > player_2 ? 'player_1' : 'player_2'
}

console.log(check_game([['S', 'S'], ['R', 'S'], ['R', 'P'], ['S', 'R']]));
