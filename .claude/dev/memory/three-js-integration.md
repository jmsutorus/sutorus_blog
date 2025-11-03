# Three.js Integration Guide

**Last Updated**: 2025-11-03

## Setup

### Required Dependencies
```bash
npm install three @react-three/fiber @react-three/drei
```

No special flags needed - installs cleanly with current project setup.

## Implementation Pattern

### Basic Component Structure
```tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function My3DComponent() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* Your 3D elements */}
      </Canvas>
    </div>
  );
}
```

### Key Setup Details

#### Canvas Configuration
- **Position**: Absolute with `inset-0` to fill parent
- **Pointer Events**: Set `pointer-events-none` on container to prevent interaction conflicts
- **Camera**: Adjust position and FOV based on scene needs
- **Lighting**: Always include ambient light + at least one directional/point light

#### Client-Side Rendering
Always use `'use client'` directive - Three.js requires browser APIs

## Creating Custom Shapes

### Heart Shape Example
```tsx
const heartShape = new THREE.Shape();

// Top curves of heart
heartShape.bezierCurveTo(-0.5, 0.8, -1, 0.4, -1, 0);
heartShape.bezierCurveTo(-1, -0.3, -0.5, -0.6, 0, -1);
heartShape.bezierCurveTo(0.5, -0.6, 1, -0.3, 1, 0);
heartShape.bezierCurveTo(1, 0.4, 0.5, 0.8, 0, 0.5);

const extrudeSettings = {
  steps: 2,
  depth: 0.2,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 3
};

<mesh>
  <extrudeGeometry args={[heartShape, extrudeSettings]} />
  <meshStandardMaterial color="#f43f5e" transparent opacity={0.15} />
</mesh>
```

## Animation Patterns

### Floating Animation
```tsx
function FloatingElement({ position, speed }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Vertical float
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;

      // Optional rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return <mesh ref={meshRef} position={position}>...</mesh>;
}
```

### Key Concepts
- `useFrame` runs every frame (like requestAnimationFrame)
- `state.clock.elapsedTime` provides smooth time value
- Use `Math.sin` for smooth oscillation
- Multiply by speed parameter for varied animation rates

## Rotation Fix

### Common Issue: Upside Down Shapes
When shapes appear upside down, rotate 180° around Z-axis:
```tsx
<mesh rotation={[0, 0, Math.PI]}>
  {/* geometry */}
</mesh>
```

Rotation array: `[x, y, z]` in radians
- `Math.PI` = 180°
- `Math.PI / 2` = 90°

## Performance Best Practices

### Opacity for Background Elements
Keep 3D elements subtle when used as background:
```tsx
<meshStandardMaterial
  color="#f43f5e"
  transparent
  opacity={0.15}  // 15% opacity
/>
```

### Multiple Elements
When rendering multiple similar objects:
```tsx
const elements = [
  { position: [x1, y1, z1], scale: 1, speed: 0.5 },
  { position: [x2, y2, z2], scale: 1.2, speed: 0.3 },
  // ...
];

{elements.map((props, i) => (
  <FloatingElement key={i} {...props} />
))}
```

### Geometry Caching
Geometries are created once per component instance (not per frame), so multiple instances are efficient.

## Integration with Next.js

### Positioning as Background Layer
```tsx
<section className="relative py-24 overflow-hidden">
  {/* 3D background */}
  <My3DComponent />

  {/* Content layer */}
  <div className="relative z-10">
    <Container>
      {/* Your content */}
    </Container>
  </div>
</section>
```

### Bundle Size Considerations
- Three.js adds significant bundle size (~200-300 kB)
- Use sparingly on feature pages, not on every page
- Consider lazy loading for non-critical 3D elements

## User Preferences Learned

### What Works
- ✅ Subtle background effects (15-20% opacity)
- ✅ Slow, smooth animations
- ✅ Decorative elements that don't compete with content
- ✅ Positioned behind content (z-index management)

### What Doesn't Work
- ❌ Bright, eye-catching particle effects
- ❌ High opacity that obscures content
- ❌ Fast, distracting animations
- ❌ Effects in the foreground

### Example: Rejected Sparkle Particles
User tried golden sparkle particles on wedding hero but rejected them:
> "I don't like it. Undo the floating golden sparkles"

**Lesson**: Keep 3D effects minimal and in the background.

## Common Issues & Solutions

### TypeScript Errors with BufferAttribute
❌ **Wrong**:
```tsx
<bufferAttribute args={[positions, 3]} />
```

✅ **Right**:
```tsx
const geometry = useMemo(() => {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geo;
}, [positions]);

<primitive object={geometry} />
```

### Shapes Appearing Upside Down
Add rotation to flip:
```tsx
<mesh rotation={[0, 0, Math.PI]}>
```

### Canvas Not Visible
Check:
1. Parent has defined height (or use `inset-0`)
2. Camera position is correct
3. Lighting is present
4. Objects are within camera view frustum

## Testing Approach
1. Verify build completes: `npm run build`
2. Check bundle size impact (should be listed in build output)
3. Visual testing on target devices
4. Performance testing with browser DevTools
5. Verify animations are smooth (60fps)

## Files Reference

### Example Implementation
See: `src/app/_components/wedding/floating-hearts-3d.tsx`

Complete working example with:
- Heart shape creation
- Multiple animated elements
- Proper opacity/positioning
- Client-side rendering
- TypeScript types
