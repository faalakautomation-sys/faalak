import { useEffect, useRef } from "react";

const HeroWiringEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId;
    let width = 0;
    let height = 0;
    let particles = [];
    let isVisible = true;
    let time = 0;
    let pointer = null;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.min(100, Math.max(38, Math.round((width * height) / 14500)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * 3.8 - 1.9,
        y: Math.random() * 3.2 - 1.6,
        z: Math.random() * 2 - 1,
        phase: Math.random() * Math.PI * 2,
      }));
      draw();
    };

    const draw = () => {
      window.cancelAnimationFrame(frameId);
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const rotation = reducedMotion.matches ? 0.16 : time * 0.00011;
      const cosine = Math.cos(rotation);
      const sine = Math.sin(rotation);
      if (pointer) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 210);
        glow.addColorStop(0, "rgba(53, 151, 255, 0.16)");
        glow.addColorStop(1, "rgba(53, 151, 255, 0)");
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);
      }
      const projected = particles.map((particle) => {
        const x = particle.x * cosine + particle.z * sine;
        const z = -particle.x * sine + particle.z * cosine;
        const depth = 2.7 + z + Math.sin(time * 0.0007 + particle.phase) * 0.1;
        const perspective = 1 / depth;
        const projectedX = width / 2 + x * width * 0.76 * perspective;
        const projectedY = height / 2 + particle.y * height * 1.38 * perspective;
        const pointerDistance = pointer
          ? Math.hypot(projectedX - pointer.x, projectedY - pointer.y)
          : Infinity;
        const pointerInfluence = Math.max(0, 1 - pointerDistance / 190);

        return {
          x: projectedX + (pointer ? (projectedX - pointer.x) * pointerInfluence * 0.13 : 0),
          y: projectedY + (pointer ? (projectedY - pointer.y) * pointerInfluence * 0.13 : 0),
          depth,
          pointerInfluence,
        };
      });

      for (let i = 0; i < projected.length; i += 1) {
        const point = projected[i];
        for (let j = i + 1; j < projected.length; j += 1) {
          const other = projected[j];
          const dx = point.x - other.x;
          const dy = point.y - other.y;
          const distance = Math.hypot(dx, dy);
          const maxDistance = 142;
          if (distance >= maxDistance) continue;

          const pointerInfluence = Math.max(point.pointerInfluence, other.pointerInfluence);
          const opacity = (1 - distance / maxDistance) * (0.46 + pointerInfluence * 0.38);
          context.strokeStyle = `rgba(112, 184, 255, ${opacity})`;
          context.lineWidth = 0.8;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }

        context.beginPath();
        const opacity = Math.min(1, 0.58 + (2.7 - point.depth) * 0.12 + point.pointerInfluence * 0.32);
        context.fillStyle = `rgba(177, 218, 255, ${opacity})`;
        context.arc(point.x, point.y, 1.2 + point.pointerInfluence * 1.8, 0, Math.PI * 2);
        context.fill();
      }

      if (!reducedMotion.matches && isVisible) {
        time += 16;
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      window.cancelAnimationFrame(frameId);
      if (isVisible) draw();
    });
    visibilityObserver.observe(canvas);

    const handleMotionChange = () => {
      window.cancelAnimationFrame(frameId);
      draw();
    };
    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      if (isVisible && (reducedMotion.matches || !frameId)) draw();
    };
    const handlePointerLeave = () => {
      pointer = null;
      if (isVisible) draw();
    };
    const hero = canvas.parentElement;
    hero?.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero?.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      visibilityObserver.disconnect();
      hero?.removeEventListener("pointermove", handlePointerMove);
      hero?.removeEventListener("pointerleave", handlePointerLeave);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="faalak-hero-wiring pointer-events-none absolute inset-0 z-[3] h-full w-full"
    />
  );
};

export default HeroWiringEffect;
