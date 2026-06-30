// scheduler.js

function computeGreenTimes(counts, cycleDuration=120, minGreen=15) {
  const phaseA = counts.N + counts.S;
  const phaseB = counts.E + counts.W;
  const total = phaseA + phaseB;

  if (total === 0) {
    return { A: cycleDuration / 2, B: cycleDuration / 2 };
  }

  let timeA = (phaseA / total) * cycleDuration;
  let timeB = (phaseB / total) * cycleDuration;

  timeA = Math.max(minGreen, timeA);
  timeB = Math.max(minGreen, timeB);

  const scale = cycleDuration / (timeA + timeB);
  timeA *= scale;
  timeB *= scale;

  return {
    A: parseFloat(timeA.toFixed(1)),
    B: parseFloat(timeB.toFixed(1))
  };
}