import { useEffect, useState } from 'react';
const NAME = "CHMISO";
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#$%&01";
/**
 * Cycles random characters into place, left to right, until the
 * target text is fully "decoded". Classic terminal/hacker reveal.
 */
function useScrambleText(text: string, duration = 3200) {
  const [display, setDisplay] = useState(() =>
    text.split("").map(() => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]).join("")
  );
  useEffect(() => {
    let frame = 0;
    let animationFrame: number;

    // Lower fps = scramble characters flicker/change more slowly.
    const fps = 12;
    const msPerFrame = 1000 / fps;
    const totalFrames = Math.round((duration / 1000) * fps);
    const framesPerChar = totalFrames / text.length;

    let lastTime = performance.now();

    const tick = (now: number) => {
      animationFrame = requestAnimationFrame(tick);

      if (now - lastTime < msPerFrame) return;
      lastTime = now;

      frame++;
      const revealedCount = Math.floor(frame / framesPerChar);

      const output = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedCount) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      setDisplay(output);

      if (revealedCount >= text.length) {
        setDisplay(text);
        cancelAnimationFrame(animationFrame);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [text, duration]);
  return display;
}
function MainHeader() {
  const scrambled = useScrambleText(NAME, 3200);
  const isDone = scrambled === NAME;
  return (
    <div className="mb-8 select-none">
      <h1
        className={`text-7xl md:text-9xl text-brand-green font-bold tracking-wide ${
          isDone ? "glow-flicker" : ""
        }`}
      >
        {scrambled}
        <span className="cursor-blink">_</span>
      </h1>
      <p className="mt-4 text-white text-lg">
        +2 years of experience as Full Stack Software Engineer 
      </p>
      <p className="mt-2 text-white ">
        React • Next.js • Laravel • Node.js • PostgreSQL 
      </p>
      <p className="mt-8 text-brand-green">
        Type <span className="text-white">help</span> to explore my portfolio.
      </p>
    </div>
  )
}
export default MainHeader