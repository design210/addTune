export default function roundNumber(num, replace) {
  return +(Math.ceil(`${num}e+${replace}`) + `e-${replace}`);
}
