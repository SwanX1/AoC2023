import { getDayInput } from './util';

const input = await getDayInput(1);

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const digitWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function wordToNumber(word: string): number {
  const number = digitWords.indexOf(word);
  return number === -1 ? Number(word) : number;
}

let p1sum = 0;

// Part 1
for (const line of input.split('\n')) {
  if (line.trim() === '') continue;

  let firstIndex = Infinity;
  let lastIndex = -Infinity;
  let firstDigit = null;
  let lastDigit = null;
  for (const digit of digits) {
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

  p1sum += number;
}

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