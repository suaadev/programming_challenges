//challenge of the Unsolved problem in mathematics: 3n+1
//if n is even then n/2
//if n is odd then 3*n+1
//solution:

let memo_cants = {};

const cant_collatz = (n = 1) => {
    if (memo_cants[n]) {
        return memo_cants[n]
    }
    if (n == 1) {
        return 0;
    }
    if (n % 2 == 0) {
        let r1 = 1 + cant_collatz(n / 2);
        memo_cants[n] = r1
        return r1
    }
    let r2 = 1 + cant_collatz(3 * n + 1);
    memo_cants[n] = r2
    return r2
};

const call_collatz_range = (a, b) => {
    console.time('test')
    let max = { number: a, septs: -Infinity }
    for (let i = a; i <= b; i++) {
        const cnt = cant_collatz(i);
        if (max.septs < cnt) {
            max.septs = cnt
            max.number = i
        }
    }
    console.timeEnd('test')
    return max
}
console.log(call_collatz_range(1, 100))
