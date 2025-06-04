const readSecuencie = (sequence) => {
    const tableStatus = {
        "🗿": ["🦎", "✂️"],
        "✂️": ["📄", "🦎"],
        "📄": ["🗿", "🖖"],
        "🖖": ["✂️", "🗿"],
        "🦎": ["🖖", "📄"]
    }
    let player1 = 0
    let player2 = 0

    if (sequence.length != 3) {
        throw Error('the game just may contain 3 pars')
    }
    for (let par of sequence) {
        if (tableStatus[par[0]].includes(par[1])) {
            player1 += 1

        } else if (par[0] !== par[1]) {
            player2 += 1
        }
    }

    return player1 > player2 ? 'player1' : (player1 === player2) ? 'Tie' : 'player2'
}

const test1 = [["🗿", "✂️"], ["✂️", "🗿"]]
const test2 = [["🖖", "✂️"], ["🗿", "🗿"], ["🦎", "✂️"]]
const test3 = [["🖖", "✂️"], ["🗿", "🖖"], ["✂️", "🦎"]]

console.log(readSecuencie(test1));
console.log(readSecuencie(test2));
console.log(readSecuencie(test3));
