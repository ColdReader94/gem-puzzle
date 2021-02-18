// перемешивание создаваемых ячеек
export default function swap(num, arg2, arg3, arg4, arg5) {
  const numbers = num;
  const i1 = arg2;
  const j1 = arg3;
  const i2 = arg4;
  const j2 = arg5;
  const t = numbers[i1][j1];
  numbers[i1][j1] = numbers[i2][j2];
  numbers[i2][j2] = t;
}
