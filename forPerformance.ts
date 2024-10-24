const array = new Array(10000000).fill(0);

const t1Foreach = performance.now();
let sumForEch = 1;
array.forEach((i) => {
  sumForEch += i + 1;
});
console.log(`ForEach: ${performance.now() - t1Foreach}`);

const t1ForOf = performance.now();
let sumForOf = 1;
for (const i of array) {
  sumForOf += i + 1;
}
console.log(`ForOf: ${performance.now() - t1ForOf}`);

const t1For = performance.now();
let sumFor = 1;
for (let i = 0; i < array.length; i++) {
  sumFor += i + 1;
}
console.log(`For: ${performance.now() - t1For}`);
