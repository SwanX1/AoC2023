import { getDayInput } from './util';

const input = await getDayInput(2);

interface Game {
  id: number;
  turns: Turn[];
}

interface Turn {
  red?: number;
  green?: number;
  blue?: number;
}

const games: Game[] = [];

// Parse games
for (const line of input.split('\n')) {
  // Skip empty lines
  if (line.trim() === '') continue;
  
  // Line format: Game <id>: [<red> red], [<green> green], [<blue> blue]; ...
  const id = Number(line.match(/Game (\d+):/)![1]); // ! is safe because we know the line is not empty and matches the regex
  const turns: Turn[] = [];
  
  // Split the line into turn strings
  const turnStrings = line.split(':')[1].split(';').map(s => s.trim());
  // Parse each turn string into a Turn object
  for (const turnString of turnStrings) {
    if (turnString === '') continue;
    
    const turn: Turn = {};
    const colorStrings = turnString.split(',').map(s => s.trim());
    
    for (const colorString of colorStrings) {
      if (colorString === '') continue;
      
      const [number, name] = colorString.split(' ');
      if (name === 'red' || name === 'green' || name === 'blue') {
        turn[name] = Number(number);
      } else {
        // We should never get here, I hope...
        throw new Error(`Invalid color name ${name}`);
      }
    }
    
    turns.push(turn);
  }
  
  games.push({ id, turns });
}

const threshold: Turn = {
  red: 12,
  green: 13,
  blue: 14,
};
let possibleGameIDSum = 0;
let powerSum = 0;
for (const game of games) {
  // Maximum turn. We only care about the maximum value of each color.
  const maxTurn: Turn = { red: 0, green: 0, blue: 0 };
  for (const turn of game.turns) {
    // Iterate over colors
    for (const color of Object.keys(turn) as (keyof Turn)[]) {
      // If the current turn's value for this color is greater than the maximum, update the maximum
      if (turn[color]! > maxTurn[color]!) {
        maxTurn[color] = turn[color];
      }
    }
  }

  // Part 1: If we do not exceed the threshold for any color, add the game ID to the sum
  if (maxTurn.red! <= threshold.red! && maxTurn.green! <= threshold.green! && maxTurn.blue! <= threshold.blue!) {
    possibleGameIDSum += game.id;
  }

  // Part 2: Add the power of the game to the sum
  // The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together.
  const power = maxTurn.red! * maxTurn.green! * maxTurn.blue!;
  powerSum += power;
}

console.log(`Day 2, Part 1: ${possibleGameIDSum}`);
console.log(`Day 2, Part 2: ${powerSum}`);
