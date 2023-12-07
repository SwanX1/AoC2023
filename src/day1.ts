import { getDayInput } from './util';

const input = await getDayInput(1);

// Arrays of digits and digit words. Words are used in part 2.
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const digitWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

// Function to convert a word to a number. Returns NaN, if the word provided is not a number or a number word.
function wordToNumber(word: string): number {
  const number = digitWords.indexOf(word);
  return number === -1 ? Number(word) : number;
}

// Part 1
let p1sum = 0;
for (const line of input.split('\n')) {
  // Skip empty lines
  if (line.trim() === '') continue;

  // We track the first and last indexes of found digits, and the first and last digits themselves.
  // We set the first index to Infinity, and the last index to -Infinity, so that any found digit will be less than the first index, and greater than the last index.
  let firstIndex = Infinity;
  let lastIndex = -Infinity;
  let firstDigit = null;
  let lastDigit = null;
  for (const digit of digits) {
    const foundFirst = line.indexOf(digit.toString());
    const foundLast = line.lastIndexOf(digit.toString());
    if (foundFirst !== -1 && foundFirst < firstIndex) {
      // If we found a digit, and it's the to the left of any previous ones we've found, update the first index and digit.
      firstIndex = foundFirst;
      firstDigit = digit.toString();
    }
    if (foundLast !== -1 && foundLast > lastIndex) {
      // If we found a digit, and it's to the right of any previous ones we've found, update the last index and digit.
      lastIndex = foundLast;
      lastDigit = digit.toString();
    }
  }

  // If we didn't find any digits, skip this line.
  if (firstDigit === null || lastDigit === null) continue;

  // Combine the first and last digits into a number, and add it to the sum.
  const number = wordToNumber(firstDigit) * 10 + wordToNumber(lastDigit);

  p1sum += number;
}

// Part 2, everything is the same, except we use digit words in addition to digits.
let p2sum = 0;
for (const line of input.split('\n')) {
  if (line.trim() === '') continue;

  let firstIndex = Infinity;
  let lastIndex = -Infinity;
  let firstDigit = null;
  let lastDigit = null;
  for (const digit of [...digits, ...digitWords]) {
    const foundFirst = line.indexOf(digit.toString());
    const foundLast = line.lastIndexOf(digit.toString());
    if (foundFirst !== -1 && foundFirst < firstIndex) {
      firstIndex = foundFirst;
      firstDigit = digit.toString();
    }
    if (foundLast !== -1 && foundLast > lastIndex) {
      lastIndex = foundLast;
      lastDigit = digit.toString();
    }
  }

  if (firstDigit === null || lastDigit === null) continue;

  const number = wordToNumber(firstDigit) * 10 + wordToNumber(lastDigit);

  p2sum += number;
}

console.log(`Day 1, Part 1: ${p1sum}`);
console.log(`Day 1, Part 2: ${p2sum}`);