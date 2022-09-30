import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'


function App() {
  return (
    <>
      <div className='flex justify-around'>
        <h1 className='text-center'>Token Parade</h1>
      </div>
      <div id="canvas-container">
        <Canvas>
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshPhysicalMaterial color='hotpink' />
          </mesh>
          <ambientLight intensity={0.1} />
          <directionalLight color="white" position={[0, 0, 5]} />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}

export default App;
