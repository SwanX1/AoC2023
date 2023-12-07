import { getDayInput } from "./util";

const input = await getDayInput(3);

interface Number {
  number: number;
  row: number;
  start: number;
  end: number;
}

interface Position {
  row: number;
  column: number;
}

const grid: string[][] = [];

// Parse grid of chars
for (const line of input.split('\n')) {
  const row: string[] = [];
  if (line.trim() === '') continue;
  for (const char of line) {
    row.push(char);
  }
  grid.push(row);
}

function getNumbers(): Number[] {
  const numbers: Number[] = [];
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      const chars = [];
      if (row[j] === '.') continue;
      while (isDigit(row[j])) {
        chars.push(row[j]);
        j++;
      }
      if (chars.length === 0) continue;
      const number = Number(chars.join(''));
      numbers.push({ number, row: i, start: j - chars.length, end: j - 1 });
    }
  }
  return numbers;
}

function isDigit(c: string): boolean {
  return c === '0' || c === '1' || c === '2' || c === '3' || c === '4' || c === '5' || c === '6' || c === '7' || c === '8' || c === '9';
}

function isCharSymbol(c: string): boolean {
  return c !== '.' && !isDigit(c);
}

function getGears(): Position[] {
  const gears: Position[] = [];
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === '*') {
        gears.push({ row: i, column: j });
      }
    }
  }
  return gears;
}

// Searches digits to the left and right of the given position
function getNumberFromRow(row: number, column: number): Number | undefined {
  let number = "";
  let start = column;
  let end = column + 1;
  if (!isDigit(grid[row][column])) return undefined;
  while (isDigit(grid[row][start])) {
    number = grid[row][start] + number;
    start--;
  }
  while (isDigit(grid[row][end])) {
    number += grid[row][end];
    end++;
  }
  return { number: Number(number), row, start, end };
}

function findNumbersAdjacentToGear(gear: Position): Number[] {
  const numbers: Number[] = [];
  const { row, column } = gear;
  const topRow = grid[row - 1] ?? [];
  const bottomRow = grid[row + 1] ?? [];
  // End + 2 because we want to include the character after the number (.slice excludes the end index)
  // We prevent negative and overflowing values by using Math.max and Math.min
  const top = topRow.slice(Math.max(column - 1, 0), Math.min(column + 2, topRow.length));
  const bottom = bottomRow.slice(Math.max(column - 1, 0), Math.min(column + 2, bottomRow.length));
  const before = grid[row][column - 1];
  const after = grid[row][column + 1];

  // Find index of some digit adjacent to the gear
  const positions = [];

  if (isDigit(before)) {
    positions.push({ row, column: column - 1 });
  }

  if (isDigit(after)) {
    positions.push({ row, column: column + 1 });
  }

  let startNewTop = true;
  for (let i = 0; i < top.length; i++) {
    if (startNewTop) {
      if (isDigit(top[i])) {
        positions.push({ row: row - 1, column: column - 1 + i });
        startNewTop = false;
      }
    } else {
      if (!isDigit(top[i])) {
        startNewTop = true;
      }
    }
  }

  let startNewBottom = true;
  for (let i = 0; i < bottom.length; i++) {
    if (startNewBottom) {
      if (isDigit(bottom[i])) {
        positions.push({ row: row + 1, column: column - 1 + i });
        startNewBottom = false;
      }
    } else {
      if (!isDigit(bottom[i])) {
        startNewBottom = true;
      }
    }
  }

  for (const position of positions) {
    const number = getNumberFromRow(position.row, position.column);
    if (number) {
      numbers.push(number);
    }
  }

  return numbers;
}

function isNumberAdjacentToSymbol(number: Number): boolean {
  const { row, start, end } = number;
  const topRow = grid[row - 1] ?? [];
  const bottomRow = grid[row + 1] ?? [];
  // End + 2 because we want to include the character after the number (.slice excludes the end index)
  // We prevent negative and overflowing values by using Math.max and Math.min
  const top = topRow.slice(Math.max(start - 1, 0), Math.min(end + 2, topRow.length));
  const bottom = bottomRow.slice(Math.max(start - 1, 0), Math.min(end + 2, bottomRow.length));
  const before = grid[row][start - 1];
  const after = grid[row][end + 1];

  // Digits and periods do not count as symbols
  const beforeSymbol = isCharSymbol(before) && typeof before !== 'undefined';
  const afterSymbol = isCharSymbol(after) && typeof after !== 'undefined';
  const topSymbol = top.some(isCharSymbol);
  const bottomSymbol = bottom.some(isCharSymbol);

  if (beforeSymbol || afterSymbol || topSymbol || bottomSymbol) {
    return true;
  } else {
    return false;
  }
}

// Part 1

// Get part numbers
const numbers = getNumbers();
const partNumbers: number[] = [];
for (const number of numbers) {
  if (isNumberAdjacentToSymbol(number)) {
    partNumbers.push(number.number);
  }
}

// Get sum of part numbers
const partNumberSum = partNumbers.reduce((sum, number) => sum + number, 0);

console.log(`Day 3, Part 1: ${partNumberSum}`);

// Part 2

// Get gears
const gears = getGears();
const ratios: number[] = [];
for (const gear of gears) {
  // Find numbers adjacent to gear
  const numbers = findNumbersAdjacentToGear(gear);
  if (numbers.length === 2) {
    // Get product of numbers
    const ratio = numbers.reduce((product, number) => product * number.number, 1);
    ratios.push(ratio);
  }
}

// Get sum of ratios
const ratioSum = ratios.reduce((sum, ratio) => sum + ratio, 0);

console.log(`Day 3, Part 2: ${ratioSum}`);