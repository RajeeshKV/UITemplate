import React, { useEffect, useRef } from "react";

/**
 * 🌸 PetalBackground
 * Animated falling petals that float across the screen.
 * Adapts color to dark/light mode.
 */
export default function PetalBackground() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const petalCount = 16;
        const petals = [];

        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            );
            petal.setAttribute("viewBox", "0 0 20 20");
            petal.classList.add("absolute", "pointer-events-none", "z-10");

            const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );
            path.setAttribute(
                "d",
                "M10 1 C14 2,18 6,15 11 C13 15,7 19,5 14 C3 9,6 3,10 1 Z"
            );

            const isDark = document.documentElement.classList.contains("dark");
            const colorOptions = isDark
                ? ["#e0a3ff", "#d38eff", "#c770ff"]
                : ["#ffb6c1", "#ff8fab", "#ff6fa5"];

            const fillColor =
                colorOptions[Math.floor(Math.random() * colorOptions.length)];
            path.setAttribute("fill", fillColor);
            path.setAttribute("fill-opacity", "0.8");

            petal.appendChild(path);

            const size = Math.random() * 30 + 20;
            const startX = Math.random() * 100;
            const delay = Math.random() * 8;
            const duration = 10 + Math.random() * 10;
            const rotate = Math.random() * 360;

            petal.style.width = `${size}px`;
            petal.style.height = `${size * 1.3}px`;
            petal.style.left = `${startX}%`;
            petal.style.top = `-${Math.random() * 20}%`;
            petal.style.transform = `rotate(${rotate}deg)`;
            petal.style.opacity = "0.9";
            petal.style.animation = `fallPetal ${duration}s linear ${delay}s infinite`;

            container.appendChild(petal);
            petals.push(petal);
        }

        return () => petals.forEach((p) => container.removeChild(p));
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-hidden z-10 pointer-events-none"
        />
    );
}
