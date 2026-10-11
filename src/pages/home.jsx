
import { useEffect, useRef } from "react";

import "../App.css";
import "./home.css";

const LETTERS = [
  { letter: "P", top: "#FF7A59", bottom: "#EC4426" },
  { letter: "O", top: "#FFD451", bottom: "#F5A800" },
  { letter: "R", top: "#9B6BFF", bottom: "#5C33E6" },
  { letter: "T", top: "#4CC3FF", bottom: "#138CE6" },
  { letter: "F", top: "#4BE07A", bottom: "#17A84A" },
  { letter: "O", top: "#FF86CF", bottom: "#E8449F" },
  { letter: "L", top: "#D6F75E", bottom: "#9FD21F" },
  { letter: "I", top: "#35DCCB", bottom: "#0EA898" },
  { letter: "O", top: "#FFA44A", bottom: "#F2700F" },
];

function PortfolioTrain({ containerRef, speedRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let width = 0;
    let height = 0;
    let frameId;
    let lastTime = 0;
    let elapsed = 0;
    let path = [];
    let totalLength = 0;
    let tileSize = 60;
    let mobile = false;

    const spacing = () => tileSize * 1.45;
    // const cycleLength = 21.1;
    const stopDuration = 4;
    const enterDuration = 6;
    const exitStart = enterDuration + stopDuration;
    const exitDuration = 6;
    const waitDuration = 1.1;
    const cycleLength = enterDuration + stopDuration + exitDuration + waitDuration;

    
    

    const clamp = (value, min, max) =>
      Math.min(max, Math.max(min, value));

    const lerp = (a, b, t) => a + (b - a) * t;

    const easeInOut = (t) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    function getControlPoints() {
      if (mobile) {
        return [
          [-0.4, 0.18],
          [-0.12, 0.48],
          [0.08, 0.68],
          [0.2, 0.78],
          [0.35, 0.83],
          [0.5, 0.84],
          [0.65, 0.83],
          [0.8, 0.78],
          [0.92, 0.68],
          [1.12, 0.48],
          [1.4, 0.18],
        ];
      }

      return [
        [-0.4, 0.12],
        [-0.1, 0.4],
        [0.12, 0.65],
        [0.23, 0.8],
        [0.31, 0.85],
        [0.4, 0.855],
        [0.5, 0.855],
        [0.6, 0.855],
        [0.69, 0.85],
        [0.77, 0.8],
        [0.88, 0.65],
        [1.1, 0.4],
        [1.4, 0.12],
      ];
    }

    function buildPath() {
      const control = getControlPoints().map(([x, y]) => ({
        x: x * width,
        y: y * height,
      }));

      const points = [];

      // Catmull-Rom spline: a smooth curve through the control points.
      for (let i = 0; i < control.length - 1; i++) {
        const p0 = control[Math.max(0, i - 1)];
        const p1 = control[i];
        const p2 = control[i + 1];
        const p3 = control[Math.min(control.length - 1, i + 2)];

        const steps = 28;

        for (let step = 0; step < steps; step++) {
          const t = step / steps;
          const t2 = t * t;
          const t3 = t2 * t;

          const x =
            0.5 *
            (2 * p1.x +
              (-p0.x + p2.x) * t +
              (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
              (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);

          const y =
            0.5 *
            (2 * p1.y +
              (-p0.y + p2.y) * t +
              (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
              (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

          points.push({ x, y, distance: 0 });
        }
      }

      points.push({
        ...control[control.length - 1],
        distance: 0,
      });

      let distance = 0;

      for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;

        distance += Math.hypot(dx, dy);
        points[i].distance = distance;
      }

      totalLength = distance;
      path = points;
    }

    function pointAt(distance) {
      const d = clamp(distance, 0, totalLength);

      let low = 0;
      let high = path.length - 1;

      while (low < high) {
        const mid = Math.floor((low + high) / 2);

        if (path[mid].distance < d) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }

      const b = path[low];
      const a = path[Math.max(0, low - 1)];

      const range = b.distance - a.distance;
      const t = range === 0 ? 0 : (d - a.distance) / range;

      return {
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        angle: Math.atan2(b.y - a.y, b.x - a.x),
      };
    }

    function resize() {
      const rect = container.getBoundingClientRect();

      width = rect.width;
      height = rect.height;
      mobile = width < 820;

      tileSize = mobile
        ? clamp(width * 0.075, 28, 38)
        : clamp(width * 0.035, 36, 58);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildPath();
    }

    function drawRailPath(offsetY = 0) {
      if (!path.length) return;

      ctx.beginPath();

      path.forEach((point, index) => {
        const x = point.x;
        const y = point.y + offsetY;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
    }

    function drawRailway() {
      const railOffset = tileSize * 0.3;
      const backRailOffset = railOffset + tileSize * 0.42;
      const lowerOffset = railOffset + tileSize * 1.3;

      // Support legs.
    //   for (let distance = 0; distance < totalLength; distance += tileSize * 2.4) {
    //     const point = pointAt(distance);
    //     const x = point.x;
    //     const y = point.y + railOffset;
    //     const legWidth = tileSize * 0.16;
    //     const legHeight = height - y;

    //     if (legHeight <= 0) continue;

    //     const gradient = ctx.createLinearGradient(
    //       x - legWidth,
    //       0,
    //       x + legWidth,
    //       0
    //     );

    //     gradient.addColorStop(0, "#0E6A26");
    //     gradient.addColorStop(0.5, "#2FB24C");
    //     gradient.addColorStop(1, "#0B5A20");

    //     ctx.fillStyle = gradient;
    //     ctx.beginPath();
    //     ctx.roundRect(
    //       x - legWidth / 2,
    //       y,
    //       legWidth,
    //       legHeight,
    //       legWidth / 2
    //     );
    //     ctx.fill();

    //     ctx.fillStyle = "#49D467";
    //     ctx.fillRect(
    //       x - legWidth / 2,
    //       y,
    //       legWidth,
    //       tileSize * 0.045
    //     );

    //     // Light diagonal bracing.
    //     ctx.save();
    //     ctx.strokeStyle = "rgba(37, 168, 69, 0.22)";
    //     ctx.lineWidth = Math.max(1, tileSize * 0.025);

    //     const next = pointAt(
    //       Math.min(distance + tileSize * 2.4, totalLength)
    //     );

    //     ctx.beginPath();
    //     ctx.moveTo(x, y + tileSize * 0.2);
    //     ctx.lineTo(next.x, Math.min(height, next.y + railOffset + tileSize * 1.1));
    //     ctx.moveTo(x, Math.min(height, y + tileSize * 1.1));
    //     ctx.lineTo(next.x, next.y + railOffset + tileSize * 0.2);
    //     ctx.stroke();
    //     ctx.restore();
    //   }

      // Lattice truss: back rail, lower chord, vertical ties and zig-zag.
      ctx.save();
      ctx.lineCap = "round";
      ctx.strokeStyle = "#cccccc68";
      ctx.lineWidth = Math.max(0.8, tileSize * 0.025);

      drawRailPath(backRailOffset);
      ctx.stroke();

      drawRailPath(lowerOffset);
      ctx.stroke();

      for (
        let distance = 0;
        distance <= totalLength;
        distance += tileSize * 0.42
      ) {
        const point = pointAt(distance);

        ctx.beginPath();
        ctx.moveTo(point.x, point.y + backRailOffset);
        ctx.lineTo(point.x, point.y + lowerOffset);
        ctx.stroke();
      }

      for (
        let distance = 0;
        distance < totalLength;
        distance += tileSize * 0.42
      ) {
        const a = pointAt(distance);
        const b = pointAt(
          Math.min(distance + tileSize * 0.42, totalLength)
        );

        ctx.beginPath();
        ctx.moveTo(a.x, a.y + backRailOffset);
        ctx.lineTo(b.x, b.y + lowerOffset);
        ctx.moveTo(a.x, a.y + lowerOffset);
        ctx.lineTo(b.x, b.y + backRailOffset);
        ctx.stroke();
      }

      ctx.restore();

      // Rear rail and highlight.
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      drawRailPath(railOffset);
      ctx.strokeStyle = "#454545";
      ctx.lineWidth = tileSize * 0.19;
      ctx.stroke();

      drawRailPath(railOffset - tileSize * 0.025);
      ctx.strokeStyle = "#454545";
      ctx.lineWidth = tileSize * 0.025;
      ctx.stroke();

      ctx.restore();
    }

    function drawWheel(x, y, radius, rotation) {
      ctx.save();
      ctx.translate(x, y);

      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#8D9690";
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
      ctx.fill();

      ctx.rotate(rotation);
      ctx.strokeStyle = "#424A45";
      ctx.lineWidth = Math.max(1, radius * 0.13);

      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius * 0.78, 0);
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawCart(point, index, time, movement) {
      const tile = LETTERS[index];
      const T = tileSize;
      const angle = point.angle;

      // Tiny spring bounce and lean as the train starts and brakes.
      const bounce = Math.sin(time * 4.8 + index * 0.7) * T * 0.018;
      const lean = movement * -0.035;

      ctx.save();
      ctx.translate(point.x, point.y + bounce);
      ctx.rotate(angle + lean);

      // Wheels sit beneath the cart.
      const wheelY = T * 0.29;
      const wheelRadius = T * 0.13;
      const wheelRotation = time * 5 + index * 0.7;

      drawWheel(-T * 0.34, wheelY, wheelRadius, wheelRotation);
      drawWheel(T * 0.34, wheelY, wheelRadius, wheelRotation);

      // Metal cart body.
      const metal = ctx.createLinearGradient(0, -T * 0.12, 0, T * 0.28);
      metal.addColorStop(0, "#C9CFCB");
      metal.addColorStop(0.48, "#8E9691");
      metal.addColorStop(1, "#5D6560");

      ctx.fillStyle = metal;
      ctx.beginPath();
      ctx.moveTo(-T * 0.59, -T * 0.15);
      ctx.lineTo(T * 0.59, -T * 0.15);
      ctx.lineTo(T * 0.49, T * 0.24);
      ctx.lineTo(-T * 0.49, T * 0.24);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#E8ECE9";
      ctx.lineWidth = T * 0.035;
      ctx.beginPath();
      ctx.moveTo(-T * 0.59, -T * 0.15);
      ctx.lineTo(T * 0.59, -T * 0.15);
      ctx.stroke();

      ctx.strokeStyle = "rgba(45, 53, 48, 0.35)";
      ctx.lineWidth = T * 0.025;

      for (let x = -1; x <= 1; x++) {
        ctx.beginPath();
        ctx.moveTo(x * T * 0.22, -T * 0.08);
        ctx.lineTo(x * T * 0.2, T * 0.19);
        ctx.stroke();
      }

      // Letter tile.
      const tileY = -T * 1.15;
      const radius = T * 0.24;

      ctx.shadowColor = "rgba(28, 23, 20, 0.3)";
      ctx.shadowBlur = T * 0.14;
      ctx.shadowOffsetY = T * 0.07;

      const tileGradient = ctx.createLinearGradient(
        0,
        tileY,
        0,
        tileY + T
      );
      tileGradient.addColorStop(0, tile.top);
      tileGradient.addColorStop(1, tile.bottom);

      ctx.fillStyle = tileGradient;
      ctx.beginPath();
      ctx.roundRect(-T / 2, tileY, T, T, radius);
      ctx.fill();

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Glossy top reflection.
      ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
      ctx.beginPath();
      ctx.ellipse(
        0,
        tileY + T * 0.13,
        T * 0.31,
        T * 0.085,
        0,
        Math.PI,
        Math.PI * 2
      );
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.lineWidth = T * 0.025;
      ctx.beginPath();
      ctx.roundRect(
        -T * 0.46,
        tileY + T * 0.04,
        T * 0.92,
        T * 0.91,
        radius * 0.8
      );
      ctx.stroke();

      // Letter.
      ctx.fillStyle = "#FFFFFF";
      ctx.font = `700 ${T * 0.68}px Fredoka, "Arial Rounded MT Bold", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
      ctx.shadowBlur = T * 0.035;
      ctx.shadowOffsetY = T * 0.025;
      ctx.fillText(tile.letter, 0, tileY + T * 0.55);

      ctx.restore();
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      drawRailway();

      if (reducedMotion.matches) {
        // A calm, static version for reduced-motion preferences.
        const middle = path.find(
          (point) => point.x >= width / 2
        ) || pointAt(totalLength / 2);

        const centreDistance = middle.distance;
        const start = centreDistance - (LETTERS.length - 1) * spacing() / 2;

        LETTERS.forEach((_, index) => {
          drawCart(
            pointAt(start + index * spacing()),
            index,
            0,
            0
          );
        });

        return;
      }

      const cycleTime = elapsed % cycleLength;
      const centrePoint =
        path.find((point) => point.x >= width / 2) ||
        pointAt(totalLength / 2);

      const targetLead = centrePoint.distance + 4 * spacing();

      let leadDistance;
      let movement = 0;

      
    if (cycleTime < enterDuration) {
        const progress = easeInOut(cycleTime / enterDuration);
        leadDistance = lerp(totalLength, targetLead, progress);
        movement = -(1 - progress);
    } else if (cycleTime < exitStart) {
        leadDistance = targetLead;
        movement = 0;
    } else if (cycleTime < exitStart + exitDuration) {
        const progress = easeInOut(
            (cycleTime - exitStart) / exitDuration
        );

        leadDistance = lerp(targetLead, 0, progress);
        movement = progress;
    } else {
        // Short pause before the next pass.
        leadDistance = 0;
        movement = 0;
    }


      LETTERS.forEach((_, index) => {
        const cartDistance =
          leadDistance - (LETTERS.length - 1 - index) * spacing();

        if (cartDistance < 0 || cartDistance > totalLength) return;

        drawCart(pointAt(cartDistance), index, time, movement);
      });
    }

    function animate(now) {
      if (!lastTime) lastTime = now;

      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Holding the hero temporarily speeds up the timeline.
      elapsed += delta * (speedRef.current ? 2.2 : 1);

      draw(now / 1000);
      frameId = requestAnimationFrame(animate);
    }

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [containerRef, speedRef]);

  return <canvas ref={canvasRef} className="portfolio-train-canvas" aria-hidden="true" />;
}

function Home() {
  const heroRef = useRef(null);
  const speedRef = useRef(false);

  useEffect(() => {
    const stopSpeed = () => {
      speedRef.current = false;
    };

    window.addEventListener("pointerup", stopSpeed);
    window.addEventListener("pointercancel", stopSpeed);
    window.addEventListener("blur", stopSpeed);

    return () => {
      window.removeEventListener("pointerup", stopSpeed);
      window.removeEventListener("pointercancel", stopSpeed);
      window.removeEventListener("blur", stopSpeed);
    };
  }, []);

  function handlePointerDown(event) {
    // Don't speed up when the user interacts with a button or link.
    if (event.target.closest("a, button, input, textarea, select")) return;

    speedRef.current = true;
  }

  return (
    <div
      className="hero-middle"
      ref={heroRef}
      onPointerDown={handlePointerDown}
      onPointerLeave={() => {
        speedRef.current = false;
      }}
    >
      <PortfolioTrain containerRef={heroRef} speedRef={speedRef} />

      <div className="hero-middle-left">
        <div className="hero-headline-text">
          <p className="hero-desc">
            I design &amp; engineer products, all the way right from
          </p>

          <span className="hero-headline-text-highlight">
            Idea → Production
          </span>
        </div>

        <p className="hero-desc">
          I'm Muaaz; a product designer who likes getting close to the actual product.
          <br />
          I design the experience, understand the system behind it,
          <br />
          and increasingly, sometimes build the thing itself.
        </p>

        <button
          type="button"
          className="hero-cta"
          onClick={() => {
            // Replace this with your existing Work-page navigation
            // if your app uses a page state or router.
          }}
        >
          Explore my work <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default Home;