function factorial(n: number) {
  // write your code below
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));

function fibbo(n: number) {
  if (n < 2) {
    return n;
  }
  return fibbo(n - 1) + fibbo(n - 2);
}

console.log(fibbo(6));

function removeDuplicates(arr: number[]) {
  const newArr: number[] = [];
  for (let num of arr) {
    if (!newArr.includes(num)) {
      newArr.push(num);
    }
  }
  return newArr;
}
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));

function countVowels(str: string) {
  // write your code below
  let vowels = /[aeiou]/gi;
  return (str.match(vowels) || []).length;
}

console.log(countVowels("Hello"));

function findMissingNumber(arr: number[]) {
  let n: number = arr.length + 1;
  const idealSum = (n * (n + 1)) / 2;
  console.log(idealSum);
  const mySum = arr.reduce((total, curr) => total + curr, 0);
  console.log(mySum);
  return idealSum - mySum;
}

console.log(findMissingNumber([1, 2, 3, 5]));
