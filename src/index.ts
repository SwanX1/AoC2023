const day = Number(process.argv[2]) || null;

if (typeof day === 'number' && (Number.isNaN(day) || !Number.isInteger(day))) {
  console.log('Please provide a valid day number');
  process.exit(1);
}

async function runDay(day: number): Promise<void> {
  try {
    await import(`./day${day}.ts`);
  } catch (err) {
    if ((err as { position: unknown }).position === null) {
      throw new Error(`Day ${day} not found`, { cause: err });
    }
    throw err;
  }
}

if (day === null) {
  for (let i = 1; i <= 25; i++) {
    try {
      await runDay(i).catch(() => {});
    } catch (err) {}
  }
} else {
  runDay(day).catch(e => console.log(e));
}
