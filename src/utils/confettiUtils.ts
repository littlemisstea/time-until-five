import confetti from 'canvas-confetti';

const coffee = confetti.shapeFromText({ text: '☕️', scalar: 3 });
const croissant = confetti.shapeFromText({ text: '🥐', scalar: 3 });

export function party(element: Element) {
  const rect = element.getBoundingClientRect();

  fire(rect, 0.25, { spread: 26, startVelocity: 55 });
  fire(rect, 0.2, { spread: 60 });
  fire(rect, 0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(rect, 0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(rect, 0.1, { spread: 120, startVelocity: 45 });
}

export function breakfast(element: Element) {
  const rect = element.getBoundingClientRect();

  const colors = ['#e7ad49', '#ffffff'];

  fire(rect, 0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: colors,
  });
  fire(rect, 0.02, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 5,
    flat: true,
    ticks: 75,
    shapes: [coffee, croissant],
  });
  fire(rect, 0.02, {
    spread: 120,
    startVelocity: 45,
    scalar: 4,
    flat: false,
    ticks: 75,
    shapes: [coffee, croissant],
  });
}

function fire(rect: DOMRect, particleRatio: number, options: confetti.Options) {
  const x = (rect.x + rect.width / 2) / window.innerWidth;
  const y = (rect.y + rect.height / 2) / window.innerHeight;
  const count = 200;
  const defaults: confetti.Options = {
    origin: { x: x, y: y },
  };

  void confetti({
    ...defaults,
    ...options,
    particleCount: Math.floor(count * particleRatio),
  });
}
