const binarySearch = (list: number[], element: number): boolean => {
  let i = 0;
  let j = list.length - 1;
  let iterations = 0;
  while (true) {
    let index_mid = i + Math.ceil((j - i) / 2);
    if (list[index_mid] === element) {
      return true;
    }
    if (i === j || list.length === 0) {
      return false;
    }
    if (element > list[index_mid]) {
      i = index_mid + 1;
    } else {
      j = index_mid - 1;
    }
    iterations++;
  }
};

const binarySearchLineal = (list: number[], element: number): Boolean => {
  for (const i of list) {
    if (i === element) {
      return true;
    }
  }
  return false;
};

const binarySearchRecursive = (
  list: number[],
  element: number,
  i: number,
  j: number
): boolean => {
  const index_mid = i + Math.ceil((j - i) / 2);
  const element_mid = list[index_mid];
  if (element_mid === element) {
    return true;
  }
  if (i === j || list.length === 0) {
    //if the i is equal to j then return false, because means that length array is 1
    return false;
  }
  //calculate the i,j to array partition
  if (element < element_mid) {
    return binarySearchRecursive(list, element, i, j - 1);
  } else {
    return binarySearchRecursive(list, element, i + 1, j);
  }
};

//testiando los 2 algoritmos

const testBinarySearchAlgorithm = async () => {
  const generateArray = (size_: number) => {
    const array: number[] = [];
    for (let i = 0; i < size_; i++) {
      const number_random = Math.ceil(Math.random() * 10000000);
      array.push(number_random);
    }
    array.sort((a, b) => a - b);
    return array;
  };

  let cant_test = 100;

  let dates: Record<number | string, Record<string, number>> = {};

  for (let i = 0; i < cant_test; i++) {
    const arrayTest = generateArray((i + 1) * 100);

    dates[i] = { array_size: (i + 1) * 100 };

    const element_random =
      arrayTest[Math.ceil(Math.random() * (arrayTest.length - 1))];

    //test binarySearchIterative
    const init_time_searchIterative = performance.now();
    binarySearch(arrayTest, element_random);
    const end_time_searchIterative = performance.now();
    dates[i].iterative = end_time_searchIterative - init_time_searchIterative;

    const init_time_searchLineal = performance.now();
    binarySearchLineal(arrayTest, element_random);
    const end_time_searchLineal = performance.now();
    dates[i].lineal = end_time_searchLineal - init_time_searchLineal;

    const init_time_searchRecursive = performance.now();
    binarySearchRecursive(arrayTest, element_random, 0, arrayTest.length - 1);
    const end_time_searchRecursive = performance.now();
    dates[i].recursive = end_time_searchRecursive - init_time_searchRecursive;

    const init_time_functionIncludes = performance.now();
    arrayTest.includes(element_random);
    const end_time_functionIncludes = performance.now();
    dates[i].funIncludes =
      end_time_functionIncludes - init_time_functionIncludes;
  }

  //calculate average
  const average_iterative: number[] = [];
  const average_lineal: number[] = [];
  const average_recursive: number[] = [];
  const average_fIncludes: number[] = [];
  for (const i in dates) {
    average_iterative.push(dates[i].iterative);
    average_lineal.push(dates[i].lineal);
    average_recursive.push(dates[i].recursive);
    average_fIncludes.push(dates[i].funIncludes);
  }

  dates = {
    ...dates,
    average: {
      iterative: average_iterative.reduce((a, b) => a + b) / cant_test,
      recursive: average_recursive.reduce((a, b) => a + b) / cant_test,
      funIncludes: average_fIncludes.reduce((a, b) => a + b) / cant_test,
      lineal: average_lineal.reduce((a, b) => a + b) / cant_test,
    },
  };

  console.table(dates, [
    "array_size",
    "iterative",
    "lineal",
    "recursive",
    "funIncludes",
  ]);
};

testBinarySearchAlgorithm();
