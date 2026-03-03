"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface DotsProps {
    count?: number
    color?: string
    size?: number
}

const Dots = ({ count = 100, color = "#000", size = 0.08 }: DotsProps) => {
    const meshRef = useRef<THREE.Points>(null!)

    // Create random initial positions and random movement parameters for each dot
    const [particles, randomOffsets] = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const offsets = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            // Random initial position in a volume
            positions[i * 3] = (Math.random() - 0.5) * 30
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10

            // Independent speeds/phases for each atom
            offsets[i * 3] = Math.random() * Math.PI * 2
            offsets[i * 3 + 1] = Math.random() * Math.PI * 2
            offsets[i * 3 + 2] = Math.random() * Math.PI * 2
        }
        return [positions, offsets]
    }, [count])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const positions = meshRef.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < count; i++) {
            const ix = i * 3

            // Each "atom" moves independently along its own path
            // Using different frequencies for each axis to avoid linear paths
            positions[ix] += Math.sin(time * 0.3 + randomOffsets[ix]) * 0.008
            positions[ix + 1] += Math.cos(time * 0.4 + randomOffsets[ix + 1]) * 0.008
            positions[ix + 2] += Math.sin(time * 0.2 + randomOffsets[ix + 2]) * 0.008

            // Wrap around or keep within volume (optional, but good for "gas" feel)
            // For simplicity and "hero" feel, we'll just let them oscillate
        }

        meshRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                color={color}
                sizeAttenuation={true}
                transparent
                opacity={0.3}
            />
        </points>
    )
}

const DotsOverlay = ({ count = 1000, color = "#000", size = 0.08 }: DotsProps) => {
    return (
        <div className="absolute inset-x-0 -top-20 h-[400px] pointer-events-none -z-10 bg-radial-[circle_at_center,_var(--color-background)_0%,_transparent_100%]">
            <Canvas
                shadows
                camera={{ position: [0, 8, 12], fov: 35 }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <Dots count={count} color={color} size={size} />
            </Canvas>
        </div>
    )
}

export default DotsOverlay
