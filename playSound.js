export default function playSound(a) {
  const wav = a;
  wav.currentTime = 0;
  wav.play();
}
