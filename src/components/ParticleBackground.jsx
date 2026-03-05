import React, { useEffect, useRef } from "react";
import { SITE_CONFIG } from "../config/site.config";

/**
 * ParticleBackground
 * Generic floating-particle canvas animation.
 * Style is configurable via SITE_CONFIG.particleStyle: "dots" | "lines" | "bubbles"
 */
export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const style = SITE_CONFIG.particleStyle || "dots";

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const isDark = () => document.documentElement.classList.contains("dark");

        // Particle factory
        const COUNT = style === "lines" ? 60 : 50;
        const particles = Array.from({ length: COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.1,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const baseColor = isDark() ? "200,169,110" : "30,41,59";

            // Draw connecting lines (only for "lines" style)
            if (style === "lines") {
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(${baseColor},${0.15 * (1 - dist / 100)})`;
                            ctx.lineWidth = 0.8;
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            // Draw particles
            particles.forEach((p) => {
                ctx.beginPath();
                if (style === "bubbles") {
                    ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(${baseColor},${p.alpha * 0.6})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                } else {
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${baseColor},${p.alpha})`;
                    ctx.fill();
                }

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wrap edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
            });

            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, [style]);

    return <canvas ref={canvasRef} id="particle-canvas" />;
}
