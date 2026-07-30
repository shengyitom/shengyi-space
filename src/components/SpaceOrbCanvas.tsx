import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function SpaceOrbCanvas({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.z = 7

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })
    renderer.setClearColor(0xffffff, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const coreGeometry = new THREE.IcosahedronGeometry(1.55, 2)
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x191919,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    })
    group.add(new THREE.Mesh(coreGeometry, coreMaterial))

    const pointGeometry = new THREE.SphereGeometry(2.15, 28, 18)
    const pointMaterial = new THREE.PointsMaterial({
      color: 0x191919,
      size: 0.018,
      transparent: true,
      opacity: 0.42,
    })
    group.add(new THREE.Points(pointGeometry, pointMaterial))

    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x191919,
      transparent: true,
      opacity: 0.12,
      wireframe: true,
    })
    const orbitGeometry = new THREE.TorusGeometry(2.45, 0.006, 4, 160)
    const orbitA = new THREE.Mesh(orbitGeometry, orbitMaterial)
    orbitA.rotation.x = 1.05
    orbitA.rotation.y = 0.2
    group.add(orbitA)

    const orbitB = orbitA.clone()
    orbitB.rotation.x = 0.35
    orbitB.rotation.y = 1.2
    orbitB.scale.setScalar(0.82)
    group.add(orbitB)

    const pointer = new THREE.Vector2()
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.8
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.8
    }

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1)
      const height = Math.max(mount.clientHeight, 1)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)
    mount.addEventListener('pointermove', handlePointerMove)
    resize()

    let frame = 0
    const animate = () => {
      if (!document.hidden) {
        group.rotation.y += 0.0018
        group.rotation.x += 0.0007
        group.rotation.y += (pointer.x - group.rotation.y * 0.08) * 0.006
        group.rotation.x += (-pointer.y - group.rotation.x * 0.08) * 0.006
        renderer.render(scene, camera)
      }
      frame = window.requestAnimationFrame(animate)
    }

    if (!prefersReducedMotion) animate()

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      mount.removeEventListener('pointermove', handlePointerMove)
      coreGeometry.dispose()
      coreMaterial.dispose()
      pointGeometry.dispose()
      pointMaterial.dispose()
      orbitGeometry.dispose()
      orbitMaterial.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden />
}
