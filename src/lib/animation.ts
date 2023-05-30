import type { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

interface transitionOptions {
  delay?: number;
  duration?: number;
  easing?: typeof cubicOut;
}

interface inOutOptions {
  start?: "top" | "bottom" | "left" | "right";
  moveY?: boolean;
}

const parseSize = (size: string) =>
  (size.endsWith("px")
    ? +size.slice(0, -2)
    : size.endsWith("rem")
      ? +size.slice(0, -3) * 16
      : null) || 0;

export function enterExit(
  node: Element,
  options: transitionOptions & inOutOptions
): TransitionConfig {
  options.start ||= "top";
  options.moveY ??= true;
  const scaleDir = ["top", "bottom"].includes(options.start) ? "Y" : "X";
  const { borderRadius, boxShadow } = getComputedStyle(node);
  const radius = parseSize(borderRadius);
  const getClipPath = (n: string) => {
    const out = boxShadow != "none" ? "-100%" : "0";
    /* the above allows box shadows to show, ideally i would use a wrapper for this instead */
    if (options.start == "top") return `-100% ${out} ${n} ${out}`;
    else if (options.start == "bottom") return `${n} ${out} -100% ${out}`;
    else if (options.start == "left") return `${out} ${n} ${out} -100%`;
    else if (options.start == "right") return `${out} -100% ${out} ${n}`;
  };
  const getTransform = (u: number) => {
    if (!options.moveY) return "";
    if (options.start == "top") return `translateY(${u * -10}%)`;
    else if (options.start == "bottom") return `translateY(${u * 10}%)`;
    else if (options.start == "left") return `translateX(${u * -10}%)`;
    else if (options.start == "right") return `translateX(${u * 10}%)`;
  };
  return {
    delay: options.delay,
    duration: options.duration || 300,
    easing: options.easing || easeEmphasized,
    css: (t, u) => `clip-path: inset(${getClipPath(
      (boxShadow != "none" ? u * 110 - 10 : u * 100) + "%"
    )} round ${radius}px);
transform-origin: ${options.start};
transform: scale${scaleDir}(${(t * 0.3 + 0.7) * 100}%) ${getTransform(u)};
opacity: ${Math.min(t * 3, 1)};`,
  };
};

export function outroClass(node: Element) {
  const addClass = (e: Event) => {
    if (!(e.target instanceof Element)) return;
    e.target.classList.add("leaving");
  };
  const removeClass = (e: Event) => {
    if (!(e.target instanceof Element)) return;
    e.target.classList.remove("leaving");
  };
  node.addEventListener("outrostart", addClass);
  node.addEventListener("outroend", removeClass);
  return {
    destroy() {
      node.removeEventListener("outrostart", addClass);
      node.removeEventListener("outroend", removeClass);
    },
  };
};

interface heightOptions {
  height: number;
}
export function heightTransition(node: Element, options: transitionOptions & heightOptions) {
  return {
    delay: options.delay,
    duration: options.duration || 400,
    easing: options.easing || easeEmphasized,
    css: (t: number) => `height: ${t * options.height}px`,
  };
};

function createBezierLUT(points: [number, number][], pointCount = 100) {
  const lut = [];
  for (let t = 0; t < 1; t += 1 / pointCount) {
    const a = (1 - t) * (1 - t) * (1 - t);
    const b = (1 - t) * (1 - t) * t;
    const c = (1 - t) * t * t;
    const d = t * t * t;
    const x = a * points[0][0] + 3 * b * points[1][0] + 3 * c * points[2][0] + d * points[3][0];
    const y = a * points[0][1] + 3 * b * points[1][1] + 3 * c * points[2][1] + d * points[3][1];
    lut.push([x, y]);
  }
  return lut;
};

function createEase(lutOptions: [number, number][][]) {
  let lut: ReturnType<typeof createBezierLUT>;
  return (t: number) => {
    if (!lut) lut = lutOptions.map((args) => createBezierLUT(args)).flat();
    const closestPoint = lut.find((p) => p[0] >= t);
    const closestY = closestPoint ? closestPoint[1] : 1;
    return closestY;
  };
};

export const easeEmphasized = createEase([
  [
    [0, 0],
    [0.05, 0],
    [0.133, 0.06],
    [0.166, 0.4],
  ],
  [
    [0.166, 0.4],
    [0.208, 0.82],
    [0.25, 1],
    [1, 1],
  ],
]);
export const easeEmphasizedDecel = createEase([
  [
    [0, 0],
    [0.05, 0.7],
    [0.1, 1],
    [1, 1],
  ],
]);
export const easeEmphasizedAccel = createEase([
  [
    [0, 0],
    [0.3, 0],
    [0.8, 0.15],
    [1, 1],
  ],
]);
