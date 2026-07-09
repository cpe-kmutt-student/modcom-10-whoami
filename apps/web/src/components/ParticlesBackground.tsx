"use client";

import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
	const init = useCallback(async (engine: Engine) => {
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async (container?: Container) => {
		if (container) {
			console.log("Particles loaded", container);
		}
	}, []);

	const options: ISourceOptions = useMemo(
		() => ({
			particles: {
				move: {
					enable: true,
					speed: 1.1,
				},
				number: {
					value: 18,
				},
				opacity: {
					value: {
						min: 0.35,
						max: 0.85,
					},
				},
				rotate: {
					value: {
						min: 0,
						max: 360,
					},
					direction: "random",
					animation: {
						enable: true,
						speed: 8,
						sync: false,
					},
				},
				paint: {
					fill: {
						color: {
							value: ["#60a5fa", "#34d399", "#f59e0b", "#f472b6"],
						},
						enable: true,
					},
					stroke: {
						color: {
							value: "#ffffff",
						},
						width: 0,
					},
				},
				shape: {
					type: "image",
					close: true,
					options: {
						image: {
							close: true,
							gif: false,
							height: 310,
							name: "question",
							replaceColor: false,
							src: "/question-mark.png",
							width: 188,
						},
					},
				},
				size: {
					value: {
						min: 20,
						max: 38,
					},
				},
			},
		}),
		[],
	);

	return (
		<ParticlesProvider init={init}>
			<div className="pointer-events-none fixed inset-0 z-0">
				<Particles
					className="h-full w-full"
					id="tsparticles"
					particlesLoaded={particlesLoaded}
					options={options}
				/>
			</div>
		</ParticlesProvider>
	);
}
