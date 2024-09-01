import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  useHelper,
  Helper,
} from '@react-three/drei';
import { SpotLightHelper, DirectionalLightHelper, CameraHelper } from 'three';
import { useControls } from 'leva';

function AnimatedBox() {
  const boxRef = useRef();

  const { color, speed } = useControls({
    color: '#00bfff',
    speed: {
      value: 0.005,
      min: 0.0,
      max: 0.03,
      step: 0.001,
    },
  });

  useFrame(() => {
    boxRef.current.rotation.x += speed;
    boxRef.current.rotation.y += speed;
    boxRef.current.rotation.z += speed;
  });

  return (
    <mesh ref={boxRef} position={[5, 3, 0]} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function LightWithHelper() {
  const light = useRef();

  useHelper(light, SpotLightHelper, 'green');

  const { angle, penumbra } = useControls({
    angle: Math.PI / 8,
    penumbra: {
      value: 0.0,
      min: 0.0,
      max: 1.0,
      step: 0.1,
    },
  });

  return (
    <spotLight
      ref={light}
      intensity={50}
      position={[5, 8, 0]}
      angle={angle}
      penumbra={penumbra}
      castShadow
    />
  );
}

function DirectionalLightWithHelper() {
  const light = useRef();
  useHelper(light, DirectionalLightHelper, 2, 'crimson');

  const shadow = useRef();
  useHelper(shadow, CameraHelper);

  return (
    <directionalLight ref={light} position={[-5, 8, 0]} castShadow>
      <orthographicCamera attach='shadow-camera' ref={shadow} />
    </directionalLight>
  );
}

function App() {
  return (
    <div id='canvas-container'>
      <Canvas shadows>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial />
        </mesh>
        <axesHelper args={[10]} />
        <GizmoHelper alignment='bottom-right' margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>
        <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />
        <OrbitControls />
        <AnimatedBox />
        <ambientLight color={0xfcfcfc} intensity={0.2} />
        <DirectionalLightWithHelper />
      </Canvas>
    </div>
  );
}

export default App;
